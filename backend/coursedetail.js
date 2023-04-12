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
            console.log('The required course information is sent')
            res.send(obj)
        }
    })
})

module.exports = router;