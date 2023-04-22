// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/addcourse' endpoint
router.post('/addcourse', (req, res) => { 
    // Log the request body to the console for debugging purposes
    console.log(req.body);

    // Loop through the properties of the request body object
    for (const property in req.body) { 
        // Check if the value of the property is empty
        if (req.body[property] == '') {
            console.log(property);
            // Send the property name as a response and return early
            res.send(property);
            return;
        }
    }

    // Check if the 'Capacity' property contains only alphabetical characters using a regular expression
    if(/^[A-Za-z]+$/.test(req.body['Capacity'])){
        res.send('Invalid Capacity');
    } else {
        // Calculate the end time by adding 1 hour to the start time
        const EndTime = ((parseInt(req.body['StartTime']))+1) + ":00";
        console.log(EndTime);

        // Create a new Course document in the MongoDB database using the Mongoose 'create' method
        Course.create({
            CourseCode: req.body['code'],
            CourseName: req.body['name'],
            CourseId: req.body['id'],
            Venue: req.body['venue'],
            Date: req.body['Date'],
            StartTime: req.body['StartTime'],
            EndTime: EndTime,
            Department: req.body['department'],
            Instructor: req.body['instructor'],
            Capacity: req.body['Capacity'],
            Outline: req.body['Outline']
          })
          .then(function (result) {
            // If the document was inserted successfully, send a success response
            res.send('Added');
          })
          .catch(function (error) {
            // If a duplicate key error occurred, send an appropriate error response
            if (error.name === 'MongoServerError' && error.code === 11000) {
              res.send('Repeated');
            } else {
              // If the error was not a duplicate key error, log it and send a generic error response
              console.error(error);
              res.status(500).send('An error occurred while adding the course');
            }
          });
    }
});

// Export the router for use by other modules
module.exports = router;
