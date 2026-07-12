// Recipe content. `type` is 'infused' or 'fresh' — used by the filter on the
// Recipes page. To add one, copy an object and edit it.

export const recipes = [
  {
    slug: 'infused-coconut-oil',
    type: 'infused',
    title: 'Infused Coconut Oil (Base Recipe)',
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
    slug: 'hydro-basil-pesto',
    type: 'fresh',
    title: 'Fresh Hydroponic Basil Pesto',
    excerpt: 'Turn a big hydroponic basil harvest into bright, freezer-friendly pesto.',
    time: '15 min',
    difficulty: 'Easy',
    yields: 'About 1 cup',
    ingredients: [
      '2 packed cups fresh basil leaves',
      '1/2 cup olive oil',
      '1/3 cup pine nuts (or walnuts)',
      '1/2 cup grated parmesan',
      '2 garlic cloves',
      'Salt and pepper to taste',
    ],
    steps: [
      'Rinse and thoroughly dry the basil — wet leaves make watery pesto.',
      'Toast the nuts in a dry pan for 2–3 minutes until fragrant.',
      'Blend basil, nuts, garlic, and parmesan while drizzling in the oil.',
      'Season to taste, then use fresh or freeze in an ice-cube tray for portions.',
    ],
    notes: [
      { type: 'p', text: 'Freshly harvested hydroponic basil is milder and sweeter than store-bought — you may need a little less than usual.' },
    ],
  },
  {
    slug: 'infused-honey',
    type: 'infused',
    title: 'Slow-Infused Honey',
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
  {
    slug: 'garden-herb-salad',
    type: 'fresh',
    title: 'Just-Picked Garden Herb Salad',
    excerpt: 'A five-minute salad that shows off tender hydroponic greens and herbs.',
    time: '5 min',
    difficulty: 'Easy',
    yields: '2 servings',
    ingredients: [
      '4 cups mixed hydroponic lettuce & greens',
      '1/4 cup mixed soft herbs (dill, mint, basil)',
      '2 tbsp olive oil',
      '1 tbsp lemon juice',
      'Flaky salt',
    ],
    steps: [
      'Harvest greens just before serving and rinse gently.',
      'Whisk olive oil, lemon juice, and a pinch of salt.',
      'Toss greens and herbs with just enough dressing to coat.',
      'Finish with flaky salt and serve immediately.',
    ],
    notes: [
      { type: 'p', text: 'The fresher the greens, the less dressing you need. Let the harvest be the star.' },
    ],
  },
]

export function getRecipe(slug) {
  return recipes.find((r) => r.slug === slug)
}
