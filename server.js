const express = require('express');
const service_static = require('serve-static');
const path = require('path');

const app = express()

app.use('/', service_static(path.join(__dirname, '/dist/')));
const port = process.env.PORT || 8080;
app.listen(port);