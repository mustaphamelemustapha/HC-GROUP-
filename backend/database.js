import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDbDir = path.join(__dirname, 'database');
const parentDbDir = path.join(__dirname, '../database');
const defaultDbDir = fs.existsSync(localDbDir) ? localDbDir : parentDbDir;
const DB_DIR = process.env.DB_INIT_DIR || defaultDbDir;
const DB_PATH = process.env.DB_PATH || path.join(DB_DIR, 'market.db');
const DB_STORAGE_DIR = path.dirname(DB_PATH);

if (!fs.existsSync(DB_STORAGE_DIR)) {
  fs.mkdirSync(DB_STORAGE_DIR, { recursive: true });
}

// If DB_PATH points to a persistent volume (e.g. in Coolify / Docker) and does not exist yet,
// automatically copy the pre-seeded bundled database so existing products/categories are preserved.
const bundledDbPath = path.join(DB_DIR, 'market.db');
if (!fs.existsSync(DB_PATH) && fs.existsSync(bundledDbPath) && DB_PATH !== bundledDbPath) {
  try {
    fs.copyFileSync(bundledDbPath, DB_PATH);
    console.log(`Pre-seeded database successfully copied to persistent volume: ${DB_PATH}`);
  } catch (copyErr) {
    console.warn(`Could not copy bundled DB to ${DB_PATH}:`, copyErr.message);
  }
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', DB_PATH);
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Check if table exists
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='categories'", (err, table) => {
      if (err) {
        console.error('Error checking schema:', err.message);
        return;
      }
      if (!table) {
        console.log('Database empty. Running schema and seeding...');
        try {
          const schemaSql = fs.readFileSync(path.join(DB_DIR, 'schema.sql'), 'utf8');
          const seedSql = fs.readFileSync(path.join(DB_DIR, 'seed.sql'), 'utf8');
          
          db.exec(schemaSql, (err) => {
            if (err) {
              console.error('Schema initialization failed:', err.message);
            } else {
              console.log('Schema initialized successfully.');
              db.exec(seedSql, (err) => {
                if (err) {
                  console.error('Seeding database failed:', err.message);
                } else {
                  console.log('Database seeded successfully.');
                }
              });
            }
          });
        } catch (e) {
          console.error('Failed to read SQL init files:', e.message);
        }
      } else {
        console.log('Database tables already exist. Ensuring schema & shipping zones are current...');
        // Ensure inquiries table exists
        db.run(`CREATE TABLE IF NOT EXISTS inquiries (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          project_type TEXT,
          scope TEXT,
          budget TEXT,
          location TEXT,
          message TEXT,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Auto-migrate prices to full realistic luxury Naira scale if previously seeded with unscaled values
        db.run(`UPDATE product_variants SET price_markup = price_markup * 1000 WHERE price_markup < 10000 AND id IN ('var_wardrobe_walnut', 'var_wardrobe_oak', 'var_bathtub_std', 'var_marble_slab_60', 'var_panel_walnut', 'var_door_pivot_std', 'var_door_french_std', 'var_door_sliding_std', 'var_door_classic_std', 'var_door_flush_std', 'var_door_glass_std')`);

        // Check if Maiduguri Borno zones are present
        db.get("SELECT count(*) as count FROM shipping_zones WHERE city = 'Maiduguri (GRA)'", (err, row) => {
          if (!row || row.count === 0) {
            console.log('Seeding Maiduguri, Borno and Nigerian shipping zones...');
            try {
              const seedSql = fs.readFileSync(path.join(DB_DIR, 'seed.sql'), 'utf8');
              const zonesInsertIdx = seedSql.indexOf('INSERT INTO shipping_zones');
              if (zonesInsertIdx !== -1) {
                const zonesSql = seedSql.substring(zonesInsertIdx);
                db.run("DELETE FROM shipping_zones", () => {
                  db.exec(zonesSql, (err) => {
                    if (err) console.error('Zone update error:', err);
                    else console.log('Maiduguri & Nigerian shipping zones loaded successfully.');
                  });
                });
              }
            } catch (e) {
              console.error('Failed reading seed.sql for zone update:', e.message);
            }
          }
        });

        // Ensure HC Luxury Carpets & Rugs category and products exist
        db.get("SELECT count(*) as count FROM products WHERE category_id = 'cat_carpets'", (err, row) => {
          if (!row || row.count < 8) {
            console.log('Seeding HC Architectural Luxury Carpets & Rugs line...');
            try {
              const seedSql = fs.readFileSync(path.join(DB_DIR, 'seed.sql'), 'utf8');
              const carpetsIdx = seedSql.indexOf('-- 1b. Luxury Architectural Carpets');
              if (carpetsIdx !== -1) {
                const carpetsSql = seedSql.substring(carpetsIdx);
                db.exec(carpetsSql, (err) => {
                  if (err) console.error('Carpet seeding error:', err);
                  else console.log('HC Luxury Carpets portfolio loaded successfully into database.');
                });
              }
            } catch (e) {
              console.error('Failed reading seed.sql for carpets:', e.message);
            }
          }
        });
      }
    });
  });
}

// Promisified query helper methods
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export default db;
