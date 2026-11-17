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

-- 4. Product Variants (Realistic Nigerian Luxury Sourcing Prices in ₦)
-- Wardrobe Variants
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_wardrobe_walnut', 'prod_wardrobe', 'WH-WARD-WLN', 4200000.00, 20, 240.0, 4.8),
('var_wardrobe_oak', 'prod_wardrobe', 'WH-WARD-OAK', 3800000.00, 15, 220.0, 4.5);

-- Bathtub Variants
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_bathtub_std', 'prod_bathtub', 'SW-BATHT-STD', 1850000.00, 8, 140.0, 1.2);

-- Marble Flooring Slabs (per m² or batch)
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_marble_slab_60', 'prod_marble_floor', 'FS-MARB-SLB60', 110000.00, 800, 30.0, 0.08);

-- Wood Wall Panels (per acoustic slat panel)
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_panel_walnut', 'prod_lounge_panel', 'WH-WOOD-WAL', 65000.00, 1200, 12.0, 0.04);

-- Door Variants
INSERT INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_door_pivot_std', 'prod_door_pivot', 'DR-PVT-STD', 3200000.00, 10, 180.0, 1.5),
('var_door_french_std', 'prod_door_french', 'DR-FRN-STD', 2450000.00, 12, 110.0, 0.9),
('var_door_sliding_std', 'prod_door_sliding', 'DR-SLD-STD', 1800000.00, 14, 95.0, 0.7),
('var_door_classic_std', 'prod_door_classic', 'DR-OAK-STD', 2850000.00, 8, 130.0, 1.1),
('var_door_flush_std', 'prod_door_flush', 'DR-FLS-STD', 950000.00, 25, 45.0, 0.3),
('var_door_glass_std', 'prod_door_glass', 'DR-GLS-STD', 1150000.00, 18, 60.0, 0.4);

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

-- 6. Bulk pricing for materials (in ₦)
INSERT INTO bulk_pricing_rules (id, variant_id, min_quantity, unit_price) VALUES
('bulk_marble_100', 'var_marble_slab_60', 100, 95000.00),
('bulk_marble_300', 'var_marble_slab_60', 300, 85000.00),
('bulk_panel_200', 'var_panel_walnut', 200, 58000.00),
('bulk_door_flush_10', 'var_door_flush_std', 10, 850000.00),
('bulk_door_glass_10', 'var_door_glass_std', 10, 1020000.00);

-- 7. Shipping Rates (Maiduguri, Borno State as Primary Headquarters)
INSERT INTO shipping_zones (id, state, city, base_rate, per_kg_rate, transport_type) VALUES
-- Borno Hubs (Primary Headquarters & Regional Operations)
('sz_borno_gra_p', 'Borno', 'Maiduguri (GRA)', 12000.00, 120.00, 'parcel'),
('sz_borno_gra_f', 'Borno', 'Maiduguri (GRA)', 80000.00, 300.00, 'flatbed'),
('sz_borno_gra_c', 'Borno', 'Maiduguri (GRA)', 220000.00, 550.00, 'crane_lift'),

('sz_borno_central_p', 'Borno', 'Maiduguri Central (Sir Kashim Ibrahim Way)', 12000.00, 120.00, 'parcel'),
('sz_borno_central_f', 'Borno', 'Maiduguri Central (Sir Kashim Ibrahim Way)', 80000.00, 300.00, 'flatbed'),
('sz_borno_central_c', 'Borno', 'Maiduguri Central (Sir Kashim Ibrahim Way)', 220000.00, 550.00, 'crane_lift'),

('sz_borno_unimaid_p', 'Borno', 'Maiduguri (Bama Road / University)', 15000.00, 140.00, 'parcel'),
('sz_borno_unimaid_f', 'Borno', 'Maiduguri (Bama Road / University)', 85000.00, 320.00, 'flatbed'),
('sz_borno_unimaid_c', 'Borno', 'Maiduguri (Bama Road / University)', 230000.00, 580.00, 'crane_lift'),

-- Lagos Hubs
('sz_lagos_lekki_p', 'Lagos', 'Lekki Phase 1', 15000.00, 150.00, 'parcel'),
('sz_lagos_lekki_f', 'Lagos', 'Lekki Phase 1', 95000.00, 350.00, 'flatbed'),
('sz_lagos_lekki_c', 'Lagos', 'Lekki Phase 1', 250000.00, 600.00, 'crane_lift'),

('sz_lagos_ikoyi_p', 'Lagos', 'Ikoyi', 18000.00, 150.00, 'parcel'),
('sz_lagos_ikoyi_f', 'Lagos', 'Ikoyi', 110000.00, 350.00, 'flatbed'),
('sz_lagos_ikoyi_c', 'Lagos', 'Ikoyi', 280000.00, 650.00, 'crane_lift'),

('sz_lagos_vi_p', 'Lagos', 'Victoria Island', 18000.00, 150.00, 'parcel'),
('sz_lagos_vi_f', 'Lagos', 'Victoria Island', 110000.00, 350.00, 'flatbed'),
('sz_lagos_vi_c', 'Lagos', 'Victoria Island', 280000.00, 650.00, 'crane_lift'),

('sz_lagos_ikeja_p', 'Lagos', 'Ikeja GRA', 22000.00, 200.00, 'parcel'),
('sz_lagos_ikeja_f', 'Lagos', 'Ikeja GRA', 130000.00, 400.00, 'flatbed'),
('sz_lagos_ikeja_c', 'Lagos', 'Ikeja GRA', 320000.00, 700.00, 'crane_lift'),

-- Abuja Hubs
('sz_abuja_maitama_p', 'Abuja', 'Maitama', 25000.00, 250.00, 'parcel'),
('sz_abuja_maitama_f', 'Abuja', 'Maitama', 180000.00, 500.00, 'flatbed'),
('sz_abuja_maitama_c', 'Abuja', 'Maitama', 380000.00, 850.00, 'crane_lift'),

('sz_abuja_wuse_p', 'Abuja', 'Wuse 2', 25000.00, 250.00, 'parcel'),
('sz_abuja_wuse_f', 'Abuja', 'Wuse 2', 180000.00, 500.00, 'flatbed'),
('sz_abuja_wuse_c', 'Abuja', 'Wuse 2', 380000.00, 850.00, 'crane_lift'),

('sz_abuja_asokoro_p', 'Abuja', 'Asokoro', 25000.00, 250.00, 'parcel'),
('sz_abuja_asokoro_f', 'Abuja', 'Asokoro', 180000.00, 500.00, 'flatbed'),
('sz_abuja_asokoro_c', 'Abuja', 'Asokoro', 380000.00, 850.00, 'crane_lift'),

-- Regional Commercial Hubs
('sz_rivers_ph_p', 'Rivers', 'Port Harcourt', 35000.00, 300.00, 'parcel'),
('sz_rivers_ph_f', 'Rivers', 'Port Harcourt', 250000.00, 650.00, 'flatbed'),
('sz_rivers_ph_c', 'Rivers', 'Port Harcourt', 480000.00, 1100.00, 'crane_lift'),

('sz_kano_central_p', 'Kano', 'Kano Central', 40000.00, 350.00, 'parcel'),
('sz_kano_central_f', 'Kano', 'Kano Central', 280000.00, 700.00, 'flatbed'),
('sz_kano_central_c', 'Kano', 'Kano Central', 520000.00, 1200.00, 'crane_lift');


-- 1b. Luxury Architectural Carpets & Rugs Category
INSERT OR IGNORE INTO categories (id, name, slug, parent_id) VALUES
('cat_carpets', 'Luxury Carpets & Rugs', 'luxury-carpets-rugs', NULL);

-- 2b. Carpet Products
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_carpet_isfahan', 'Royal Isfahan Hand-Knotted Silk & Wool Rug', 'Masterwork Persian-style rug woven with 100% New Zealand highland wool and pure mulberry silk highlights. Features an exquisite central floral medallion surrounded by intricate vine scrolls and arabesques.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_1.jpeg', 1),
('prod_carpet_kashan', 'Imperial Kashan Medallion Wool Carpet', 'Grand classical medallion rug featuring rich gold, ivory, and sapphire navy pigments. Hand-spun wool with double-weft knotting for exceptional structural durability in executive residences.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_2.jpeg', 1),
('prod_carpet_tabriz', 'Tabriz Mahi Heritage Silk & Gold Weft Rug', 'Celebrated Tabriz fish (Mahi) motif rug woven with high-twist silk threads and metallic gold-lurex accent borders. Engineered for grand entryways, boardrooms, and presidential salons.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_3.jpeg', 1),
('prod_carpet_abstract', 'Aura Minimalist Abstract Architectural Carpet', 'Modernist textured low-pile carpet crafted for contemporary open-plan villas. Seamless ombre transitions of platinum grey, muted sand, and deep navy with carved high-low relief.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_4.jpeg', 1),
('prod_carpet_heriz', 'Heriz Geometric Royal Palace Carpet', 'Bold rectilinear medallion rug featuring monumental geometric geometry in warm terracotta, deep indigo, and burnished gold. Exceptionally robust mountain wool pile.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_5.jpeg', 1),
('prod_carpet_oushak', 'Anatolian Oushak Soft-Tone Living Rug', 'Subtle Turkish Oushak styling characterized by soft pastel earth tones, large-scale botanical palmettes, and an ultra-plush velvety foot feel for master bedroom suites.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_6.jpeg', 1),
('prod_carpet_qom', 'Qom Pure Mulberry Silk Masterpiece', 'Pinnacle of luxury weaving: 100% pure silk warp, weft, and pile boasting 1.6 million knots per square meter. Features luminous floral arabesques with museum-grade precision.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_8.jpeg', 1),
('prod_carpet_nain', 'Nain Habibian Arabesque Silk & Wool Rug', 'Prestigious Nain 6-La weave rug rendered in cream ivory, navy sapphire, and sky blue with pure silk outlining around every individual blossom and intertwining vine.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_10.jpeg', 1);

-- 4b. Carpet Product Variants (Naira ₦)
INSERT OR REPLACE INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
('var_carpet_isfahan_3x2', 'prod_carpet_isfahan', 'HC-CRPT-ISF-3020', 1850000.00, 15, 22.0, 0.18),
('var_carpet_isfahan_4x3', 'prod_carpet_isfahan', 'HC-CRPT-ISF-4030', 3400000.00, 8, 44.0, 0.35),
('var_carpet_kashan_3x2', 'prod_carpet_kashan', 'HC-CRPT-KSH-3020', 1450000.00, 20, 25.0, 0.20),
('var_carpet_kashan_4x3', 'prod_carpet_kashan', 'HC-CRPT-KSH-4030', 2650000.00, 10, 48.0, 0.38),
('var_carpet_tabriz_3x2', 'prod_carpet_tabriz', 'HC-CRPT-TAB-3222', 2200000.00, 12, 20.0, 0.16),
('var_carpet_abstract_3x2', 'prod_carpet_abstract', 'HC-CRPT-ABS-3020', 980000.00, 25, 18.0, 0.15),
('var_carpet_abstract_4x3', 'prod_carpet_abstract', 'HC-CRPT-ABS-4030', 1850000.00, 14, 35.0, 0.30),
('var_carpet_heriz_4x3', 'prod_carpet_heriz', 'HC-CRPT-HRZ-4030', 2650000.00, 9, 52.0, 0.42),
('var_carpet_oushak_3x2', 'prod_carpet_oushak', 'HC-CRPT-OSH-3024', 1250000.00, 18, 26.0, 0.22),
('var_carpet_qom_2x15', 'prod_carpet_qom', 'HC-CRPT-QOM-2516', 3850000.00, 6, 14.0, 0.12),
('var_carpet_nain_3x2', 'prod_carpet_nain', 'HC-CRPT-NAI-3020', 2100000.00, 11, 21.0, 0.17);

-- 5b. Carpet Specifications (EAV Attributes)
INSERT OR REPLACE INTO product_attributes (variant_id, attribute_id, value) VALUES
('var_carpet_isfahan_3x2', 'attr_material', '80% New Zealand Highland Wool & 20% Pure Mulberry Silk'),
('var_carpet_isfahan_3x2', 'attr_dimensions', '3000mm (L) x 2000mm (W) x 12mm (Pile Depth)'),
('var_carpet_isfahan_3x2', 'attr_load', 'Ultra-High Traffic (1,200,000 Knots/m²)'),
('var_carpet_isfahan_3x2', 'attr_finish', 'Lustrous Silk Sheen with Hand-Bound Edge Fringe'),
('var_carpet_isfahan_3x2', 'attr_flammability', 'Class 1 (Naturally Flame Retardant Wool Core)'),
('var_carpet_isfahan_4x3', 'attr_material', '80% New Zealand Highland Wool & 20% Pure Mulberry Silk'),
('var_carpet_isfahan_4x3', 'attr_dimensions', '4000mm (L) x 3000mm (W) x 12mm (Pile Depth)'),
('var_carpet_isfahan_4x3', 'attr_load', 'Ultra-High Traffic (1,200,000 Knots/m²)'),
('var_carpet_isfahan_4x3', 'attr_finish', 'Lustrous Silk Sheen with Hand-Bound Edge Fringe'),
('var_carpet_isfahan_4x3', 'attr_flammability', 'Class 1 (Naturally Flame Retardant Wool Core)'),
('var_carpet_kashan_3x2', 'attr_material', '100% Hand-Spun Ghazni Wool with Cotton Warp'),
('var_carpet_kashan_3x2', 'attr_dimensions', '3000mm (L) x 2000mm (W) x 14mm (Pile Depth)'),
('var_carpet_kashan_3x2', 'attr_load', 'Heavy Contract Traffic (950,000 Knots/m²)'),
('var_carpet_kashan_3x2', 'attr_finish', 'Antique Patina Herbal Wash'),
('var_carpet_kashan_3x2', 'attr_flammability', 'Class B1 Fire Safe'),
('var_carpet_kashan_4x3', 'attr_material', '100% Hand-Spun Ghazni Wool with Cotton Warp'),
('var_carpet_kashan_4x3', 'attr_dimensions', '4000mm (L) x 3000mm (W) x 14mm (Pile Depth)'),
('var_carpet_kashan_4x3', 'attr_load', 'Heavy Contract Traffic (950,000 Knots/m²)'),
('var_carpet_kashan_4x3', 'attr_finish', 'Antique Patina Herbal Wash'),
('var_carpet_kashan_4x3', 'attr_flammability', 'Class B1 Fire Safe'),
('var_carpet_tabriz_3x2', 'attr_material', 'Hand-Knotted Silk on Fine Cotton Foundation'),
('var_carpet_tabriz_3x2', 'attr_dimensions', '3200mm (L) x 2200mm (W) x 10mm (Pile Depth)'),
('var_carpet_tabriz_3x2', 'attr_load', '1,400,000 Knots/m² Master Knotter Quality'),
('var_carpet_tabriz_3x2', 'attr_finish', 'Reflective Silk Glaze & Reinforced Selvedge'),
('var_carpet_tabriz_3x2', 'attr_flammability', 'Class 1 Non-Flammable'),
('var_carpet_abstract_3x2', 'attr_material', '70% Botanical Bamboo Silk, 30% Matte Wool'),
('var_carpet_abstract_3x2', 'attr_dimensions', '3000mm (L) x 2000mm (W) x 11mm (Variable Relief)'),
('var_carpet_abstract_3x2', 'attr_load', 'Medium-High Traffic Resilient'),
('var_carpet_abstract_3x2', 'attr_finish', 'Hand-Carved Multi-Level Loop & Cut Pile'),
('var_carpet_abstract_3x2', 'attr_flammability', 'Class B1 Commercial Fire Grade'),
('var_carpet_abstract_4x3', 'attr_material', '70% Botanical Bamboo Silk, 30% Matte Wool'),
('var_carpet_abstract_4x3', 'attr_dimensions', '4000mm (L) x 3000mm (W) x 11mm (Variable Relief)'),
('var_carpet_abstract_4x3', 'attr_load', 'Medium-High Traffic Resilient'),
('var_carpet_abstract_4x3', 'attr_finish', 'Hand-Carved Multi-Level Loop & Cut Pile'),
('var_carpet_abstract_4x3', 'attr_flammability', 'Class B1 Commercial Fire Grade'),
('var_carpet_heriz_4x3', 'attr_material', 'High-Lanolin Mountain Wool on Heavy Cotton Warp'),
('var_carpet_heriz_4x3', 'attr_dimensions', '4000mm (L) x 3000mm (W) x 15mm (Pile Depth)'),
('var_carpet_heriz_4x3', 'attr_load', 'Extreme Heavy Footfall & Furniture Load'),
('var_carpet_heriz_4x3', 'attr_finish', 'Sun-Aged Natural Mineral Dye Luster'),
('var_carpet_heriz_4x3', 'attr_flammability', 'Class 1 Natural Self-Extinguishing'),
('var_carpet_oushak_3x2', 'attr_material', 'Carded Anatolian Wool with Hand-Spun Luster'),
('var_carpet_oushak_3x2', 'attr_dimensions', '3000mm (L) x 2400mm (W) x 16mm (Plush Velvet Pile)'),
('var_carpet_oushak_3x2', 'attr_load', 'Residential Master Suite Luxury Grade'),
('var_carpet_oushak_3x2', 'attr_finish', 'Stonewashed Matte Velvet Finish'),
('var_carpet_oushak_3x2', 'attr_flammability', 'Class B1'),
('var_carpet_qom_2x15', 'attr_material', '100% Pure Mulberry Silk (Warp, Weft & Pile)'),
('var_carpet_qom_2x15', 'attr_dimensions', '2500mm (L) x 1600mm (W) x 7mm (Ultra-Dense Fine Pile)'),
('var_carpet_qom_2x15', 'attr_load', '1,600,000 Knots/m² Ultra-Fine Weave'),
('var_carpet_qom_2x15', 'attr_finish', 'Dual-Direction Chromatic Silk Reflection'),
('var_carpet_qom_2x15', 'attr_flammability', 'Class A Fire Retardant'),
('var_carpet_nain_3x2', 'attr_material', 'Kork Wool & Fine Mulberry Silk Outlining'),
('var_carpet_nain_3x2', 'attr_dimensions', '3000mm (L) x 2000mm (W) x 10mm (Pile Depth)'),
('var_carpet_nain_3x2', 'attr_load', '1,100,000 Knots/m² (6-La Precision)'),
('var_carpet_nain_3x2', 'attr_finish', 'Embossed Silk Relief with Pure White Fringe'),
('var_carpet_nain_3x2', 'attr_flammability', 'Class 1 Natural Wool Fire Rating');

-- 6b. Carpet Volume & Commercial Bulk Sourcing Rules (Naira ₦)
INSERT OR REPLACE INTO bulk_pricing_rules (id, variant_id, min_quantity, unit_price) VALUES
('bulk_carpet_isfahan_3', 'var_carpet_isfahan_3x2', 3, 1650000.00),
('bulk_carpet_isfahan_5', 'var_carpet_isfahan_3x2', 5, 1500000.00),
('bulk_carpet_kashan_3', 'var_carpet_kashan_3x2', 3, 1300000.00),
('bulk_carpet_abstract_5', 'var_carpet_abstract_3x2', 5, 850000.00);
