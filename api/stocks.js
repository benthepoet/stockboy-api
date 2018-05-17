const { Router } = require('express');

const dataHandler = require('../lib/data/handler');
const orderService = require('../lib/services/order');
const stockService = require('../lib/services/stock');
const router = Router();

router
    .route('/stocks')
    .get(getList, dataHandler);
    
router
    .route('/stocks/:stockId')
    .get(getOne, dataHandler);
    
router
    .route('/stocks/:stockId/orders')
    .post(createOrder, dataHandler);
    
module.exports = router;

async function createOrder(req, res, next) {
    try {
        const { stockId } = req.params; 
        const { body, user } = req;
        
        res.envelope = await orderService.create(body, stockId, user.id);
        next();
    } catch (error) {
        next(error);
    }
}

async function getList(req, res, next) {
    try {
        let { skip, limit, search } = req.query;
        
        if (skip) {
            skip = parseInt(skip);
        }
        
        if (limit) {
            limit = parseInt(limit);
        }
        
        res.envelope = await stockService.getList(skip, limit, search);
        next();
    } catch (error) {
        next(error);
    }
}

async function getOne(req, res, next) {
    try {
        const { stockId } = req.params;
        
        res.envelope = await stockService.getOne(stockId);
        next();
    } catch (error) {
        next(error);
    }
}