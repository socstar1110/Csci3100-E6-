const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Route to get a user's courses in their cart
router.get("/cartcourse/:username", function(req, res) {
  // Find the user with the given username and populate their courses in the cart
  User.findOne({ username: req.params.username }, "CartCourse")
    .populate({ path: "CartCourse", model: "Course" })
    .then(function(user) {
      // If the user is not found, return a message indicating so
      if (user == null) {
        res.send("No such user: " + req.params.username);
      }
      // Otherwise, format the courses in the cart and return them
      else {
        // Map the user's courses in the cart to a new array with only the desired fields
        const cartCourses = user.CartCourse.map((course) => ({
          courseName: course.CourseName,
          courseId: course.CourseId,
          courseCode: course.CourseCode,
          venue: course.Venue,
          date: course.Date,
          startTime: course.StartTime,
          endTime: course.EndTime,
          department: course.Department,
          instructor: course.Instructor,
          capacity: course.Capacity,
          availability: course.Capacity-course.RegUser.length // Calculate the number of available spots in the course
        }));
        // Return the formatted courses in the cart
        res.json(cartCourses);
      }
    })
    .catch(function(err) {
      // If there is an error, return a 500 Internal Server Error response
      console.error(err);
      res.status(500).send("Error finding user: " + req.params.username
