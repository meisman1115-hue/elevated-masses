// Blog content. Each post has metadata + a `body` made of simple blocks that
// the BlogPost page renders. To add a post, copy one object and edit it.
// Block types: 'p' (paragraph), 'h2', 'h3', 'ul'/'ol' (items[]), 'callout', 'quote'.

export const posts = [
  {
    slug: 'first-dwc-bucket-weekend-build',
    title: 'Your First DWC Bucket: A Weekend Build',
    tag: 'Beginner',
    cover: '/blog/dwc-bucket-build.jpg',
    excerpt: 'The cheapest, most forgiving way to start growing hydroponically — start to finish in a single weekend.',
    readTime: '6 min',
    date: 'Jul 12, 2026',
    author: 'Elevated Masses',
    body: [
      { type: 'p', text: 'Deep Water Culture (DWC) is where almost every indoor grower should start. There are no pumps to clog, no timers to program, and no drippers to unclog at 2 a.m. Your plant sits with its roots dangling in oxygen-rich, nutrient-filled water, and it grows fast. This is a build you can finish over a weekend with parts from any hardware store.' },
      { type: 'h2', text: 'What you\'ll need' },
      { type: 'ul', items: [
        'A 5-gallon bucket with a lid (opaque — light in the reservoir grows algae)',
        'A 6-inch net pot that fits a hole cut in the lid',
        'An air pump, air stone, and airline tubing',
        'Clay pebbles (hydroton) to hold the net pot',
        'A starter plug or rockwool cube with your seedling',
        'pH test kit and a basic nutrient solution',
      ] },
      { type: 'callout', text: 'Total cost is usually $30–$50 for your first bucket, and most of that (the pump and meters) you reuse forever.' },
      { type: 'h2', text: 'The build, step by step' },
      { type: 'ol', items: [
        'Cut a hole in the bucket lid so the net pot sits snugly with its lip resting on top.',
        'Drill a small hole near the top edge of the bucket for the airline, so you can seal the lid without pinching the tube.',
        'Drop the air stone in the bottom, connect it to the pump, and run the line out through that hole.',
        'Fill the bucket with water until it will just touch the bottom of the net pot — about an inch of contact.',
        'Add nutrients per the label, then check and adjust pH to 5.5–6.5.',
        'Nestle your seedling plug into the net pot and surround it with clay pebbles.',
        'Turn on the air pump and leave it running 24/7.',
      ] },
      { type: 'h2', text: 'The first two weeks' },
      { type: 'p', text: 'Early on, the roots are short and rely on that inch of water contact and the humidity in the bucket. As roots reach down into the reservoir, you can actually lower the water level slightly — roots love the oxygen-rich air gap between the lid and the water line. Top up with pH-balanced water as the level drops.' },
      { type: 'p', text: 'Check pH every couple of days. It will drift as the plant drinks, and drift is the number-one cause of the deficiencies beginners panic about. Keep it in range and most problems never start.' },
      { type: 'callout', text: 'Warm water holds less oxygen and breeds root rot. Keep your reservoir below about 68°F (20°C) — a frozen water bottle floated in the bucket on hot days works in a pinch.' },
      { type: 'h2', text: 'What good looks like' },
      { type: 'p', text: 'Within a week you should see new growth. Within two, roots should be visibly reaching into the water and turning bright white. White, stringy roots mean a happy plant. Brown, slimy, or smelly roots mean low oxygen or warm water — fix the temperature and airflow first, before you reach for any bottle of nutrients.' },
      { type: 'p', text: 'That\'s it. One bucket, one weekend, and you\'ve got a working hydroponic system you fully understand. Once it clicks, scaling up to multiple buckets or a recirculating system is just more of the same idea.' },
    ],
  },
  {
    slug: 'reading-nutrient-deficiencies-leaf-color',
    title: 'Reading Nutrient Deficiencies by Leaf Color',
    tag: 'Troubleshooting',
    cover: '/blog/nutrient-deficiency-leaves.jpg',
    excerpt: 'A visual guide to what yellowing, spotting, and curling are really telling you — and how to respond.',
    readTime: '9 min',
    date: 'Jul 12, 2026',
    author: 'Elevated Masses',
    body: [
      { type: 'p', text: 'Your plant talks to you through its leaves. The trick is learning to read the two most important clues: which leaves are affected (old bottom growth vs. new top growth), and what the damage actually looks like. Those two questions narrow almost every problem down fast.' },
      { type: 'h2', text: 'First, check pH — not your nutrients' },
      { type: 'callout', text: 'Most "deficiencies" in hydroponics are actually lockout: the nutrient is in the water, but the wrong pH stops the roots from absorbing it. Before adding anything, confirm your pH is 5.5–6.5.' },
      { type: 'p', text: 'If you skip this step you\'ll chase symptoms in circles, dumping in more of a nutrient the plant literally cannot take up. Fix pH, wait a few days, and watch new growth before you diagnose further.' },
      { type: 'h2', text: 'Old leaves vs. new leaves' },
      { type: 'p', text: 'Some nutrients are "mobile" — the plant can move them from old leaves to new growth when it runs short. Those deficiencies show up on the bottom, older leaves first. Others are "immobile" and show up on the new top growth first. This single distinction is the most useful diagnostic tool you have.' },
      { type: 'h3', text: 'Shows up on OLD/lower leaves first' },
      { type: 'ul', items: [
        'Nitrogen: uniform pale-green to yellow, starting from the tips and moving in; whole lower leaves fade evenly.',
        'Magnesium: yellowing between the veins while the veins stay green (interveinal), often with rusty spots.',
        'Potassium: yellowing and brown, crispy edges and tips on lower leaves.',
      ] },
      { type: 'h3', text: 'Shows up on NEW/upper leaves first' },
      { type: 'ul', items: [
        'Calcium: new growth is distorted, spotted, or has brown necrotic patches; tips may hook.',
        'Iron: bright yellow new leaves with sharp green veins (a vivid interveinal contrast).',
        'Sulfur: pale, uniformly yellow new growth (looks like nitrogen but on the top instead of the bottom).',
      ] },
      { type: 'callout', text: 'Nitrogen = bottom, uniform, fading up. Iron = top, bright yellow with green veins. Those two cover a huge share of what beginners see.' },
      { type: 'h2', text: 'It might not be a deficiency at all' },
      { type: 'p', text: 'Overwatering-style root problems, light burn, and heat stress all mimic deficiencies. Light burn bleaches the leaves closest to the lamp. Heat stress curls edges upward like tacos. Root rot causes sudden droop despite plenty of water. Rule these out before you adjust your feed.' },
      { type: 'h2', text: 'A calm troubleshooting order' },
      { type: 'ol', items: [
        'Check and correct pH first.',
        'Note whether the damage is on old or new growth.',
        'Match the pattern (uniform, interveinal, edges, spots) to the list above.',
        'Change one thing at a time, then wait 3–5 days.',
        'Judge success by NEW growth — damaged old leaves rarely recover, and that\'s normal.',
      ] },
      { type: 'p', text: 'Snap a photo before and after each change. Over a few grows you\'ll build a personal reference that beats any chart — and if you\'re stuck, that\'s exactly what our Plant AI and the forum are for.' },
    ],
  },
  {
    slug: 'led-grow-lights-specs-explained',
    title: 'LED Grow Lights: What the Specs Actually Mean',
    tag: 'Gear',
    cover: '/blog/led-grow-light.jpg',
    excerpt: 'PPFD, PAR, efficacy, wattage — cut through the marketing and buy the right light for your space.',
    readTime: '7 min',
    date: 'Jul 12, 2026',
    author: 'Elevated Masses',
    body: [
      { type: 'p', text: 'Grow-light listings are a swamp of numbers, and the biggest one — "1000W!" — is usually the most misleading. Here\'s what each spec really means and which ones actually decide whether your plants thrive.' },
      { type: 'h2', text: 'Ignore "equivalent" wattage' },
      { type: 'callout', text: 'A light advertised as "1000W" that actually draws 100W from the wall is a 100W light. Look for the ACTUAL power draw, usually in the fine print or specs table.' },
      { type: 'p', text: 'Real wattage matters for two reasons: your electricity bill, and a rough sanity check on output. But wattage alone tells you nothing about how much usable light reaches your plants. For that, you need PAR and PPFD.' },
      { type: 'h2', text: 'PAR, PPFD, and DLI — the ones that matter' },
      { type: 'ul', items: [
        'PAR is the slice of light (roughly 400–700nm) that plants use for photosynthesis. It\'s a range, not a single number.',
        'PPFD measures how much of that light actually lands on a spot, in micromoles per second per square meter (µmol/m²/s). This is the number that matters — but only at a stated distance and coverage area.',
        'DLI is PPFD added up over a full day. It\'s the truest measure of how much light your plant received.',
      ] },
      { type: 'callout', text: 'A PPFD number with no distance and no coverage area is marketing, not data. "1500 PPFD" directly under the lens means nothing if it\'s 200 at the corners of your tent.' },
      { type: 'h2', text: 'Efficacy: light per watt' },
      { type: 'p', text: 'Efficacy (µmol/J) tells you how efficiently a fixture turns electricity into usable light. Modern quality LEDs land around 2.5–3.0 µmol/J. Higher means more light and less heat for the same power bill. If a listing hides this number, that\'s often a sign it isn\'t flattering.' },
      { type: 'h2', text: 'Rough targets by stage' },
      { type: 'ul', items: [
        'Seedlings & clones: ~200–400 PPFD — gentle, they burn easily.',
        'Vegetative growth: ~400–600 PPFD.',
        'Flowering/fruiting: ~600–900 PPFD (add CO₂ before pushing higher).',
      ] },
      { type: 'h2', text: 'How to actually choose' },
      { type: 'ol', items: [
        'Start from your space: measure your grow area in square feet.',
        'Pick a light rated to cover that area at flowering PPFD, at a realistic hanging height.',
        'Check the real wattage and efficacy — favor 2.5+ µmol/J from a brand that publishes a PPFD map.',
        'Buy a little more coverage than you think you need; dimming down is easy, adding light later is not.',
      ] },
      { type: 'p', text: 'A $30 PAR meter (or a phone app in a pinch) takes the guesswork out entirely. Measure at canopy height across your whole footprint, and adjust hanging height until the numbers match the stage you\'re in.' },
    ],
  },
  {
    slug: 'mixing-your-first-nutrient-reservoir',
    title: 'PPM, EC, and pH: The Essential Grower\'s Guide to Water Quality',
    tag: 'Nutrients',
    cover: '/blog/nutrient-reservoir-mixing.jpg',
    excerpt: 'PPM, EC, and pH — what they measure, how they interact, and the exact ranges and formulas you need to keep your water dialed in from seedling to harvest.',
    readTime: '11 min',
    date: 'Jul 18, 2026',
    author: 'Elevated Masses',
    body: [
      { type: 'p', text: 'Whether you\'re running a hydroponic system or growing in soil, three numbers will define the health of your plants more than almost anything else: PPM, EC, and pH. Get these right and you set the foundation for explosive growth, heavy yields, and healthy plants from seed to harvest. Get them wrong and you\'ll spend your grow chasing deficiencies, lockouts, and mystery problems that no amount of expensive nutrients can fix.' },
      { type: 'p', text: 'This guide breaks down each measurement — what it is, why it matters, when to check it, where to take readings, and how to use it — plus the formulas you need to convert between them.' },

      { type: 'h2', text: 'PPM — Parts Per Million' },
      { type: 'h3', text: 'What Is PPM?' },
      { type: 'p', text: 'PPM stands for Parts Per Million. In the context of growing, it\'s a measurement of the total dissolved solids (TDS) in your water — essentially, how many nutrient particles are floating in every million parts of water. Think of it as the concentration of your nutrient solution. A reading of 1,000 PPM means that for every million units of liquid, 1,000 of those units are dissolved solids (nutrients, minerals, salts).' },
      { type: 'p', text: 'PPM is measured by a TDS meter (Total Dissolved Solids meter), which works by sending a small electrical current through the water and calculating how many dissolved particles are present based on how well the water conducts electricity.' },

      { type: 'h3', text: 'Why Does PPM Matter?' },
      { type: 'p', text: 'Plants can only absorb so many nutrients at one time. Too low and they starve; too high and they experience nutrient burn — the roots become overwhelmed by salt concentrations, water is drawn out of the plant rather than in, and you\'ll see browning leaf tips, curling, and eventually wilting. PPM lets you dial in the exact concentration your plants need at each stage of their life cycle, preventing both underfeeding and overfeeding.' },

      { type: 'h3', text: 'When to Check PPM' },
      { type: 'ul', items: [
        'When mixing your nutrient solution — always check after adding nutrients to confirm you hit your target range before feeding',
        'During the grow — check your reservoir every 2–3 days in hydro; before every watering in soil or coco',
        'On runoff water — this tells you what concentration is actually sitting at the root zone',
        'When troubleshooting — if you see signs of nutrient burn or deficiency, PPM is the first thing to check',
      ] },

      { type: 'h3', text: 'Where to Take PPM Readings' },
      { type: 'ul', items: [
        'Your reservoir or mixing container — the primary source reading',
        'Runoff water — collect the first few milliliters that drain from the bottom of your pot after watering; this reflects root-zone concentration',
        'Mid-reservoir — stir your reservoir before testing; nutrients can stratify if left unmixed',
      ] },

      { type: 'h3', text: 'Target PPM Ranges by Stage' },
      { type: 'table', headers: ['Growth Stage', 'Target PPM (500 scale)'], rows: [
        ['Seedling / Clone', '100–350'],
        ['Early Veg', '350–500'],
        ['Full Veg', '500–800'],
        ['Transition (pre-flower)', '800–1,000'],
        ['Early Flower', '1,000–1,200'],
        ['Peak Flower', '1,200–1,600'],
        ['Late Flower / Flush', '0–50 (flush only)'],
      ] },
      { type: 'callout', text: 'These are general guidelines. Always follow your specific nutrient line\'s recommendations and adjust based on plant feedback.' },

      { type: 'h2', text: 'EC — Electrical Conductivity' },
      { type: 'h3', text: 'What Is EC?' },
      { type: 'p', text: 'EC stands for Electrical Conductivity and measures how well a solution conducts electricity. Pure water conducts electricity poorly; dissolved salts and minerals make it conduct better. The more nutrients dissolved in your water, the higher the EC reading.' },
      { type: 'p', text: 'EC is measured in millisiemens per centimeter (mS/cm) or microsiemens per centimeter (µS/cm). An EC meter works on the same principle as a TDS meter — it sends current through the water — but displays the raw conductivity value rather than calculating it into a PPM estimate.' },
      { type: 'p', text: 'EC is the universal standard used by professional growers, researchers, and nutrient manufacturers worldwide. While PPM varies depending on which conversion scale a meter uses (more on that below), EC is always EC — there\'s no scale ambiguity, making it the more precise and globally consistent measurement.' },

      { type: 'h3', text: 'Why Does EC Matter?' },
      { type: 'p', text: 'EC gives you a direct, unambiguous look at the ionic strength of your nutrient solution. It tells you:' },
      { type: 'ul', items: [
        'Whether your solution is too strong or too weak',
        'How much nutrient has been consumed by your plants (if EC drops between checks, they\'re eating)',
        'Whether your water source (tap, RO, well) is already bringing dissolved solids before you add a single drop of nutrients',
        'How aggressively to feed at each stage',
      ] },
      { type: 'p', text: 'High EC indicates a concentrated solution that can stress plants. Low EC means a weak solution that may not meet nutritional demands. By tracking EC over time, you can develop a precise picture of your plants\' appetite and dial in feeding schedules accordingly.' },

      { type: 'h3', text: 'When to Check EC' },
      { type: 'ul', items: [
        'Before adding nutrients — know your baseline (especially critical if using tap water, which may have EC of 0.3–0.8 mS/cm from minerals)',
        'After mixing your nutrient solution — confirm your target EC',
        'Every 2–3 days in hydro — EC naturally rises as water evaporates (the nutrients stay behind while water is absorbed or evaporates), requiring you to top off with plain water to bring EC back down',
        'On runoff — compare input EC vs. runoff EC to monitor root-zone salt buildup',
      ] },

      { type: 'h3', text: 'Where to Take EC Readings' },
      { type: 'ul', items: [
        'Reservoir — primary measurement point; stir before testing',
        'Runoff — a runoff EC significantly higher than your input EC signals salt buildup; time to flush',
        'Source water — always measure your plain water before adding nutrients to account for baseline TDS',
      ] },

      { type: 'h3', text: 'Target EC Ranges by Stage' },
      { type: 'table', headers: ['Growth Stage', 'Target EC (mS/cm)'], rows: [
        ['Seedling / Clone', '0.2–0.7'],
        ['Early Veg', '0.7–1.0'],
        ['Full Veg', '1.0–1.6'],
        ['Transition (pre-flower)', '1.6–2.0'],
        ['Early Flower', '2.0–2.4'],
        ['Peak Flower', '2.4–3.2'],
        ['Late Flower / Flush', '0.0–0.1 (flush only)'],
      ] },

      { type: 'h2', text: 'Converting Between PPM and EC' },
      { type: 'p', text: 'This is where growers often get confused — and it matters, because a nutrient schedule written in EC looks very different from one written in PPM, even when they\'re describing the same solution.' },
      { type: 'p', text: 'The confusion exists because PPM is a calculated estimate, not a direct measurement. Your meter measures EC and then multiplies it by a conversion factor to produce a PPM number. Different meter manufacturers use different factors, creating three common scales:' },
      { type: 'table', headers: ['Scale', 'Conversion Factor', 'Who Uses It'], rows: [
        ['500 scale (Hanna)', 'EC × 500 = PPM', 'Most common in the US; Hanna instruments'],
        ['700 scale (Truncheon)', 'EC × 700 = PPM', 'Common in Europe; Bluelab instruments'],
        ['640 scale (Eutech)', 'EC × 640 = PPM', 'Used by some commercial meters'],
      ] },
      { type: 'callout', text: 'Check your meter\'s documentation to confirm which scale it uses. Most American meters default to the 500 scale.' },

      { type: 'h3', text: 'The Formulas' },
      { type: 'p', text: 'PPM to EC:' },
      { type: 'ul', items: [
        'EC (mS/cm) = PPM ÷ 500 (500 scale)',
        'EC (mS/cm) = PPM ÷ 700 (700 scale)',
        'EC (mS/cm) = PPM ÷ 640 (640 scale)',
      ] },
      { type: 'p', text: 'EC to PPM:' },
      { type: 'ul', items: [
        'PPM = EC × 500 (500 scale)',
        'PPM = EC × 700 (700 scale)',
        'PPM = EC × 640 (640 scale)',
      ] },

      { type: 'h3', text: 'Quick Conversion Examples (500 Scale)' },
      { type: 'table', headers: ['EC (mS/cm)', 'PPM (500 scale)'], rows: [
        ['0.5', '250'],
        ['1.0', '500'],
        ['1.5', '750'],
        ['2.0', '1,000'],
        ['2.5', '1,250'],
        ['3.0', '1,500'],
      ] },

      { type: 'h3', text: 'Converting Between PPM Scales' },
      { type: 'p', text: 'If you need to convert a reading between the 500 and 700 scales:' },
      { type: 'ul', items: [
        'PPM (700) = PPM (500) × 1.4',
        'PPM (500) = PPM (700) ÷ 1.4',
      ] },
      { type: 'callout', text: 'Example: A reading of 700 PPM on the 500 scale equals 980 PPM on the 700 scale.' },

      { type: 'h2', text: 'pH — Potential of Hydrogen' },
      { type: 'h3', text: 'What Is pH?' },
      { type: 'p', text: 'pH stands for Potential of Hydrogen (or Power of Hydrogen) and measures how acidic or alkaline your water or growing medium is on a scale of 0 to 14. A pH of 7.0 is neutral. Below 7.0 is acidic; above 7.0 is alkaline (basic).' },
      { type: 'p', text: 'pH is measured with a digital pH meter (most accurate), pH drops (colorimetric solution), or pH test strips (least accurate). For serious growing, a calibrated digital meter is non-negotiable.' },

      { type: 'h3', text: 'Why Does pH Matter?' },
      { type: 'p', text: 'This is the most critical concept in plant nutrition: pH determines which nutrients are available to your plant, regardless of how many you\'ve added. Every nutrient has a specific pH range at which it remains soluble and accessible to roots. Outside that range, nutrients precipitate out of solution or become chemically locked — a phenomenon called nutrient lockout.' },
      { type: 'p', text: 'You can feed your plants a perfectly balanced nutrient solution at the right PPM/EC, but if pH is off, they simply cannot absorb what\'s in the water. This is why pH problems mimic nutrient deficiencies — and why so many growers waste money buying more nutrients when what they actually need is to correct their pH.' },
      { type: 'ul', items: [
        'Too low (acidic): Iron, manganese, and zinc become over-available (toxicity risk); calcium, magnesium, and phosphorus become locked out',
        'Too high (alkaline): Iron, manganese, boron, copper, and zinc lock out; nutrient uptake collapses',
      ] },

      { type: 'h3', text: 'When to Check pH' },
      { type: 'ul', items: [
        'Every time you water or feed — without exception',
        'After adding nutrients to your solution (nutrients shift pH)',
        'After pH adjusting — recheck 5–10 minutes after adding pH Up or pH Down to confirm stability',
        'On runoff — compare input vs. output pH; a significant gap signals the root zone is drifting',
        'When plants show signs of deficiency despite adequate feeding — pH lockout is the first suspect',
      ] },

      { type: 'h3', text: 'Where to Check pH' },
      { type: 'ul', items: [
        'Your mixing container or reservoir — always after fully mixing nutrients and before delivering to plants',
        'Runoff water — collect and test immediately; this tells you what\'s happening at the root zone',
        'Your medium directly (soil) — a pH soil probe or slurry test reveals what roots are actually experiencing',
      ] },

      { type: 'h3', text: 'Target pH Ranges by Medium' },
      { type: 'table', headers: ['Growing Medium', 'Ideal pH Range'], rows: [
        ['Hydroponics / DWC', '5.5–6.2'],
        ['Coco Coir', '5.8–6.3'],
        ['Soil', '6.0–7.0'],
      ] },
      { type: 'callout', text: 'Pro tip — pH drift is intentional. Rather than locking your pH at one fixed number, experienced hydro growers deliberately let pH drift within the ideal range (e.g., between 5.5 and 6.2). This cyclical movement ensures different nutrients are optimally available at different points, preventing selective lockout.' },

      { type: 'h3', text: 'How to Adjust pH' },
      { type: 'ul', items: [
        'pH Down — typically phosphoric acid; lowers pH when solution is too alkaline',
        'pH Up — typically potassium hydroxide; raises pH when solution is too acidic',
        'Add pH adjusters in small amounts, mix thoroughly, and retest. Overshoot in one direction and you\'ll be chasing pH back and forth — patience here saves time.',
      ] },

      { type: 'h3', text: 'Calibrate Your pH Meter Regularly' },
      { type: 'p', text: 'A pH meter that drifts even 0.3–0.5 points will cause real problems that are hard to diagnose. Calibrate with buffer solution (7.0 and 4.0 packets) at least every 2 weeks, or any time readings seem off. Store the probe in electrode storage solution — not tap water, not dry.' },

      { type: 'h2', text: 'PPM, EC, and pH Working Together' },
      { type: 'p', text: 'These three measurements don\'t exist in isolation — they interact. Here\'s how to read them as a system:' },
      { type: 'ul', items: [
        'Rising EC + Stable pH → Plants are drinking water but not nutrients. Top off with pH-adjusted plain water to bring EC down and investigate whether pH drift is causing lockout.',
        'Dropping EC + pH drift → Nutrient uptake is occurring. Replenish nutrients and re-pH before next feeding.',
        'Normal EC but deficiency symptoms → Check pH first. Lockout is far more common than actual nutrient absence.',
        'High runoff EC vs. input EC → Salt buildup in root zone. Flush with plain pH-adjusted water until runoff EC approaches input EC.',
        'High runoff pH in soil → Medium has gone alkaline. Common in soil after extended use; treat with pH-down-adjusted watering.',
      ] },

      { type: 'h2', text: 'Quick Reference Summary' },
      { type: 'table', headers: ['Measurement', 'Tool', 'Unit', 'Hydro Sweet Spot', 'Soil Sweet Spot'], rows: [
        ['PPM', 'TDS Meter', 'Parts Per Million', '500–1,600', '500–1,400'],
        ['EC', 'EC Meter', 'mS/cm', '1.0–3.2', '1.0–2.8'],
        ['pH', 'pH Meter', '0–14 scale', '5.5–6.2', '6.0–7.0'],
      ] },
      { type: 'p', text: 'Mastering these three numbers gives you the same visibility into your plants\' nutrition that a blood panel gives a doctor. Check them consistently, keep records, and let the data guide your decisions — your plants will tell you everything you need to know.' },
    ],
  },
]

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}
