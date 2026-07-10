import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, '../database');
const DB_PATH = process.env.DB_PATH || path.join(DB_DIR, 'market.db');
const DB_STORAGE_DIR = path.dirname(DB_PATH);

if (!fs.existsSync(DB_STORAGE_DIR)) {
  fs.mkdirSync(DB_STORAGE_DIR, { recursive: true });
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
        console.log('Database tables already exist. Skipping seed.');
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
