const expressJwt = require('express-jwt');
const secrets = require('../../secrets.json');

module.exports = expressJwt(secrets.jwt);
