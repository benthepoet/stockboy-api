const { Stock } = require('../data/accessor');

module.exports = {
    getList,
    getOne
};

async function getList(skip = 0, limit = 50, search = '') {
    const count = await Stock()
        .count('id as count')
        .where('symbol', 'like', `${search}%`)
        .first();

    const data = await Stock()
        .offset(skip)
        .limit(limit)
        .where('symbol', 'like', `${search}%`)
        .orderBy('symbol')
        .select();
        
    return Object.assign({}, count, { data, skip, limit });
}

async function getOne(stockId) {
    const stock = await Stock()
        .where('id', stockId)
        .first();
        
    return { data: stock };
}