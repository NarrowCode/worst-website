// BAD: div instead of footer (intentional for accessibility testbed)
export function Footer() {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-sm">
          © {new Date().getFullYear()} BadShop. All rights reserved.
        </div>
      </div>
    </div>
  )
}
