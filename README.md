> Đọc thêm tài liệu [tại đây](https://htilssu-org.github.io/wowo-wallet-javascript-sdk/#/)

# Đọc tài liệu chi tiết [tại đây](https://htilssu-org.github.io/wowo-wallet-javascript-sdk/#/)

# Installation

```npm
    npm install @htilssu/wowo
```

or yarn

```yarn
    yarn add @htilssu/wowo
```

or pnpm

```pnpm
    pnpm add @htilssu/wowo
```

# Usage

## Node Usage

Ví dụ về sử dụng WOWOWallet trong NodeJS

```javascript
const {WoWoWallet} = require('@htilssu/wowo');

const apiKey = process.env.WOWO_API_KEY ?? 'your api key';

const wallet = new WoWoWallet(apiKey);
```

## Create Order Placement
```javascript
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