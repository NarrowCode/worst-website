import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { orders, getProductById } from '../../data/products'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/orders')({
  component: OrdersPage,
})

/**
 * PAGE 9: Order History Table
 * VIOLATIONS (cumulative +):
 * - Complex table without <th scope>
 * - Sortable columns without live announcements
 * - display: table on nested divs (fake table)
 * - Row actions only visible on hover
 * - No caption or summary
 */
function OrdersPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDir('asc')
    }
    // BAD: No announcement of sort change
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img src="https://picsum.photos/seed/logo/150/50" className="h-10" />
          <div className="flex gap-6">
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop')}>
              Home
            </div>
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop/account')}>
              Account
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-sm text-gray-500 mb-2">View your order history</h3>
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {/* BAD: Table without proper accessibility */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* BAD: No caption */}
          <table className="w-full">
            {/* BAD: Headers without scope attribute */}
            <thead className="bg-gray-50 border-b">
              <tr>
                {/* BAD: Sortable header without aria-sort */}
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  Order ID {sortColumn === 'id' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  Date {sortColumn === 'date' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('total')}
                >
                  Total {sortColumn === 'total' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
                  <tr key={order.id} className="border-b hover:bg-gray-50 group">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {/* BAD: Status conveyed only by color */}
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {/* BAD: Actions only visible on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <div
                          className="text-blue-600 cursor-pointer hover:underline text-sm"
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        >
                          Details
                        </div>
                        <div className="text-blue-600 cursor-pointer hover:underline text-sm">
                          Track
                        </div>
                        <div className="text-blue-600 cursor-pointer hover:underline text-sm">
                          Invoice
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* BAD: Expanded row without proper table structure */}
                  {expandedOrder === order.id && (
                    <tr key={`${order.id}-expanded`}>
                      <td colSpan={5} className="bg-gray-50 px-6 py-4">
                        {/* BAD: Nested "table" using divs */}
                        <div className="text-sm font-medium mb-2">Order Items</div>
                        <div style={{ display: 'table', width: '100%' }}>
                          <div style={{ display: 'table-header-group' }}>
                            <div style={{ display: 'table-row' }}>
                              <div style={{ display: 'table-cell', padding: '8px', fontWeight: 500 }}>Product</div>
                              <div style={{ display: 'table-cell', padding: '8px', fontWeight: 500 }}>Quantity</div>
                              <div style={{ display: 'table-cell', padding: '8px', fontWeight: 500 }}>Price</div>
                            </div>
                          </div>
                          <div style={{ display: 'table-row-group' }}>
                            {order.items.map((item, i) => {
                              const product = getProductById(item.productId)
                              return (
                                <div key={i} style={{ display: 'table-row' }}>
                                  <div style={{ display: 'table-cell', padding: '8px' }}>
                                    {product?.name || 'Unknown Product'}
                                  </div>
                                  <div style={{ display: 'table-cell', padding: '8px' }}>{item.quantity}</div>
                                  <div style={{ display: 'table-cell', padding: '8px' }}>
                                    ${product ? (product.price * item.quantity).toFixed(2) : '0.00'}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Another bad table - this time entirely divs */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {/* BAD: Entire table made of divs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div style={{ display: 'table', width: '100%' }}>
              <div style={{ display: 'table-header-group', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'table-row' }}>
                  <div style={{ display: 'table-cell', padding: '12px 24px', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>
                    Activity
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>
                    Date
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>
                    Details
                  </div>
                </div>
              </div>
              <div style={{ display: 'table-row-group' }}>
                <div style={{ display: 'table-row' }}>
                  <div style={{ display: 'table-cell', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
                    Order placed
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
                    2024-01-25
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
                    ORD-003
                  </div>
                </div>
                <div style={{ display: 'table-row' }}>
                  <div style={{ display: 'table-cell', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
                    Package shipped
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
                    2024-01-21
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
                    ORD-002
                  </div>
                </div>
                <div style={{ display: 'table-row' }}>
                  <div style={{ display: 'table-cell', padding: '12px 24px' }}>
                    Review submitted
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px' }}>
                    2024-01-18
                  </div>
                  <div style={{ display: 'table-cell', padding: '12px 24px' }}>
                    Wireless Headphones
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
