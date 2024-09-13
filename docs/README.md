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

## NodeJs Usage

Ví dụ về sử dụng WOWOWallet trong NodeJS

```javascript
const {WoWoWallet} = require('@htilssu/wowo');

const apiKey = process.env.WOWO_API_KEY ?? 'your api key';

const wallet = new WoWoWallet(apiKey);

```