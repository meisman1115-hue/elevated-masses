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
| Plant AI | `/plant-ai` | Working demo UI — needs a real AI model |
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

## Still to do (backend)

- **Plant AI**: connect a real AI model and store submitted photos to train it.
- **Contact / newsletter forms**: wire to email (e.g. Formspree) or Supabase.

## Design system

- **Colors:** neon green `#8BFF3C` / `#A3E635`, ultraviolet purple `#A855F7` / `#C77DFF`,
  near-black background `#080A0C`. Defined in `tailwind.config.js`.
- **Fonts:** Space Grotesk (headings) + Inter (body), loaded in `index.html`.
- **Logo:** `public/elevated-masses-logo.jpg`.

## Replacing placeholders

- **Images/videos:** search the code for `MediaPlaceholder` / `VideoPlaceholder` and swap in real files.
- **Amazon products:** edit `src/pages/Gear.jsx` — set each product's real Amazon `url`; the affiliate
  tag is added automatically.
- **Blog posts / events / seeds:** edit the arrays at the top of the matching file in `src/pages/`.
