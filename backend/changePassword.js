// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/changepassword' endpoint
router.post('/changepassword',(req,res)=>{
    // Use the 'updateOne' method of the User model to update the password for the specified user
    User.updateOne(
        { username: req.body['username'], Sid: req.body['sid'] },
        { $set: { password: req.body['password'] } },
    ).then((user)=>{
        // Log the user's SID to the console for debugging purposes
        console.log(user.Sid)
        // Send the user's SID in the response
        res.send([user.Sid])
    }).catch((error)=>{
        // Log any errors to the console
        console.log(error)
    })
})

// Export the router for use by other modules
module.exports = router
