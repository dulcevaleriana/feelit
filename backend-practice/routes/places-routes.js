const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const placesControllers = require('../controllers/places-controllers')

//get all element with principal id
router.get('/:pId',placesControllers.getPlaceById)
//get all element with the same user id
router.get('/user/:uId',placesControllers.getPlacesByUserId)
//post a place
router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:5}),
        check('address').not().isEmpty()
    ],
    placesControllers.postPlace);
//update a place
router.patch(
    '/:pId',
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:5}),
        check('location').not().isEmpty(),
        check('address').not().isEmpty(),
    ],
    placesControllers.patchPlace);
//delete a place
router.delete('/:pId',placesControllers.deletePlace);

module.exports = router;