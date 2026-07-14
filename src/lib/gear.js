// Individually browsable gear products (Amazon affiliate). This is the single
// source of truth — the Gear page grid AND the weekly link checker
// (scripts/check-affiliate-links.mjs) both read from here.

export const gearCategories = [
  'All', 'Grow Tents', 'Grow Lights', 'Ventilation', 'Nutrients', 'Meters & Testers', 'Pots & Media',
]

export const gearProducts = [
  // Grow tents
  { cat: 'Grow Tents', brand: 'Spider Farmer', title: '2×2 Grow Tent (24"×24"×72")', url: 'https://amzn.to/4wFvM8d' },
  { cat: 'Grow Tents', brand: 'Spider Farmer', title: '3×3 Grow Tent (36"×36"×72")', url: 'https://amzn.to/4eXvP9t' },
  { cat: 'Grow Tents', brand: 'AC Infinity', title: 'CLOUDLAB 844 — 4×4 Grow Tent', url: 'https://amzn.to/3RwX95p' },
  { cat: 'Grow Tents', brand: 'VIVOSUN', title: 'S848 — 4×8 Grow Tent', url: 'https://amzn.to/4fwWDgY' },
  { cat: 'Grow Tents', brand: 'AC Infinity', title: 'CLOUDLAB 894 — 4×8 Grow Tent', url: 'https://amzn.to/4w1Y8K1' },
  { cat: 'Grow Tents', brand: 'VIVOSUN', title: 'S558 — 5×5 Grow Tent', url: 'https://amzn.to/4w1Ylgh' },
  { cat: 'Grow Tents', brand: 'VIVOSUN', title: 'S105 — 10×5 Grow Tent', url: 'https://amzn.to/4pmgx1I' },

  // Grow lights
  { cat: 'Grow Lights', brand: 'VIVOSUN', title: 'LumaLight 100W LED', url: 'https://amzn.to/4f6Empq' },
  { cat: 'Grow Lights', brand: 'VIVOSUN', title: 'LumaLight 200W LED', url: 'https://amzn.to/4phxtpL' },
  { cat: 'Grow Lights', brand: 'VIVOSUN', title: 'LumaLight 320W LED', url: 'https://amzn.to/4h9mXyW' },
  { cat: 'Grow Lights', brand: 'HLG', title: 'HLG 350 Diablo 350W Quantum Board', url: 'https://amzn.to/4fv4Lyy' },
  { cat: 'Grow Lights', brand: 'Spider Farmer', title: 'SE5000 480W LED', url: 'https://amzn.to/4eU2Cw8' },
  { cat: 'Grow Lights', brand: 'HLG', title: 'HLG 600 Rspec FR 600W', url: 'https://amzn.to/4vKTdMJ' },
  { cat: 'Grow Lights', brand: 'AC Infinity', title: 'IONFRAME EVO8 730W LED', url: 'https://amzn.to/4faoOkB' },
  { cat: 'Grow Lights', brand: 'AGLEX', title: 'K1000 LED Grow Light', url: 'https://amzn.to/4bhMcLK' },

  // Ventilation — inline fan + carbon filter kits, 4"
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'Smart Air Filtration G4 Kit 4"', url: 'https://amzn.to/3RwE03C' },
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'Smart Air Filtration T4 Kit 4"', url: 'https://amzn.to/4eW4Kn6' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'CLOUDLINE LITE 4" Fan + Filter Combo', url: 'https://amzn.to/4wGJt6X' },
  { cat: 'Ventilation', brand: 'MELONFARM', title: '4" 190 CFM Inline Fan + Filter Kit', url: 'https://amzn.to/4h5VkXy' },
  { cat: 'Ventilation', brand: 'VEVOR', title: '4" 205 CFM EC Motor Fan + Filter Kit', url: 'https://amzn.to/4vxkW38' },
  { cat: 'Ventilation', brand: 'Spider Farmer', title: '4" Air Filtration Kit (GGS Controller)', url: 'https://amzn.to/450iB5Q' },
  { cat: 'Ventilation', brand: 'Spider Farmer', title: '4" Air Filtration Kit (RJ12 Controller)', url: 'https://amzn.to/4aTO2SR' },
  { cat: 'Ventilation', brand: 'ATOUR', title: '4" Carbon Filter with Built-In Fan', url: 'https://amzn.to/4fuSU3v' },
  // Ventilation — 6"
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'Smart Air Filtration G6 Kit 6"', url: 'https://amzn.to/4w41zzS' },
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'Smart Air Filtration T6 Kit 6"', url: 'https://amzn.to/4ygHNTj' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'CLOUDLINE LITE 6" Fan + Filter Combo', url: 'https://amzn.to/4ffhvIa' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'Air Filtration PRO Kit 6" (AI Controller)', url: 'https://amzn.to/4pgUEka' },
  { cat: 'Ventilation', brand: 'Spider Farmer', title: '6" Air Filtration Kit', url: 'https://amzn.to/3ThPgRQ' },
  // Ventilation — 8"
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'Smart Air Filtration G8 Kit 8"', url: 'https://amzn.to/4aQRXzW' },
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'Smart Air Filtration T8 Kit 8"', url: 'https://amzn.to/4wGtNAy' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'CLOUDLINE LITE 8" Fan + Filter Combo', url: 'https://amzn.to/4vtqPhW' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'Air Filtration PRO Kit 8"', url: 'https://amzn.to/4yhDpmO' },
  // Ventilation — circulation clip fans
  { cat: 'Ventilation', brand: 'VIVOSUN', title: 'AeroWave A6 Clip Fan 6" (2-Pack)', url: 'https://amzn.to/3SQ3Jo6' },
  { cat: 'Ventilation', brand: 'Spider Farmer', title: 'Clip Fan 6" (2-Pack)', url: 'https://amzn.to/3Tj2Jc9' },
  { cat: 'Ventilation', brand: 'MARS HYDRO', title: 'M6 Clip Fan 6", WiFi (2-Pack)', url: 'https://amzn.to/4ffhS5w' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'CLOUDRAY S6 Clip Fan 6" (2-Pack)', url: 'https://amzn.to/4ykBHBk' },
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'CLOUDRAY S9 Clip Fan 9" (2-Pack)', url: 'https://amzn.to/4aTNWKZ' },
  { cat: 'Ventilation', brand: 'DAOTAILI', title: 'Clip Fan 4" with Temp & Humidity Meter (2-Pack)', url: 'https://amzn.to/452GvOa' },
  // Ventilation — full climate control
  { cat: 'Ventilation', brand: 'AC Infinity', title: 'TERRAFORM 8 — AC / Heater / Dehumidifier, 12000 BTU', url: 'https://amzn.to/3T2t3Ho' },

  // Nutrients
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'FloraSeries Trial Pack (Micro/Grow/Bloom), 1 qt', url: 'https://amzn.to/4bmoApg' },
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'Flora Grow/Bloom/Micro Combo, 1 gal ×3', url: 'https://amzn.to/4f4UCag' },
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'CALiMAGic, 1 qt', url: 'https://amzn.to/4fcs66V' },
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'CALiMAGic, 1 gal', url: 'https://amzn.to/3TzqXin' },
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'Armor Si Silica Supplement, case of 12 qt', url: 'https://amzn.to/4fi7M44' },
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'Armor Si Silica Supplement, 1 gal', url: 'https://amzn.to/4wHCoD3' },
  { cat: 'Nutrients', brand: 'TPS Nutrients', title: 'Silica Gold, 1 qt', url: 'https://amzn.to/4f95NPj' },
  { cat: 'Nutrients', brand: 'TPS Nutrients', title: 'Silica Gold, 1 gal', url: 'https://amzn.to/4wytXdg' },
  { cat: 'Nutrients', brand: 'Botanicare', title: 'Silica Blast, 1 qt', url: 'https://amzn.to/450iYxh' },
  { cat: 'Nutrients', brand: 'Botanicare', title: 'Silica Blast, 1 gal', url: 'https://amzn.to/4w2wf4k' },
  { cat: 'Nutrients', brand: 'Athena', title: 'Blended Grow & Bloom A&B, 32 oz', url: 'https://amzn.to/4vWrrgU' },
  { cat: 'Nutrients', brand: 'Rooted Intellect', title: 'Two-Part Veg & Bloom Nutrient Kit', url: 'https://amzn.to/3RuJeNj' },
  { cat: 'Nutrients', brand: 'FOOP', title: 'Nutes Veg & Bloom Starter Pack + Mist', url: 'https://amzn.to/4bE3iDC' },
  { cat: 'Nutrients', brand: 'FoxFarm', title: 'Hydro Liquid Trio Pack, pint', url: 'https://amzn.to/4gC3kzs' },
  { cat: 'Nutrients', brand: 'FoxFarm', title: 'Hydro Liquid Trio Pack, quart', url: 'https://amzn.to/4f4V6x6' },
  { cat: 'Nutrients', brand: 'FoxFarm', title: 'Hydro Liquid Trio Pack, 3 gal', url: 'https://amzn.to/4yjBQVr' },
  { cat: 'Nutrients', brand: "Humboldt's Secret", title: 'Complete Starter Kit (Base, CalMag, Enzymes & more)', url: 'https://amzn.to/4yrnvqj' },
  { cat: 'Nutrients', brand: 'HGV', title: 'Liquid Essentials Kit, 4-Part', url: 'https://amzn.to/4ylsjgy' },
  { cat: 'Nutrients', brand: 'General Hydroponics', title: 'MaxiBloom & MaxiGro Set', url: 'https://amzn.to/4pmdfLV' },
  { cat: 'Nutrients', brand: 'Xtreme Gardening', title: 'Mykos Mycorrhizae, 1 lb', url: 'https://amzn.to/4aSLkgr' },
  { cat: 'Nutrients', brand: 'Big Foot', title: 'Mycorrhizae, 4 oz', url: 'https://amzn.to/4aNb6Tl' },
  { cat: 'Nutrients', brand: 'Trifecta', title: 'Myco Supreme Root Stimulator', url: 'https://amzn.to/4ylPKq4' },
  { cat: 'Nutrients', brand: 'DYNOMYCO', title: 'Granular Mycorrhizal Fungi Inoculant', url: 'https://amzn.to/4wMhDX3' },
  { cat: 'Nutrients', brand: 'Char Bliss', title: 'Organic Biochar, 8 qt', url: 'https://amzn.to/4eZ4eom' },
  { cat: 'Nutrients', brand: 'Char Bliss', title: 'Worm Bliss + Char Bliss Combo', url: 'https://amzn.to/3Rb5j3m' },

  // Meters & testers
  { cat: 'Meters & Testers', brand: 'Bluelab', title: 'pH Pen', url: 'https://amzn.to/4wLZ4lL' },
  { cat: 'Meters & Testers', brand: 'Bluelab', title: 'pH Pen + Probe Care Kit', url: 'https://amzn.to/4ffkiB8' },
  { cat: 'Meters & Testers', brand: 'Bluelab', title: 'Combo Meter (pH / Temp / Conductivity)', url: 'https://amzn.to/4vrISoq' },
  { cat: 'Meters & Testers', brand: 'Generic', title: '4-in-1 Digital pH / TDS / EC Meter', url: 'https://amzn.to/3R7p9ws' },
  { cat: 'Meters & Testers', brand: 'EZTOCH', title: 'Hydroponic pH EC Meter', url: 'https://amzn.to/44ofQv5' },
  { cat: 'Meters & Testers', brand: 'APERA', title: 'AI209-T PH20 Tester Combo Kit', url: 'https://amzn.to/4vzaisJ' },
  { cat: 'Meters & Testers', brand: 'APERA', title: 'AI209 PH20 Waterproof Tester Kit', url: 'https://amzn.to/4eZ1dV7' },
  { cat: 'Meters & Testers', brand: 'APERA', title: 'AI311 PH60 Premium Pocket Tester', url: 'https://amzn.to/4vr3r4A' },
  { cat: 'Meters & Testers', brand: 'APERA', title: 'AI3711 PH60-Z Bluetooth Smart pH Tester', url: 'https://amzn.to/3Te3bs7' },
  { cat: 'Meters & Testers', brand: 'Bluelab', title: 'pH 4.0 / 7.0 Calibration Solution', url: 'https://amzn.to/44Moh3D' },
  { cat: 'Meters & Testers', brand: 'GIDIGI', title: 'pH Buffer Calibration Solution (4/6.86/9.18)', url: 'https://amzn.to/4eZHYL5' },
  { cat: 'Meters & Testers', brand: 'APERA', title: 'AI1108 pH Calibration Buffer Kit', url: 'https://amzn.to/3T2y3Ma' },
  { cat: 'Meters & Testers', brand: 'Biopharm', title: 'pH Calibration Buffer 2-Pack, 500 mL', url: 'https://amzn.to/3ThTYPw' },
  { cat: 'Meters & Testers', brand: 'Biopharm', title: 'pH Calibration Buffer 2-Pack, 1 gal', url: 'https://amzn.to/4yf05nL' },
  { cat: 'Meters & Testers', brand: 'Generic', title: 'pH Calibration Kit, 250 mL', url: 'https://amzn.to/4aPLtkK' },
  { cat: 'Meters & Testers', brand: 'Biopharm', title: 'pH/ORP Electrode Storage Solution', url: 'https://amzn.to/4ykGVgq' },
  { cat: 'Meters & Testers', brand: 'Bluelab', title: 'KCl Probe Storage Solution', url: 'https://amzn.to/3ThWzJg' },

  // Pots & media
  { cat: 'Pots & Media', brand: 'FEED GARDEN', title: '5 Gallon Fabric Grow Bags (4-Pack)', url: 'https://amzn.to/4ph2la2' },
  { cat: 'Pots & Media', brand: 'VIVOSUN', title: '3 Gallon Fabric Grow Bags (5-Pack)', url: 'https://amzn.to/4vr6mKA' },
  { cat: 'Pots & Media', brand: 'VIVOSUN', title: '2 Gallon Fabric Grow Bags (5-Pack)', url: 'https://amzn.to/3Rf8uHg' },
  { cat: 'Pots & Media', brand: 'AC Infinity', title: 'Heavy Duty Fabric Pots, 1 Gallon (5-Pack)', url: 'https://amzn.to/4pjGfDH' },
  { cat: 'Pots & Media', brand: 'AC Infinity', title: 'Heavy Duty Fabric Pots, 3 Gallon (5-Pack)', url: 'https://amzn.to/4pmktj1' },
  { cat: 'Pots & Media', brand: 'AC Infinity', title: 'Heavy Duty Fabric Pots, 5 Gallon (5-Pack)', url: 'https://amzn.to/44te23S' },
  { cat: 'Pots & Media', brand: 'AC Infinity', title: 'Self-Watering Fabric Pot Base (4-Pack)', url: 'https://amzn.to/4fyQuRl' },
  { cat: 'Pots & Media', brand: 'Spider Farmer', title: 'Gravity-Fed Self-Watering System (4-Pack)', url: 'https://amzn.to/4w6ZJOE' },
]
