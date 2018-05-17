const secrets = require('./secrets.json');

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: secrets.development.user,
            password: secrets.development.password,
            database: 'stockboy_dev'
        },
        debug: true,
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: secrets.production.user,
            password: secrets.production.password,
            database: 'stockboy'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
