## Installation
```js
const {useSSOCallback} = require('@htilssu/sso');
const express = require('express');

const app = express();

useSSOCallback(app); //Add middleware handle verify token
```