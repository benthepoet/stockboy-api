module.exports = {
    client: 'sqlite',
    connection: {
        filename: ':memory:'
    },
    debug: false,
    migrations: {
        tableName: 'knex_migrations'
    }
};
