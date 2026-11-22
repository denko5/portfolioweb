# Denis Kombe Karisa: Portfolio Website

A fast, responsive personal portfolio for a Data Analyst, Software Developer, Laravel Developer and Tech Content Creator.
It is a static site (HTML, CSS and vanilla JavaScript). There is no build step and no framework.

Repository: https://github.com/denko5/portfolioweb

## Highlights

- Modern dark design with light sections, a floating pill navigation and an accessible mobile menu.
- Sections: Home, About, Skills, Services, Projects, Content Creation, Contact.
- Projects, social links and the TikTok follower count are edited in one file: `assets/js/data.js`.
- Project cards use real screenshots where they exist and clearly labelled placeholder graphics elsewhere.
- Honest contact form: it opens the visitor's email app (the site has no server, so nothing is faked).
- SEO metadata, Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml`, favicons and a web manifest.
- Keyboard friendly, visible focus styles, reduced motion support, no icon font and no Bootstrap.

## Project structure

```
portfolioweb/
├── index.html                  Page markup (all sections)
├── assets/
│   ├── css/styles.css          All styles (tokens, components, sections)
│   ├── js/
│   │   ├── data.js             EDIT THIS: site config and project list
│   │   └── main.js             Behaviour (nav, projects, dialog, form)
│   ├── img/
│   │   ├── profile-320|480.*   Optimized profile photo (webp and jpg)
│   │   ├── og-image.png        Social sharing preview (1200x630)
│   │   ├── projects/           One image per project (real screenshots or placeholders)
│   │   └── content/            TikTok video covers (3:4)
│   ├── icons/                  Favicon, Apple touch icon, manifest icons
│   └── docs/                   CV, Tableau project report (PDF), Power BI file (.pbix)
├── datasets/                   CSV files used by the dashboard projects
├── favicon.ico
├── site.webmanifest
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Run locally

Open `index.html` directly in a browser, or serve the folder (recommended):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Update content

### Social links, email, WhatsApp and TikTok followers
Open `assets/js/data.js` and edit the `SITE` object.

- `tiktokFollowers`: change `"46K+"` to the new number. It updates the hero and Content section.
- `social.tiktok`: your TikTok profile link (currently `https://www.tiktok.com/@code.ke`).
- `whatsapp`: digits only, international format.
- Instagram is not shown for now. To add it later, add `instagram: "<url>"` to `social`, then add a link in the Contact list and footer of `index.html` (copy the TikTok ones and add an `i-instagram` icon to the sprite).

### Text sections (About, Skills, Services)
Edit the matching `<section>` in `index.html`. Each is plain, readable HTML.

### CV
Replace `assets/docs/Denis_Kombe_CV - ICT Professional.pdff` with the new file, keeping the same name.

## Projects

Every project is one object in the `PROJECTS` array in `assets/js/data.js`.

### Add a project
Copy an existing object, give it a unique `id` and fill in the fields:

```js
{
  id: "my-new-project",
  title: "My New Project",
  category: "software",            // "software" | "dashboards" | "python-sql"
  status: "In development",        // optional badge, remove if not needed
  summary: "One or two sentences shown on the card.",
  problem: "The problem it solves. Use \"\" to hide this line.",
  features: ["Feature one", "Feature two"],
  stack: ["Laravel", "MySQL"],
  image: {
    src: "assets/img/projects/my-new-project.webp",
    alt: "Describe what the image shows",
    placeholder: false
  },
  links: [
    { label: "GitHub repository", url: "https://github.com/denko5/...", type: "github" }
  ]
}
```

Link `type` can be `github`, `live`, `notebook`, `drive` or `report`. Leave `links: []` and set `linkNote` (for example `"Private repository"`) when there is nothing to link to yet.

### Replace a placeholder with a real screenshot
1. Save the screenshot in `assets/img/projects/`. Aim for about 960 px wide and under 100 KB (`.webp` is ideal). A 16:10 shape looks best on the cards.
2. In `data.js`, set that project's `image.src` to the new file and `image.placeholder` to `false`.
3. Update `image.alt` to describe the real screenshot.

The "Placeholder graphic" tag and the placeholder note disappear automatically.

**Privacy:** never use screenshots that show real people, case records, credentials or production data (this matters most for LexOps; the current screenshots show summary counts only).

### Remove a project
Delete its object from the array.

### Items that still need your input
Projects whose `problem` is `""` (NexaHub, Kenya HR Hub, ML Classification Study, MLOps Pipeline) hide that line until you write one. The `problem` text for the others comes from your CV or was derived from the project descriptions, so please review it. Handwritten Digit Classification has no notebook link yet, and Sentence Similarity with BERT and the Social Media Campaign Dashboard have no GitHub link yet: add them to their `links` arrays when ready.

### Extra screenshots
Add a `gallery` array to a project (see LexOps) and the details window shows switchable thumbnails.

## Scrolling banner (marquee)
The band between About and Skills lives in `index.html` under the comment "MARQUEE". Edit the words in the first list, then make the second list (the hidden copy) identical so the loop stays seamless. Its speed is the `42s` value in `.marquee-track` in `styles.css`. It pauses on hover and becomes a static, wrapped list for visitors who prefer reduced motion.

## Content Creation thumbnails
The four covers in `assets/img/content/` were cropped from your TikTok profile screenshot (3:4 shape). To refresh them, replace those files or edit the four `<img>` tags in the Content section of `index.html`.

## Contact form
The site is static, so there is no server to receive messages. The form validates the fields and then opens the visitor's email app with the message prefilled, addressed to the email in `data.js`.

To receive messages directly without an email app, use a form service (for example Formspree or Web3Forms): create a form there, change the `<form>` tag to `action="<your endpoint>" method="POST"`, and remove the form handling in `initContact()` in `main.js`. Check the service's privacy terms first.

## Deploy

**GitHub Pages (simplest):** repository Settings, Pages, deploy from the `main` branch root. The site will be at `https://denko5.github.io/portfolioweb/`.

**Linux VPS with Nginx:** copy the folder to the server and point an Nginx `root` at it.

After you know the final address, update it in:
- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` and the JSON-LD block
- `sitemap.xml` and `robots.txt`

## Performance notes
- No frameworks and no icon fonts. Icons are an inline SVG sprite.
- The profile photo is about 5 to 9 KB (webp), shown at small size.
- Project images are lazy loaded and have fixed aspect ratios to avoid layout shift.
- Fonts (Bricolage Grotesque and Figtree) load from Google Fonts with `display=swap`. If you prefer no third-party requests, download the fonts and host them in `assets/fonts/`.

## Technologies
HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript, native `<dialog>`, inline SVG.
