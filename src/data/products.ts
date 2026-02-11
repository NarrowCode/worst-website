export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'shipped' | 'delivered'
  items: { productId: string; quantity: number }[]
  total: number
}

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Clothing', slug: 'clothing' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden' },
  { id: '4', name: 'Sports', slug: 'sports' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'electronics',
    image: 'https://picsum.photos/seed/headphones/400/400',
    description: 'High-quality wireless headphones with noise cancellation.',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    category: 'electronics',
    image: 'https://picsum.photos/seed/watch/400/400',
    description: 'Track your fitness and stay connected.',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 49.99,
    category: 'electronics',
    image: 'https://picsum.photos/seed/stand/400/400',
    description: 'Ergonomic aluminum laptop stand.',
  },
  {
    id: '4',
    name: 'Cotton T-Shirt',
    price: 24.99,
    category: 'clothing',
    image: 'https://picsum.photos/seed/tshirt/400/400',
    description: 'Comfortable 100% cotton t-shirt.',
  },
  {
    id: '5',
    name: 'Denim Jeans',
    price: 59.99,
    category: 'clothing',
    image: 'https://picsum.photos/seed/jeans/400/400',
    description: 'Classic fit denim jeans.',
  },
  {
    id: '6',
    name: 'Running Shoes',
    price: 89.99,
    category: 'sports',
    image: 'https://picsum.photos/seed/shoes/400/400',
    description: 'Lightweight running shoes for maximum performance.',
  },
  {
    id: '7',
    name: 'Yoga Mat',
    price: 29.99,
    category: 'sports',
    image: 'https://picsum.photos/seed/yoga/400/400',
    description: 'Non-slip yoga mat with carrying strap.',
  },
  {
    id: '8',
    name: 'Plant Pot',
    price: 19.99,
    category: 'home-garden',
    image: 'https://picsum.photos/seed/pot/400/400',
    description: 'Ceramic plant pot with drainage hole.',
  },
  {
    id: '9',
    name: 'Table Lamp',
    price: 44.99,
    category: 'home-garden',
    image: 'https://picsum.photos/seed/lamp/400/400',
    description: 'Modern table lamp with adjustable brightness.',
  },
  {
    id: '10',
    name: 'Bluetooth Speaker',
    price: 39.99,
    category: 'electronics',
    image: 'https://picsum.photos/seed/speaker/400/400',
    description: 'Portable Bluetooth speaker with 12-hour battery.',
  },
]

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      { productId: '1', quantity: 1 },
      { productId: '4', quantity: 2 },
    ],
    total: 129.97,
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    items: [{ productId: '2', quantity: 1 }],
    total: 199.99,
  },
  {
    id: 'ORD-003',
    date: '2024-01-25',
    status: 'pending',
    items: [
      { productId: '6', quantity: 1 },
      { productId: '7', quantity: 1 },
    ],
    total: 119.98,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
