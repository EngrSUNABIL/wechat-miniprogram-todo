const ORDERS_KEY = 'ecom_orders'
const ADDRESSES_KEY = 'ecom_addresses'

const getOrders = () => wx.getStorageSync(ORDERS_KEY) || []

const saveOrders = (orders) => {
  wx.setStorageSync(ORDERS_KEY, orders)
}

const createOrder = (payload) => {
  const orders = getOrders()
  const order = {
    id: `OD${Date.now()}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    ...payload
  }
  const next = [order, ...orders]
  saveOrders(next)
  return order
}

const cancelOrder = (orderId) => {
  const next = getOrders().map((order) =>
    order.id === orderId && order.status !== 'Cancelled'
      ? { ...order, status: 'Cancelled' }
      : order
  )
  saveOrders(next)
  return next
}

const getSavedAddresses = () => wx.getStorageSync(ADDRESSES_KEY) || []

const saveAddress = (address) => {
  const addresses = getSavedAddresses()
  const exists = addresses.some((item) =>
    item.name === address.name && item.phone === address.phone && item.detail === address.detail
  )
  if (!exists) {
    wx.setStorageSync(ADDRESSES_KEY, [address, ...addresses].slice(0, 5))
  }
}

module.exports = {
  getOrders,
  createOrder,
  cancelOrder,
  getSavedAddresses,
  saveAddress
}
