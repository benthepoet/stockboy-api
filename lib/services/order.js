const { Order, Position, Stock, User } = require('../data/accessor');

module.exports = {
    create,
    getList
};

async function create(order, stockId, userId) {
    // Get an existing position
    let position = await Position()
        .whereNull('closed_at')
        .andWhere({
            stock_id: stockId,
            user_id: userId
        })
        .first('id');
        
    if (!position) {
        order.position_id = await Position()
            .returning('id')
            .insert({
                stock_id: stockId,
                user_id: userId
            });
    } else {
        order.position_id = position.id;
    }
    
    // Get the stock and the user
    let stock = await Stock()
        .where('id', stockId)
        .first('last_price');
    
    let user = await User()
        .where('id', userId)
        .first('balance');
    
    // Buy validation
    if (order.units > 0 && stock.last_price * order.units > user.balance) {
        throw new Error('Not enough funds available to buy.');
    }
    
    // Sell validation
    if (order.units < 0 && !position) {
        throw new Error('No open position.');
    }
    
    const { count: availableShares } = await getAvailableShares(order.position_id);
    
    if (order.units < 0 && Math.abs(order.units) > availableShares) {
        throw new Error('Not enough available shares to sell.');
    }
    
    // Set the price
    order.price = stock.last_price;
    
    // Create the order
    order.id = await Order()
        .returning('id')
        .insert(order);
     
    // Update the user's balance
    user.balance -= stock.last_price * order.units;
        
    await User()
        .where('id', userId)
        .update('balance', user.balance)
        
    // Close the order if shares are exhausted
    if (order.units < 0 && Math.abs(order.units) === availableShares) {
        await Position()
            .where('id', order.position_id)
            .update('closed_at', new Date());       
    }
    
    return {
        data: order
    };
}

async function getAvailableShares(positionId) {
    const data = await Order()
        .where('position_id', positionId)
        .sum('units as count')
        .first();
        
    return data;
}

async function getList(userId, skip = 0, limit = 50) {
    const count = await Order()
        .innerJoin('position', 'order.position_id', 'position.id')
        .where('position.user_id', userId)
        .count('order.id as count')
        .first();
    
    const data = await Order()
        .innerJoin('position', 'order.position_id', 'position.id')
        .where('position.user_id', userId)
        .offset(skip)
        .limit(limit)
        .select()
        
    return Object.assign({}, count, { data, skip, limit });
}