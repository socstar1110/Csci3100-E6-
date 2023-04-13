const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');


router.post('/userdata',(req,res) =>{
    User.findOne({username:req.body['username']}).then(function(result){
        console.log(result)
        res.send(result)
    })
    
})

module.exports = router;