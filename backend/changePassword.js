const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/changepassword',(req,res)=>{
    User.updateOne(
        { username: req.body['username'], Sid: req.body['sid'] },
        { $set: { password: req.body['password'] } },
        ).then((user)=>{
            console.log(user.Sid)
            res.send([user.Sid])
        }).catch((error)=>{
            console.log(error)
        })
})

module.exports = router