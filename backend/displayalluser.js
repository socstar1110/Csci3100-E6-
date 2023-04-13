const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/alluser', (req, res) => {
    User.find()
      .populate('RegCourse')
      .populate({
        path: 'CartCourse',
        model: 'Course',
        select: 'CourseCode' // Only select the CourseCode property from the Course collection
      })
      .then(function (result) {
        const obj = []
        for (let i = 0; i < result.length; i++) {
          const cartCourses = result[i].CartCourse.map(cartcourse => cartcourse.CourseCode).join(', '); // Join the course codes with a comma separator
          const regCourses = result[i].RegCourse.map(course => course.CourseCode).join(', '); // Join the course codes with a comma separator
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
          })
        }
        //console.log(obj)
        res.send(obj)
        console.log("All user information is sent")
      }).catch(function (error) {
        console.log(error)
      });
  })
module.exports = router;