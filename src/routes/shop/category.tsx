import { createFileRoute } from '@tanstack/react-router'
import { products, categories } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/category')({
  component: CategoryPage,
})

/**
 * PAGE 2: Category Listing
 * VIOLATIONS (cumulative from Page 1 +):
 * - Missing alt text on product images
 * - Heading hierarchy broken (h3 before h1)
 * - Empty link elements
 * - Non-descriptive link text
 */
function CategoryPage() {
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BAD: div instead of header */}
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
        {/* BAD: h3 appears before h1 - broken heading hierarchy */}
        <h3 className="text-sm text-gray-500 mb-2">Browse our collection</h3>

        {/* This h1 comes after h3 - wrong order */}
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {/* Sidebar + Products layout */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0">
            {/* BAD: h4 used for visual styling, not structure */}
            <h4 className="font-semibold mb-4">Categories</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="cursor-pointer hover:text-blue-600 py-1"
                  onClick={() => (window.location.hash = `/shop/category?cat=${cat.slug}`)}
                >
                  {cat.name}
                </div>
              ))}
            </div>

            {/* BAD: Empty links */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              {/* BAD: Empty anchor with no text or aria-label */}
              <a href="/shop/sale" className="block py-1 text-blue-600 hover:underline"></a>
              <a href="/shop/new" className="block py-1 text-blue-600 hover:underline"></a>
              {/* BAD: Link with only whitespace */}
              <a href="/shop/popular" className="block py-1 text-blue-600 hover:underline">
                {' '}
              </a>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md"
                  onClick={() => (window.location.hash = `/shop/product?id=${product.id}`)}
                >
                  {/* BAD: Missing alt text entirely */}
                  <img src={product.image} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    {/* BAD: h5 for product name - skipping heading levels */}
                    <h5 className="font-medium mb-1">{product.name}</h5>
                    <div className="text-gray-600 mb-2">${product.price}</div>
                    {/* BAD: Generic "click here" style link text */}
                    <a
                      href={`/shop/product?id=${product.id}`}
                      className="text-blue-600 hover:underline text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View details
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* BAD: Pagination with non-descriptive links */}
            <div className="mt-8 flex justify-center gap-2">
              {/* BAD: Link text is just numbers - not descriptive */}
              <a href="?page=1" className="px-3 py-1 bg-blue-600 text-white rounded">
                1
              </a>
              <a href="?page=2" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                2
              </a>
              <a href="?page=3" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                3
              </a>
              {/* BAD: Symbol without text alternative */}
              <a href="?page=2" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                →
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
