const { Router } = require('express');

const dataHandler = require('../lib/data/handler');
const userService = require('../lib/services/user');
const router = Router();

router
    .route('/auth')
    .post(authenticate, dataHandler);
    
router
    .route('/auth/signup')
    .post(signup, dataHandler);
    
module.exports = router;

async function authenticate(req, res, next) {
    try {
        const { email, password } = req.body;
        
        res.envelope = await userService.authenticate(email, password);
        next();
    } catch (error) {
        next(error);
    }
}

async function signup(req, res, next) {
    try {
        const { email, password } = req.body;
        
        res.envelope = await userService.create(email, password);
        next();
    } catch (error) {
        next(error);
    }
}