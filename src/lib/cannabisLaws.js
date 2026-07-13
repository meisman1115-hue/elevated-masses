// Cannabis home-cultivation legal status database for the interactive globe.
//
// IMPORTANT: this is general public information, not legal advice, and
// cannabis law changes frequently (including mid-year legislative and court
// changes). Always verify current local law — including city/county rules,
// which can be stricter than state/provincial/national law — before
// cultivating or carrying cannabis anywhere. See LAST_UPDATED below.
//
// Coverage in this first version:
//   - All 50 US states + DC + Puerto Rico (full detail)
//   - All 13 Canadian provinces/territories (full detail)
//   - ~30 other countries with well-documented status (full detail)
//   - Every other country defaults to "illegal" with general guidance,
//     since that reflects the real global default; specific per-country
//     penalty statutes were not individually verified for every nation.
//
// To add/correct an entry: edit the relevant object below. `status` must be
// 'legal' or 'illegal'. Legal entries should fill `homeGrow` + `possession`;
// illegal entries should fill `penalty`. `note` is optional extra nuance.

export const LAST_UPDATED = '2026-07-13'

export const STATUS = { LEGAL: 'legal', ILLEGAL: 'illegal' }

const g = (homeGrow, possession, note) => ({ status: STATUS.LEGAL, homeGrow, possession, note })
const r = (penalty, note) => ({ status: STATUS.ILLEGAL, penalty, note })

// ---------------------------------------------------------------------------
// United States (keyed by the state name used in the boundary file)
// ---------------------------------------------------------------------------
export const usStateLaws = {
  Alaska: g('Adults 21+ may grow up to 6 plants (3 mature) per person, up to 12 per household with 2+ adults.', 'Up to 1 oz in public.'),
  Arizona: g('Adults 21+ may grow up to 6 plants per person, up to 12 per household.', 'Up to 1 oz (up to 5g of concentrate).'),
  California: g('Adults 21+ may grow up to 6 plants per household, regardless of the number of residents.', 'Up to 1 oz flower / 8g concentrate.'),
  Colorado: g('Adults 21+ may grow up to 6 plants per person (3 mature at a time), up to 12 per household. Some cities restrict this further.', 'Up to 1 oz.'),
  Connecticut: g('Adults 21+ may grow up to 6 plants per person (3 mature), up to 12 per household.', 'Up to 1.5 oz on your person, up to 5 oz at home.'),
  Illinois: r('Home cultivation is not legal for recreational users — only registered medical patients may grow (up to 5 plants). Unlicensed cultivation can be charged as a criminal offense.', 'Recreational purchase/possession is legal; growing your own is not, unless you are a registered medical patient.'),
  Maine: g('Adults 21+ may grow up to 3 mature plants plus additional immature plants and seedlings per person.', 'Up to 2.5 oz.'),
  Maryland: g('Adults 21+ may grow up to 2 plants per person, up to 4 per household with 2+ adults.', 'Up to 1.5 oz.'),
  Massachusetts: g('Adults 21+ may grow up to 6 plants per person, capped at 12 per household regardless of residents.', 'Up to 1 oz in public, up to 10 oz at home.'),
  Michigan: g('Adults 21+ may grow up to 12 plants per household, regardless of the number of adults living there.', 'Up to 2.5 oz in public, up to 10 oz at home.'),
  Minnesota: g('Adults 21+ may grow up to 8 plants per household (up to 4 mature/flowering).', 'Up to 2 oz in public.'),
  Missouri: g('Legal with required state registration — registered adults may grow up to 6 flowering plants (12 total incl. immature); up to 2 registered growers per residence.', 'Up to 3 oz.'),
  Montana: g('Adults 21+ may grow up to 4 mature and 4 seedling plants per household with 2 adults (fewer for a single-adult household).', 'Up to 1 oz.'),
  Nevada: g('Adults 21+ may grow up to 6 plants per person (12 per household), but only if you live more than 25 miles from the nearest licensed dispensary.', 'Up to 1 oz.'),
  'New Jersey': r('Home cultivation remains illegal even though recreational purchase and possession are legal. Unlicensed cultivation is a criminal offense.', 'Possession of legal amounts purchased from a licensed dispensary is fine; growing your own is not.'),
  'New Mexico': g('Adults 21+ may grow up to 6 mature and 6 immature plants per person, capped at 12 mature plants per household.', 'Up to 2 oz.'),
  'New York': g('Adults 21+ may grow up to 6 plants per person (3 mature), capped at 12 per household.', 'Up to 3 oz flower / 24g concentrate.'),
  Ohio: g('Adults 21+ may grow up to 6 plants per person, up to 12 per household.', 'Up to 2.5 oz.'),
  Oregon: g('Adults 21+ may grow up to 4 plants per household, regardless of the number of residents.', 'Up to 1 oz in public, up to 8 oz at home.'),
  'Rhode Island': g('Adults 21+ may grow up to 6 plants per person (3 mature), capped at 12 per household.', 'Up to 1 oz.'),
  Vermont: g('Adults 21+ may grow up to 2 mature and 4 immature plants per person, with an overall household cap.', 'Up to 1 oz.'),
  Virginia: g('Adults 21+ may grow up to 4 plants per household.', 'Up to 1 oz.', 'Licensed retail sales lag behind legalization in some areas — possession and home cultivation are legal statewide regardless.'),
  Washington: r('Home cultivation is not legal for recreational users in Washington State — only registered medical patients may grow (up to 6, or 15 with a healthcare provider\'s authorization). Unlicensed cultivation can be prosecuted.', 'Recreational purchase/possession is legal; growing your own is not, unless you are a registered medical patient.'),
  'District of Columbia': g('Adults 21+ may grow up to 6 plants per household (up to 3 mature).', 'Up to 2 oz.', 'Licensed retail sale is blocked by a federal budget rider, so "gifting" is a common (legally murky) workaround — possession and home cultivation themselves are legal.'),
  Delaware: r('Home cultivation remains illegal despite 2023 recreational legalization for purchase and possession. Unlicensed cultivation is a criminal offense.', 'Possession of legal amounts purchased from a licensed dispensary is fine; growing your own is not.'),
  Alabama: r('Cannabis remains fully illegal outside a very limited medical program that does not allow home cultivation. Cultivation is a felony offense.'),
  Arkansas: r('Recreational cultivation is illegal; even registered medical patients are not permitted to grow at home. Cultivation is a felony offense.'),
  Florida: r('Recreational cultivation is illegal; Florida\'s medical program does not allow patients to grow at home. Cultivation is a felony offense.'),
  Georgia: r('Cannabis remains illegal outside a very limited low-THC oil program. Cultivation is a felony offense.'),
  Hawaii: r('Recreational cultivation is illegal. Registered medical patients may grow a limited number of plants, but there is no general public right to cultivate.', 'Registered medical patients may grow up to 10 plants; this does not apply to recreational users.'),
  Idaho: r('Cannabis is fully illegal with no medical or recreational program. Cultivation is a felony offense.'),
  Indiana: r('Cannabis is fully illegal with no medical or recreational program. Cultivation is a felony offense.'),
  Iowa: r('Recreational cultivation is illegal; only a very limited medical CBD program exists with no home-grow allowance.'),
  Kansas: r('Cannabis is fully illegal with no medical or recreational program. Cultivation is a felony offense.'),
  Kentucky: r('A limited medical program exists, but home cultivation is not permitted even for registered patients. Unlicensed cultivation is a criminal offense.'),
  Louisiana: r('Recreational cultivation is illegal; medical patients cannot grow at home. Cultivation is a felony offense.'),
  Mississippi: r('Recreational cultivation is illegal; medical patients cannot grow at home. Cultivation is a felony offense.'),
  Nebraska: r('A narrow medical program was recently established with no home-grow allowance; recreational cultivation remains illegal.'),
  'New Hampshire': r('Possession of small amounts is decriminalized to a civil fine, but cultivation remains a criminal offense, including for medical patients.'),
  'North Carolina': r('Cannabis is illegal with no comprehensive medical program. Cultivation is a felony offense.'),
  'North Dakota': r('Recreational cultivation is illegal; medical patients cannot grow at home.'),
  Oklahoma: r('Recreational cultivation is illegal. Registered medical patients may obtain a home-grow license.', 'With a medical home-grow license, patients may grow up to 6 mature plus 6 seedling plants; this does not apply to recreational users.'),
  Pennsylvania: r('A medical program exists, but home cultivation is not permitted for patients. Unlicensed cultivation is a criminal offense.'),
  'South Carolina': r('Cannabis is fully illegal with no medical or recreational program. Cultivation is a felony offense.'),
  'South Dakota': r('A medical program exists, but it does not allow home cultivation. Recreational cultivation is illegal.'),
  Tennessee: r('Cannabis is illegal outside a very limited low-THC CBD oil law. Cultivation is a felony offense.'),
  Texas: r('Cannabis is illegal outside a very limited low-THC program. Cultivation is a felony offense.'),
  Utah: r('A medical program exists, but home cultivation is not permitted for patients. Recreational cultivation is illegal.'),
  'West Virginia': r('A medical program exists, but home cultivation is not permitted for patients. Recreational cultivation is illegal.'),
  Wisconsin: r('Cannabis is fully illegal with no medical or recreational program. Cultivation is a felony offense.'),
  Wyoming: r('Cannabis is fully illegal with no medical or recreational program. Cultivation is a felony offense.'),
  'Puerto Rico': r('A medical program exists, but general home cultivation is not permitted. Recreational cultivation is illegal.'),
}

// ---------------------------------------------------------------------------
// Canada (federal Cannabis Act allows home cultivation nationwide, EXCEPT
// Quebec and Manitoba, which have provincially banned it — a well-documented
// and important exception.)
// ---------------------------------------------------------------------------
const federalCA = 'Adults 19+ (18+ in Alberta/Quebec) may grow up to 4 plants per household under the federal Cannabis Act.'
const possessionCA = 'Up to 30g in public.'

export const canadaProvinceLaws = {
  Alberta: g(federalCA, possessionCA),
  'British Columbia': g(federalCA, possessionCA),
  Manitoba: r('Manitoba provincially banned all home cultivation, overriding the federal allowance. Growing cannabis at home is a provincial offense even though cannabis itself is federally legal.'),
  'New Brunswick': g(federalCA, possessionCA),
  'Newfoundland and Labrador': g(federalCA, possessionCA),
  'Northwest Territories': g(federalCA, possessionCA),
  'Nova Scotia': g(federalCA, possessionCA),
  Nunavut: g(federalCA, possessionCA),
  Ontario: g(federalCA, possessionCA),
  'Prince Edward Island': g(federalCA, possessionCA),
  Quebec: r('Quebec provincially banned all home cultivation, overriding the federal allowance. Growing cannabis at home is a provincial offense even though cannabis itself is federally legal.'),
  Saskatchewan: g(federalCA, possessionCA),
  'Yukon Territory': g(federalCA, possessionCA),
}

// ---------------------------------------------------------------------------
// Countries (keyed by ISO 3166-1 alpha-3 code, matching the world GeoJSON)
// ---------------------------------------------------------------------------
export const countryLaws = {
  URY: g('Registered growers may cultivate up to 6 plants per household, or join a licensed cannabis club.', 'Up to 40g/month for registered users.'),
  ZAF: g('Private cultivation and use for personal consumption in a private space is constitutionally protected (2018 Constitutional Court ruling).', 'No codified limit yet — case law based; public use and sale remain restricted.'),
  GEO: g('Personal cultivation and use for private consumption is legal following a 2018 Constitutional Court ruling.', 'Public consumption and sale remain restricted.'),
  MLT: g('Adults may grow up to 4 plants at home for personal use.', 'Up to 7g in public, up to 50g at home.'),
  LUX: g('Adults may grow up to 4 plants per household for personal use.', 'Small personal-use amounts.'),
  DEU: g('Adults may grow up to 3 plants per household (2024 reform).', 'Up to 25g in public, up to 50g at home.'),
  NLD: g('Home growing up to 5 plants per household is tolerated under a long-standing non-enforcement policy, not full statutory legalization.', 'Small personal-use amounts.', 'This is a "tolerance policy" (gedoogbeleid), not a codified legal right — enforcement discretion could change.'),
  CZE: g('Adults may grow up to 3 plants for personal use under a 2024 reform.', 'Possession decriminalized up to a set personal-use threshold.'),
  MEX: g('The Supreme Court has ruled personal cultivation and possession must be permitted; individuals typically need court authorization ("amparo") since comprehensive regulations are still pending.', 'Small personal-use amounts are decriminalized.', 'Full regulatory framework is still a work in progress — process and limits can vary.'),
  JAM: g('Registered households (including for Rastafari religious use) may grow up to 5 plants per household without a license.', 'Up to 2 oz decriminalized.'),
  THA: g('Home cultivation has generally been permitted since 2022 decriminalization, though the regulatory framework has changed direction more than once.', 'Rules have shifted repeatedly — verify the current framework before growing.', 'Thailand\'s cannabis regulations have been unusually volatile — double-check current rules before relying on this.'),
  COL: g('Personal cultivation of up to 20 plants for personal consumption (not for sale) is permitted.', 'Small personal-use amounts (~20g) are decriminalized.'),
  ESP: r('Cultivation is not codified as a legal right. Private, personal-use cultivation via registered "cannabis social clubs" is tolerated under case law, but public cultivation, sale, and trafficking remain criminal offenses.', 'Private club-based cultivation exists in a legal gray area — it is tolerated in practice more than clearly legalized.'),
  CHE: r('Standard-THC cannabis cultivation remains illegal outside limited government pilot sales programs. Only low-THC hemp is broadly legal.', 'A few city-level pilot programs allow limited legal purchase, but general home cultivation is not permitted.'),
  AUS: r('Cannabis cultivation is illegal under federal and most state law.', 'The Australian Capital Territory (ACT) is a notable exception, allowing adults to grow up to 2 plants per person (4 per household) for personal use — this map does not yet break out Australian territories individually.'),
  PRT: r('Portugal\'s well-known decriminalization applies to possession of personal-use quantities of drugs generally — it does not broadly legalize cultivation, which can still be prosecuted as production/trafficking.', 'This is a commonly misunderstood distinction: possession is decriminalized, but growing your own is not.'),
  SGP: r('Among the world\'s strictest drug laws. Cultivation and trafficking-threshold quantities can carry the death penalty; simple possession also carries severe criminal penalties.'),
  MYS: r('Historically among the world\'s strictest. Cultivation and trafficking-threshold quantities can carry the death penalty (discretionary since 2023 reforms) or lengthy imprisonment.'),
  SAU: r('Extremely strict drug laws. Cultivation and trafficking can carry the death penalty; simple possession is also severely punished.'),
  ARE: r('Very strict, historically near-zero-tolerance drug laws. Cultivation and possession can carry lengthy imprisonment.'),
  IDN: r('Very strict drug laws. Cultivation and trafficking-threshold quantities can carry the death penalty; simple possession is a serious criminal offense.'),
  CHN: r('Very strict drug laws. Large-scale cultivation and trafficking can carry the death penalty; cultivation and possession are criminally punished.'),
  RUS: r('Cultivation and possession are criminal offenses, with imprisonment for larger quantities or repeat offenses.'),
  JPN: r('Cultivation is a serious criminal offense under the Cannabis Control Act, carrying imprisonment — including for possession of small personal amounts.'),
  KOR: r('Cultivation and possession are criminal offenses carrying imprisonment; South Korea also enforces its drug laws extraterritorially against citizens who use cannabis abroad.'),
  GBR: r('Cannabis is a Class B controlled drug. Cultivation is a criminal offense that can carry imprisonment, particularly for larger-scale grows.'),
  FRA: r('Cultivation and possession are criminal offenses that can carry fines and imprisonment.'),
  ITA: r('Cultivation of standard-THC cannabis is illegal. Possession of very small quantities is often treated as an administrative rather than criminal matter, but growing your own remains prosecutable.'),
  IND: r('Illegal in most of the country under the Narcotic Drugs and Psychotropic Substances Act; cultivation and possession can carry imprisonment.', 'Traditional/religious use of bhang and some regional exceptions exist locally, but the national default is prohibition.'),
  NGA: r('Cultivation and trafficking are serious criminal offenses under national drug law, carrying substantial prison terms.'),
}

// Fallback applied to any country not explicitly listed above — reflects the
// real global default (prohibition), without inventing country-specific
// numbers that haven't been individually verified.
export const DEFAULT_COUNTRY_STATUS = (name) => r(
  `Cannabis cultivation is illegal under ${name}'s controlled substances laws. Penalties vary by country and can include fines and/or imprisonment. This map has not yet individually verified ${name}'s specific statutes — consult local law before assuming anything.`,
)
