# Accessibility Testing with axe and pa11y

A practical guide to CLI-based accessibility testing using
[axe-core](https://github.com/dequelabs/axe-core) (via `@axe-core/cli`)
and [pa11y](https://pa11y.org/), with examples against the
**Worst Website Ever Built** testbed.

**Testbed URL:** <https://narrowcode.github.io/worst-website/>

The testbed is an e-commerce site with 10 progressive levels of
accessibility violations. The landing page is clean; each shop sub-page
adds more issues. Routes use hash-based URLs:

| Level | Page       | URL                                                       |
| ----- | ---------- | --------------------------------------------------------- |
| 1     | Shop Home  | `https://narrowcode.github.io/worst-website/#/shop`      |
| 2     | Category   | `https://narrowcode.github.io/worst-website/#/shop/category` |
| 3     | Product    | `https://narrowcode.github.io/worst-website/#/shop/product`  |
| 4     | Cart       | `https://narrowcode.github.io/worst-website/#/shop/cart`     |
| 5     | Checkout   | `https://narrowcode.github.io/worst-website/#/shop/checkout` |
| 6     | Modal      | `https://narrowcode.github.io/worst-website/#/shop/popup`    |
| 7     | Search     | `https://narrowcode.github.io/worst-website/#/shop/search`   |
| 8     | Account    | `https://narrowcode.github.io/worst-website/#/shop/account`  |
| 9     | Orders     | `https://narrowcode.github.io/worst-website/#/shop/orders`   |
| 10    | Nightmare  | `https://narrowcode.github.io/worst-website/#/shop/nightmare`|

---

## Installation

```bash
# axe CLI (wraps axe-core in a headless browser)
npm install -g @axe-core/cli

# pa11y (runs HTML_CodeSniffer or axe-core under the hood)
npm install -g pa11y
```

Both tools launch a headless Chromium instance, navigate to a URL, inject
their testing engine, and report violations.

---

## axe CLI

### Basic scan

```bash
axe https://narrowcode.github.io/worst-website/#/shop
```

This runs all default rules against the page and prints results grouped
by violation type.

### Useful flags

```bash
# Only report specific impact levels
axe --include "critical,serious" https://narrowcode.github.io/worst-website/#/shop/cart

# Test against specific WCAG tags
axe --tags wcag2a,wcag2aa https://narrowcode.github.io/worst-website/#/shop/checkout

# Scan a specific CSS selector (e.g. just the main content area)
axe --include "#root" https://narrowcode.github.io/worst-website/#/shop/product

# Exclude a region from scanning
axe --exclude ".promo-banner" https://narrowcode.github.io/worst-website/#/shop

# Disable specific rules
axe --disable color-contrast https://narrowcode.github.io/worst-website/#/shop/cart

# Set a custom delay (ms) to wait before scanning — useful for SPAs
axe --load-delay 3000 https://narrowcode.github.io/worst-website/#/shop/popup
```

### Scanning multiple pages at once

```bash
axe https://narrowcode.github.io/worst-website/#/shop \
    https://narrowcode.github.io/worst-website/#/shop/category \
    https://narrowcode.github.io/worst-website/#/shop/product \
    https://narrowcode.github.io/worst-website/#/shop/cart
```

### Using a config file

Create `axe-config.json`:

```json
{
  "tags": ["wcag2a", "wcag2aa", "best-practice"],
  "resultTypes": ["violations", "incomplete"]
}
```

```bash
axe --show-errors --load-delay 2000 \
    https://narrowcode.github.io/worst-website/#/shop/nightmare
```

---

## pa11y

### Basic scan

```bash
pa11y https://narrowcode.github.io/worst-website/#/shop
```

By default pa11y uses HTML_CodeSniffer with WCAG2AA as the standard.

### Useful flags

```bash
# Choose WCAG standard
pa11y --standard WCAG2AA https://narrowcode.github.io/worst-website/#/shop/category
pa11y --standard WCAG2A https://narrowcode.github.io/worst-website/#/shop/category

# Use axe as the runner instead of HTML_CodeSniffer
pa11y --runner axe https://narrowcode.github.io/worst-website/#/shop/product

# Use both runners for maximum coverage
pa11y --runner htmlcs --runner axe https://narrowcode.github.io/worst-website/#/shop/product

# Wait for a specific element before testing (good for SPAs)
pa11y --wait-for-element "#root main" https://narrowcode.github.io/worst-website/#/shop

# Add a timeout (ms)
pa11y --timeout 30000 https://narrowcode.github.io/worst-website/#/shop/nightmare

# Ignore specific rules/codes
pa11y --ignore "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail" \
    https://narrowcode.github.io/worst-website/#/shop/cart

# Set screen size (helps catch responsive issues)
pa11y --screen-width 375 --screen-height 812 \
    https://narrowcode.github.io/worst-website/#/shop/search
```

### Running actions before testing

pa11y can simulate user interactions before scanning. This is essential
for testing states like open modals or filled forms:

```bash
# Click a button then test the resulting state
pa11y --actions "click element #open-modal" --wait-for-element ".modal" \
    https://narrowcode.github.io/worst-website/#/shop/popup

# Type into a search field then test results
pa11y --actions "set field #search to headphones" \
    https://narrowcode.github.io/worst-website/#/shop/search
```

### Batch testing with pa11y-ci

Install `pa11y-ci` for multi-page scans:

```bash
npm install -g pa11y-ci
```

Create `.pa11yci.json`:

```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["htmlcs", "axe"],
    "timeout": 15000,
    "wait": 2000
  },
  "urls": [
    "https://narrowcode.github.io/worst-website/#/shop",
    "https://narrowcode.github.io/worst-website/#/shop/category",
    "https://narrowcode.github.io/worst-website/#/shop/product",
    "https://narrowcode.github.io/worst-website/#/shop/cart",
    "https://narrowcode.github.io/worst-website/#/shop/checkout",
    "https://narrowcode.github.io/worst-website/#/shop/popup",
    "https://narrowcode.github.io/worst-website/#/shop/search",
    "https://narrowcode.github.io/worst-website/#/shop/account",
    "https://narrowcode.github.io/worst-website/#/shop/orders",
    "https://narrowcode.github.io/worst-website/#/shop/nightmare"
  ]
}
```

```bash
pa11y-ci
```

This runs all 10 levels and gives a pass/fail summary per URL.

---

## Exporting Results

### axe

```bash
# JSON output
axe --save results.json https://narrowcode.github.io/worst-website/#/shop

# CSV output
axe --save results.csv https://narrowcode.github.io/worst-website/#/shop/cart

# Pipe to a file with custom formatting
axe https://narrowcode.github.io/worst-website/#/shop 2>&1 | tee axe-report.txt
```

### pa11y

```bash
# JSON
pa11y --reporter json https://narrowcode.github.io/worst-website/#/shop > report.json

# CSV
pa11y --reporter csv https://narrowcode.github.io/worst-website/#/shop > report.csv

# HTML report
pa11y --reporter html https://narrowcode.github.io/worst-website/#/shop > report.html

# CLI table (default)
pa11y --reporter cli https://narrowcode.github.io/worst-website/#/shop
```

### pa11y-ci

```bash
# JSON summary of all pages
pa11y-ci --json > full-report.json

# Use with pa11y-ci-reporter-html for an HTML dashboard
npm install -g pa11y-ci-reporter-html
pa11y-ci --json | pa11y-ci-reporter-html --destination ./report
```

### Combining reports

A common pattern is to run both tools and merge results:

```bash
# Run both tools, output JSON, and combine
axe --save /tmp/axe.json https://narrowcode.github.io/worst-website/#/shop/checkout
pa11y --reporter json https://narrowcode.github.io/worst-website/#/shop/checkout > /tmp/pa11y.json
```

You can then merge these with a script or feed them into a dashboard.

---

## Tips and Tricks

### 1. Automated tools only catch ~30-40% of issues

Both axe and pa11y are excellent at catching machine-detectable
violations (missing alt text, broken ARIA, contrast ratios). They will
**not** catch:

- Misleading or incorrect ARIA labels (Level 10 has `aria-label="Save"`
  on a share button)
- Logical reading order vs. visual order (CSS `order` property, Level 10)
- Whether alt text is actually meaningful
- Keyboard trap scenarios
- Cognitive overload or confusing UX patterns

Always pair automated scans with manual testing.

### 2. Use `--load-delay` / `--wait` for SPAs

The testbed is a React SPA with hash routing. Content renders
client-side, so give the page time to hydrate:

```bash
axe --load-delay 3000 https://narrowcode.github.io/worst-website/#/shop/popup
pa11y --wait-for-element "#root main" https://narrowcode.github.io/worst-website/#/shop/popup
```

Without this, you may scan a blank or partially-rendered page and get
misleading results.

### 3. Compare levels to see issues introduced incrementally

Run the same command across levels and diff the output:

```bash
pa11y --reporter json https://narrowcode.github.io/worst-website/#/shop > level1.json
pa11y --reporter json https://narrowcode.github.io/worst-website/#/shop/category > level2.json
diff <(jq '.[].code' level1.json | sort) <(jq '.[].code' level2.json | sort)
```

This highlights exactly which rule violations each level adds.

### 4. Use both runners in pa11y for maximum coverage

HTML_CodeSniffer and axe-core have different rule sets. Running both
catches more:

```bash
pa11y --runner htmlcs --runner axe \
    https://narrowcode.github.io/worst-website/#/shop/orders
```

HTML_CodeSniffer tends to be stricter about WCAG technique references.
axe-core is better at component-level ARIA validation.

### 5. Test interactive states, not just page load

Many issues only appear after interaction (open modals, expanded
dropdowns, error states). The testbed's Level 6 (popup) auto-opens a
modal after 2 seconds. Use pa11y's actions or a custom script:

```bash
pa11y --actions "wait for element .modal-overlay" \
    https://narrowcode.github.io/worst-website/#/shop/popup
```

For more complex flows, use `@axe-core/playwright` or
`@axe-core/puppeteer` in a script.

### 6. Watch for "incomplete" results in axe

axe reports three categories: violations, passes, and **incomplete**.
Incomplete means axe found something suspicious but couldn't
programmatically confirm it's a violation. These need manual review.

```bash
# axe prints incomplete checks by default — don't ignore them
axe https://narrowcode.github.io/worst-website/#/shop/account
```

### 7. Filter by impact to prioritize fixes

axe assigns impact levels: critical, serious, moderate, minor. Start
with the worst:

```bash
axe --include "critical,serious" \
    https://narrowcode.github.io/worst-website/#/shop/nightmare
```

### 8. Test at multiple viewport sizes

Some accessibility issues only appear at certain breakpoints (e.g. touch
target sizes on mobile, content reflow):

```bash
pa11y --screen-width 1440 --screen-height 900 \
    https://narrowcode.github.io/worst-website/#/shop/search

pa11y --screen-width 375 --screen-height 812 \
    https://narrowcode.github.io/worst-website/#/shop/search
```

### 9. Color contrast is noisy but important

Level 4 (cart) introduces contrast violations. Tools will flag every
instance separately, which can flood your report. You can isolate
contrast issues:

```bash
# Only contrast
axe --rules color-contrast https://narrowcode.github.io/worst-website/#/shop/cart

# Everything except contrast
axe --disable color-contrast https://narrowcode.github.io/worst-website/#/shop/cart
```

### 10. Things to check manually after running tools

After the automated scan, walk through these by hand:

- **Keyboard navigation:** Tab through the entire page. Can you reach
  and operate every interactive element? (Levels 3, 6, 7, 8 have traps)
- **Screen reader:** Fire up VoiceOver / NVDA and navigate. Do headings,
  landmarks, and link text make sense?
- **Zoom to 200%:** Does content reflow without horizontal scrolling?
  (Level 10 breaks this)
- **Reduced motion:** Enable `prefers-reduced-motion` in dev tools.
  Does animation stop? (Level 10 has flashing content)
- **Logical reading order:** Does the DOM order match the visual order?
  (Level 10 uses CSS `order` to scramble it)
- **Meaningful labels:** Are ARIA labels accurate, or do they lie?
  (Level 10 has deliberately misleading labels)

---

## Quick Reference

| Task                            | axe                                      | pa11y                                      |
| ------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Basic scan                      | `axe <url>`                              | `pa11y <url>`                              |
| JSON export                     | `axe --save out.json <url>`              | `pa11y --reporter json <url> > out.json`   |
| CSV export                      | `axe --save out.csv <url>`               | `pa11y --reporter csv <url> > out.csv`     |
| HTML report                     | -                                        | `pa11y --reporter html <url> > out.html`   |
| WCAG level filter               | `axe --tags wcag2a <url>`                | `pa11y --standard WCAG2A <url>`            |
| Wait for SPA render             | `axe --load-delay 3000 <url>`            | `pa11y --wait-for-element "sel" <url>`     |
| Multi-page batch                | `axe <url1> <url2> <url3>`              | `pa11y-ci` (with `.pa11yci.json`)          |
| Ignore specific rules           | `axe --disable rule-name <url>`          | `pa11y --ignore "code" <url>`              |
| Impact filtering                | `axe --include "critical,serious" <url>` | -                                          |
| Simulate interaction before scan| -                                        | `pa11y --actions "click element #btn" <url>`|
