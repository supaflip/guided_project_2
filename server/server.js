const express = require('express');
const dao = require('./dao.js')

const app = express();

// do things

const port = 3000;
console.log('server starting on port ' + port);
app.listen(port);