// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/timetable' endpoint
router.post('/timetable', (req, res)=>{
    // Log the request body to the console for debugging purposes
    console.log(req.body);
    // Use a switch statement to determine what action to take based on the value of the 'Condition' field in the request body
    switch(req.body['Condition']){
        // If the 'Condition' field is 'temporary', retrieve the list of courses in the user's course cart
        case 'temporary':
            User.findOne({username: req.body['Username']})
            .then((result)=>{
                res.send(result.CartCourse);
            })
            .catch((error) => {
                console.log(error);
                res.send([]);
            })
            break;
        // If the 'Condition' field is 'registered', retrieve the list of courses the user has registered for
        case 'registered':
            User.findOne({username: req.body['Username']})
            .then((result)=>{
                console.log(result.RegCourse)
                res.send(result.RegCourse);
            })
            .catch((error) => {
                console.log(error);
                res.send([]);
            })
            break;
    }
});

// Export the router for use by other modules
module.exports = router;
