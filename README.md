# ShopEasy WeChat Mini Program

ShopEasy is a full-featured e-commerce WeChat mini program with product browsing, shopping cart, checkout, order tracking, and user profile management.

## Features

- Home page with product grid, search, and category filters
- Product detail page with image gallery, rating, reviews, and quantity selector
- Shopping cart with quantity controls, item removal, subtotal/tax/shipping calculation
- Checkout flow with shipping address, payment method, and order summary
- Orders page with history, detail expansion, status tracking, and cancellation
- User profile with settings, saved addresses, and quick access shortcuts
- Local persistence for cart, orders, addresses, and profile settings
- `wx.request` integration with fallback to local mock data

## Project Structure

```
wechat-miniprogram-todo/
├── app.js
├── app.json
├── app.wxss
├── data/
│   └── products.js
├── utils/
│   ├── cart.js
│   ├── orders.js
│   └── products-api.js
└── pages/
    ├── index/            # Home/Product listing
    ├── product-detail/   # Product details
    ├── cart/             # Shopping cart
    ├── checkout/         # Checkout
    ├── orders/           # Order history
    └── profile/          # User profile
```

## Getting Started

1. Open this project in WeChat Developer Tools.
2. Use a test AppID (for development) or your official AppID.
3. Compile and run in simulator.
4. Browse products, add items to cart, checkout, and view orders.

## Data Model Highlights

### Product

```js
{
  id: Number,
  name: String,
  price: Number,
  rating: Number,
  category: String,
  description: String,
  images: String[],
  reviews: { id, user, rating, comment }[]
}
```

### Cart Item

```js
{
  id: Number,
  name: String,
  price: Number,
  image: String,
  rating: Number,
  quantity: Number
}
```

### Order

```js
{
  id: String,
  status: 'Pending' | 'Cancelled',
  createdAt: String,
  items: CartItem[],
  summary: { subtotal, tax, shipping, total },
  shippingAddress: { name, phone, province, city, detail },
  paymentMethod: String
}
```

## Storage Keys

- `ecom_cart_items`
- `ecom_orders`
- `ecom_addresses`
- `profile_name`
- `profile_notifications`

## Notes

- No backend is required for initial usage.
- Remote product request uses `wx.request`; local mock data is used as fallback.
