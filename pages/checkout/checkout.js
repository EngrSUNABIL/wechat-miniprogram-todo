const { getCart, getCartSummary, clearCart } = require('../../utils/cart')
const { createOrder, saveAddress, getSavedAddresses } = require('../../utils/orders')

Page({
  data: {
    items: [],
    summary: {
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0
    },
    address: {
      name: '',
      phone: '',
      province: '',
      city: '',
      detail: ''
    },
    paymentMethods: ['WeChat Pay', 'Credit Card', 'Cash on Delivery'],
    paymentIndex: 0,
    submitting: false
  },

  onLoad() {
    const addresses = getSavedAddresses()
    this.setData({
      items: getCart(),
      summary: getCartSummary(),
      address: addresses[0] || this.data.address
    })
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`address.${field}`]: e.detail.value
    })
  },

  onPaymentChange(e) {
    this.setData({ paymentIndex: Number(e.detail.value) })
  },

  validateAddress() {
    const { name, phone, province, city, detail } = this.data.address
    return Boolean(name && phone && province && city && detail)
  },

  placeOrder() {
    if (!this.data.items.length) {
      wx.showToast({ title: 'Cart is empty', icon: 'none' })
      return
    }

    if (!this.validateAddress()) {
      wx.showToast({ title: 'Complete shipping info', icon: 'none' })
      return
    }

    if (this.data.submitting) {
      return
    }

    this.setData({ submitting: true })

    const order = createOrder({
      items: this.data.items,
      summary: this.data.summary,
      shippingAddress: this.data.address,
      paymentMethod: this.data.paymentMethods[this.data.paymentIndex]
    })

    saveAddress(this.data.address)
    clearCart()

    wx.showModal({
      title: 'Order placed',
      content: `Order ${order.id} placed successfully!`,
      showCancel: false,
      success: () => {
        wx.switchTab({ url: '/pages/orders/orders' })
      }
    })
  }
})
