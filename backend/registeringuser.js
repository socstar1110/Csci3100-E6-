// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const CryptoJS = require('crypto-js');

// Route for registering a new user
router.post('/registeringuser', (req,res)=>{
    // Decrypt the username and password using a secret key
    const decryptedUsername = CryptoJS.AES.decrypt(req.body['username'], 'secret_default_key').toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(req.body['password'], 'secret_default_key').toString(CryptoJS.enc.Utf8);

    // Create a new user with the decrypted username, password, and other details
    User.create({
        username: decryptedUsername,
        password: decryptedPassword,
        Sid: req.body['sid'],
        Sex: req.body['sex'],
        Department: req.body['department'],
        Email: req.body['email'],
        Phone: req.body['phone']
    }).then(function(user){
        // If the user is successfully created, send the user object as a response
        if(user){
            res.send(user);
        }
        // If the user cannot be created, send an empty array as a response
        else{
            res.send([])
        }
    }).catch((error)=>{
        // If there is an error, log the error to the console
        console.log(error);
    })
})

// Export the router object
module.exports = router
