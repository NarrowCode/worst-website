import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/popup')({
  component: PopupPage,
})

/**
 * PAGE 6: Modal/Popup Demo
 * VIOLATIONS (cumulative +):
 * - Focus not trapped inside modal
 * - No role="dialog" or aria-modal
 * - No escape key handling
 * - Background content still interactive
 * - No live region for dynamic content
 * - Modal title not announced
 */
function PopupPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState('')

  // Show notification without live region
  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 3000)
  }

  // Auto-open modal after 2 seconds (annoying AND inaccessible)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img src="https://picsum.photos/seed/logo/150/50" className="h-10" />
          <div className="flex gap-6">
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop')}>
              Home
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h3 className="text-sm text-gray-500 mb-2">Modal & Popup Demo</h3>
        <h1 className="text-3xl font-bold mb-8">Special Offers</h1>

        <p className="text-gray-600 mb-8">
          This page demonstrates various modal and popup accessibility issues.
          A popup should appear automatically after 2 seconds.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Trigger buttons */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <h5 className="font-medium mb-2">Open Newsletter Modal</h5>
            <p className="text-gray-500 text-sm">Click to see our inaccessible modal</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
            onClick={() => showNotification('Item added to cart!')}
          >
            <h5 className="font-medium mb-2">Trigger Notification</h5>
            <p className="text-gray-500 text-sm">Shows a notification without live region</p>
          </div>

          {/* Tooltip trigger */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative group">
            <h5 className="font-medium mb-2">Hover for Tooltip</h5>
            <p className="text-gray-500 text-sm">Tooltip only appears on hover (not keyboard accessible)</p>
            {/* BAD: Tooltip only on hover, not keyboard accessible */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              This is important information!
            </div>
          </div>

          {/* Dropdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h5 className="font-medium mb-2">Dropdown Menu</h5>
            <div className="relative">
              {/* BAD: Dropdown without keyboard support */}
              <div
                className="px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
                onClick={(e) => {
                  const menu = e.currentTarget.nextElementSibling as HTMLElement
                  menu.classList.toggle('hidden')
                }}
              >
                Select an option ▼
              </div>
              {/* BAD: No aria-expanded, no keyboard navigation */}
              <div className="hidden absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b shadow-lg z-10">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {}}>
                  Option 1
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {}}>
                  Option 2
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {}}>
                  Option 3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links below modal - should not be reachable when modal is open */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h5 className="font-medium mb-4">These links should be blocked when modal is open:</h5>
          <div className="flex gap-4">
            <a href="/shop" className="text-blue-600 hover:underline">
              Shop Home
            </a>
            <a href="/shop/category" className="text-blue-600 hover:underline">
              Categories
            </a>
            <a href="/shop/cart" className="text-blue-600 hover:underline">
              Cart
            </a>
          </div>
        </div>
      </div>

      {/* BAD: Notification without live region */}
      {notification && (
        // BAD: No role="alert" or aria-live
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      {/* BAD: Modal without proper accessibility */}
      {isModalOpen && (
        <>
          {/* BAD: Overlay doesn't block interaction properly */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsModalOpen(false)}
          />

          {/* BAD: Modal div without role="dialog", aria-modal, aria-labelledby */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md p-6">
            {/* BAD: Close button with no accessible name */}
            <div
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </div>

            {/* BAD: No aria-labelledby pointing to this */}
            <h2 className="text-2xl font-bold mb-4">Subscribe to Newsletter!</h2>

            <p className="text-gray-600 mb-6">
              Get 10% off your first order when you subscribe to our newsletter.
            </p>

            {/* BAD: Form without proper labels */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <div
                className="w-full bg-blue-600 text-white py-2 px-4 rounded text-center cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  showNotification('Subscribed!')
                  setIsModalOpen(false)
                }}
              >
                Subscribe
              </div>

              <div
                className="text-center text-gray-500 cursor-pointer hover:underline text-sm"
                onClick={() => setIsModalOpen(false)}
              >
                No thanks
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}
