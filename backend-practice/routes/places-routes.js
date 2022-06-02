const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('GET REQUEST IN PLACES')
    res.json({mesage: 'IT WORKS!!'});
})

module.exports = router;