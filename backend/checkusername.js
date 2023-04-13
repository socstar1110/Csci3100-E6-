const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/checkusername', (req, res) => {
    console.log('enter');
    console.log(req.body);
    console.log(req.body['username'])
    User.findOne({username: req.body['username']})
    .then(function(user){
        if(user){
            console.log("duplicated");
            console.log(typeof([user.username]))
            res.send([user.username]);
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