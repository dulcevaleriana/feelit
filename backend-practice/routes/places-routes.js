const express = require('express');
const router = express.Router();

//BDA temporal
const DUMMY_PLACES = [
    {
        id: 'pl',
        title: 'Empire State Building',
        description: 'description description description description',
        location:{
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: 'address address address address',
        creator: 'url'
    }
]
//get all element with principal id
router.get('/:pId',(req,res,next)=>{
    const placeId = req.params.pId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    res.json({place});

    console.log('GET REQUEST IN PLACES');
})
//get all element with the same user id
router.get('/user/:uId',(req,res,next)=>{
    const userId = req.params.uId;
    const place = DUMMY_PLACES.find(p =>{
        return p.creator === userId;
    });
    res.json({place})
})

module.exports = router;