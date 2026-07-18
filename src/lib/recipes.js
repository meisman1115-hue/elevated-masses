// Recipe content — infused edibles only. To add one, copy an object and edit it.

export const recipes = [
  {
    slug: 'infused-coconut-oil',
    type: 'infused',
    title: 'Infused Coconut Oil (Base Recipe)',
    cover: '/recipes/infused-coconut-oil.jpg',
    excerpt: 'The versatile base for most edibles — use it anywhere a recipe calls for butter or oil.',
    time: '3 hours',
    difficulty: 'Easy',
    yields: 'About 1 cup',
    dose: 'Potency varies — always test with a small amount first.',
    ingredients: [
      '1 cup coconut oil',
      '7–10g decarboxylated flower (coarsely ground)',
      'Cheesecloth for straining',
    ],
    steps: [
      'Decarb your flower first (see the callout below) — this step is essential.',
      'Combine oil and ground flower in a double boiler or slow cooker on low.',
      'Keep the mixture between 160–200°F (never boiling) for 2–3 hours, stirring occasionally.',
      'Strain through cheesecloth into a clean jar. Do not squeeze hard — it pushes through plant material.',
      'Store in the fridge for up to two months.',
    ],
    notes: [
      { type: 'callout', text: 'Decarb = heat raw flower at 240°F (115°C) for ~40 minutes before infusing. Skipping this leaves it inactive.' },
      { type: 'p', text: 'Start low and slow with dosing. Edibles take 45–90 minutes to take effect — wait before taking more.' },
    ],
  },
  {
    slug: 'infused-honey',
    type: 'infused',
    title: 'Slow-Infused Honey',
    cover: '/recipes/infused-honey.jpg',
    excerpt: 'A gentle infusion for tea, toast, or drizzling — subtle and easy to dose.',
    time: '4–6 hours',
    difficulty: 'Easy',
    yields: '1 cup',
    dose: 'Effects are mild and gradual — start with a teaspoon.',
    ingredients: [
      '1 cup honey',
      '3–5g decarboxylated flower',
      'A small tea infuser or cheesecloth pouch',
    ],
    steps: [
      'Place decarbed flower in a tea infuser or tied cheesecloth pouch.',
      'Warm honey gently in a double boiler (never boil — it destroys the honey and the infusion).',
      'Submerge the pouch and keep warm on the lowest heat for 4–6 hours.',
      'Remove the pouch, jar the honey, and store at room temperature.',
    ],
    notes: [
      { type: 'callout', text: 'Keep the temperature under 200°F the entire time. Low and slow is the whole trick here.' },
    ],
  },
]

export function getRecipe(slug) {
  return recipes.find((r) => r.slug === slug)
}
