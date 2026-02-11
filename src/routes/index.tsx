import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const levels = [
  { num: 1, name: 'Shop Home', path: '/shop', desc: 'Missing landmarks, divs everywhere' },
  { num: 2, name: 'Category', path: '/shop/category', desc: 'No alt text, broken headings' },
  { num: 3, name: 'Product', path: '/shop/product', desc: 'Clickable divs, unlabeled inputs' },
  { num: 4, name: 'Cart', path: '/shop/cart', desc: 'Low contrast, missing ARIA states' },
  { num: 5, name: 'Checkout', path: '/shop/checkout', desc: 'No autocomplete, unlinked errors' },
  { num: 6, name: 'Modal', path: '/shop/popup', desc: 'Focus not trapped, no escape' },
  { num: 7, name: 'Search', path: '/shop/search', desc: 'Keyboard inaccessible filters' },
  { num: 8, name: 'Account', path: '/shop/account', desc: 'ARIA misuse, hidden focusables' },
  { num: 9, name: 'Orders', path: '/shop/orders', desc: 'Complex tables without headers' },
  { num: 10, name: 'Nightmare', path: '/shop/nightmare', desc: 'Everything wrong at once' },
]

function LandingPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header className="bg-slate-900 text-white">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="text-xl font-bold hover:text-sky-400 transition-colors">
            Worst Website
          </Link>
          <ul className="flex gap-6" role="list">
            <li>
              <a
                href="https://barrieretest.at"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                barrieretest.at
              </a>
            </li>
            <li>
              <a
                href="https://solasit.at"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                solasit.at
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-float mb-8">
              <span className="text-8xl" role="img" aria-label="Warning sign">
                ⚠️
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              The Worst Website
              <br />
              <span className="text-sky-400">Ever Built</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
              An intentionally inaccessible e-commerce site, built to test the limits of automated accessibility tools.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg shadow-sky-500/25"
            >
              Enter the Accessibility Hellscape
            </Link>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-6 bg-white" aria-labelledby="problem-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="problem-heading" className="text-4xl font-bold text-slate-900 mb-8 text-center">
              The Problem with Automated Testing
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">What Tools Catch</h3>
                <ul className="space-y-2 text-emerald-700">
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>Missing alt text on images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>Color contrast failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>Missing form labels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>Missing document language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>Empty links and buttons</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">What Tools Miss</h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✗</span>
                    <span>Logical reading order issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✗</span>
                    <span>Misleading link text ("click here")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✗</span>
                    <span>Cognitive overload patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✗</span>
                    <span>Keyboard traps in custom widgets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true">✗</span>
                    <span>Context-dependent ARIA misuse</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-center text-slate-600 text-lg">
              Automated tools catch approximately <strong>30-40%</strong> of accessibility issues. The rest require human judgment.
            </p>
          </div>
        </section>

        {/* Motivation Section */}
        <section className="py-20 px-6 bg-slate-50" aria-labelledby="motivation-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="motivation-heading" className="text-4xl font-bold text-slate-900 mb-8">
              Why I Built This
            </h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                This testbed was created for{' '}
                <a href="https://barrieretest.at" className="text-sky-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  barrieretest.at
                </a>
                , my accessibility testing tool. I needed a controlled environment with known issues to verify my detection capabilities.
              </p>
              <p>
                As part of{' '}
                <a href="https://solasit.at" className="text-sky-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  Solasit
                </a>
                's accessibility consulting practice, I've learned that no automated tool catches everything. This site demonstrates exactly where the gaps are.
              </p>
              <p className="font-medium text-slate-800">
                I built this to test my own tool's limits—and to show you why human testing still matters.
              </p>
            </div>
          </div>
        </section>

        {/* Levels Section */}
        <section className="py-20 px-6 bg-white" aria-labelledby="levels-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="levels-heading" className="text-4xl font-bold text-slate-900 mb-4 text-center">
              10 Levels of Accessibility Hell
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Each page adds more violations. Run axe or pa11y on each level and see what gets caught—and what slips through.
            </p>
            <ol className="grid md:grid-cols-2 gap-4">
              {levels.map((level) => (
                <li key={level.num}>
                  <Link
                    to={level.path}
                    className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold group-hover:bg-sky-500 transition-colors">
                      {level.num}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {level.name}
                      </h3>
                      <p className="text-sm text-slate-500">{level.desc}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-slate-900 text-white" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="text-4xl font-bold mb-6">
              Need Real Accessibility Testing?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Automated tools are just the start. I combine automated scanning with expert manual review and assistive technology testing.
            </p>
            <a
              href="https://solasit.at"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Get an Accessibility Audit
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-800 text-slate-300 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            Built by{' '}
            <a href="https://solasit.at" className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Solasit
            </a>{' '}
            for accessibility education and testing.
          </p>
        </div>
      </footer>
    </>
  )
}
