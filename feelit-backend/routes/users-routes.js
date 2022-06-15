const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const userControllers = require('../controllers/users-controllers')

//get all users
router.get('/', userControllers.getUsers)
//get all Users's Email And Password
router.get('/getUsersEmailAndPassword',userControllers.getUsersEmailAndPassword)
//post a user
router.post(
    '/signup',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min:6}),
        check('image').not().isEmpty()
    ], 
    userControllers.signUpUsers)
//login with a exist account
router.post('/login', userControllers.login)


module.exports = router;