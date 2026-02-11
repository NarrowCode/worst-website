import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { products, categories } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/search')({
  component: SearchPage,
})

/**
 * PAGE 7: Search Results
 * VIOLATIONS (cumulative +):
 * - Custom dropdown not keyboard accessible
 * - Filters using div onclick
 * - No focus management after filtering
 * - Pagination with unlabeled links
 * - Search results not announced
 */
function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')

  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img src="https://picsum.photos/seed/logo/150/50" className="h-10" />
          <div className="flex-1 mx-8">
            {/* BAD: Search input without label */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex gap-6">
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop')}>
              Home
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-sm text-gray-500 mb-2">Search results</h3>
        <h1 className="text-3xl font-bold mb-8">Products</h1>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <div className="w-56 flex-shrink-0">
            <h4 className="font-semibold mb-4">Filters</h4>

            {/* Category filter */}
            <div className="mb-6">
              <div className="font-medium text-sm mb-2">Category</div>
              <div className="space-y-2">
                {/* BAD: Filter buttons are divs, not keyboard accessible */}
                <div
                  className={`px-3 py-2 rounded cursor-pointer ${
                    !selectedCategory ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`px-3 py-2 rounded cursor-pointer ${
                      selectedCategory === cat.slug ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(cat.slug)}
                    // BAD: No keyboard support, no role, no aria-pressed
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="mb-6">
              <div className="font-medium text-sm mb-2">Price Range</div>
              <div className="space-y-2">
                {/* BAD: Checkbox-style filters without actual checkboxes */}
                {['Under $25', '$25 - $50', '$50 - $100', 'Over $100'].map((range) => (
                  <div
                    key={range}
                    className={`px-3 py-2 rounded cursor-pointer flex items-center gap-2 ${
                      priceRange === range ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setPriceRange(priceRange === range ? null : range)}
                  >
                    {/* BAD: Fake checkbox - div styled to look like checkbox */}
                    <div
                      className={`w-4 h-4 border rounded ${
                        priceRange === range ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    />
                    {range}
                  </div>
                ))}
              </div>
            </div>

            {/* BAD: Clear filters - div button */}
            <div
              className="text-blue-600 cursor-pointer hover:underline text-sm"
              onClick={() => {
                setSelectedCategory(null)
                setPriceRange(null)
              }}
            >
              Clear all filters
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Sort dropdown */}
            <div className="flex justify-between items-center mb-6">
              {/* BAD: No announcement of result count */}
              <div className="text-gray-500">{filteredProducts.length} results</div>

              {/* BAD: Custom dropdown without keyboard support */}
              <div className="relative">
                <div
                  className="px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  // BAD: No aria-expanded, no aria-haspopup
                >
                  Sort: {sortBy}
                  <span className="text-gray-400">▼</span>
                </div>

                {sortDropdownOpen && (
                  // BAD: Dropdown not keyboard navigable
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                    {['relevance', 'price-low', 'price-high', 'newest'].map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSortBy(option)
                          setSortDropdownOpen(false)
                        }}
                        // BAD: No role="option", not keyboard selectable
                      >
                        {option === 'relevance' && 'Relevance'}
                        {option === 'price-low' && 'Price: Low to High'}
                        {option === 'price-high' && 'Price: High to Low'}
                        {option === 'newest' && 'Newest First'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md"
                  onClick={() => (window.location.hash = `/shop/product?id=${product.id}`)}
                >
                  <img src={product.image} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h5 className="font-medium mb-1">{product.name}</h5>
                    <div className="text-gray-600">${product.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* BAD: Pagination with unlabeled links */}
            <div className="mt-8 flex justify-center gap-2">
              {/* BAD: Previous link is just an arrow */}
              <a href="?page=0" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                ←
              </a>
              <a href="?page=1" className="px-3 py-1 bg-blue-600 text-white rounded">
                1
              </a>
              <a href="?page=2" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                2
              </a>
              <a href="?page=3" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                3
              </a>
              {/* BAD: Ellipsis as link */}
              <a href="?page=4" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                ...
              </a>
              <a href="?page=10" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                10
              </a>
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
