import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Footer } from '../../components/Footer'

export const Route = createFileRoute('/shop/account')({
  component: AccountPage,
})

/**
 * PAGE 8: Account Page
 * VIOLATIONS (cumulative +):
 * - Session timeout without warning
 * - Wrong ARIA roles (role="button" on navigating element)
 * - aria-hidden="true" on focusable elements
 * - Password toggle not keyboard accessible
 * - Tab panels without proper ARIA
 */
function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [timeoutWarning, setTimeoutWarning] = useState(false)

  // BAD: Session timeout without warning accessible to screen readers
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutWarning(true)
    }, 5000)
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
        <h3 className="text-sm text-gray-500 mb-2">Manage your account</h3>
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        {/* BAD: Timeout warning without role="alert" */}
        {timeoutWarning && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
            Your session will expire in 5 minutes. No accessible announcement made.
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* BAD: Tab list without proper ARIA */}
          <div className="flex border-b">
            {/* BAD: role="button" on an element that switches tabs (should be role="tab") */}
            <div
              role="button"
              className={`px-6 py-3 cursor-pointer ${
                activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </div>
            <div
              role="button"
              className={`px-6 py-3 cursor-pointer ${
                activeTab === 'security' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </div>
            {/* BAD: This tab navigates away but has role="button" */}
            <div
              role="button"
              className="px-6 py-3 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => (window.location.hash = '/shop/orders')}
            >
              Orders
            </div>
          </div>

          {/* Tab panels - BAD: no role="tabpanel", no aria-labelledby */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h4 className="font-semibold mb-4">Profile Information</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Full Name</div>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Email</div>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Phone</div>
                    <input
                      type="tel"
                      defaultValue="(555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* BAD: Button inside aria-hidden container */}
                  <div aria-hidden="true">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h4 className="font-semibold mb-4">Security Settings</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Current Password</div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-300 rounded pr-10"
                      />
                      {/* BAD: Toggle button not keyboard accessible */}
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                        // BAD: No keyboard support, no aria-label
                      >
                        {showPassword ? '👁' : '👁‍🗨'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">New Password</div>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {/* BAD: Password requirements not linked to input */}
                    <div className="text-sm text-gray-500 mt-1">
                      Must be at least 8 characters
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Confirm Password</div>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* BAD: Multiple focusable elements with aria-hidden */}
                  <div className="flex gap-4" aria-hidden="true">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Update Password
                    </button>
                    <a href="/forgot-password" className="px-4 py-2 text-blue-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                {/* Two-factor section */}
                <div className="mt-8 pt-6 border-t">
                  <h5 className="font-medium mb-4">Two-Factor Authentication</h5>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SMS Authentication</div>
                      <div className="text-sm text-gray-500">Receive codes via text message</div>
                    </div>
                    {/* BAD: Toggle switch without proper ARIA */}
                    <div
                      className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer relative"
                      onClick={() => {}}
                      // BAD: No role="switch", no aria-checked
                    >
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger zone with bad patterns */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-semibold text-red-600 mb-4">Danger Zone</h4>
          {/* BAD: Destructive action without confirmation, link styled as button */}
          <a
            href="#"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault()
              alert('Account deleted!')
            }}
          >
            Delete Account
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
