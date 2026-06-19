const { getOrders, cancelOrder } = require('../../utils/orders')

Page({
  data: {
    orders: [],
    expandedOrderId: ''
  },

  onShow() {
    this.loadOrders()
  },

  loadOrders() {
    this.setData({ orders: getOrders() })
  },

  toggleOrder(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      expandedOrderId: this.data.expandedOrderId === id ? '' : id
    })
  },

  cancelCurrentOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: 'Cancel order',
      content: 'Are you sure you want to cancel this order?',
      success: (res) => {
        if (res.confirm) {
          cancelOrder(id)
          this.loadOrders()
          wx.showToast({ title: 'Order cancelled', icon: 'none' })
        }
      }
    })
  }
})
