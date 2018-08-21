module.exports = {
    client: 'sqlite',
    connection: {
        filename: ':memory:'
    },
    pool: {
        evictionRunIntervalMillis: 0
    },
    debug: true,
    migrations: {
        tableName: 'knex_migrations'
    }
};
