-- Seed data for HC Group Project Sourcing

-- 1. Categories (Industrial Project Classes)
INSERT INTO categories (id, name, slug, parent_id) VALUES
('cat_whole_house', 'Whole-House Customization', 'whole-house-customization', NULL),
('cat_sanitary', 'Sanitary Ware', 'sanitary-ware', NULL),
('cat_flooring', 'Flooring & Staircase', 'flooring-staircase', NULL),
('cat_kitchen', 'Kitchen & Wardrobe', 'kitchen-wardrobe', NULL),
('cat_doors', 'Luxury Doors & Entries', 'luxury-doors-entries', NULL);

-- 2. Products
INSERT INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_wardrobe', 'Minimalist Custom Wardrobe System', 'Bespoke floor-to-ceiling wardrobe with modular cabinetry configurations.', 'WH-WARD', 'cat_kitchen', '/assets/products/interior_1.jpeg', 1),
('prod_bathtub', 'Freestanding Solid Stone Bathtub', 'Polished matte white composite resin stone bathtub for premium bathrooms.', 'SW-BATHT', 'cat_sanitary', '/assets/products/interior_2.jpeg', 1),
('prod_marble_floor', 'Carrara Marble Flooring Slabs', 'Premium grade polished Carrara marble tiles, batch matched.', 'FS-MARB', 'cat_flooring', '/assets/products/interior_3.jpeg', 1),
('prod_lounge_panel', 'Acoustic Wood Wall Panels', 'Seamless walnut wood cladding for luxury living room customisation.', 'WH-WOOD', 'cat_whole_house', '/assets/products/interior_4.jpeg', 1),
('prod_door_pivot', 'Grande Pivot Entrance Door', 'Premium hardwood pivot door with textured copper cladding and high-security smart locking.', 'DR-PVT', 'cat_doors', '/assets/products/door_1.jpeg', 1),
('prod_door_french', 'Aurelia Steel French Doors', 'Slim profile architectural steel frame double glass doors with matte black finish.', 'DR-FRN', 'cat_doors', '/assets/products/door_2.jpeg', 1),
('prod_door_sliding', 'Minimalist Sliding Glass Door', 'Premium pocket sliding glass door with soft-close hidden tracks.', 'DR-SLD', 'cat_doors', '/assets/products/door_3.jpeg', 1),
('prod_door_classic', 'Imperial Carved Oak Door', 'Traditional solid European oak entry door with intricate hand-carved detailing and gold trim.', 'DR-OAK', 'cat_doors', '/assets/products/door_4.jpeg', 1),
('prod_door_flush', 'Flush Invisible Interior Door', 'Concealed aluminum frame wall-integrated interior doors with paintable surfaces.', 'DR-FLS', 'cat_doors', '/assets/products/door_5.jpeg', 1),
('prod_door_glass', 'Frosted Glass Privacy Door', 'Tempered frosted glass door with premium brushed gold hinges and lockset.', 'DR-GLS', 'cat_doors', '/assets/products/door_6.jpeg', 1);

-- 3. Attributes
INSERT INTO attributes (id, name, display_name, data_type) VALUES
('attr_material', 'material', 'Material Composition', 'string'),
('attr_dimensions', 'dimensions', 'Dimensions (CAD Blueprint)', 'string'),
('attr_load', 'load_capacity', 'Weight Load Limit', 'string'),
('attr_finish', 'finish', 'Surface Finish', 'string'),
('attr_flammability', 'flammability', 'Fire Safety Grade', 'string');

-- 4. Product Variants
-- Wardrobe Variants
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_wardrobe_walnut', 'prod_wardrobe', 'WH-WARD-WLN', 4200.00, 20, 240.0, 4.8),
('var_wardrobe_oak', 'prod_wardrobe', 'WH-WARD-OAK', 3800.00, 15, 220.0, 4.5);

-- Bathtub Variants
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_bathtub_std', 'prod_bathtub', 'SW-BATHT-STD', 1850.00, 8, 140.0, 1.2);

-- Marble Flooring Slabs
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_marble_slab_60', 'prod_marble_floor', 'FS-MARB-SLB60', 110.00, 800, 30.0, 0.08);

-- Wood Wall Panels
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_panel_walnut', 'prod_lounge_panel', 'WH-WOOD-WAL', 65.00, 1200, 12.0, 0.04);

-- Door Variants
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_door_pivot_std', 'prod_door_pivot', 'DR-PVT-STD', 3200.00, 10, 180.0, 1.5),
('var_door_french_std', 'prod_door_french', 'DR-FRN-STD', 2450.00, 12, 110.0, 0.9),
('var_door_sliding_std', 'prod_door_sliding', 'DR-SLD-STD', 1800.00, 14, 95.0, 0.7),
('var_door_classic_std', 'prod_door_classic', 'DR-OAK-STD', 2850.00, 8, 130.0, 1.1),
('var_door_flush_std', 'prod_door_flush', 'DR-FLS-STD', 950.00, 25, 45.0, 0.3),
('var_door_glass_std', 'prod_door_glass', 'DR-GLS-STD', 1150.00, 18, 60.0, 0.4);

-- 5. Product Variant Attributes (Technical Specifications / Blueprint Data EAV Mapping)
INSERT INTO product_attributes (variant_id, attribute_id, value) VALUES
-- Wardrobe Walnut
('var_wardrobe_walnut', 'attr_material', 'Solid American Walnut & MDF Core'),
('var_wardrobe_walnut', 'attr_dimensions', '3200mm (H) x 2400mm (W) x 650mm (D)'),
('var_wardrobe_walnut', 'attr_load', '450kg (Total Shelving Capacity)'),
('var_wardrobe_walnut', 'attr_finish', 'Matte Lacquered walnut veneer'),
('var_wardrobe_walnut', 'attr_flammability', 'Class B1 (S1-d0)'),

-- Wardrobe Oak
('var_wardrobe_oak', 'attr_material', 'Solid European White Oak & MDF Core'),
('var_wardrobe_oak', 'attr_dimensions', '3200mm (H) x 2400mm (W) x 650mm (D)'),
('var_wardrobe_oak', 'attr_load', '450kg (Total Shelving Capacity)'),
('var_wardrobe_oak', 'attr_finish', 'Natural brushed oil veneer'),
('var_wardrobe_oak', 'attr_flammability', 'Class B1 (S1-d0)'),

-- Bathtub
('var_bathtub_std', 'attr_material', 'Solid Resin Composite Stone'),
('var_bathtub_std', 'attr_dimensions', '1700mm (L) x 800mm (W) x 600mm (H)'),
('var_bathtub_std', 'attr_load', '500kg (Water Capacity Weight Limit)'),
('var_bathtub_std', 'attr_finish', 'Matte White Polish'),

-- Marble Slab
('var_marble_slab_60', 'attr_material', '100% Authentic Carrara Marble'),
('var_marble_slab_60', 'attr_dimensions', '600mm x 600mm x 20mm Thickness'),
('var_marble_slab_60', 'attr_load', 'Compressive Strength: 115 MPa'),
('var_marble_slab_60', 'attr_finish', 'Polished Mirror Gloss'),

-- Wood Panel
('var_panel_walnut', 'attr_material', 'Natural Walnut Slats & Acoustic Felt backing'),
('var_panel_walnut', 'attr_dimensions', '2400mm (H) x 600mm (W) x 21mm (D)'),
('var_panel_walnut', 'attr_finish', 'Matte Satin Varnish'),
('var_panel_walnut', 'attr_flammability', 'Class B2'),

-- Pivot Door
('var_door_pivot_std', 'attr_material', 'Solid Walnut & Textured Copper cladding'),
('var_door_pivot_std', 'attr_dimensions', '2600mm (H) x 1500mm (W) x 100mm (D)'),
('var_door_pivot_std', 'attr_load', 'Max Pivot Weight Capacity: 300kg'),
('var_door_pivot_std', 'attr_finish', 'Oxidized Matte Copper & Oil Rubbed Walnut'),

-- French Door
('var_door_french_std', 'attr_material', 'Carbon Steel Frame & Double Tempered Glass'),
('var_door_french_std', 'attr_dimensions', '2400mm (H) x 1800mm (W) x 50mm (D)'),
('var_door_french_std', 'attr_finish', 'Matte Black Powder Coat'),

-- Sliding Door
('var_door_sliding_std', 'attr_material', 'Extruded Aluminum & Clear Low-E Glass'),
('var_door_sliding_std', 'attr_dimensions', '2200mm (H) x 2000mm (W) x 45mm (D)'),
('var_door_sliding_std', 'attr_finish', 'Anodized Charcoal Gray'),

-- Classic Door
('var_door_classic_std', 'attr_material', 'Solid Slavonian Oak'),
('var_door_classic_std', 'attr_dimensions', '2100mm (H) x 900mm (W) x 60mm (D)'),
('var_door_classic_std', 'attr_finish', 'Hand-rubbed Dark Walnut stain & gold leaf accenting'),

-- Flush Door
('var_door_flush_std', 'attr_material', 'Honeycomb Wood Core & Concealed Aluminum frame'),
('var_door_flush_std', 'attr_dimensions', '2100mm (H) x 800mm (W) x 40mm (D)'),
('var_door_flush_std', 'attr_finish', 'Primed for paint-to-match walls'),

-- Glass Door
('var_door_glass_std', 'attr_material', 'Acid-etched Tempered Glass'),
('var_door_glass_std', 'attr_dimensions', '2100mm (H) x 800mm (W) x 10mm (D)'),
('var_door_glass_std', 'attr_finish', 'Translucent Frosted Satin');

-- 6. Bulk pricing for materials (e.g. marble slabs buy > 100, price drops to 95)
INSERT INTO bulk_pricing_rules (id, variant_id, min_quantity, unit_price) VALUES
('bulk_marble_100', 'var_marble_slab_60', 100, 95.00),
('bulk_marble_300', 'var_marble_slab_60', 300, 85.00),
('bulk_panel_200', 'var_panel_walnut', 200, 58.00),
('bulk_door_flush_10', 'var_door_flush_std', 10, 850.00),
('bulk_door_glass_10', 'var_door_glass_std', 10, 1020.00);

-- 7. Shipping Rates
INSERT INTO shipping_zones (id, state, city, base_rate, per_kg_rate, transport_type) VALUES
('sz_lagos_ikoyi_p', 'Lagos', 'Ikoyi', 15.00, 0.50, 'parcel'),
('sz_lagos_ikoyi_f', 'Lagos', 'Ikoyi', 120.00, 2.00, 'flatbed'),
('sz_lagos_ikoyi_c', 'Lagos', 'Ikoyi', 300.00, 4.00, 'crane_lift'),

('sz_lagos_ikeja_p', 'Lagos', 'Ikeja', 25.00, 0.80, 'parcel'),
('sz_lagos_ikeja_f', 'Lagos', 'Ikeja', 150.00, 2.50, 'flatbed'),
('sz_lagos_ikeja_c', 'Lagos', 'Ikeja', 350.00, 5.00, 'crane_lift'),

('sz_abuja_wuse_p', 'Abuja', 'Wuse', 35.00, 1.20, 'parcel'),
('sz_abuja_wuse_f', 'Abuja', 'Wuse', 250.00, 4.00, 'flatbed'),
('sz_abuja_wuse_c', 'Abuja', 'Wuse', 500.00, 8.00, 'crane_lift');
