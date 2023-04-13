const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');


router.post('/checkingprocess',(req, res)=>{
    const username = req.body['username'];
    const sid = req.body['sid'];
    User.findOne({username: username, Sid: sid})
    .then((user)=>{
        if(user){
            console.log([user.Sid])
            res.send([user.Sid])
        }
        else{
            res.send([])
        }
    })
})



module.exports = router