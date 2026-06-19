const {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  getCartSummary,
  clearCart
} = require('../../utils/cart')

Page({
  data: {
    items: [],
    summary: {
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0
    }
  },

  onShow() {
    this.refreshCart()
  },

  refreshCart() {
    this.setData({
      items: getCart(),
      summary: getCartSummary()
    })
  },

  increaseQty(e) {
    const { id, quantity } = e.currentTarget.dataset
    updateCartItemQuantity(id, quantity + 1)
    this.refreshCart()
  },

  decreaseQty(e) {
    const { id, quantity } = e.currentTarget.dataset
    updateCartItemQuantity(id, quantity - 1)
    this.refreshCart()
  },

  removeItem(e) {
    removeFromCart(e.currentTarget.dataset.id)
    this.refreshCart()
  },

  clearAll() {
    if (!this.data.items.length) return
    wx.showModal({
      title: 'Clear cart',
      content: 'Remove all items?',
      success: (res) => {
        if (res.confirm) {
          clearCart()
          this.refreshCart()
        }
      }
    })
  },

  goCheckout() {
    if (!this.data.items.length) {
      wx.showToast({ title: 'Cart is empty', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/checkout/checkout' })
  },

  browseProducts() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
