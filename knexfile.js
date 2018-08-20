module.exports = {
    client: 'sqlite',
    connection: {
        filename: ':memory:'
    },
    debug: true,
    migrations: {
        tableName: 'knex_migrations'
    }
};
