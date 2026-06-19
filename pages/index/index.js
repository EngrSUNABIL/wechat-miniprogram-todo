const { categories, mockProducts } = require('../../data/products')
const { fetchProducts } = require('../../utils/products-api')
const { addToCart, getCartCount } = require('../../utils/cart')

Page({
  data: {
    products: [],
    filteredProducts: [],
    categories,
    activeCategory: 'All',
    keyword: '',
    loading: true,
    cartCount: 0
  },

  onLoad() {
    this.loadProducts()
  },

  onShow() {
    this.setData({ cartCount: getCartCount() })
  },

  loadProducts() {
    fetchProducts((products) => {
      const safeProducts = products && products.length ? products : mockProducts
      this.setData({
        products: safeProducts,
        categories: ['All', ...new Set(safeProducts.map((item) => item.category))],
        loading: false
      })
      this.applyFilter()
    })
  },

  onSearchInput(e) {
    this.setData({ keyword: (e.detail.value || '').trim() })
    this.applyFilter()
  },

  onCategoryTap(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.category })
    this.applyFilter()
  },

  applyFilter() {
    const { products, keyword, activeCategory } = this.data
    const normalizedKeyword = keyword.toLowerCase()

    const filteredProducts = products.filter((item) => {
      const byCategory = activeCategory === 'All' || item.category === activeCategory
      const bySearch = !normalizedKeyword || item.name.toLowerCase().includes(normalizedKeyword)
      return byCategory && bySearch
    })

    this.setData({ filteredProducts })
  },

  openProduct(e) {
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${e.currentTarget.dataset.id}`
    })
  },

  addItemToCart(e) {
    const product = this.data.products.find((item) => item.id === e.currentTarget.dataset.id)
    if (!product) {
      return
    }
    addToCart(product, 1)
    this.setData({ cartCount: getCartCount() })
    wx.showToast({ title: 'Added to cart', icon: 'success' })
  },

  goToCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  }
})
