# VA STATYBA — website

A modern one-page portfolio site for UAB „VA STATYBA“, a construction company in Alytus, Lithuania.

Static HTML, CSS and vanilla JavaScript. It needs no build step and has no dependencies. Fonts load from Google Fonts.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

```
index.html            page markup; the Lithuanian copy lives here
assets/css/style.css  design tokens, layout, responsive rules
assets/js/iso.js      small isometric "massing model" renderer (SVG)
assets/js/data.js     English copy, services, projects and 3D scenes
assets/js/main.js     language switch, hero animation, filters, modal, form
assets/img/           logo.svg, logo-light.svg (for dark backgrounds), favicon.svg
```

## Brand

- Accent colour: logo green `#00963f`. It is set as `--brand` in `style.css`, with a deeper tint for buttons behind white text and a brighter one for highlights on dark sections.
- The logo SVGs were vectorised from a small PNG. If the company has an original vector logo (AI/EPS/SVG/PDF), swap it in for the sharpest result. The header uses an inline copy in `index.html`.

## Features

- **LT / EN** language switch. Lithuanian is the default, and the visitor's choice is remembered.
- **Animated hero.** An isometric city block builds itself floor by floor, with lit windows and a working tower crane. Built in SVG.
- **Services** open as an accordion, with a matching 3D model for each service.
- **Project portfolio** with category filters and a detail modal.
- **Process** timeline, ISO certifications and a careers call-to-action.
- **Contact form.** It opens the visitor's email app with the enquiry pre-filled and sends it to `info@vastatyba.lt`. There is no backend.
- Responsive from 360 px up. Supports keyboard navigation and focus states, and respects `prefers-reduced-motion`.

## Before going live — replace placeholder content

The company facts (founded 2007, 100+ employees, ISO 9001/14001/45001, special structures and heritage works, address, phone, email, company and VAT codes) come from public sources.

**The eight projects in `assets/js/data.js` → `PROJECTS` are representative placeholders.** Replace each one's title, location, description and scope with real completed work. To show a real photo instead of the generated 3D model, add an `image` field:

```js
{
  cat: 'residential',            // residential | commercial | industrial | public | heritage
  scene: 'residential',          // fallback 3D model (see SCENES)
  size: 'wide',                  // optional: 'wide' (2 columns) or 'tall' (2 rows)
  image: 'assets/img/projects/my-project.jpg',
  lt: { t: '…', place: '…', d: '…', works: '…' },
  en: { t: '…', place: '…', d: '…', works: '…' }
}
```

Also check:
- the "Reply within 1 business day" note in the contact form
- the Facebook link in the footer
- the `og:` meta tags in `index.html`. Add an `og:image` once you have a photo.

## Contact form backend (optional)

The form currently uses `mailto:`. To receive submissions directly, point it at a form service such as Formspree or Netlify Forms, or at your own endpoint. The submit handler is in `assets/js/main.js` under `contact form`.
