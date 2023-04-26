// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/checkusername' endpoint
router.post('/checkusername', (req, res) => {
    // Log the request body to the console for debugging purposes
    console.log(req.body);
    // Extract the username from the request body
    console.log(req.body['username'])
    // Use the 'findOne' method of the User model to find a user with the specified username
    User.findOne({username: req.body['username']})
    .then(function(user){
        // If a user is found with the specified username, log a message to the console, send the username in the response, and return
        if(user){
            console.log("duplicated");
            console.log(typeof([user.username]))
            res.send([user.username]);
        }
        // If no user is found with the specified username, log a message to the console, send an empty array in the response, and return
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
