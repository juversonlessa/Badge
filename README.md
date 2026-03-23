# Juverson Lessa — Portfolio

A modern, high-conversion portfolio for a Software Engineer & CEO. Built with vanilla HTML, CSS, and JavaScript. Dynamic content from data files — no build step required.

## Structure

```
badge/
├── index.html          # Single page structure
├── css/
│   └── styles.css      # Design system, layout, components
├── js/
│   └── main.js         # Dynamic rendering, nav, interactions
├── data/
│   ├── projects.js     # Project entries (add here)
│   ├── companies.js    # Company logos & links
│   └── contact.js      # Email, WhatsApp, LinkedIn, GitHub
├── images/
│   ├── FotoPerfil.svg  # Profile photo (copy from old Badge)
│   ├── jotalessa.png
│   ├── luzdocerrado.png
│   ├── jlcmkt.png
│   ├── logoDevTec.svg
│   ├── CAIES.svg
│   └── projects/       # Project previews
│       ├── training-preview.png
│       └── jbills-preview.png
└── README.md
```

## Adding a New Project

1. Open `data/projects.js`
2. Add a new object to the `projects` array:

```javascript
{
  name: "Project Name",
  description: "Short problem + solution description.",
  tech: ["React", "Node.js", "TypeScript"],
  image: "images/projects/my-preview.png",
  live: "https://...",
  github: "https://github.com/..."  // optional
}
```

3. Add the preview image to `images/projects/`
4. Done. No layout or HTML changes needed.

## Updating Contact Info

Edit `data/contact.js`:

```javascript
const contact = {
  email: "your@email.com",
  whatsapp: "5511999999999",  // country code + number, no + or spaces
  linkedin: "https://...",
  github: "https://github.com/..."
};
```

## Images from Previous Badge

If migrating from [juversonlessa/Badge](https://github.com/juversonlessa/Badge), copy these into `images/`:

- `FotoPerfil.svg` — profile photo
- `jotalessa.png`, `luzdocerrado.png`, `jlcmkt.png` — company logos
- `logoDevTec.svg`, `CAIES.svg`

## Deploy to GitHub Pages

### Option A: Same repo (juversonlessa/Badge)

1. Push this project to the Badge repo
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` (or `gh-pages`), folder: `/ (root)`
5. Save. The site will be at `https://juversonlessa.github.io/Badge/`

### Option B: New repo

1. Create a new repo (e.g. `portfolio`)
2. Push this project
3. Settings → Pages → Deploy from branch `main` / root
4. Site: `https://juversonlessa.github.io/portfolio/`

### Option C: Custom domain

Add a `CNAME` file in the project root with your domain. Configure DNS according to [GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Local Preview

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .

# VS Code Live Server
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:8000`.

## Design Notes

- **Theme**: Dark, Stripe/Vercel/Apple inspired
- **Typography**: DM Sans (body), JetBrains Mono (tech)
- **Mobile-first**: Responsive, touch-friendly
- **Accessibility**: Skip link, ARIA labels, reduced-motion support
- **Performance**: Lazy-loaded images, minimal JS
