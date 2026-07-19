// Content blocks for the seed/strain guide on the Seeds page. Same block
// shape ContentBlocks.jsx renders for blog posts — see that file for types.
export const seedsGuideBlocks = [
  { type: 'p', text: "Before you grow anything, it all starts with one tiny little seed. But not all seeds are the same — and picking the right one can make your whole grow go way smoother. Let's break it down nice and easy." },

  { type: 'h2', text: 'Part 1: Types of Seeds' },
  { type: 'p', text: "Think of seeds like kids in a classroom. Some classes are mixed, some are all girls, and some kids just do their own thing no matter what. That's basically the difference between Regular, Feminized, and Autoflower seeds." },

  { type: 'h3', text: 'Regular Seeds' },
  { type: 'p', text: 'Regular seeds are like a bag of mystery marbles. When you plant one, you don\'t know if it\'s going to grow into a boy plant (a male) or a girl plant (a female) — it\'s about a 50/50 chance either way.' },
  { type: 'p', text: 'Why does that matter? Only female plants grow the flowers we\'re after. Male plants grow pollen sacs instead, and if a male hangs around the girls too long, it will pollinate them and the females will spend their energy making seeds instead of big, resinous buds.' },
  { type: 'p', text: 'Regular seeds are the go-to for breeders — people trying to create new strains or cross different genetics together. If you want to make your own seeds or hunt for special phenotypes, you need males. The catch: you have to watch your plants carefully, identify the males early (usually around week 1–3 of flower), and pull them before they cause problems.' },
  { type: 'callout', text: 'Regular seeds are photoperiod plants — they rely on their light schedule to know when to flower. Indoors, growers trigger this by switching from 18 hours of light to 12.' },

  { type: 'h3', text: 'Feminized Seeds (Fem Seeds)' },
  { type: 'p', text: 'Feminized seeds are like an all-girls team — guaranteed. Through a special process using a silver-based solution, breeders can stress a female plant into producing pollen. That pollen only carries female genetics, so when it\'s used to make seeds, the offspring come out female 99%+ of the time. No males. No guessing. No surprises.' },
  { type: 'ul', items: [
    'Every plant you grow is working toward producing flowers',
    'No wasted space, time, or nutrients on males',
    'Great for beginners and experienced growers alike',
  ] },
  { type: 'callout', text: 'Feminized seeds are still photoperiod plants — they rely on their light schedule to know when to flower. Indoors, growers trigger this by switching from 18 hours of light to 12.' },

  { type: 'h3', text: 'Autoflower Seeds (Autos)' },
  { type: 'p', text: 'Autoflowers are like that one kid who does everything on their own schedule — whether you\'re ready or not. Auto genetics trace back to Cannabis ruderalis, a wild subspecies that evolved in cold, northern climates where the sun doesn\'t behave the same way it does closer to the equator. Because of that, ruderalis plants learned to flower based on age instead of light.' },
  { type: 'p', text: 'Translation: autos flower automatically, usually around 3–5 weeks after germination — no light schedule change needed.' },
  { type: 'ul', items: [
    'Faster from seed to harvest: most finish in 8–10 weeks total',
    'Can run them on 18–20 hours of light the whole time',
    'Smaller and more compact — great for tight spaces',
    'Perfect for beginners or anyone who wants a quick turnaround',
  ] },
  { type: 'p', text: 'The trade-off: because they\'re on a strict internal clock, autos don\'t give you as much time to recover from mistakes or to train the plant. What you see is mostly what you get.' },
  { type: 'callout', text: 'You can find autoflower seeds that are also feminized — giving you the best of both worlds: all female, all automatic. These are called feminized autos and are super popular for home growers.' },

  { type: 'h2', text: 'Part 2: Types of Strains' },
  { type: 'p', text: 'Now let\'s talk about the type of plant — also known as the strain. This comes down to where the plant originally came from and what its genes look like. There are three main categories: Indica, Sativa, and Hybrid. Think of these like dog breeds — a Chihuahua and a Great Dane are both dogs, but they look and act completely differently.' },

  { type: 'h3', text: 'Indica' },
  { type: 'p', text: 'Indicas are the short, stocky ones — like a little linebacker. They originally come from mountainous regions like Afghanistan, Pakistan, and India, where the growing season is shorter and cooler. To survive, they evolved to grow compact and bushy with wide, dark green leaves and dense buds.' },
  { type: 'ul', items: [
    'Height: usually 2–4 feet indoors — short and manageable',
    'Flowering time: around 6–8 weeks once triggered',
    'Total grow time (photoperiod): roughly 14–18 weeks from seed to harvest',
    'Buds: dense, chunky, and often heavy with resin',
    'Tent size: a standard 4–5 foot tall tent handles most indicas comfortably',
  ] },

  { type: 'h3', text: 'Sativa' },
  { type: 'p', text: 'Sativas are the tall, lanky ones — like a basketball player. They come from equatorial regions like Colombia, Mexico, Thailand, and Africa, where the sun shines for a long time and the growing season stretches way out. These plants had room to grow, and grow they did.' },
  { type: 'ul', items: [
    'Height: can reach 5–10+ feet outdoors, and 5–7 feet indoors in flower if you let them go',
    'Flowering time: 10–14 weeks — sometimes longer',
    'Total grow time (photoperiod): can be 20–26+ weeks from seed to harvest — the longest of the three',
    'Buds: lighter and fluffier, but they stack up along long branches',
    'Tent size: sativas can outgrow a standard 5-foot tent fast — plan for at least 6–8 feet, or use training techniques like LST, topping, or a SCROG net',
  ] },
  { type: 'callout', text: 'Sativas go through "the stretch" when you flip them to flower — they can literally double or triple in height during the first 2–3 weeks of flowering. If you start a sativa at 2 feet and expect a 4-foot plant at harvest, think again.' },

  { type: 'h3', text: 'Hybrid' },
  { type: 'p', text: 'Hybrids are the mix — a little bit of everything. The honest truth is that almost every strain you\'ll find today is a hybrid. Decades of crossbreeding indicas and sativas have created thousands of unique genetics that blend traits from both worlds. Hybrids are usually labeled as indica-dominant, sativa-dominant, or balanced (50/50) depending on which parent the plant takes after more.' },
  { type: 'ul', items: [
    'Height: totally depends on the specific strain — short and bushy, tall and stretchy, or right in the middle',
    'Flowering time: usually lands between 8–10 weeks, though sativa-dominant hybrids can push longer',
    'Total grow time: typically 16–20 weeks with a standard veg period',
    'Tent size: read the strain info from your seed bank — sativa-dom hybrids can still stretch significantly',
  ] },
  { type: 'p', text: 'Breeders use crossbreeding to combine the best traits from both plants — like the fast flowering time of an indica with the flavor and effect profile of a sativa. Most of your favorite named strains are hybrids.' },

  { type: 'h2', text: 'Part 3: Which Strains Need a Taller Tent?' },
  { type: 'p', text: "Here's a quick cheat sheet so you know what you're working with before you pop those beans:" },
  { type: 'table', headers: ['Strain Type', 'Typical Indoor Height', 'Recommended Tent Height'], rows: [
    ['Indica', '2–4 ft', '4–5 ft'],
    ['Hybrid (Indica-dom)', '3–5 ft', '5 ft'],
    ['Hybrid (Sativa-dom)', '4–7 ft', '6–7 ft'],
    ['Sativa', '5–10+ ft', '6–8 ft (+ training)'],
    ['Autoflower', '1–3 ft', '3–4 ft'],
  ] },
  { type: 'callout', text: "The golden rule: always check the strain's info sheet from the seed bank. They'll list the expected height range, flowering time, and sometimes even the expected stretch percentage. Don't skip that step — your tent ceiling will thank you." },

  { type: 'h2', text: 'Putting It All Together' },
  { type: 'p', text: "Here's the big picture in plain English:" },
  { type: 'ul', items: [
    'Regular seeds → best for breeders and pheno hunters who want males',
    'Feminized seeds → best for growers who want guaranteed females with control over their light cycle',
    'Autoflower seeds → best for beginners or fast, simple grows with minimal space',
    'Indica strains → short, fast, compact — great for small tents',
    'Sativa strains → tall, slow, stretchy — need space and patience (or aggressive training)',
    'Hybrid strains → somewhere in between — always read the strain data',
  ] },
  { type: 'p', text: 'No matter what seed you choose, understanding these basics puts you ahead of 90% of first-time growers. The seed is just the beginning — but picking the right seed is where a great grow starts.' },
]
