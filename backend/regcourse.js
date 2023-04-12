const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
  // const temp = [ //temp data for display //9867
  // {name:"Software Engineering", id:"7894",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
  // {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  // ];
router.get("/cartcourse/:username", function(req, res) {
    User.findOne({ username: req.params.username }, "CartCourse")
      .populate({ path: "CartCourse", model: "Course" })
      .then(function(user) {
        if (user == null) {
          res.send("No such user: " + req.params.username);
        } else {
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
            availability: course.Capacity-course.RegUser.length
          }));
          res.json(cartCourses);
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Error finding user: " + req.params.username);
      });
  });

const checkTimeClash = (courseDay, startTimeString, endTimeString, username) => {
    return User.findOne({username: username})
      .populate("RegCourse")
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        }
        const regCourses = user.RegCourse || [];
        const filteredCourses = regCourses.filter(
          (course) => course.Date === courseDay
        );
        const startTime = parseTimeString(startTimeString);
        const endTime = parseTimeString(endTimeString);
        //console.log(startTime,endTime);
        const clashes = filteredCourses.filter((course) => {
          const courseStart = parseTimeString(course.StartTime);
          const courseEnd = parseTimeString(course.EndTime);
          //console.log(courseStart,courseEnd);
          return (
            (courseStart >= startTime && courseStart < endTime) ||
            (courseEnd > startTime && courseEnd <= endTime) ||
            (courseStart <= startTime && courseEnd >= endTime)
          );
        });
        if (clashes.length > 0) {
          return {
            clash: true,
            clashCourse: clashes[0],
          };
        } else {
          return {
            clash: false,
            clashCourse: null,
          };
        }
      })
      .catch((err) => {
        throw err;
      });
  };
const parseTimeString = (timeString) => {
if (typeof timeString !== "string") {
    throw new Error("Invalid time string");
}
const [hours, minutes] = timeString.split(":").map((str) => parseInt(str));
const date = new Date();
date.setHours(hours, minutes, 0, 0);
return date;
};


router.post("/regCourse", function (req, res) {
  const courseIDs = req.body.courseID;
  const username = req.body.username;
  Course.findOne({ CourseId: courseIDs })
    .exec()
    .then((course) => {
      if (!course) {
        res.status(404).send("Course not found");
      } else if (course.RegUser.length >= course.Capacity) {
        res.status(400).send("Course is full");
      } else {
        const courseDay = course.Date;
        const starttime = course.StartTime;
        const endtime = course.EndTime;
        checkTimeClash(courseDay, starttime, endtime, username)
          .then((result) => {
            if (result.clash) {
              res.status(400).send("Time clash with other course");
            } else {
              //  register the course
              User.findOne({ username: username })
              .populate('RegCourse','CartCourse')
              .then((user) => {
                if (user == null) {
                  res.send("no such user");
                } else {
                  // add user to course's RegUser
                  course.RegUser.push(user);
                  // console.log(course.RegUser._id)
                  course.save();
                  // Register the course, add to user's RegCourse
                  user.RegCourse.push(course);
                  // reduce the course from user's CartCourse
                  const index = user.CartCourse.findIndex((c) => c.CourseId == courseIDs);
                  if (index !== -1) {
                    user.CartCourse.splice(index, 1);
                  }
                  user.save();
                  res.status(200).send("Registered the course successfully!");
                }
              })
              .catch((err) => {
                console.error(err);
                res.send("Error occurred");
              });
            }
          });
      }
    })
    .catch((err) => {
      res.status(500).send("No corresponding course");
      console.log(err);
      });
  });

module.exports = router;