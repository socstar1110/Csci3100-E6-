// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Route for removing a course and updating user records
router.post('/removecourse', (req, res) => {
    // Find the course with the given ID
    Course.findOne({ CourseId: req.body['id'] }).then(function (course){
        console.log(course._id)
        // Find all users
        User.find().then(function(user){
            // Loop through each user
            for (let i = 0; i < user.length; i++){
                // If the user has the course in their cart, remove it from their cart
                if(user[i].CartCourse.includes(course._id)){
                    const temp = user[i].CartCourse.indexOf(course._id)
                    console.log(temp)
                    user[i].CartCourse.splice(temp,1)
                    user[i].save();
                }
                // If the user has the course in their list of registered courses, remove it from their list of registered courses
                else if(user[i].RegCourse.includes(course._id)){
                    const temp = user[i].RegCourse.indexOf(course._id)
                    console.log(temp)
                    user[i].RegCourse.splice(temp,1)
                    user[i].save();
                }
                // If the user does not have the course in their cart or list of registered courses, do nothing
                else{
                    console.log("testing")
                }
            }
        })
    })

    // Delete the course with the given ID
    Course.deleteOne({ CourseId: req.body['id'] }).then(function (result) {// del course base on the id 
        // Send a success response to the client
        res.send('Deleted')
    })
})

// Export the router object
module.exports = router;
