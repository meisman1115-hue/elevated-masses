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
      { tier: 'Starter', name: '2×2 Grow Tent', price: 70, url: 'https://www.amazon.com/dp/PLACEHOLDER-TENT-1' },
      { tier: 'Better', name: '2×4 Grow Tent', price: 130, url: 'https://www.amazon.com/dp/PLACEHOLDER-TENT-2' },
      { tier: 'Premium', name: '4×4 Grow Tent', price: 200, url: 'https://www.amazon.com/dp/PLACEHOLDER-TENT-3' },
    ],
  },
  {
    key: 'light',
    name: 'LED Grow Light',
    options: [
      { tier: 'Starter', name: '100W LED', price: 60, url: 'https://www.amazon.com/dp/PLACEHOLDER-LIGHT-1' },
      { tier: 'Better', name: '240W LED', price: 150, url: 'https://www.amazon.com/dp/PLACEHOLDER-LIGHT-2' },
      { tier: 'Premium', name: '480W LED', price: 320, url: 'https://www.amazon.com/dp/PLACEHOLDER-LIGHT-3' },
    ],
  },
  {
    key: 'air',
    name: 'Ventilation (fan + filter)',
    options: [
      { tier: 'Starter', name: '4" Inline Fan + Carbon Filter', price: 45, url: 'https://www.amazon.com/dp/PLACEHOLDER-VENT-1' },
      { tier: 'Better', name: '6" Fan + Filter + Controller', price: 90, url: 'https://www.amazon.com/dp/PLACEHOLDER-VENT-2' },
      { tier: 'Premium', name: '6" Smart Fan + Filter Kit', price: 150, url: 'https://www.amazon.com/dp/PLACEHOLDER-VENT-3' },
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
      { tier: 'Starter', name: 'Base Nutrient Set', price: 25, url: 'https://www.amazon.com/dp/PLACEHOLDER-NUTE-1' },
      { tier: 'Better', name: 'Full Feeding Kit', price: 55, url: 'https://www.amazon.com/dp/PLACEHOLDER-NUTE-2' },
      { tier: 'Premium', name: 'Complete Nutrient System', price: 95, url: 'https://www.amazon.com/dp/PLACEHOLDER-NUTE-3' },
    ],
  },
  {
    key: 'meters',
    name: 'pH / EC Meters + Control',
    options: [
      { tier: 'Starter', name: 'pH/EC Pens + pH Up/Down', price: 25, url: 'https://www.amazon.com/dp/PLACEHOLDER-METER-1' },
      { tier: 'Better', name: 'Digital Combo Meter Kit', price: 60, url: 'https://www.amazon.com/dp/PLACEHOLDER-METER-2' },
      { tier: 'Premium', name: 'Continuous Monitor Kit', price: 110, url: 'https://www.amazon.com/dp/PLACEHOLDER-METER-3' },
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
      { tier: 'Premium', name: 'Smart Controller + Sensors', price: 60, url: 'https://www.amazon.com/dp/PLACEHOLDER-ENV-3' },
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
