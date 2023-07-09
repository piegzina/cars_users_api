const {Router} = require('express');

const userRoutes = Router();

const {
    registerUser,
    currentUser,
    loginUser,
} = require('../controllers/userController');
const {validateToken} = require('../middleware/validateTokenHandler');

userRoutes
    .post('/register', registerUser)

    .post('/login', loginUser)

    .get('/current', validateToken, currentUser)

module.exports = {
    userRoutes,
}