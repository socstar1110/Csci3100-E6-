// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course ,Admin} = require('./mongoose');
const CryptoJS = require('crypto-js');
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware to parse cookies
router.use(cookieParser());

// Define a route handler for POST requests to the '/login' endpoint
router.post('/login', (req, res) => {
    // Extract the encrypted username and password from the request body
    const { encryptedUsername, encryptedPassword } = req.body;
    // Decrypt the username and password using a secret key
    const decryptedUsername = CryptoJS.AES.decrypt(encryptedUsername, 'secret_default_key').toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'secret_default_key').toString(CryptoJS.enc.Utf8);

    // Check if the decrypted username and password correspond to a registered user or admin
    User.findOne({username: decryptedUsername}).then(function(result){
        if(result == null){
            // If no user is found with the decrypted username, check if an admin exists with the decrypted username
            Admin.findOne({adminName: decryptedUsername}).then(function(admin){
                if(admin == null){
                    // If neither a user nor an admin is found with the decrypted username, send an 'Invalid' response
                    res.send("Invalid")
                }else{
                    // If an admin is found with the decrypted username, check if the decrypted password matches the admin password
                    if(admin.password == decryptedPassword){
                        // If the decrypted password matches the admin password, set a cookie indicating that an admin is logged in and send an 'adminValid' response
                        res.cookie("adminLogged",'true')
                        res.send("adminValid")
                    }else{
                        // If the decrypted password does not match the admin password, send an 'Invalid' response
                        res.send("Invalid")
                    }
                }
            })
        }else{
            // If a user is found with the decrypted username, check if the decrypted password matches the user password
            const match = decryptedPassword == result.password
            if(match ){
                // If the decrypted password matches the user password, set a cookie indicating that a user is logged in and send a 'userValid' response
                res.cookie("username",result.username)
                res.cookie("logged",'true')
                res.send('userValid')
            }else{
                // If the decrypted password does not match the user password, send an 'Invalid' response
                res.send("Invalid")
            }
        }
    })
})

// Export the router for use by other modules
module.exports = router;
