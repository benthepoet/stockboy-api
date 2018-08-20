module.exports = {
    client: 'sqlite',
    connection: {
        filename: ':memory:'
    },
    pool: {
        min: 1,
        max: 1
    },
    debug: true,
    migrations: {
        tableName: 'knex_migrations'
    }
};
