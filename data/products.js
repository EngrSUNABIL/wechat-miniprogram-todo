const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 199.0,
    rating: 4.7,
    category: 'Electronics',
    description: 'Over-ear headphones with active noise cancelling and up to 30 hours battery life.',
    images: [
      'https://picsum.photos/id/180/800/800',
      'https://picsum.photos/id/201/800/800',
      'https://picsum.photos/id/30/800/800'
    ],
    reviews: [
      { id: 1, user: 'Ava', rating: 5, comment: 'Crisp sound and very comfortable.' },
      { id: 2, user: 'Noah', rating: 4, comment: 'Battery life is amazing.' }
    ]
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 299.0,
    rating: 4.6,
    category: 'Electronics',
    description: 'Track heart rate, sleep and workouts with AMOLED display and water resistance.',
    images: [
      'https://picsum.photos/id/160/800/800',
      'https://picsum.photos/id/175/800/800'
    ],
    reviews: [
      { id: 3, user: 'Emma', rating: 5, comment: 'Great for daily health tracking.' }
    ]
  },
  {
    id: 3,
    name: 'Minimalist Office Chair',
    price: 459.0,
    rating: 4.4,
    category: 'Furniture',
    description: 'Ergonomic office chair with lumbar support and breathable mesh back.',
    images: [
      'https://picsum.photos/id/29/800/800',
      'https://picsum.photos/id/26/800/800'
    ],
    reviews: [
      { id: 4, user: 'Liam', rating: 4, comment: 'Solid comfort for long work sessions.' }
    ]
  },
  {
    id: 4,
    name: 'Ceramic Coffee Mug Set',
    price: 89.0,
    rating: 4.5,
    category: 'Home',
    description: 'Set of 4 handcrafted ceramic mugs, microwave and dishwasher safe.',
    images: [
      'https://picsum.photos/id/431/800/800',
      'https://picsum.photos/id/425/800/800'
    ],
    reviews: [
      { id: 5, user: 'Sophia', rating: 5, comment: 'Beautiful finish and premium quality.' }
    ]
  },
  {
    id: 5,
    name: 'Running Shoes Pro',
    price: 329.0,
    rating: 4.8,
    category: 'Fashion',
    description: 'Lightweight running shoes with high rebound sole and breathable knit upper.',
    images: [
      'https://picsum.photos/id/21/800/800',
      'https://picsum.photos/id/24/800/800'
    ],
    reviews: [
      { id: 6, user: 'Mason', rating: 5, comment: 'Very comfortable and stable.' }
    ]
  },
  {
    id: 6,
    name: 'Organic Skin Care Kit',
    price: 149.0,
    rating: 4.3,
    category: 'Beauty',
    description: 'Daily cleanser, toner and moisturizer kit with natural plant ingredients.',
    images: [
      'https://picsum.photos/id/1027/800/800',
      'https://picsum.photos/id/1025/800/800'
    ],
    reviews: [
      { id: 7, user: 'Olivia', rating: 4, comment: 'Gentle and works well for sensitive skin.' }
    ]
  }
]

const categories = ['All', ...new Set(mockProducts.map((item) => item.category))]

const getProductById = (id) => mockProducts.find((item) => String(item.id) === String(id))

module.exports = {
  mockProducts,
  categories,
  getProductById
}
