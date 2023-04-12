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
    if (parseInt(req.body['StartTime']) >= parseInt(req.body['EndTime'])) { // check any invaild time ie : ie : 10:30 - 9:15
        res.send('Invaild time')
    } else {
        Course.create({
            CourseCode: req.body['code'],
            CourseName: req.body['name'],
            CourseId: req.body['id'],
            Venue: req.body['venue'],
            Date: req.body['Date'],
            StartTime: req.body['StartTime'],
            EndTime: req.body['EndTime'],
            Department: req.body['department'],
            Instructor: req.body['instructor'],
            Capacity: req.body['capacity'],
            Outline: req.body['outline']
        }).then(function (result) {
            if (result == null) {
                res.send('Repeated') // this course already exist in this system
            } else {
                res.send('Added')
            }
        })
    }
})

module.exports = router;