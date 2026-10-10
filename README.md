# Assar Developer — website

Portfolio + "Hire Me" site built with Next.js (static export).

## Edit your info
Everything (email, prices, projects, stats, social links) is in **`site.config.js`**.
Search for `TODO` and fill in your real details.

## Start earning (do these first)
1. **Add your WhatsApp number** in `site.config.js`. Every "Order now" button then opens WhatsApp with the order already written.
2. **Make payment links**: create products on https://lemonsqueezy.com or https://gumroad.com
   (both pay out to Payoneer / bank in Pakistan), then paste each link into `buyUrl` in `site.config.js`.
   Until you do, buttons open WhatsApp/email so you can still take orders and send a payment link by hand.
3. **Prepare the free UI** promised in the email signup (zip one login UI) and send it to each new subscriber.

## Run on your Mac
```bash
npm install      # first time only
npm run dev      # open http://localhost:3000
```

## Get quote-form messages by email (free)
1. Sign up at https://formspree.io and create a form.
2. Copy the form ID (the part after `/f/`) into `formspreeId` in `site.config.js`.

## Publish to Firebase
Live address: https://assardeveloper-dev.web.app

```bash
npm run deploy   # gets newest videos + GitHub repos, builds, and publishes
```

## Auto-update every 6 hours (GitHub Actions)
`.github/workflows/deploy.yml` rebuilds and publishes the site every 6 hours, so new videos show up by themselves.
One-time setup:
1. Create an empty repo at https://github.com/new named `assar-developer-website`.
2. Push this folder to it:
   ```bash
   git init && git add . && git commit -m "Website"
   git branch -M main
   git remote add origin https://github.com/assardeveloper/assar-developer-website.git
   git push -u origin main
   ```
3. Run `firebase init hosting:github`, choose `assardeveloper/assar-developer-website`, and answer **No**
   to "set up workflow to run a build script" and to overwriting any files. It saves the secret
   `FIREBASE_SERVICE_ACCOUNT_DEAL_406FC` on GitHub, which the workflow already uses.

## (Old) Put it online with Vercel
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → "Add New Project" → import the repo → Deploy.
3. Buy your domain (e.g. assardeveloper.com, about $10/yr on Namecheap or Cloudflare),
   then add it in Vercel → Project → Settings → Domains.
4. Update `url` in `site.config.js` to the new domain.

Alternative: `npm run build` creates an `out/` folder you can upload to Netlify or Firebase Hosting.
