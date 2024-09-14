# Usage

## Node Usage

Ví dụ về sử dụng WOWOWallet trong NodeJS

```javascript
const {WoWoWallet} = require('@htilssu/wowo');

const apiKey = process.env.WOWO_API_KEY ?? 'your api key';

const wallet = new WoWoWallet(apiKey);
```
