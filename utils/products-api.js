const { mockProducts, getProductById } = require('../data/products')

const normalizeProduct = (item) => ({
  id: item.id,
  name: item.title || item.name,
  price: Number(item.price),
  rating: Number((item.rating && item.rating.rate) || item.rating || 4.5),
  category: item.category || 'General',
  description: item.description || 'No description available.',
  images: item.images || [item.image || 'https://picsum.photos/800/800'],
  reviews: item.reviews || []
})

const fetchProducts = (callback) => {
  wx.request({
    url: 'https://dummyjson.com/products?limit=24',
    method: 'GET',
    timeout: 1800,
    success: (res) => {
      const list = (res.data && res.data.products) || []
      if (list.length > 0) {
        callback(list.map(normalizeProduct))
        return
      }
      callback(mockProducts)
    },
    fail: () => callback(mockProducts)
  })
}

const fetchProductById = (id, callback) => {
  wx.request({
    url: `https://dummyjson.com/products/${id}`,
    method: 'GET',
    timeout: 1800,
    success: (res) => {
      if (res.data && res.data.id) {
        callback(normalizeProduct(res.data))
        return
      }
      callback(getProductById(id) || null)
    },
    fail: () => callback(getProductById(id) || null)
  })
}

module.exports = {
  fetchProducts,
  fetchProductById
}
