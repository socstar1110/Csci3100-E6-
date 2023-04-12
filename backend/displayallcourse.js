const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); //cookies

router.post('/allcourse', (req, res) => {
    Course.find().then(function (result) {
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
      res.cookie('mycookie', '123');
      res.send(obj);
      console.log('All course information is sent');
    }).catch(function (error) {
      console.log(error);
    });
  });

module.exports = router;