const { Router } = require('express');

const dataHandler = require('../lib/data/handler');
const userService = require('../lib/services/user');
const router = Router();

router
    .route('/users/me')
    .get(getOne, dataHandler);
    
module.exports = router;

async function getOne(req, res, next) {
    try {
        const { user } = req;
        
        res.envelope = await userService.getOne(user.id);
        next();
    } catch (error) {
        next(error);
    }
}