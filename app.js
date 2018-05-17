const express = require('express');
const bodyParser = require('body-parser');
const noCache = require('connect-nocache');
const cors = require('cors');

const app = express();
const api = require('./api');
const errorHandler = require('./lib/error/handler');
const { PORT = 8080 } = process.env;

app.disable('x-powered-by');
app.use(noCache());
app.use(bodyParser.json());
app.use(cors());
app.use(api);
app.use(errorHandler);

app.listen(PORT, () => console.log('API ready'));