const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/users-controllers')

//get all users
router.get('/', userControllers.getUsers)
//post a user
router.post('/signup', userControllers.postUsers)
//login with a exist account
router.post('/login', userControllers.login)


module.exports = router;