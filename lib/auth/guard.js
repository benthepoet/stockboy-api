const expressJwt = require('express-jwt');

const options = { secret: process.env.JWT_SECRET };

module.exports = expressJwt(options);
