const knex = require('knex');

const knexFile = require('../../knexfile');
const connection = knex(knexFile);

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