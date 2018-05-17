const knex = require('knex');

const knexFile = require('../../knexfile');
const { NODE_ENV = 'development' } = process.env;

const connection = knex(knexFile[NODE_ENV]);

module.exports = {
    knex: connection,
    Order() {
        return connection('order');  
    },
    Position() {
        return connection('position');
    },
    Stock() {
        return connection('stock');
    },
    User() {
        return connection('user');
    }
}