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
| Forum | `/forum` | Layout only — needs a backend to go live |
| Plant AI | `/plant-ai` | Working demo UI — needs a real AI model |
| About | `/about` | Placeholder copy |
| Contact | `/contact` | Placeholder form |

## What still needs a backend

The **forum**, **user accounts**, **Plant AI model**, and functional **contact/newsletter forms**
need a backend (a database + logins + file storage). Recommended next step: connect
[Supabase](https://supabase.com) (free tier) for accounts, forum posts, and storing plant
submissions, plus an AI service for real diagnoses.

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
