exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('order', function (table) {
            table
                .increments('id')
                .primary();
                
            table
                .integer('units')
                .notNullable();
            
            table
                .decimal('price')
                .notNullable();
            
            table
                .integer('position_id')
                .unsigned()
                .notNullable()
                .references('position.id');
        }),
        
        knex.schema.createTable('position', function (table) {
            table
                .increments('id')
                .primary();
                
            table.dateTime('closed_at');
            
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('user.id');
            
            table
                .integer('stock_id')
                .unsigned()
                .notNullable()
                .references('stock.id');
        }),
        
        knex.schema.createTable('stock', function (table) {
            table
                .increments('id')
                .primary();
                
            table
                .string('symbol')
                .unique();
            
            table.string('name');
            table.string('sector');
            table.decimal('last_price');
            table.dateTime('updated_at');
        }),
        
        knex.schema.createTable('user', function (table) {
            table
                .increments('id')
                .primary();
                
            table
                .string('email')
                .notNullable()
                .unique();
            
            table
                .string('hash')
                .notNullable();
            
            table.decimal('balance');
        })
    ]);    
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('order'),
        knex.schema.dropTable('position'),
        knex.schema.dropTabel('stock'),
        knex.schema.dropTable('user')
    ]);
};
