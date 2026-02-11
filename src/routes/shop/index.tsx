import { createFileRoute } from '@tanstack/react-router'
import { products, categories } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/')({
  component: ShopHome,
})

/**
 * PAGE 1: Shop Homepage
 * VIOLATIONS:
 * - No semantic HTML (div instead of header, nav, main, footer)
 * - No skip link
 * - Logo image without alt text
 * - No landmark roles
 * - Links styled as divs
 */
function ShopHome() {
  return (
    // BAD: No landmark structure, just divs everywhere
    <div className="min-h-screen bg-gray-50">
      {/* BAD: div instead of header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* BAD: Image without alt text */}
          <img src="https://picsum.photos/seed/logo/150/50" className="h-10" />

          {/* BAD: div instead of nav */}
          <div className="flex gap-6">
            {/* BAD: divs with onClick instead of links */}
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => (window.location.hash = '/shop/category')}
            >
              Categories
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => (window.location.hash = '/shop/cart')}
            >
              Cart
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => (window.location.hash = '/shop/account')}
            >
              Account
            </div>
          </div>
        </div>
      </div>

      {/* BAD: div instead of main */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* BAD: No h1, just styled div */}
        <div className="text-3xl font-bold mb-8">Welcome to BadShop</div>

        {/* Categories section */}
        <div className="mb-12">
          <div className="text-xl font-semibold mb-4">Shop by Category</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              // BAD: div instead of link
              <div
                key={cat.id}
                className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md text-center"
                onClick={() => (window.location.hash = `/shop/category?cat=${cat.slug}`)}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Featured products */}
        <div className="mb-12">
          <div className="text-xl font-semibold mb-4">Featured Products</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md"
                onClick={() => (window.location.hash = `/shop/product?id=${product.id}`)}
              >
                {/* BAD: Decorative image without alt="" (appears meaningful) */}
                <img src={product.image} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-gray-600">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
