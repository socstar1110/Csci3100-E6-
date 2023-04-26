// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/alluser' endpoint
router.post('/alluser', (req, res) => {
    // Use the 'find' method of the User model to retrieve all user records from the database
    User.find()
      // Use the 'populate' method to populate the 'RegCourse' and 'CartCourse' properties of the user records with their respective course records
      .populate('RegCourse')
      .populate({
        path: 'CartCourse',
        model: 'Course',
        select: 'CourseCode' // Only select the CourseCode property from the Course collection
      })
      .then(function (result) {
        // Create an array of objects containing the user information extracted from the records
        const obj = [];
        for (let i = 0; i < result.length; i++) {
          // Join the course codes with a comma separator
          const cartCourses = result[i].CartCourse.map(cartcourse => cartcourse.CourseCode).join(', ');
          const regCourses = result[i].RegCourse.map(course => course.CourseCode).join(', ');
          obj.push({
            username: result[i].username,
            password: result[i].password,
            userID: result[i]._id,
            SID: result[i].Sid,
            Sex: result[i].Sex,
            Department: result[i].Department,
            Email: result[i].Email,
            Phone: result[i].Phone,
            CartCourse: cartCourses,
            RegCourse: regCourses
          });
        }
        // Send the array of user objects in the response
        res.send(obj);
        console.log("All user information is sent");
      }).catch(function (error) {
        // If an error occurs during the process, log the error to the console
        console.log(error);
      });
});

// Export the router for use by other modules
module.exports = router;
