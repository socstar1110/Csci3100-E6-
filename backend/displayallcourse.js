// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); // Use the 'cookie-parser' middleware to handle cookies

// Define a route handler for POST requests to the '/allcourse' endpoint
router.post('/allcourse', (req, res) => {
    // Use the 'find' method of the Course model to retrieve all course records from the database
    Course.find().then(function (result) {
        // Create an array of objects containing the course information extracted from the records
        const obj = [];
        for (let i = 0; i < result.length; i++) {
            obj.push({
                name: result[i].CourseName,
                id: result[i].CourseId,
                code: result[i].CourseCode,
                venue: result[i].Venue,
                Date: result[i].Date,
                StartTime: result[i].StartTime,
                EndTime: result[i].EndTime,
                department: result[i].Department,
                instructor: result[i].Instructor,
                capacity: result[i].Capacity,
                available: result[i].Capacity - result[i].RegUser.length,
            });
        }
        // Set a cookie named 'mycookie' with a value of '123'
        res.cookie('mycookie', '123');
        // Send the array of course objects in the response
        res.send(obj);
        console.log('All course information is sent');
    }).catch(function (error) {
        // If an error occurs during the process, log the error to the console
        console.log(error);
    });
});

// Export the router for use by other modules
module.exports = router;
