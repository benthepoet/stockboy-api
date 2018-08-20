module.exports = {
    client: 'sqlite',
    connection: {
        filename: process.env.DB_FILENAME
    },
    debug: true,
    migrations: {
        tableName: 'knex_migrations'
    }
};
