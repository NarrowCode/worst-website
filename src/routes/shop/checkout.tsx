import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/checkout')({
  component: CheckoutPage,
})

/**
 * PAGE 5: Checkout Form
 * VIOLATIONS (cumulative +):
 * - No autocomplete attributes
 * - Error messages not programmatically linked to fields
 * - Required fields not marked (no aria-required)
 * - Submit button is styled <a> tag
 * - Form errors announced only visually
 */
function CheckoutPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    // Simulate validation errors
    setErrors({
      email: 'Please enter a valid email',
      card: 'Card number is invalid',
      cvv: 'CVV is required',
    })
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
            <div className="cursor-pointer hover:text-blue-600" onClick={() => (window.location.hash = '/shop/cart')}>
              Cart
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h3 className="text-sm text-gray-500 mb-2">Complete your purchase</h3>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* BAD: Form without proper structure */}
        <div className="space-y-8">
          {/* Contact section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-4">Contact Information</h4>

            <div className="space-y-4">
              {/* BAD: No label element, no autocomplete */}
              <div>
                <div className="text-sm font-medium mb-1">
                  Email
                  {/* BAD: Required indicator with no programmatic indication */}
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <input
                  type="text"
                  placeholder="your@email.com"
                  className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  // BAD: No autocomplete="email"
                  // BAD: No aria-required
                  // BAD: No aria-invalid
                  // BAD: No aria-describedby for error
                />
                {/* BAD: Error not linked to input */}
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Phone</div>
                <input
                  type="text"
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  // BAD: No autocomplete="tel"
                />
              </div>
            </div>
          </div>

          {/* Shipping section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-4">Shipping Address</h4>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">First Name *</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    // BAD: No autocomplete="given-name"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Last Name *</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    // BAD: No autocomplete="family-name"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Street Address *</div>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  // BAD: No autocomplete="street-address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">City *</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">State</div>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option value="">Select</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                  </select>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">ZIP *</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    // BAD: No autocomplete="postal-code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-4">Payment Details</h4>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Card Number *</div>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-3 py-2 border rounded ${errors.card ? 'border-red-500' : 'border-gray-300'}`}
                  // BAD: No autocomplete="cc-number"
                />
                {errors.card && <div className="text-red-500 text-sm mt-1">{errors.card}</div>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Expiry Date *</div>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    // BAD: No autocomplete="cc-exp"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">CVV *</div>
                  <input
                    type="text"
                    placeholder="123"
                    className={`w-full px-3 py-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                    // BAD: No autocomplete="cc-csc"
                  />
                  {errors.cvv && <div className="text-red-500 text-sm mt-1">{errors.cvv}</div>}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Name on Card</div>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  // BAD: No autocomplete="cc-name"
                />
              </div>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2">
            {/* BAD: Checkbox without proper label association */}
            <input type="checkbox" id="terms" className="mt-1" />
            <div className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </div>
          </div>

          {/* BAD: Submit "button" is actually an <a> tag */}
          <a
            href="#"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            Place Order - $264.96
          </a>

          {/* BAD: Low contrast help text */}
          <p className="text-center text-[#d1d5db] text-sm">
            Your card will be charged immediately
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
