# The Worst Website Ever Built

**[Live Demo](https://narrowcode.github.io/worst-website/)**

An intentionally inaccessible e-commerce site built to test the limits of automated accessibility tools like [axe](https://www.deque.com/axe/) and [pa11y](https://pa11y.org/).

## What is this?

The landing page is fully accessible. The 10 shop pages progressively introduce accessibility violations — from missing landmarks to full-on nightmares. Run your favorite scanner on each level and see what it catches vs. what slips through.

| Level | Page | Key Violations |
|-------|------|---------------|
| 1 | Shop Home | No semantic HTML, divs everywhere |
| 2 | Category | Missing alt text, broken heading hierarchy |
| 3 | Product | Clickable divs, unlabeled form inputs |
| 4 | Cart | Low contrast, status by color only |
| 5 | Checkout | No autocomplete, unlinked error messages |
| 6 | Modal | Focus not trapped, no escape handling |
| 7 | Search | Keyboard inaccessible filters |
| 8 | Account | ARIA misuse, hidden focusable elements |
| 9 | Orders | Complex tables without proper headers |
| 10 | Nightmare | Everything wrong at once |

## Development

```bash
pnpm install
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
pnpm build
```

Static output goes to `dist/`. The repo includes a GitHub Actions workflow that deploys to GitHub Pages on every push to `main`.

To enable: go to your repo's **Settings → Pages → Source** and select **GitHub Actions**.

## Stack

- React + TypeScript
- TanStack Router (file-based routing, hash history)
- Tailwind CSS v4
- Vite

## Credits

Built by [Solasit](https://solasit.at) for accessibility education and workshop use with [barrieretest.at](https://barrieretest.at).
