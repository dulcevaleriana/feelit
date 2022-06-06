const express = require('express');
const router = express.Router();
const placesControllers = require('../controllers/places-controllers')

//get all element with principal id
router.get('/:pId',placesControllers.getPlaceById)
//get all element with the same user id
router.get('/user/:uId',placesControllers.getPlacesByUserId)
//post a place
router.post('/',placesControllers.postPlace)
//update a place
router.patch('/:pId',placesControllers.patchPlace);
//delete a place
router.delete('/:pId',placesControllers.deletePlace);

module.exports = router;