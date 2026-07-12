// Tutorial content — currently focused on companion planting. Body uses the
// shared ContentBlocks types. An optional `pairings` array renders as a table.

export const tutorials = [
  {
    slug: 'companion-planting-101',
    category: 'Companion Planting',
    title: 'Companion Planting 101',
    excerpt: 'What companion planting is, why it works, and how to start pairing plants that help each other thrive.',
    readTime: '7 min',
    level: 'Beginner',
    body: [
      { type: 'p', text: 'Companion planting is the practice of growing certain plants near each other because they help one another — deterring pests, improving flavor, attracting pollinators, or making better use of space and nutrients. It\'s one of the oldest gardening techniques, and it works just as well in containers and small indoor setups.' },
      { type: 'h2', text: 'Why it works' },
      { type: 'ul', items: [
        'Pest control: strong-smelling herbs mask the scent of target crops and repel insects.',
        'Attracting helpers: flowers bring in pollinators and predatory insects that eat pests.',
        'Space & light: tall plants shade shorter ones; deep roots and shallow roots share soil without competing.',
        'Flavor & vigor: some pairings are simply reported to grow better and taste better together.',
      ] },
      { type: 'callout', text: 'Start simple: pick one or two pairings from the table below rather than redesigning your whole garden at once.' },
      { type: 'h2', text: 'How to start' },
      { type: 'ol', items: [
        'Choose your main crop (say, tomatoes or peppers).',
        'Pick one companion that helps it (basil, marigold) and one to keep apart.',
        'Give each plant enough room — companions help, but crowding hurts airflow.',
        'Observe over a few weeks and take notes on pests, growth, and yield.',
      ] },
    ],
    pairings: [
      { plant: 'Tomatoes', goodWith: 'Basil, marigold, garlic', avoid: 'Brassicas, fennel' },
      { plant: 'Peppers', goodWith: 'Basil, onions, spinach', avoid: 'Fennel, beans' },
      { plant: 'Lettuce', goodWith: 'Carrots, radish, herbs', avoid: 'Broccoli' },
      { plant: 'Cucumbers', goodWith: 'Beans, dill, nasturtium', avoid: 'Potatoes, sage' },
    ],
  },
  {
    slug: 'herbs-that-protect-your-grow',
    category: 'Companion Planting',
    title: 'Herbs That Protect Your Grow',
    excerpt: 'A handful of aromatic herbs pull double duty as natural pest deterrents. Here are the most useful ones.',
    readTime: '6 min',
    level: 'Beginner',
    body: [
      { type: 'p', text: 'Aromatic herbs are the workhorses of companion planting. Their strong oils confuse and repel many common pests, and several attract the beneficial insects that hunt them. Bonus: you get herbs to cook with.' },
      { type: 'h2', text: 'The most useful protectors' },
      { type: 'ul', items: [
        'Basil: repels thrips, flies, and aphids; a classic tomato partner.',
        'Mint: deters aphids and ants (grow it in its own pot — it spreads aggressively).',
        'Rosemary & thyme: repel a range of beetles and cabbage moths.',
        'Dill & cilantro: attract predatory wasps and ladybugs that eat aphids.',
        'Chives & garlic: their sulfur compounds discourage aphids and mites.',
      ] },
      { type: 'callout', text: 'Contain mint. Planted freely it will take over — keep it in a separate pot near, not in, your main bed.' },
      { type: 'p', text: 'Rotate a few of these around the edges of your grow and you build a fragrant, low-effort first line of defense before you ever reach for a spray.' },
    ],
    pairings: [
      { plant: 'Basil', goodWith: 'Tomatoes, peppers', avoid: 'Rue' },
      { plant: 'Mint', goodWith: 'Cabbage, tomatoes (potted)', avoid: 'Parsley' },
      { plant: 'Dill', goodWith: 'Cucumbers, lettuce', avoid: 'Carrots' },
    ],
  },
  {
    slug: 'companion-planting-in-hydroponics',
    category: 'Companion Planting',
    title: 'Companion Planting in Hydroponics',
    excerpt: 'Companion planting isn\'t just for soil — here\'s how to apply it in a shared reservoir or vertical system.',
    readTime: '8 min',
    level: 'Intermediate',
    body: [
      { type: 'p', text: 'In hydroponics the rules shift a little: plants share the same water and nutrient mix, so the goal is pairing crops with similar pH and EC needs rather than soil chemistry. Done right, you get the pest and pollinator benefits of companion planting without nutrient conflicts.' },
      { type: 'h2', text: 'Pair by needs, not just by tradition' },
      { type: 'ul', items: [
        'Match pH and EC: leafy greens and herbs share a similar mild range and coexist happily.',
        'Avoid mixing heavy feeders (fruiting tomatoes) with light feeders (lettuce) in the same reservoir.',
        'Give aromatic herbs their own net pots nearby to still get pest benefits without root competition.',
      ] },
      { type: 'callout', text: 'The safest hydro companions are plants that want the same water: lettuce, spinach, basil, and other leafy greens/herbs all thrive around EC 1.2–1.8 and pH 5.5–6.5.' },
      { type: 'h2', text: 'A simple starter layout' },
      { type: 'ol', items: [
        'Dedicate one system to leafy greens + herbs with matched nutrient needs.',
        'Keep fruiting crops (tomatoes, peppers) in a separate reservoir tuned to their heavier feeding.',
        'Place potted aromatic herbs around both for pest protection.',
      ] },
    ],
    pairings: [
      { plant: 'Lettuce', goodWith: 'Basil, spinach, kale', avoid: 'Tomatoes (different feeding)' },
      { plant: 'Basil', goodWith: 'Lettuce, chard', avoid: 'None major in hydro' },
    ],
  },
]

export function getTutorial(slug) {
  return tutorials.find((t) => t.slug === slug)
}
