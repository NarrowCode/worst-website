import { createFileRoute } from '@tanstack/react-router'
import { products } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/cart')({
  component: CartPage,
})

/**
 * PAGE 4: Shopping Cart
 * VIOLATIONS (cumulative +):
 * - Color contrast 2.5:1 (fails AA - needs 4.5:1)
 * - :disabled styling without aria-disabled
 * - Quantity displayed as span (not editable)
 * - Remove button with no accessible name
 * - Status conveyed only by color
 */
function CartPage() {
  const cartItems = products.slice(0, 3)

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
        <h3 className="text-sm text-gray-500 mb-2">Review your items</h3>
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
              <img src={item.image} className="w-24 h-24 object-cover rounded" />

              <div className="flex-1">
                <h5 className="font-medium">{item.name}</h5>

                {/* BAD: Low contrast text - gray on light gray (#9ca3af on #f3f4f6 = ~2.5:1) */}
                <p className="text-[#9ca3af] text-sm mt-1">{item.description}</p>

                {/* BAD: Status conveyed only by color */}
                <div className="mt-2">
                  {index === 0 && (
                    // BAD: Green text for "in stock" - no text indicator
                    <span className="text-green-500 text-sm">●</span>
                  )}
                  {index === 1 && (
                    // BAD: Yellow for "low stock" - no text
                    <span className="text-yellow-500 text-sm">●</span>
                  )}
                  {index === 2 && (
                    // BAD: Red for "out of stock" - no text
                    <span className="text-red-500 text-sm">●</span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-3">
                  {/* BAD: Quantity as non-interactive span */}
                  <div className="flex items-center gap-2">
                    {/* BAD: Button with no accessible name */}
                    <div
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
                      onClick={() => {}}
                    >
                      -
                    </div>
                    {/* BAD: Quantity not an input - can't be changed */}
                    <span className="w-8 text-center">1</span>
                    <div
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
                      onClick={() => {}}
                    >
                      +
                    </div>
                  </div>

                  {/* BAD: Price with low contrast */}
                  <span className="text-[#9ca3af]">${item.price}</span>
                </div>
              </div>

              {/* BAD: Remove button with no accessible name - just X */}
              <div
                className="text-gray-400 hover:text-red-500 cursor-pointer text-xl"
                onClick={() => {}}
              >
                ×
              </div>
            </div>
          ))}
        </div>

        {/* Cart summary */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between mb-2">
            {/* BAD: Low contrast */}
            <span className="text-[#9ca3af]">Subtotal</span>
            <span>$254.97</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[#9ca3af]">Shipping</span>
            <span>$9.99</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total</span>
            <span>$264.96</span>
          </div>

          {/* BAD: Disabled-looking button without proper aria */}
          <div
            className={`mt-4 w-full py-3 px-6 rounded-lg text-center font-medium ${
              cartItems.some((_, i) => i === 2)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
            }`}
            onClick={() => {
              // BAD: No aria-disabled, just visual styling
              if (!cartItems.some((_, i) => i === 2)) {
                window.location.hash = '/shop/checkout'
              }
            }}
          >
            Proceed to Checkout
          </div>

          {/* BAD: Help text with very low contrast */}
          <p className="mt-4 text-center text-[#d1d5db] text-sm">
            Some items in your cart are out of stock
          </p>
        </div>

        {/* Promo code section */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm font-medium mb-2">Have a promo code?</div>
          <div className="flex gap-2">
            {/* BAD: No label */}
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
            {/* BAD: Div as button */}
            <div className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
              Apply
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
