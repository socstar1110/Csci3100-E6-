const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/addcourse', (req, res) => { //add a new course
    console.log(req.body)
    for (const property in req.body) { // loop the object to see another value is empty 
        if (req.body[property] == '') {
            console.log(property)
            res.send(property)
            return
        }
    }
    if(/^[A-Za-z]+$/.test(req.body['Capacity'])){
        res.send('Invaild Capacity')
    }else {
        const EndTime = ((parseInt(req.body['StartTime']))+1) + ":00"
        console.log(EndTime)
        
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
            console.log('duplicate')
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
})

module.exports = router;