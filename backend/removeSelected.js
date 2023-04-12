const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/removeSelected', (req, res) => {
    console.log(req.body)
    Course.findOne({CourseId: req.body['id']}).then(function(course){
        console.log(course._id)
        User.findOne({username: req.body['username']}).then(function(user){
            console.log(user.RegCourse.indexOf(course._id))
            user.RegCourse.splice(user.RegCourse.indexOf(course._id), 1)
            user.save()
        })
    })
    User.findOne({username: req.body['username']}).then(function(user){
        console.log(user._id)
        Course.findOne({CourseId: req.body['id']}).then(function(course){
            console.log(course.RegUser.indexOf(user._id))
            course.RegUser.splice(course.RegUser.indexOf(user._id), 1)
            course.save()
            res.send("success")
        })
    })
})

module.exports = router;