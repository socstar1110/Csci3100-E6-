// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/checkusersid' endpoint
router.post('/checkusersid', (req, res) => {
    // Log the request body to the console for debugging purposes
    console.log(req.body);
    // Extract the student ID (SID) from the request body
    console.log(req.body['Sid'])
    // Use the 'findOne' method of the User model to find a user with the specified SID
    User.findOne({Sid: req.body['Sid']})
    .then(function(user){
        // If a user is found with the specified SID, log a message to the console, send the SID in the response, and return
        if(user){
            console.log("duplicated");
            console.log(typeof([user.Sid]))
            res.send([user.Sid]);
        }
        // If no user is found with the specified SID, log a message to the console, send an empty array in the response, and return
        else{
            console.log("not duplicated");
            res.send([]);
        }
    }).catch((error) => {
        // If an error occurs during the process, log the error to the console and send an empty array in the response
        console.log(error);
        res.send([]);
    })
})

// Export the router for use by other modules
module.exports = router
