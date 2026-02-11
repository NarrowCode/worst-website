import { createFileRoute } from '@tanstack/react-router'
import { products } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/product')({
  component: ProductPage,
})

/**
 * PAGE 3: Product Detail
 * VIOLATIONS (cumulative +):
 * - Clickable div instead of button
 * - Form inputs without associated labels
 * - Icon fonts (i elements) without accessible text
 * - Image used as button
 * - tabindex on non-interactive elements
 */
function ProductPage() {
  const product = products[0] // Using first product as demo

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img src="https://picsum.photos/seed/logo/150/50" className="h-10" />
          <div className="flex gap-6">
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop')}>
              Home
            </div>
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop/cart')}>
              Cart
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-sm text-gray-500 mb-2">Product Details</h3>
        <h1 className="text-3xl font-bold mb-8">{product.name}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product image */}
          <div>
            <img src={product.image} className="w-full rounded-lg" />
            {/* BAD: Thumbnail images with no alt, wrapped in clickable div */}
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="cursor-pointer border-2 border-transparent hover:border-blue-500 rounded"
                  onClick={() => {}}
                  // BAD: tabindex on div makes it focusable but not properly interactive
                  tabIndex={0}
                >
                  <img src={`https://picsum.photos/seed/thumb${i}/100/100`} className="w-16 h-16 object-cover rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-4">${product.price}</div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* BAD: Form without proper labels */}
            <div className="space-y-4 mb-6">
              {/* BAD: Input without associated label */}
              <div>
                <div className="text-sm font-medium mb-1">Quantity</div>
                {/* BAD: No label element, no aria-label */}
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-20 px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              {/* BAD: Select without label */}
              <div>
                <div className="text-sm font-medium mb-1">Size</div>
                {/* BAD: No label, placeholder as pseudo-label */}
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                  <option value="">Select a size</option>
                  <option value="s">Small</option>
                  <option value="m">Medium</option>
                  <option value="l">Large</option>
                </select>
              </div>

              {/* BAD: Color selection with icon-only buttons */}
              <div>
                <div className="text-sm font-medium mb-1">Color</div>
                <div className="flex gap-2">
                  {/* BAD: Icon buttons with no accessible name */}
                  <div
                    className="w-8 h-8 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-gray-400"
                    onClick={() => {}}
                  />
                  <div
                    className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-gray-400"
                    onClick={() => {}}
                  />
                  <div
                    className="w-8 h-8 rounded-full bg-green-500 cursor-pointer border-2 border-transparent hover:border-gray-400"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* BAD: Clickable div instead of button */}
            <div
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-center cursor-pointer hover:bg-blue-700 font-medium"
              onClick={() => alert('Added to cart!')}
            >
              Add to Cart
            </div>

            {/* BAD: Image used as button */}
            <div className="mt-4">
              <img
                src="https://picsum.photos/seed/wishlist/200/50"
                className="cursor-pointer"
                onClick={() => alert('Added to wishlist!')}
              />
            </div>

            {/* BAD: Icon-only actions without text */}
            <div className="flex gap-4 mt-6 text-gray-500">
              {/* BAD: i element (icon font) with no accessible text */}
              <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                <i className="fas fa-heart" />
              </div>
              <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                <i className="fas fa-share" />
              </div>
              <div className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                <i className="fas fa-bookmark" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          {/* BAD: Star ratings with no text alternative */}
          <div className="space-y-4">
            {[5, 4, 3].map((stars, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 mb-2">
                  {/* BAD: Stars with no text indicating rating */}
                  {Array(stars)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  {Array(5 - stars)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j} className="text-gray-300">
                        ★
                      </span>
                    ))}
                </div>
                <p className="text-gray-600">Great product, highly recommend!</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
