const express = require('express');
const router = express.Router();

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


router.get('/:pId',(req,res,next)=>{
    const placeId = req.params.pId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    res.json({place: place});

    console.log('GET REQUEST IN PLACES');
})

module.exports = router;