import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { products } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/nightmare')({
  component: NightmarePage,
})

/**
 * PAGE 10: NIGHTMARE PAGE
 * ALL PREVIOUS VIOLATIONS PLUS:
 * - CSS order breaks reading sequence vs visual order
 * - Auto-playing carousel with no pause
 * - "Click here" link text everywhere
 * - Icon-only actions (even with aria-label, context is wrong)
 * - Tiny touch targets (< 24px)
 * - Motion/animations without prefers-reduced-motion query
 * - Cognitive overload (50+ items, no categorization)
 * - Misleading button labels ("Submit" that actually cancels)
 * - Content injected via CSS ::before/::after
 * - Positive tabindex values
 * - Autofocus on wrong element
 * - Blinking/flashing content
 * - All-caps text for long passages
 * - Justified text with poor spacing
 */
function NightmarePage() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [showFlash, setShowFlash] = useState(true)

  // BAD: Auto-playing carousel without pause control
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // BAD: Flashing content
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFlash((f) => !f)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Generate many items for cognitive overload
  const manyProducts = [...products, ...products, ...products, ...products, ...products]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BAD: Navigation with positive tabindex values */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img src="https://picsum.photos/seed/logo/150/50" className="h-10" tabIndex={5} />
          <div className="flex gap-6">
            <div tabIndex={3} className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop')}>
              Home
            </div>
            <div tabIndex={1} className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop/cart')}>
              Cart
            </div>
            <div tabIndex={2} className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop/account')}>
              Account
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* BAD: Autofocus on promotional banner, not main content */}
        <div
          className="bg-red-600 text-white p-4 rounded-lg mb-6 text-center animate-bounce"
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* BAD: Flashing sale text */}
          <span className={showFlash ? 'visible' : 'invisible'}>🔥 FLASH SALE! 🔥</span>
        </div>

        {/* BAD: CSS flexbox order breaks reading order */}
        <div className="flex flex-col">
          <div className="order-3">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Nightmare</h1>
          </div>
          <div className="order-1">
            <p className="text-gray-600 mb-4">This section appears first visually but third in DOM order.</p>
          </div>
          <div className="order-2">
            <h3 className="text-sm text-gray-500 mb-2">Subtitle that appears second but is second-to-last in DOM</h3>
          </div>
        </div>

        {/* BAD: Auto-playing carousel without controls */}
        <div className="my-8 relative overflow-hidden rounded-lg h-48 bg-gray-200">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center text-2xl font-bold transition-opacity duration-500 ${
                carouselIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'][i],
              }}
            >
              Slide {i + 1} - No way to pause this!
            </div>
          ))}
          {/* BAD: Carousel dots with tiny touch targets */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  carouselIndex === i ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCarouselIndex(i)}
                // BAD: Touch target is only 8x8 pixels
              />
            ))}
          </div>
        </div>

        {/* BAD: "Click here" links */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 mb-2">
            Want to learn more about shipping? <a href="/shipping" className="text-blue-600 hover:underline">Click here</a>.
          </p>
          <p className="text-gray-600 mb-2">
            For returns information, <a href="/returns" className="text-blue-600 hover:underline">click here</a>.
          </p>
          <p className="text-gray-600 mb-2">
            To contact us, <a href="/contact" className="text-blue-600 hover:underline">click here</a>.
          </p>
          <p className="text-gray-600">
            <a href="/faq" className="text-blue-600 hover:underline">Click here</a> for FAQ.
          </p>
        </div>

        {/* BAD: Icon-only buttons with misleading aria-labels */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            {/* BAD: aria-label says "Save" but it actually shares */}
            <div
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300"
              aria-label="Save"
              onClick={() => alert('This actually shares!')}
            >
              📤
            </div>
            {/* BAD: aria-label says "Delete" but it actually favorites */}
            <div
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300"
              aria-label="Delete"
              onClick={() => alert('This actually adds to favorites!')}
            >
              ❤️
            </div>
            {/* BAD: aria-label correct but no visible text */}
            <div
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300"
              aria-label="Print"
            >
              🖨️
            </div>
          </div>
        </div>

        {/* BAD: Misleading button labels */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Your name" className="w-full px-3 py-2 border border-gray-300 rounded" />
            <div className="flex gap-4">
              {/* BAD: "Submit" button actually cancels */}
              <div
                className="px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                onClick={() => alert('Form cancelled! The button said Submit but it lied.')}
              >
                Submit
              </div>
              {/* BAD: "Cancel" button actually submits */}
              <div
                className="px-6 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                onClick={() => alert('Form submitted! The button said Cancel but it lied.')}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>

        {/* BAD: All-caps long text with justified alignment */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
          <div className="uppercase text-justify text-sm leading-tight">
            BY USING THIS WEBSITE YOU AGREE TO ALL TERMS AND CONDITIONS. THIS INCLUDES BUT IS NOT LIMITED TO THE COLLECTION OF YOUR PERSONAL DATA, THE RIGHT TO SEND YOU UNLIMITED MARKETING EMAILS, AND THE ABILITY TO SHARE YOUR INFORMATION WITH THIRD PARTIES. ALL SALES ARE FINAL. NO REFUNDS. NO EXCEPTIONS. IF YOU DO NOT AGREE TO THESE TERMS YOU SHOULD IMMEDIATELY CLOSE THIS BROWSER WINDOW AND NEVER RETURN. WE RESERVE THE RIGHT TO CHANGE THESE TERMS AT ANY TIME WITHOUT NOTICE. CONTINUED USE OF THE SITE CONSTITUTES ACCEPTANCE OF ANY CHANGES. THIS TEXT IS INTENTIONALLY DIFFICULT TO READ BECAUSE IT IS ALL CAPS, JUSTIFIED, AND HAS TIGHT LINE SPACING.
          </div>
        </div>

        {/* BAD: Cognitive overload - way too many products */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">All {manyProducts.length} Products (Unsorted, Uncategorized)</h2>
          <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {manyProducts.map((product, i) => (
              <div
                key={i}
                className="bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-200 overflow-hidden"
                onClick={() => (window.location.hash = `/shop/product?id=${product.id}`)}
              >
                {/* BAD: Tiny image with no alt */}
                <img src={product.image} className="w-full h-12 object-cover" />
                {/* BAD: Truncated text with no way to see full name */}
                <div className="text-xs truncate">{product.name}</div>
                {/* BAD: Low contrast tiny price */}
                <div className="text-[10px] text-[#c0c0c0]">${product.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BAD: CSS content injection */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Important Information</h2>
          <style>{`
            .css-content-bad::before {
              content: "This text is injected via CSS and not accessible to screen readers: ";
            }
            .css-content-bad::after {
              content: " (End of injected content)";
            }
          `}</style>
          <p className="css-content-bad">The visible text here is fine, but the CSS adds hidden content.</p>
        </div>

        {/* BAD: Tiny touch targets for important actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              {/* BAD: Checkbox is only 12x12 pixels */}
              <input type="checkbox" className="w-3 h-3" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS alerts</span>
              <input type="checkbox" className="w-3 h-3" />
            </div>
            <div className="flex items-center justify-between">
              <span>Marketing emails</span>
              <input type="checkbox" className="w-3 h-3" defaultChecked />
            </div>
          </div>
        </div>

        {/* BAD: Horizontal scroll with keyboard trap potential */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Featured Items (Scroll Horizontally)</h2>
          <div className="flex gap-4" style={{ width: '200%' }}>
            {products.map((product, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 bg-gray-100 p-2 rounded"
                tabIndex={0}
              >
                <img src={product.image} className="w-full h-24 object-cover rounded" />
                <div className="text-sm mt-2">{product.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BAD: Form with confusing layout */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Contact Form</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* BAD: Labels visually separated from their inputs */}
            <div className="text-right">Name:</div>
            <input type="text" className="col-span-2 px-3 py-2 border border-gray-300 rounded" />

            <div className="text-right">Email:</div>
            <input type="email" className="col-span-2 px-3 py-2 border border-gray-300 rounded" />

            <div className="text-right">Subject:</div>
            <input type="text" className="col-span-2 px-3 py-2 border border-gray-300 rounded" />

            <div className="text-right">Message:</div>
            <textarea className="col-span-2 px-3 py-2 border border-gray-300 rounded h-24" />

            <div /> {/* Empty cell for alignment */}
            <div className="col-span-2">
              <div className="px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 inline-block">
                Send
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BAD: Fixed floating action button - tiny and no label */}
      <div
        className="fixed bottom-4 right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg text-lg"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        ↑
      </div>

      <Footer />
    </div>
  )
}
