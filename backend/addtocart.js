// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose'); // Import the User and Course models from the mongoose module

// Define a route handler for POST requests to the '/addToCourseCart' endpoint
router.post('/addToCourseCart', (req,res) =>{
    console.log(req.body); // Log the request body to the console for debugging purposes

    // Find the user document in the MongoDB database with the given username
    User.findOne({username: req.body['username']}).then(function(user){
        // Find the course document in the MongoDB database with the given course ID
        Course.findOne({CourseId: req.body['id']}).then(function(course){
            // Check if the user's cart already contains the course
            if(user.CartCourse.includes(course._id) == true){
                res.send('duplicate'); // If the user's cart already contains the course, send a 'duplicate' response
            }else{
                user.CartCourse.push(course); // Add the course to the user's cart
                user.save(); // Save the changes to the user document in the MongoDB database
                res.send('successfully'); // Send a 'successfully' response
            }
        });
    });
});

// Export the router for use by other modules
module.exports = router;
