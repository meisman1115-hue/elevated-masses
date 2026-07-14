// Budget-based grow-kit builder.
//
// Each essential category has tiered options with placeholder prices. The
// builder starts every category at its cheapest tier (the $300 minimum build)
// and then spends the remaining budget upgrading categories, cheapest upgrade
// first, so the kit scales smoothly with budget.
//
// TODO: replace names/prices/urls with real Amazon products. Prices here are
// placeholders so the calculator works until then.

export const kitCategories = [
  {
    key: 'tent',
    name: 'Grow Tent',
    options: [
      { tier: 'Starter', name: 'Spider Farmer 2×2 Grow Tent', price: 70, url: 'https://amzn.to/4wFvM8d' },
      { tier: 'Better', name: 'AC Infinity CLOUDLAB 844 4×4', price: 150, url: 'https://amzn.to/3RwX95p' },
      { tier: 'Premium', name: 'AC Infinity CLOUDLAB 894 4×8', price: 280, url: 'https://amzn.to/4w1Y8K1' },
    ],
  },
  {
    key: 'light',
    name: 'LED Grow Light',
    options: [
      { tier: 'Starter', name: 'VIVOSUN LumaLight 100W', price: 70, url: 'https://amzn.to/4f6Empq' },
      { tier: 'Better', name: 'VIVOSUN LumaLight 200W', price: 150, url: 'https://amzn.to/4phxtpL' },
      { tier: 'Premium', name: 'Spider Farmer SE5000 480W', price: 330, url: 'https://amzn.to/4eU2Cw8' },
    ],
  },
  {
    key: 'air',
    name: 'Ventilation (fan + filter)',
    options: [
      { tier: 'Starter', name: 'VIVOSUN Air Filtration G4 Kit 4"', price: 55, url: 'https://amzn.to/3RwE03C' },
      { tier: 'Better', name: 'VIVOSUN Air Filtration G6 Kit 6"', price: 90, url: 'https://amzn.to/4w41zzS' },
      { tier: 'Premium', name: 'AC Infinity Air Filtration PRO Kit 8" (Smart Controller)', price: 220, url: 'https://amzn.to/4yhDpmO' },
    ],
  },
  {
    key: 'system',
    name: 'Grow System',
    options: [
      { tier: 'Starter', name: '2-Bucket DWC', price: 35, url: 'https://www.amazon.com/dp/PLACEHOLDER-SYS-1' },
      { tier: 'Better', name: '4-Bucket RDWC', price: 110, url: 'https://www.amazon.com/dp/PLACEHOLDER-SYS-2' },
      { tier: 'Premium', name: '6-Site RDWC', price: 220, url: 'https://www.amazon.com/dp/PLACEHOLDER-SYS-3' },
    ],
  },
  {
    key: 'nutrients',
    name: 'Nutrients',
    options: [
      { tier: 'Starter', name: 'General Hydroponics FloraSeries Trial Pack', price: 20, url: 'https://amzn.to/4bmoApg' },
      { tier: 'Better', name: 'FoxFarm Hydro Liquid Trio Pack (Quart)', price: 45, url: 'https://amzn.to/4f4V6x6' },
      { tier: 'Premium', name: 'Athena Blended Grow & Bloom A&B', price: 90, url: 'https://amzn.to/4vWrrgU' },
    ],
  },
  {
    key: 'meters',
    name: 'pH / EC Meters + Control',
    options: [
      { tier: 'Starter', name: '4-in-1 Digital pH/TDS/EC Meter', price: 20, url: 'https://amzn.to/3R7p9ws' },
      { tier: 'Better', name: 'Bluelab pH Pen', price: 75, url: 'https://amzn.to/4wLZ4lL' },
      { tier: 'Premium', name: 'Bluelab Combo Meter (pH/Temp/EC)', price: 200, url: 'https://amzn.to/4vrISoq' },
    ],
  },
  {
    key: 'airpump',
    name: 'Air Pump + Stones',
    options: [
      { tier: 'Starter', name: 'Dual-Outlet Air Pump Kit', price: 20, url: 'https://www.amazon.com/dp/PLACEHOLDER-AIR-1' },
      { tier: 'Better', name: '4-Outlet Air Pump Kit', price: 40, url: 'https://www.amazon.com/dp/PLACEHOLDER-AIR-2' },
      { tier: 'Premium', name: 'Commercial Air Pump Kit', price: 70, url: 'https://www.amazon.com/dp/PLACEHOLDER-AIR-3' },
    ],
  },
  {
    key: 'environment',
    name: 'Timer + Thermo/Hygrometer',
    options: [
      { tier: 'Starter', name: 'Timer + Thermo-Hygrometer', price: 20, url: 'https://www.amazon.com/dp/PLACEHOLDER-ENV-1' },
      { tier: 'Better', name: 'Digital Timer + Sensor Set', price: 35, url: 'https://www.amazon.com/dp/PLACEHOLDER-ENV-2' },
      { tier: 'Premium', name: 'AC Infinity TERRAFORM 8 (AC/Heat/Dehumidifier, 12000 BTU)', price: 549, url: 'https://amzn.to/3T2t3Ho' },
    ],
  },
]

export const MIN_BUILD = kitCategories.reduce((sum, c) => sum + c.options[0].price, 0)
export const MAX_BUILD = kitCategories.reduce((sum, c) => sum + c.options[c.options.length - 1].price, 0)

// Build the best complete kit within `budget`.
export function buildKit(budget) {
  if (budget < MIN_BUILD) {
    return { feasible: false, minimum: MIN_BUILD }
  }

  // Start every category at its cheapest tier.
  const picks = kitCategories.map(() => 0)
  let total = MIN_BUILD

  // Greedily apply the cheapest available upgrade that still fits the budget.
  let upgraded = true
  while (upgraded) {
    upgraded = false
    let bestCat = -1
    let bestDelta = Infinity
    kitCategories.forEach((cat, i) => {
      const idx = picks[i]
      if (idx < cat.options.length - 1) {
        const delta = cat.options[idx + 1].price - cat.options[idx].price
        if (total + delta <= budget && delta < bestDelta) {
          bestDelta = delta
          bestCat = i
        }
      }
    })
    if (bestCat !== -1) {
      picks[bestCat] += 1
      total += bestDelta
      upgraded = true
    }
  }

  const items = kitCategories.map((cat, i) => ({
    category: cat.name,
    ...cat.options[picks[i]],
  }))

  return { feasible: true, items, total, remaining: budget - total }
}
