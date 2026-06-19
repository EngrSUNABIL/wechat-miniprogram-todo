const { fetchProductById } = require('../../utils/products-api')
const { addToCart, getCartCount } = require('../../utils/cart')

Page({
  data: {
    product: null,
    quantity: 1,
    cartCount: 0
  },

  onLoad(options) {
    this.loadProduct(options.id)
  },

  onShow() {
    this.setData({ cartCount: getCartCount() })
  },

  loadProduct(id) {
    fetchProductById(id, (product) => {
      if (!product) {
        wx.showToast({ title: 'Product not found', icon: 'none' })
        return
      }
      this.setData({ product })
    })
  },

  increaseQty() {
    this.setData({ quantity: this.data.quantity + 1 })
  },

  decreaseQty() {
    if (this.data.quantity <= 1) return
    this.setData({ quantity: this.data.quantity - 1 })
  },

  addCurrentToCart() {
    const { product, quantity } = this.data
    if (!product) return

    addToCart(product, quantity)
    this.setData({ cartCount: getCartCount() })
    wx.showToast({ title: 'Added to cart', icon: 'success' })
  },

  goToCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  }
})
