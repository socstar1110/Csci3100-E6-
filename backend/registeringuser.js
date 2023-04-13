const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const CryptoJS = require('crypto-js');

router.post('/registeringuser', (req,res)=>{
    console.log('enter');
    const decryptedUsername = CryptoJS.AES.decrypt(req.body['username'], 'secret_default_key').toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(req.body['password'], 'secret_default_key').toString(CryptoJS.enc.Utf8);
    //console.log(decryptedUsername)
    //console.log(decryptedPassword)
    
    User.create({
        username: decryptedUsername,
        password: decryptedPassword,
        Sid: req.body['sid'],
        Sex: req.body['sex'],
        Department: req.body['department'],
        Email: req.body['email'],
        Phone: req.body['phone']
    }).then(function(user){
        if(user){
            res.send(user);
        }
        else{
            res.send([])
        }
    }).catch((error)=>{
        console.log(error);
    })
    
})

module.exports = router