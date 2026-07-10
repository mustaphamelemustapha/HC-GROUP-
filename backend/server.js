import express from 'express';
import cors from 'cors';
import db, { query, getOne } from './database.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API Status
app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'active', service: 'HC Group API', timestamp: new Date() });
});

// Admin endpoint: Create product + default variant + dynamic EAV attributes under database transaction
app.post('/api/admin/products', async (req, res) => {
  const { name, description, sku_prefix, category_id, price, stock, weight_kg, volume_m3, attributes, image_url } = req.body;

  if (!name || !sku_prefix || !category_id || price === undefined) {
    return res.status(400).json({ error: 'Missing required fields (name, sku_prefix, category_id, price)' });
  }

  const productId = 'prod_' + Math.random().toString(36).substr(2, 9);
  const variantId = 'var_' + Math.random().toString(36).substr(2, 9);
  const sku = `${sku_prefix.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.run(
      `INSERT INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [productId, name, description, sku_prefix, category_id, image_url || null],
      function (err) {
        if (err) {
          db.run("ROLLBACK");
          return res.status(500).json({ error: 'Product insertion failed: ' + err.message });
        }

        db.run(
          `INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [variantId, productId, sku, Number(price), Number(stock || 0), Number(weight_kg || 0), Number(volume_m3 || 0)],
          async function (err) {
            if (err) {
              db.run("ROLLBACK");
              return res.status(500).json({ error: 'Variant insertion failed: ' + err.message });
            }

            if (attributes && typeof attributes === 'object') {
              const attrKeys = Object.keys(attributes);
              let errorOccurred = false;

              for (const key of attrKeys) {
                const val = attributes[key];
                try {
                  const attrId = 'attr_' + key.toLowerCase().replace(/[^a-z0-9]/g, '_');
                  const displayName = key.charAt(0).toUpperCase() + key.slice(1);

                  await new Promise((resolve, reject) => {
                    db.run(
                      `INSERT OR IGNORE INTO attributes (id, name, display_name, data_type) 
                       VALUES (?, ?, ?, 'string')`,
                      [attrId, key, displayName],
                      (err) => {
                        if (err) reject(err);
                        else resolve();
                      }
                    );
                  });

                  const resolvedAttr = await new Promise((resolve, reject) => {
                    db.get(`SELECT id FROM attributes WHERE name = ?`, [key], (err, row) => {
                      if (err) reject(err);
                      else resolve(row);
                    });
                  });

                  const actualAttrId = resolvedAttr ? resolvedAttr.id : attrId;

                  await new Promise((resolve, reject) => {
                    db.run(
                      `INSERT INTO product_attributes (variant_id, attribute_id, value)
                       VALUES (?, ?, ?)`,
                      [variantId, actualAttrId, String(val)],
                      (err) => {
                        if (err) reject(err);
                        else resolve();
                      }
                    );
                  });
                } catch (attrErr) {
                  errorOccurred = true;
                  db.run("ROLLBACK");
                  res.status(500).json({ error: 'Attribute processing failed: ' + attrErr.message });
                  break;
                }
              }

              if (errorOccurred) return;
            }

            db.run("COMMIT", (err) => {
              if (err) {
                db.run("ROLLBACK");
                return res.status(500).json({ error: 'Commit failed: ' + err.message });
              }
              res.status(201).json({
                success: true,
                productId,
                variantId,
                sku
              });
            });
          }
        );
      }
    );
  });
});

// GET all products with details (Categories, Variants, Attributes, and Bulk Pricing Rules)
app.get('/api/v1/products', async (req, res) => {
  try {
    const products = await query(`
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
    `);

    // Fetch details for each product
    const enhancedProducts = await Promise.all(products.map(async (prod) => {
      const variants = await query(`
        SELECT * FROM product_variants WHERE product_id = ?
      `, [prod.id]);

      const variantsWithDetails = await Promise.all(variants.map(async (v) => {
        // Get variant attributes
        const attributes = await query(`
          SELECT a.name, a.display_name, pa.value 
          FROM product_attributes pa
          JOIN attributes a ON pa.attribute_id = a.id
          WHERE pa.variant_id = ?
        `, [v.id]);

        // Get bulk pricing rules
        const bulkRules = await query(`
          SELECT min_quantity, unit_price 
          FROM bulk_pricing_rules 
          WHERE variant_id = ?
          ORDER BY min_quantity ASC
        `, [v.id]);

        return {
          ...v,
          attributes,
          bulk_pricing_rules: bulkRules
        };
      }));

      return {
        ...prod,
        variants: variantsWithDetails
      };
    }));

    res.json(enhancedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch catalog products' });
  }
});

// GET shipping zones listing (for frontend dropdown selectors)
app.get('/api/v1/shipping/zones', async (req, res) => {
  try {
    const zones = await query(`
      SELECT DISTINCT state, city FROM shipping_zones
      ORDER BY state, city
    `);
    res.json(zones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch shipping zones' });
  }
});

// POST calculate shipping rates, estimate delivery window, and recommend transport type
app.post('/api/v1/shipping/calculate', async (req, res) => {
  try {
    const { items, state, city } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid items array' });
    }
    if (!state || !city) {
      return res.status(400).json({ error: 'Destination state and city are required' });
    }

    let totalWeight = 0;
    let totalVolume = 0;
    let totalItemsCount = 0;

    // Fetch details of items from Database
    const resolvedItems = await Promise.all(items.map(async (item) => {
      const variant = await getOne(`
        SELECT v.*, p.name as product_name 
        FROM product_variants v
        JOIN products p ON v.product_id = p.id
        WHERE v.id = ?
      `, [item.variantId]);

      if (!variant) {
        throw new Error(`Variant ID ${item.variantId} not found`);
      }

      // Calculate applied pricing based on bulk quantity rules
      const bulkRules = await query(`
        SELECT * FROM bulk_pricing_rules 
        WHERE variant_id = ? AND min_quantity <= ?
        ORDER BY min_quantity DESC LIMIT 1
      `, [item.variantId, item.quantity]);

      const unitPrice = bulkRules.length > 0 ? bulkRules[0].unit_price : variant.price_markup;
      const subtotal = unitPrice * item.quantity;

      totalWeight += (variant.weight_kg || 0) * item.quantity;
      totalVolume += (variant.volume_m3 || 0) * item.quantity;
      totalItemsCount += item.quantity;

      return {
        variantId: item.variantId,
        productName: variant.product_name,
        sku: variant.sku,
        quantity: item.quantity,
        unitPrice,
        subtotal,
        weight_kg: variant.weight_kg,
        volume_m3: variant.volume_m3
      };
    }));

    // Determine the recommended transport type
    // Guidelines:
    // - Weight > 250kg OR Volume > 1.5m3 -> Requires flatbed or crane lift
    // - Weight > 1000kg OR items require mechanical offloading (e.g. heavy timber batches) -> Crane lift
    // - Otherwise -> Standard parcel delivery
    let transportType = 'parcel';
    if (totalWeight > 1000 || totalVolume > 3.0) {
      transportType = 'crane_lift';
    } else if (totalWeight > 200 || totalVolume > 1.0) {
      transportType = 'flatbed';
    }

    // Query rate matrix for this region and transport type
    let zoneRate = await getOne(`
      SELECT * FROM shipping_zones 
      WHERE state = ? AND city = ? AND transport_type = ?
    `, [state, city, transportType]);

    // Fallback if the specific transport mode doesn't exist for the city, search for any match
    if (!zoneRate) {
      zoneRate = await getOne(`
        SELECT * FROM shipping_zones 
        WHERE state = ? AND city = ?
        ORDER BY base_rate DESC LIMIT 1
      `, [state, city]);
    }

    if (!zoneRate) {
      return res.status(404).json({ 
        error: `Delivery service is currently unavailable to ${city}, ${state}. Please contact support.` 
      });
    }

    // Shipping calculation formula: Base rate + (weight_kg * per_kg_rate)
    const baseRate = zoneRate.base_rate;
    const weightRate = totalWeight * zoneRate.per_kg_rate;
    const shippingFee = baseRate + weightRate;

    // Build the dynamic transparency log tracking timeline
    const etaDaysMin = transportType === 'parcel' ? 1 : transportType === 'flatbed' ? 2 : 3;
    const etaDaysMax = etaDaysMin + 2;

    const transparencyTimeline = [
      { step: 1, title: 'Order Confirmed', description: 'Material reserve locked in inventory.', completed: true },
      { step: 2, title: 'Fulfillment & Packing', description: `Securing item load (${totalWeight.toFixed(1)} kg, ${totalVolume.toFixed(2)} m³).`, completed: false },
      { step: 3, title: 'Freight Dispatch', description: `Dispatched via ${transportType.toUpperCase()} transit.`, completed: false },
      { step: 4, title: 'Site Delivery & Handover', description: `Delivery at ${city}, ${state} with verified offload signature.`, completed: false }
    ];

    res.json({
      destination: { state, city },
      metrics: {
        totalWeightKg: totalWeight,
        totalVolumeM3: totalVolume,
        totalItemsCount
      },
      transport: {
        type: transportType,
        displayName: transportType === 'parcel' ? 'Standard Delivery' : transportType === 'flatbed' ? 'Flatbed Cargo Truck' : 'Crane Lift Offloader',
        description: transportType === 'parcel' 
          ? 'Fast handling suitable for lightweight interior finishings.' 
          : transportType === 'flatbed' 
          ? 'Heavy transport requiring roadside space for manual unloading.' 
          : 'High capacity mechanical offloading for timber batches or large structures.'
      },
      calculation: {
        baseRate,
        weightRate,
        totalFee: Number(shippingFee.toFixed(2))
      },
      eta: {
        minDays: etaDaysMin,
        maxDays: etaDaysMax,
        displayString: `${etaDaysMin}-${etaDaysMax} Business Days`
      },
      transparencyTimeline,
      items: resolvedItems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Error executing shipping rates calculation' });
  }
});

// GET all project boards and items
app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await query(`SELECT * FROM project_boards ORDER BY created_at DESC`);
    const enhancedProjects = await Promise.all(projects.map(async (project) => {
      const items = await query(`
        SELECT pbi.quantity, pv.id as variantId, pv.sku, pv.price_markup as price, p.name, p.image_url as imageUrl 
        FROM project_board_items pbi
        JOIN product_variants pv ON pbi.variant_id = pv.id
        JOIN products p ON pv.product_id = p.id
        WHERE pbi.project_board_id = ?
      `, [project.id]);
      return { ...project, items };
    }));
    res.json(enhancedProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch project boards' });
  }
});

// POST create a project board
app.post('/api/v1/projects', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Project board name is required' });
    const id = 'proj_' + Math.random().toString(36).substr(2, 9);
    
    db.run(`INSERT INTO project_boards (id, name) VALUES (?, ?)`, [id, name], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, name });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project board' });
  }
});

// POST add/update item in project board
app.post('/api/v1/projects/items', async (req, res) => {
  try {
    const { project_board_id, variant_id, quantity } = req.body;
    if (!project_board_id || !variant_id || quantity === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    db.run(
      `INSERT INTO project_board_items (project_board_id, variant_id, quantity)
       VALUES (?, ?, ?)
       ON CONFLICT(project_board_id, variant_id) DO UPDATE SET quantity = quantity + EXCLUDED.quantity`,
      [project_board_id, variant_id, Number(quantity)],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project board items' });
  }
});

// DELETE a project board
app.delete('/api/v1/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    db.run(`DELETE FROM project_boards WHERE id = ?`, [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project board' });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`HC Group API running on http://localhost:${PORT}`);
  });
}

export default app;
