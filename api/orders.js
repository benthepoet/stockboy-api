const { Router } = require('express');

const dataHandler = require('../lib/data/handler');
const orderService = require('../lib/services/order');
const router = Router();

router
    .route('/orders')
    .get(getList, dataHandler);
    
module.exports = router;

async function getList(req, res, next) {
    try {
        const { skip, limit } = req.query;
        const { user } = req;
        
        res.envelope = await orderService.getList(user.id, skip, limit);
        next();
    } catch (error) {
        next(error);
    }
}