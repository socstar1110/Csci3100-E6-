const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Route to get user data for a given username
router.post('/userdata',(req,res) =>{
    // Find the user with the given username
    User.findOne({username:req.body['username']}).then(function(result){
        // Log the user data to the console for debugging purposes
        console.log(result)
        // Send the user data to the client
        res.send(result)
    })
})

// Export the router object
module.exports = router;
