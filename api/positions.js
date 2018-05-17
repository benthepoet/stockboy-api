const { Router } = require('express');

const dataHandler = require('../lib/data/handler');
const positionService = require('../lib/services/position');
const router = Router();

router
    .route('/positions')
    .get(getList, dataHandler);
    
module.exports = router;

async function getList(req, res, next) {
    try {
        const { user } = req;
        
        res.envelope = await positionService.getList(user.id);
        next();
    } catch (error) {
        next(error);
    }
}