const CART_KEY = 'ecom_cart_items'

const getCart = () => wx.getStorageSync(CART_KEY) || []

const saveCart = (items) => {
  wx.setStorageSync(CART_KEY, items)
}

const addToCart = (product, quantity = 1) => {
  const cart = getCart()
  const index = cart.findIndex((item) => item.id === product.id)

  if (index > -1) {
    cart[index].quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: (product.images && product.images[0]) || '',
      rating: product.rating,
      quantity
    })
  }

  saveCart(cart)
  return cart
}

const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart()
  const next = cart
    .map((item) => (item.id === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0)
  saveCart(next)
  return next
}

const removeFromCart = (productId) => {
  const next = getCart().filter((item) => item.id !== productId)
  saveCart(next)
  return next
}

const clearCart = () => saveCart([])

const getCartCount = () => getCart().reduce((sum, item) => sum + item.quantity, 0)

const getCartSummary = () => {
  const items = getCart()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Number((subtotal * 0.08).toFixed(2))
  const shipping = subtotal > 0 && subtotal < 300 ? 18 : 0
  const total = Number((subtotal + tax + shipping).toFixed(2))

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    shipping,
    total
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  getCartSummary
}
