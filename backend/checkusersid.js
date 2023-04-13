const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/checkusersid', (req, res) => {
    console.log('enter');
    console.log(req.body);
    console.log(req.body['Sid'])
    User.findOne({Sid: req.body['Sid']})
    .then(function(user){
        if(user){
            console.log("duplicated");
            console.log(typeof([user.Sid]))
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