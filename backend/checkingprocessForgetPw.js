// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/checkingprocess' endpoint
router.post('/checkingprocess',(req, res)=>{
    // Extract the username and SID from the request body
    const username = req.body['username'];
    const sid = req.body['sid'];
    // Use the 'findOne' method of the User model to find the user with the specified username and SID
    User.findOne({username: username, Sid: sid})
    .then((user)=>{
        // If a user is found, log their SID to the console for debugging purposes and send their SID in the response
        if(user){
            console.log([user.Sid])
            res.send([user.Sid])
        }
        // If no user is found, send an empty array in the response
        else{
            res.send([])
        }
    })
})

// Export the router for use by other modules
module.exports = router
