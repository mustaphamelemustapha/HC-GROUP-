-- Database schema for HC Group

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_id TEXT,
    FOREIGN KEY(parent_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    sku_prefix TEXT,
    category_id TEXT,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    price_markup REAL DEFAULT 0.0,
    stock_quantity INTEGER DEFAULT 0,
    weight_kg REAL DEFAULT 0.0,
    volume_m3 REAL DEFAULT 0.0,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attributes (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    data_type TEXT NOT NULL -- 'string', 'number', 'boolean'
);

CREATE TABLE IF NOT EXISTS product_attributes (
    variant_id TEXT NOT NULL,
    attribute_id TEXT NOT NULL,
    value TEXT NOT NULL,
    PRIMARY KEY(variant_id, attribute_id),
    FOREIGN KEY(variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    FOREIGN KEY(attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bulk_pricing_rules (
    id TEXT PRIMARY KEY,
    variant_id TEXT NOT NULL,
    min_quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    FOREIGN KEY(variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shipping_zones (
    id TEXT PRIMARY KEY,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    base_rate REAL NOT NULL,
    per_kg_rate REAL NOT NULL,
    transport_type TEXT NOT NULL -- 'parcel', 'flatbed', 'crane_lift'
);

CREATE TABLE IF NOT EXISTS project_boards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_board_items (
    project_board_id TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    PRIMARY KEY(project_board_id, variant_id),
    FOREIGN KEY(project_board_id) REFERENCES project_boards(id) ON DELETE CASCADE,
    FOREIGN KEY(variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
);
