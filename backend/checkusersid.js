const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/checkusersid', (req, res) => {

    User.findOne({Sid: '123456789'})
    .then(function(user){
        if(user){
            res.send([user.Sid]);
        }
        else{
            console.log("not duplicated");
            res.send([]);
        }
    }).catch((error) => {
        console.log(error);
        res.send([]);
    })
})

module.exports = router