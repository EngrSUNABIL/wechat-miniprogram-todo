const { getSavedAddresses } = require('../../utils/orders')

Page({
  data: {
    name: '',
    notifications: true,
    addresses: []
  },

  onLoad() {
    const name = wx.getStorageSync('profile_name') || 'Guest User'
    const notifications = wx.getStorageSync('profile_notifications')
    this.setData({
      name,
      notifications: notifications !== false
    })
  },

  onShow() {
    this.setData({ addresses: getSavedAddresses() })
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  saveProfile() {
    wx.setStorageSync('profile_name', this.data.name || 'Guest User')
    wx.showToast({ title: 'Profile saved', icon: 'success' })
  },

  onNotificationChange(e) {
    const value = e.detail.value
    this.setData({ notifications: value })
    wx.setStorageSync('profile_notifications', value)
  },

  goOrders() {
    wx.switchTab({ url: '/pages/orders/orders' })
  },

  goCart() {
    wx.switchTab({ url: '/pages/cart/cart' })
  }
})
