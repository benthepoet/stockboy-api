// Modules
const express = require('express');
const bodyParser = require('body-parser');
const noCache = require('connect-nocache');
const cors = require('cors');

// Create the application
const app = express();
const api = require('./api');
const errorHandler = require('./lib/error/handler');

// Configure the application
app.disable('x-powered-by');
app.use(noCache());
app.use(bodyParser.json());
app.use(cors());
app.use(api);
app.use(errorHandler);

// Start the application
app.listen(process.env.PORT, () => console.log('API ready'));
