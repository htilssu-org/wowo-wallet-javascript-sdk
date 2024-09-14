
### Create Order Placement
```js
const orderResponse = await wallet.createOrder({
  amount: 1000,
  currency: 'VND',
  description: 'Test order',
  serviceName: 'Mua vé xem phim Aquaman',
  orderId: 'tét', //optional
  items: [ //optional
    {
      name: 'Vé xem phim Aquaman',
      quantity: 1,
      price: 1000,
    },
  ],
  callback: {
    callbackUrl: 'https://your-callback-url.com/callback',
    returnUrl: 'https://your-callback-url.com/return',
  },
});
```
