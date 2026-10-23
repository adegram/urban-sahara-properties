# Urban Sahara Properties & Investments Limited

Responsive multi-page company website for Urban Sahara Properties & Investments Limited.

## Pages

- `index.html` — Home
- `about.html` — About Urban Sahara
- `services.html` — Buy property, land and investments, selling, and property guidance
- `why-us.html` — Our approach and client benefits
- `how-it-works.html` — Property journey and process
- `contact.html` — Contact information and discovery-call form

## Project structure

```text
urban-sahara-properties/
├── index.html
├── about.html
├── services.html
├── why-us.html
├── how-it-works.html
├── contact.html
├── style.css
├── js/
│   ├── config.js
│   └── main.js
├── img/
│   ├── logo-primary.png
│   ├── logo-white.png
│   └── favicon assets
└── docs/
    └── GOOGLE-FORMS-SETUP.md
```

## Brand

- Primary navy: `#214373`
- Deep navy: `#0B1D33`
- White: `#FFFFFF`

## Editing the hero image

The home page's main visual uses an `img.hero-placeholder-image` element in `index.html`. Change its `src` to a local asset such as `img/abuja-city-gate.jpg` or `img/featured-property.jpg`. Add the image file to the `img/` directory. The `object-fit: cover` styling keeps the visual cropped neatly within its card.

## Contact form

The discovery form appears on `contact.html`. It uses the Google Forms action and field IDs configured in `js/config.js`. Confirm that the Google Form field IDs match the live form before relying on submissions. The form posts through a hidden iframe so visitors remain on the contact page.

See `docs/GOOGLE-FORMS-SETUP.md` for setup notes.

## Interactions

The shared JavaScript in `js/main.js` provides the mobile navigation menu, scroll reveals, active-page navigation state, footer year, and discovery form submission handling.

## Local testing

Run a local web server from the repository root:

```bash
python3 -m http.server 5500
```

Open `http://localhost:5500`.

## Deployment

The site is built from standalone HTML, CSS, and JavaScript files and can be hosted on Vercel or another static hosting service. When GitHub integration is configured in Vercel, commits to the production branch should trigger redeployment.

## Content note

Only add actual property listings, transaction claims, client counts, or testimonials when verified information is available.
