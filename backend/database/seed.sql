-- Master Seed Data for HC Group (H-C COMPANY LTD) Whole-House Architectural Portfolio
-- Currency: Nigerian Naira (₦) | Headquarters: Sir Kashim Ibrahim Way, Maiduguri, Borno State

-- 1. Industrial Categories
INSERT OR REPLACE INTO categories (id, name, slug, parent_id) VALUES
('cat_doors', 'Luxury Doors & Entries', 'luxury-doors-entries', NULL),
('cat_carpets', 'Luxury Architectural Carpets & Rugs', 'luxury-carpets-rugs', NULL),
('cat_kitchen', 'Kitchen & Wardrobe Systems', 'kitchen-wardrobe', NULL),
('cat_flooring', 'Flooring & Marble Slabs', 'flooring-staircase', NULL),
('cat_sanitary', 'Sanitary Ware & Baths', 'sanitary-ware', NULL),
('cat_whole_house', 'Whole-House Customization', 'whole-house-customization', NULL);

-- 2. Technical EAV Attributes
INSERT OR REPLACE INTO attributes (id, name, display_name, data_type) VALUES
('attr_material', 'material', 'Material Composition', 'string'),
('attr_dimensions', 'dimensions', 'Dimensions (CAD Blueprint)', 'string'),
('attr_load', 'load_capacity', 'Weight Load Limit / Traffic Grade', 'string'),
('attr_finish', 'finish', 'Surface Finish', 'string'),
('attr_flammability', 'flammability', 'Fire Safety Grade', 'string');

-- 3. Products
-- -------------------------------------------------------------------------------------
-- A. LUXURY DOORS & ENTRIES (10 Products)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_door_pivot', 'Monolithic Oxidized Copper Pivot Door', 'Grand 2.8m architectural pivot entrance portal featuring textured hand-hammered copper cladding, solid walnut core, and high-security biometric multi-point locking.', 'DR-PVT', 'cat_doors', '/assets/products/door_1.jpeg', 1),
('prod_door_french', 'Aurelia Slim Steel French Double Doors', 'Architectural slim-profile carbon steel frame double glass entrance doors with matte black powder coat and double-glazed tempered Low-E acoustic glass.', 'DR-FRN', 'cat_doors', '/assets/products/door_2.jpeg', 1),
('prod_door_sliding', 'Minimalist Thermal-Break Sliding Portal', 'High-performance sliding glass portal with soft-close concealed tracks and multi-point automated locking, engineered for floor-to-ceiling panoramic spans.', 'DR-SLD', 'cat_doors', '/assets/products/door_3.jpeg', 1),
('prod_door_classic', 'Imperial Hand-Carved European Oak Portal', 'Traditional solid Slavonian European oak entry door with hand-carved classical reliefs, gold leaf accents, and heavy forged brass locksets.', 'DR-OAK', 'cat_doors', '/assets/products/door_4.jpeg', 1),
('prod_door_flush', 'Concealed Frame Invisible Interior Door', 'Sub-millimeter aluminum concealed jamb wall-integrated interior doors with 3D adjustable magnetic latch, primed for seamless wall finish matching.', 'DR-FLS', 'cat_doors', '/assets/products/door_5.jpeg', 1),
('prod_door_glass', 'Acid-Etched Reeded Glass Privacy Door', 'Architectural reeded fluted tempered glass interior door with brushed champagne gold perimeter frame and ergonomic solid brass lever hardware.', 'DR-GLS', 'cat_doors', '/assets/products/door_6.jpeg', 1),
('prod_door_bronze', 'Smoked Bronze Armored Executive Entryway', 'Bespoke oversized residential security entrance faced with hand-patinated smoked architectural bronze over an aircraft-grade reinforced steel core.', 'DR-BRZ', 'cat_doors', '/assets/products/door_7.jpeg', 1),
('prod_door_armored', 'Heavy Armored Security Vault Pivot Portal', 'Class 4 high-security entrance door with internal steel ballistic lattice, 14-point computerized locking bolts, and continuous acoustic drop seals.', 'DR-SEC', 'cat_doors', '/assets/products/door_8.jpeg', 1),
('prod_door_walnut_pivot', 'Acoustic Slat American Walnut Pivot Door', 'Contemporary entrance door featuring vertical solid American walnut acoustic fluting and German concealed hydraulic 360° fluid pivot floor spring.', 'DR-WAL', 'cat_doors', '/assets/products/door_9.jpeg', 1),
('prod_door_teak', 'Louvered Natural Aged Teak Villa Door', 'Weather-resistant Burmese aged teak exterior entrance door with integrated insect ventilation mesh, marine-grade seals, and brushed bronze hardware.', 'DR-LOU', 'cat_doors', '/assets/products/door_10.jpeg', 1);

-- -------------------------------------------------------------------------------------
-- B. LUXURY ARCHITECTURAL CARPETS & RUGS (10 Products)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_carpet_isfahan', 'Royal Isfahan Hand-Knotted Silk & Wool Rug', 'Museum-grade floor covering woven with 80% New Zealand highland wool and pure mulberry silk relief, boasting 1,200,000 knots/m² in royal midnight navy and gold.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_1.jpeg', 1),
('prod_carpet_kashan', 'Imperial Kashan Medallion Classical Carpet', 'Monumental classical medallion rug woven with hand-spun Ghazni wool and antique herbal dyes, engineered for presidential estates and grand reception salons.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_2.jpeg', 1),
('prod_carpet_tabriz', 'Tabriz Mahi Heritage Silk & Gold Weft Rug', 'Celebrated Tabriz fish motif rug woven with high-twist pure silk on a fine cotton warp, featuring luminous reflective glaze and metallic lurex borders.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_3.jpeg', 1),
('prod_carpet_abstract', 'Aura Minimalist Abstract Bamboo Silk Carpet', 'Modern low-profile architectural area rug woven from botanical bamboo silk and fine matte wool, with hand-carved high-low relief in platinum and charcoal ombre.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_4.jpeg', 1),
('prod_carpet_heriz', 'Heriz Geometric Royal Palace Wool Carpet', 'Bold rectilinear architectural medallion rug in rich terracotta, deep indigo, and sun-aged gold. High-lanolin mountain wool pile engineered for heavy footfall.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_5.jpeg', 1),
('prod_carpet_oushak', 'Anatolian Oushak Soft-Tone Living Rug', 'Subtle Turkish Oushak styling characterized by soft pastel earth tones, large-scale botanical palmettes, and an ultra-plush velvety foot feel for master suites.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_6.jpeg', 1),
('prod_carpet_qom', 'Qom Pure Mulberry Silk Masterpiece', 'The pinnacle of fine weaving: 100% pure organic mulberry silk warp, weft, and pile boasting 1,600,000 knots/m² with dual-direction chromatic light reflection.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_8.jpeg', 1),
('prod_carpet_nain', 'Nain Habibian Arabesque Silk & Wool Rug', 'Prestigious 6-La weave rug rendered in cream ivory, navy sapphire, and sky blue with pure silk outlining around every individual blossom and intertwining vine.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_10.jpeg', 1),
('prod_carpet_runner', 'Executive Palace Grand Gallery Silk Runner', 'High-traffic commercial-grade silk and wool runner (6,000mm x 1,000mm) crafted for monumental grand entryways, diplomatic corridors, and presidential galleries.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_11.jpeg', 1),
('prod_carpet_sapphire', 'Presidential Sapphire Hand-Carved Silk Rug', 'Deep sapphire blue foundation with hand-carved floral scrolls and raised champagne gold silk highlights, woven for VIP suites and formal boardrooms.', 'HC-CRPT', 'cat_carpets', '/assets/products/carpets/carpet_12.jpeg', 1);

-- -------------------------------------------------------------------------------------
-- C. WHOLE-HOUSE MODULAR JOINERY & KITCHENS (3 Products)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_wardrobe_eucalyptus', 'Italian Fluted Smoked Eucalyptus Wardrobe', 'Bespoke floor-to-ceiling modular walk-in wardrobe system with smoked eucalyptus veneers, dark bronze structural stiles, concealed 3000K LED channels, and velvet jewelry drawers.', 'WH-WARD', 'cat_kitchen', '/assets/products/interior_1.jpeg', 1),
('prod_wardrobe_walnut', 'Minimalist American Walnut Wardrobe System', 'Floor-to-ceiling modular wardrobe featuring solid American walnut edge banding, soft-close Blum hardware, integrated pant racks, and biometric hidden jewelry safe.', 'WH-WARD', 'cat_kitchen', '/assets/products/interior_1.jpeg', 1),
('prod_kitchen_island', 'Monolithic Quartz Waterfall Kitchen Island', 'Minimalist kitchen island featuring book-matched quartz waterfall slabs, push-to-open fluted dark timber cabinetry, and integrated concealed induction prep zone.', 'WH-KTCH', 'cat_kitchen', '/assets/products/interior_5.jpeg', 1);

-- -------------------------------------------------------------------------------------
-- D. MARBLE & NATURAL STONE SLABS (3 Products)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_marble_calacatta', 'Bookmatched Italian Calacatta Oro Slabs', 'Authentic Italian Calacatta Oro marble slabs quarried in Carrara, Italy. Mirror-matched continuous vein panels with a 95-gloss diamond polish for dramatic feature walls.', 'FS-MARB', 'cat_flooring', '/assets/products/interior_3.jpeg', 1),
('prod_marble_nero', 'Nero Marquina Velvet Black Marble Slabs', 'Deep obsidian black marble with stark white crystalline calcite veining. Dense micro-crystal structure with oleophobic stain pre-seal for VIP bathrooms and lobbies.', 'FS-MARB', 'cat_flooring', '/assets/products/interior_3.jpeg', 1),
('prod_marble_verde', 'Verde Alpi Emerald Luxury Marble Slabs', 'Deep alpine forest emerald marble with golden and white brecciated veining, finished with diamond liquid mirror polish for luxury powder rooms and executive suites.', 'FS-MARB', 'cat_flooring', '/assets/products/interior_3.jpeg', 1);

-- -------------------------------------------------------------------------------------
-- E. SANITARY WARE & BATHS (3 Products)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_bath_monolith', 'Monolithic Freestanding Solid Stone Bathtub', 'Solid composite mineral stone bathtub carved into an ergonomic organic oval, providing 2x thermal heat retention, velvet tactile matte finish, and integrated pop-up drain.', 'SW-BTHT', 'cat_sanitary', '/assets/products/interior_2.jpeg', 1),
('prod_basin_fluted', 'Freestanding Fluted Pedestal Basalt Basin', 'Carved monolithic basalt pedestal washbasin with vertical exterior flute grooves, honed anti-splash basin bowl, and floor-mounted waste connection.', 'SW-BASN', 'cat_sanitary', '/assets/products/interior_2.jpeg', 1),
('prod_shower_brass', 'Concealed Champagne Brass Rain Shower System', 'Ceiling-recessed 400mm thermostatic rainfall shower system forged from solid brass with PVD champagne gold coating and anti-scald digital pressure balance valve.', 'SW-SHWR', 'cat_sanitary', '/assets/products/interior_2.jpeg', 1);

-- -------------------------------------------------------------------------------------
-- F. WHOLE-HOUSE CUSTOMIZATION & ACOUSTIC PANELS (1 Product)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO products (id, name, description, sku_prefix, category_id, image_url, is_active) VALUES
('prod_panel_acoustic', 'Acoustic Smoked Walnut Wall Slats (Pack of 4)', 'Seamless sound-dampening architectural wall panels featuring natural smoked walnut veneers over high-density recycled acoustic PET felt backing.', 'WH-WOOD', 'cat_whole_house', '/assets/products/interior_4.jpeg', 1);

-- -------------------------------------------------------------------------------------
-- 4. PRODUCT VARIANTS (Realistic Nigerian Luxury Sourcing Prices in ₦)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO product_variants (id, product_id, sku, price_markup, stock_quantity, weight_kg, volume_m3) VALUES
-- Doors
('var_door_pivot_std', 'prod_door_pivot', 'DR-PVT-COPPER-28', 3850000.00, 10, 210.0, 1.8),
('var_door_french_std', 'prod_door_french', 'DR-FRN-STEEL-26', 2650000.00, 12, 140.0, 1.1),
('var_door_sliding_std', 'prod_door_sliding', 'DR-SLD-THERM-24', 2200000.00, 14, 115.0, 0.9),
('var_door_classic_std', 'prod_door_classic', 'DR-OAK-IMPERIAL-24', 3400000.00, 8, 150.0, 1.2),
('var_door_flush_std', 'prod_door_flush', 'DR-FLS-INVIS-24', 1250000.00, 30, 48.0, 0.35),
('var_door_glass_std', 'prod_door_glass', 'DR-GLS-REED-22', 1450000.00, 18, 65.0, 0.45),
('var_door_bronze_std', 'prod_door_bronze', 'DR-BRZ-ARMOR-30', 4500000.00, 6, 260.0, 2.1),
('var_door_armored_std', 'prod_door_armored', 'DR-SEC-VAULT-28', 5200000.00, 5, 320.0, 2.4),
('var_door_walnut_pivot_std', 'prod_door_walnut_pivot', 'DR-WAL-SLAT-28', 3600000.00, 9, 190.0, 1.6),
('var_door_teak_std', 'prod_door_teak', 'DR-LOU-TEAK-24', 3100000.00, 7, 160.0, 1.3),

-- Carpets
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
('var_carpet_nain_3x2', 'prod_carpet_nain', 'HC-CRPT-NAI-3020', 2100000.00, 11, 21.0, 0.17),
('var_carpet_runner_6x1', 'prod_carpet_runner', 'HC-CRPT-RUN-6010', 1750000.00, 8, 28.0, 0.24),
('var_carpet_sapphire_35x25', 'prod_carpet_sapphire', 'HC-CRPT-SAP-3525', 2900000.00, 7, 36.0, 0.31),

-- Joinery & Kitchen
('var_wardrobe_eucalyptus_std', 'prod_wardrobe_eucalyptus', 'WH-WARD-ITA-36', 5200000.00, 12, 320.0, 5.8),
('var_wardrobe_walnut_std', 'prod_wardrobe_walnut', 'WH-WARD-WAL-32', 4200000.00, 16, 260.0, 4.8),
('var_kitchen_island_std', 'prod_kitchen_island', 'WH-KTCH-ISL-34', 6800000.00, 6, 450.0, 6.2),

-- Marble & Stone (per m² or batch)
('var_marble_calacatta_m2', 'prod_marble_calacatta', 'FS-MARB-CAL-M2', 145000.00, 1200, 32.0, 0.08),
('var_marble_nero_m2', 'prod_marble_nero', 'FS-MARB-NERO-M2', 125000.00, 950, 32.0, 0.08),
('var_marble_verde_m2', 'prod_marble_verde', 'FS-MARB-VERDE-M2', 165000.00, 750, 34.0, 0.09),

-- Sanitary
('var_bath_monolith_std', 'prod_bath_monolith', 'SW-BTHT-RES-18', 1850000.00, 10, 160.0, 1.4),
('var_basin_fluted_std', 'prod_basin_fluted', 'SW-BASN-PED-85', 680000.00, 14, 55.0, 0.4),
('var_shower_brass_std', 'prod_shower_brass', 'SW-SHWR-BRS-40', 850000.00, 20, 12.0, 0.15),

-- Acoustic Panels
('var_panel_acoustic_pack4', 'prod_panel_acoustic', 'WH-WOOD-WAL-PK4', 260000.00, 800, 38.0, 0.18);

-- -------------------------------------------------------------------------------------
-- 5. TECHNICAL EAV SPECIFICATIONS
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO product_attributes (variant_id, attribute_id, value) VALUES
-- Pivot Door
('var_door_pivot_std', 'attr_material', 'Solid American Walnut Core & Hand-Hammered Textured Copper'),
('var_door_pivot_std', 'attr_dimensions', '2800mm (H) x 1500mm (W) x 100mm (D)'),
('var_door_pivot_std', 'attr_load', 'Max Pivot Weight Capacity: 350kg (Heavy-Duty German Floor Closer)'),
('var_door_pivot_std', 'attr_finish', 'Patinated Matte Copper & Natural Oil Rubbed Walnut'),
('var_door_pivot_std', 'attr_flammability', 'Class B1 (S1-d0)'),

-- French Door
('var_door_french_std', 'attr_material', 'Precision Carbon Steel & Double Tempered Low-E Glass'),
('var_door_french_std', 'attr_dimensions', '2600mm (H) x 1800mm (W) x 50mm (D)'),
('var_door_french_std', 'attr_load', 'Wind Load Resistance: Class 4 (EN 12210)'),
('var_door_french_std', 'attr_finish', 'Architectural Matte Black Powder Coat'),
('var_door_french_std', 'attr_flammability', 'Class A1 Non-Combustible'),

-- Sliding Door
('var_door_sliding_std', 'attr_material', 'Thermally Broken Architectural Aluminum & Triple Glazed Glass'),
('var_door_sliding_std', 'attr_dimensions', '2400mm (H) x 2400mm (W) x 65mm (D)'),
('var_door_sliding_std', 'attr_load', 'Acoustic Damping: 42 dB Noise Attenuation'),
('var_door_sliding_std', 'attr_finish', 'Anodized Charcoal Gray'),
('var_door_sliding_std', 'attr_flammability', 'Class B1 Fire Safe'),

-- Classic Door
('var_door_classic_std', 'attr_material', 'Solid Slavonian White Oak & Solid Cast Brass Hardware'),
('var_door_classic_std', 'attr_dimensions', '2400mm (H) x 1200mm (W) x 80mm (D)'),
('var_door_classic_std', 'attr_load', '150kg Leaf Weight with Heavy Quad-Ball Bearing Hinges'),
('var_door_classic_std', 'attr_finish', 'Hand-Rubbed Antique Walnut Stain & 24K Gold Leaf Accents'),
('var_door_classic_std', 'attr_flammability', 'Class B2'),

-- Flush Invisible Door
('var_door_flush_std', 'attr_material', 'Honeycomb Wood Core & Concealed Extruded Aluminum Jamb'),
('var_door_flush_std', 'attr_dimensions', '2400mm (H) x 900mm (W) x 45mm (D)'),
('var_door_flush_std', 'attr_load', 'Tested to 200,000 Continuous Operating Cycles'),
('var_door_flush_std', 'attr_finish', 'Pre-Primed for Direct Wall Plaster or Paint Matching'),
('var_door_flush_std', 'attr_flammability', 'Class B1'),

-- Carpets (Isfahan)
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

-- Carpets (Qom Silk)
('var_carpet_qom_2x15', 'attr_material', '100% Pure Mulberry Silk (Warp, Weft & Pile)'),
('var_carpet_qom_2x15', 'attr_dimensions', '2500mm (L) x 1600mm (W) x 7mm (Ultra-Dense Fine Pile)'),
('var_carpet_qom_2x15', 'attr_load', '1,600,000 Knots/m² Ultra-Fine Master Weave'),
('var_carpet_qom_2x15', 'attr_finish', 'Dual-Direction Chromatic Silk Reflection'),
('var_carpet_qom_2x15', 'attr_flammability', 'Class A Fire Retardant'),

-- Wardrobe (Italian Eucalyptus)
('var_wardrobe_eucalyptus_std', 'attr_material', 'Smoked Eucalyptus Veneers, Dark Bronze Stiles & Tempered Glass'),
('var_wardrobe_eucalyptus_std', 'attr_dimensions', '3600mm (W) x 2800mm (H) x 650mm (D)'),
('var_wardrobe_eucalyptus_std', 'attr_load', '650kg Total Shelving and Drawer Load Capacity'),
('var_wardrobe_eucalyptus_std', 'attr_finish', 'Low-Sheen Natural Oil Polyurethane & Bronze Anodizing'),
('var_wardrobe_eucalyptus_std', 'attr_flammability', 'Class B1 (S1-d0)'),

-- Kitchen Island
('var_kitchen_island_std', 'attr_material', 'Engineered Calacatta Quartz Waterfall & Fluted Marine Ply Core'),
('var_kitchen_island_std', 'attr_dimensions', '3400mm (L) x 1100mm (W) x 900mm (H)'),
('var_kitchen_island_std', 'attr_load', 'Scratch, Stain & 280°C Heat Thermal Resistance'),
('var_kitchen_island_std', 'attr_finish', 'Honed Matte Quartz Surface & Smoked Oak Cabinets'),
('var_kitchen_island_std', 'attr_flammability', 'Class A1 Fireproof Quartz Countertop'),

-- Marble Calacatta
('var_marble_calacatta_m2', 'attr_material', '100% Authentic Italian Calacatta Oro Natural Marble'),
('var_marble_calacatta_m2', 'attr_dimensions', '2800mm x 1800mm x 20mm Thickness (Slab Form)'),
('var_marble_calacatta_m2', 'attr_load', 'Compressive Strength: 125 MPa (ASTM C170)'),
('var_marble_calacatta_m2', 'attr_finish', '95-Gloss Diamond Liquid Mirror Polish (Bookmatched Pair)'),
('var_marble_calacatta_m2', 'attr_flammability', 'Class A1 Non-Combustible Stone'),

-- Bathtub
('var_bath_monolith_std', 'attr_material', 'Cast Mineral Resin Composite Solid Stone (210kg Dry Weight)'),
('var_bath_monolith_std', 'attr_dimensions', '1800mm (L) x 850mm (W) x 580mm (H)'),
('var_bath_monolith_std', 'attr_load', '550kg Water & Bather Capacity Load Limit'),
('var_bath_monolith_std', 'attr_finish', 'Velvet Tactile Honed Matte White'),
('var_bath_monolith_std', 'attr_flammability', 'Class 1 Fire Retardant'),

-- Acoustic Panels
('var_panel_acoustic_pack4', 'attr_material', 'Natural Smoked Walnut Slats & Recycled PET Acoustic Felt'),
('var_panel_acoustic_pack4', 'attr_dimensions', '2400mm (H) x 600mm (W) x 21mm (D) per panel'),
('var_panel_acoustic_pack4', 'attr_load', 'Noise Reduction Coefficient (NRC): 0.85'),
('var_panel_acoustic_pack4', 'attr_finish', 'Matte Satin Protective Oil'),
('var_panel_acoustic_pack4', 'attr_flammability', 'Class B1 Flame Retardant');

-- -------------------------------------------------------------------------------------
-- 6. BULK PRICING DISCOUNTS (Naira ₦)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO bulk_pricing_rules (id, variant_id, min_quantity, unit_price) VALUES
('bulk_door_pivot_3', 'var_door_pivot_std', 3, 3500000.00),
('bulk_door_pivot_5', 'var_door_pivot_std', 5, 3200000.00),
('bulk_door_flush_10', 'var_door_flush_std', 10, 1100000.00),
('bulk_door_flush_20', 'var_door_flush_std', 20, 950000.00),
('bulk_carpet_isfahan_3', 'var_carpet_isfahan_3x2', 3, 1650000.00),
('bulk_carpet_isfahan_5', 'var_carpet_isfahan_3x2', 5, 1500000.00),
('bulk_marble_calacatta_100', 'var_marble_calacatta_m2', 100, 130000.00),
('bulk_marble_calacatta_300', 'var_marble_calacatta_m2', 300, 115000.00),
('bulk_panel_acoustic_20', 'var_panel_acoustic_pack4', 20, 230000.00),
('bulk_panel_acoustic_50', 'var_panel_acoustic_pack4', 50, 210000.00);

-- -------------------------------------------------------------------------------------
-- 7. NIGERIAN REGIONAL SHIPPING RATES (Maiduguri HQ & National Depots)
-- -------------------------------------------------------------------------------------
INSERT OR REPLACE INTO shipping_zones (id, state, city, base_rate, per_kg_rate, transport_type) VALUES
-- Borno State (Headquarters)
('sz_borno_gra_p', 'Borno', 'Maiduguri (GRA)', 12000.00, 120.00, 'parcel'),
('sz_borno_gra_f', 'Borno', 'Maiduguri (GRA)', 80000.00, 300.00, 'flatbed'),
('sz_borno_gra_c', 'Borno', 'Maiduguri (GRA)', 220000.00, 550.00, 'crane_lift'),

('sz_borno_central_p', 'Borno', 'Maiduguri Central (Sir Kashim Ibrahim Way)', 12000.00, 120.00, 'parcel'),
('sz_borno_central_f', 'Borno', 'Maiduguri Central (Sir Kashim Ibrahim Way)', 80000.00, 300.00, 'flatbed'),
('sz_borno_central_c', 'Borno', 'Maiduguri Central (Sir Kashim Ibrahim Way)', 220000.00, 550.00, 'crane_lift'),

-- Abuja Hubs
('sz_abuja_maitama_p', 'Abuja', 'Maitama', 25000.00, 250.00, 'parcel'),
('sz_abuja_maitama_f', 'Abuja', 'Maitama', 180000.00, 500.00, 'flatbed'),
('sz_abuja_maitama_c', 'Abuja', 'Maitama', 380000.00, 850.00, 'crane_lift'),

('sz_abuja_asokoro_p', 'Abuja', 'Asokoro', 25000.00, 250.00, 'parcel'),
('sz_abuja_asokoro_f', 'Abuja', 'Asokoro', 180000.00, 500.00, 'flatbed'),
('sz_abuja_asokoro_c', 'Abuja', 'Asokoro', 380000.00, 850.00, 'crane_lift'),

('sz_abuja_guzape_p', 'Abuja', 'Guzape', 25000.00, 250.00, 'parcel'),
('sz_abuja_guzape_f', 'Abuja', 'Guzape', 180000.00, 500.00, 'flatbed'),
('sz_abuja_guzape_c', 'Abuja', 'Guzape', 380000.00, 850.00, 'crane_lift'),

-- Lagos Hubs
('sz_lagos_lekki_p', 'Lagos', 'Lekki Phase 1', 15000.00, 150.00, 'parcel'),
('sz_lagos_lekki_f', 'Lagos', 'Lekki Phase 1', 95000.00, 350.00, 'flatbed'),
('sz_lagos_lekki_c', 'Lagos', 'Lekki Phase 1', 250000.00, 600.00, 'crane_lift'),

('sz_lagos_ikoyi_p', 'Lagos', 'Ikoyi / Banana Island', 18000.00, 150.00, 'parcel'),
('sz_lagos_ikoyi_f', 'Lagos', 'Ikoyi / Banana Island', 110000.00, 350.00, 'flatbed'),
('sz_lagos_ikoyi_c', 'Lagos', 'Ikoyi / Banana Island', 280000.00, 650.00, 'crane_lift'),

-- Regional Hubs
('sz_rivers_ph_p', 'Rivers', 'Port Harcourt', 35000.00, 300.00, 'parcel'),
('sz_rivers_ph_f', 'Rivers', 'Port Harcourt', 250000.00, 650.00, 'flatbed'),
('sz_rivers_ph_c', 'Rivers', 'Port Harcourt', 480000.00, 1100.00, 'crane_lift'),

('sz_kano_central_p', 'Kano', 'Kano Central / Nassarawa GRA', 40000.00, 350.00, 'parcel'),
('sz_kano_central_f', 'Kano', 'Kano Central / Nassarawa GRA', 280000.00, 700.00, 'flatbed'),
('sz_kano_central_c', 'Kano', 'Kano Central / Nassarawa GRA', 520000.00, 1200.00, 'crane_lift');
