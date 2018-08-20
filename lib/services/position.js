const { knex, Position, Stock } = require('../data/accessor');

module.exports = {
    getList
};

async function getList(userId) {
    const positions = await Position()
        .innerJoin('order', 'order.position_id', 'position.id')
        .whereNull('position.closed_at')
        .andWhere('position.user_id', userId)
        .groupBy('position.id')
        .select(knex.raw(`
            position.id,
            SUM("order".units) total_units,
            AVG(CASE WHEN "order".units > 0 THEN "order".price ELSE NULL END) average_price
        `));
    
    for (let position of positions) {
        position.stock = await Stock()
            .innerJoin('position', 'position.stock_id', 'stock.id')
            .where('position.id', position.id)
            .first('stock.*');
            
        position.profit_ratio = position.stock.last_price / position.average_price - 1;
    }
        
    return { data: positions };
}