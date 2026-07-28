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
  {
    slug: 'cannabis-infused-sugar',
    type: 'infused',
    title: 'Cannabis-Infused Sugar',
    cover: '/recipes/cannabis-infused-sugar.jpg',
    excerpt: 'An alcohol-tincture method that turns granulated sugar into a versatile infused sweetener for coffee, tea, and baking.',
    time: '3 days (mostly freezer and drying time)',
    difficulty: 'Intermediate',
    yields: 'About 4 lbs infused sugar',
    dose: "Potency varies significantly by the flower used — there's no reliable way to calculate exact potency per serving without lab testing. Start with a small amount.",
    ingredients: [
      '4 oz cannabis flower',
      '2-liter bottle Everclear or food-grade ethanol (190–200 proof ONLY)',
      'Glass canning jars with lids',
      'Cheesecloth, nut milk bag, or micron bag (for straining)',
      '4 lb bag granulated sugar',
      '2 baking sheets (12" x 18")',
      'Parchment paper',
      'Airtight storage container (clearly labeled)',
    ],
    steps: [
      'Decarb the flower: preheat the oven to 250°F, spread the flower evenly on a baking sheet, bake 15 minutes, stir, then bake another 15 minutes (30 minutes total).',
      'Let the decarbed flower cool completely, then freeze it overnight.',
      'Freeze the bottle of Everclear (or 190–200 proof food-grade ethanol) overnight alongside the flower.',
      'Combine the frozen alcohol and flower in glass canning jars, seal, shake well, and return to the freezer overnight.',
      'Strain the mixture through cheesecloth, a nut milk bag, or a micron bag to separate the plant material from the tincture.',
      'Line two 12"x18" baking sheets with parchment paper and spread the sugar evenly across both.',
      'Pour half the strained tincture over each tray and mix thoroughly until evenly incorporated.',
      'Let the trays sit uncovered in a well-ventilated area, away from any open flame, spark, or heat source, gently mixing every 30 minutes or so until completely dry.',
      'Transfer the finished infused sugar to an airtight, clearly labeled container.',
    ],
    notes: [
      { type: 'callout', text: 'Ethanol is highly flammable. Work in a well-ventilated area, away from any flame, spark, pilot light, or heat source at every step — especially during drying.' },
      { type: 'p', text: 'Edibles take longer to take effect than smoking or vaping. Start small and wait at least 1–2 hours before having more.' },
      { type: 'p', text: "Label the container clearly so it isn't mistaken for regular sugar, and know and follow your local laws regarding cannabis processing, extraction, and homemade edibles." },
    ],
  },
]

export function getRecipe(slug) {
  return recipes.find((r) => r.slug === slug)
}
