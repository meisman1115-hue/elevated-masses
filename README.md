# Elevated Masses

Urban hydroponics website — React + Vite + Tailwind CSS.

## Running it on your computer

You need [Node.js](https://nodejs.org) installed (already set up on this machine).

Open a terminal in this folder and run:

```bash
npm install     # first time only — downloads the building blocks
npm run dev     # starts the site locally
```

Then open the address it prints (usually http://localhost:5173) in your browser.
The site reloads automatically as changes are made.

## Building for the web (to publish)

```bash
npm run build   # creates an optimized "dist" folder to upload
npm run preview # preview that production build locally
```

## Pages

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | Layout + placeholders |
| Blog | `/blog` | Layout — ready for real posts |
| Gear (Amazon affiliate) | `/gear` | Affiliate tag wired: `mrgrowurown-20` |
| Seeds | `/seeds` | Layout — awaiting affiliate partners |
| Events | `/events` | Layout + placeholder events |
| Forum | `/forum` | Live once Supabase is connected (accounts + threads + replies) |
| Plant AI | `/plant-ai` | Live once `ANTHROPIC_API_KEY` is set (real AI diagnosis) |
| About | `/about` | Placeholder copy |
| Contact | `/contact` | Placeholder form |

## Connecting Supabase (accounts + live forum)

The forum and user accounts run on [Supabase](https://supabase.com) (free tier). Until it's
connected, the site runs in a graceful "demo" mode. To go live:

1. Create a free project at https://supabase.com (New project).
2. In **Project Settings → API**, copy the **Project URL** and the **anon public** key.
3. In this folder, copy `.env.example` to `.env` and paste those two values in.
   Also add them in Vercel: Project → Settings → Environment Variables, named
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. In Supabase, open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This creates the
   profiles / threads / replies tables with security policies.
5. Restart `npm run dev`. Sign up, confirm your email, and the forum is live.

The anon key is a **public** key — it's safe in the browser. All access is controlled by the
Row Level Security policies in `schema.sql` (anyone can read; only signed-in users can post;
you can only edit or delete your own posts).

## Connecting Plant AI (real photo diagnosis)

Plant AI runs on a Vercel serverless function (`api/diagnose.js`) that calls Claude's vision
API to diagnose the uploaded photo. To go live:

1. Get an API key at https://console.anthropic.com (API Keys section). Requires billing set up —
   this is a pay-per-request API, not free, but costs are small per diagnosis.
2. Add it as a Vercel environment variable: Project → Settings → Environment Variables →
   `ANTHROPIC_API_KEY` (no `VITE_` prefix — this one must stay server-side only, never exposed
   to the browser). Also add it to your local `.env` if you want to test with `vercel dev`.
3. Redeploy. The diagnosis form on `/plant-ai` now calls the real model.
4. Optional but recommended: run `supabase/schema-plant-ai.sql` in the Supabase SQL Editor
   (same way as `schema.sql`) to store every submission — this builds the grower-sourced
   dataset mentioned on the page, and creates the `plant-photos` storage bucket.

**Important:** `/api` functions only run on an actual Vercel deployment (or via the Vercel CLI's
`vercel dev`) — they do **not** run under the plain `npm run dev` / Vite dev server used for the
rest of the site. Test this feature on the deployed site.

## Still to do (backend)

- **Contact / newsletter forms**: wire to email (e.g. Formspree) or Supabase.

## Amazon affiliate links — automatic weekly check

Amazon does not allow scraping product prices/titles, and only grants API access (the official
Product Advertising API, for pulling live prices automatically) once an Associate has 3+
qualifying sales in the last 180 days. Until then, [`.github/workflows/check-affiliate-links.yml`](.github/workflows/check-affiliate-links.yml)
runs every Monday on GitHub's servers (no computer needs to be on) and:

- Checks every affiliate link used on the Gear page and in the budget kit builder
- Opens a GitHub issue (and emails you, if GitHub notifications are on) if a real link breaks
- Ignores categories that are still placeholders (clearly listed in the report) so it doesn't
  cry wolf over products that were never real yet
- Closes the issue automatically once links are fixed

Run it manually anytime with `npm run check-links` — it writes `link-check-report.md` locally
(gitignored). To see past runs on GitHub: repo → **Actions** tab → "Weekly affiliate link check".

Once you qualify for the Product Advertising API, this can be upgraded to pull live prices and
titles automatically instead of just checking links — ask to have that wired in at that point.

## Design system

- **Colors:** neon green `#8BFF3C` / `#A3E635`, ultraviolet purple `#A855F7` / `#C77DFF`,
  near-black background `#080A0C`. Defined in `tailwind.config.js`.
- **Fonts:** Space Grotesk (headings) + Inter (body), loaded in `index.html`.
- **Logo:** `public/elevated-masses-logo.jpg`.

## Replacing placeholders

- **Images/videos:** search the code for `MediaPlaceholder` / `VideoPlaceholder` and swap in real files.
- **Amazon products:** edit `src/lib/gear.js` (individual products) or `src/lib/kits.js` (budget kit
  builder categories/tiers). Full `amazon.com/...` links get the affiliate tag added automatically;
  `amzn.to` short links already carry it.
- **Blog posts / events / seeds:** edit the arrays at the top of the matching file in `src/pages/`.
