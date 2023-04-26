// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Route for removing a course from a user's list of registered courses
router.post('/removeSelected', (req, res) => {
    // Find the course with the given ID
    Course.findOne({CourseId: req.body['id']}).then(function(course){
        // Find the user with the given username
        User.findOne({username: req.body['username']}).then(function(user){
            // Remove the course from the user's list of registered courses
            user.RegCourse.splice(user.RegCourse.indexOf(course._id), 1)
            user.save()
        })
    })
    // Find the user with the given username
    User.findOne({username: req.body['username']}).then(function(user){
        // Find the course with the given ID
        Course.findOne({CourseId: req.body['id']}).then(function(course){
            // Remove the user from the course's list of registered users
            course.RegUser.splice(course.RegUser.indexOf(user._id), 1)
            course.save()
            // Send a success response to the client
            res.send("success")
        })
    })
})

// Export the router object
module.exports = router;
