## Installation
```js
const {useSSOCallback} = require('@htilssu/sso');
const express = require('express');

const app = express();

useSSOCallback(app); //Add middleware handle verify token
```

# Lấy thông tin người dùng trong route handler
```js
app.use(async (req, res, next) => {
      req.locals.user; // để truy cập thông tin người dùng nếu xác thực, nếu người dùng không hợp lệ giá trị sẽ là null
      next();
    }
);
```