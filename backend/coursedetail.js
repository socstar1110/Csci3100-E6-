const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/coursedetail', (req, res) => { // access course information in detail
    const obj = {}
    //console.log(req.body['id'])

    Course.findOne({ CourseId: req.body['id'] }).then(function (result) {
        if (result == null) {
            //obj.push({outline:"this course did not exist"})
        } else {
            obj.outline = result.Outline
            obj.name = result.CourseName
            obj.id = result.CourseId
            obj.code = result.CourseCode
            obj.venue = result.Venue
            obj.date = result.Date
            obj.startTime = result.StartTime
            obj.endTime = result.EndTime
            obj.department = result.Department
            obj.instructor = result.Instructor
            obj.capacity = result.Capacity
            obj.available = result.Capacity - result.RegUser.length
            console.log('The required course information is sent')
            res.send(obj)
        }
    })
})

module.exports = router;