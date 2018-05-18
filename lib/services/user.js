const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../data/accessor');

const DEFAULT_BALANCE = 1000;

module.exports = {
    authenticate,
    create,
    getOne
};

async function authenticate(email, password) {
    const user = await User()
        .where('email', email)
        .first();
        
    if (!user || !bcrypt.compareSync(password, user.hash)) {
        throw new Error('The user could not be authenticated.');
    }
    
    return { 
        data: {
            token: jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' })
        }
    };
}

async function create(email, password) {
    const user = await User()
        .where('email', email)
        .first();
        
    if (user) {
        throw new Error('A user is already registered with this e-mail.');
    }
    
    const hash = bcrypt.hashSync(password, 8);
    
    await User()
        .insert({
            email,
            hash,
            balance: DEFAULT_BALANCE
        });
        
    return authenticate(email, password);
}

async function getOne(userId) {
    const user = await User()
        .where('id', userId)
        .first('id', 'email', 'balance');
        
    return { data: user };
}