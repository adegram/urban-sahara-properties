# Urban Sahara Properties & Investments Limited — Landing Page

A clean, mobile-first static website for Urban Sahara Properties & Investments Limited.

## Folder structure

```text
urban-sahara-properties/
├── index.html                 # Root entry point / redirect
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── main.js
├── img/
│   ├── logo-primary.png
│   └── logo-white.png
├── html/
│   └── index.html              # Main landing page
└── docs/
    └── GOOGLE-FORMS-SETUP.md
```

The `html/` folder contains the actual editable landing-page HTML. The root `index.html` simply forwards visitors to it so the custom domain still opens the site from the domain root.

## Brand

Primary brand colour sampled from the supplied logo:

- Navy: `#214373`
- Deep navy: `#0B1D33`
- White: `#FFFFFF`

## Contact details currently used

- Phone / WhatsApp: `09040594952`
- Email: `urbansaharaltd@gmail.com`
- Secondary email: `info@urbansaharaproperties.com`
- Address: `Plot 2097, Life Camp, Abuja`
- Instagram / Facebook: `@urbansaharaltd`
- Domain: `urbansaharaproperties.com`

## Google Forms

The form UI is already included. Before deployment, connect it in:

`js/config.js`

See:

`docs/GOOGLE-FORMS-SETUP.md`

The Google Form must have fields corresponding to:

- Full name
- Phone / WhatsApp
- Email address
- Interest
- Preferred location
- Budget
- Preferred contact
- Message

## Local testing

Because this is a static site, you can open `index.html` directly in a browser. For the best experience, run a simple local server from the project directory:

```bash
python3 -m http.server 5500
```

Then visit:

`http://localhost:5500`

## Deployment

The site can be deployed to any static hosting service. Point:

`urbansaharaproperties.com`

to the hosting provider after deployment.

## Important content note

The page deliberately does not invent property listings, client counts, transaction values or testimonials. Add real listings/testimonials only when Urban Sahara has verified information available.
