const authGuard = require('../lib/auth/guard');

const auth = require('./auth');
const orders = require('./orders');
const positions = require('./positions');
const stocks = require('./stocks');
const users = require('./users');

module.exports = [
    auth,
    authGuard,
    orders,
    positions,
    stocks,
    users
];