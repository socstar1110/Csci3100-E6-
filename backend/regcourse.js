
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
  // const temp = [ //temp data for display //9867
  // {name:"Software Engineering", id:"7894",code: 'Csci3100', venue:"Lsk", time:"12:30 - 2:15",department:"Computer Science",instructor:"Micheal",capacity:200},
  // {name:"Data Structures", id:"4469",code: 'Csci2100', venue:"Yia", time:"9:30 - 11:15",department:"Computer Science",instructor:"Allen",capacity:200}
  // ];

const parseTimeString = (timeString) => { //parse String to time 
  if (typeof timeString !== "string") {
      throw new Error("Invalid time string");
  }
  const [hours, minutes] = timeString.split(":").map((str) => parseInt(str));
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
  };

// Function to check for time clashes between a course and a user's registered courses
const checkTimeClash = async (courseDay, startTimeString, endTimeString, username) => {
  try {
    // Find the user with the given username and populate their registered courses
    const user = await User.findOne({username: username}).populate('RegCourse').exec();
    if (!user) {
      throw new Error('User not found');
    }
    
    // Get the user's registered courses that are on the same day as the given course
    const regCourses = user.RegCourse || [];
    const filteredCourses = regCourses.filter((course) => course.Date === courseDay);
    // Parse the start and end times of the given course
    const startTime = parseTimeString(startTimeString);
    const endTime = parseTimeString(endTimeString);
    // Check for time clashes between the given course and the user's registered courses
    const clashes = filteredCourses.filter((course) => {
      const courseStart = parseTimeString(course.StartTime);
      const courseEnd = parseTimeString(course.EndTime);
      return (
        (courseStart >= startTime && courseStart < endTime) ||
        (courseEnd > startTime && courseEnd <= endTime) ||
        (courseStart <= startTime && courseEnd >= endTime)
      );
    });
    // If there is a time clash, return the first course in the user's registered courses that clashes with the given course
    if (clashes.length > 0) {
      return {
        clash: true,
        clashCourse: clashes[0],
      };
    }
    // If there is no time clash, return null
    else {
      return {
        clash: false,
        clashCourse: null,
      };
    }
  } catch (err) {
    throw err;
  }
};

// Function to check for time clashes between a course and courses in a user's cart
const checkTimeClashwithCart = async (courseDay, startTimeString, endTimeString, courseId, IDlist) => {
  try {
    const filteredIDlist = IDlist.filter((id) => id !== courseId);
    // Find the courses in the given list of course IDs and filter them by courses on the same day as the given course
    const courses = await Course.find({CourseId: {$in: filteredIDlist}}).exec();
    const filteredCourses = courses.filter((course) => course.Date === courseDay);
    // Parse the start and end times of the given course
    const startTime = parseTimeString(startTimeString);
    const endTime = parseTimeString(endTimeString);
    // Check for time clashes between the given course and the courses in the user's cart
    const clashes = filteredCourses.filter((course) => {
      const courseStart = parseTimeString(course.StartTime);
      const courseEnd = parseTimeString(course.EndTime);
      return (
        (courseStart >= startTime && courseStart < endTime) ||
        (courseEnd > startTime && courseEnd <= endTime) ||
        (courseStart <= startTime && courseEnd >= endTime)
      );
    });
    // If there are multiple time clashes, return the second course in the filtered courses list that clashes with the given course
    if (clashes.length > 0) {
      return {
        clash: true,
        clashCourse: clashes[0],
      };
    }
    // If there is no time clash, return null
    else {
      return {
        clash: false,
        clashCourse: null,
      };
    }
  } catch (err) {
    console.log('error');
  }
};


// Route for registering a course
router.post("/regCourse", async function (req, res) {
  const courseIDs = req.body.courseID;
  const IDlist = req.body.Idlist;
  const username = req.body.username;

  try {
    const course = await Course.findOne({ CourseId: courseIDs }).exec();

    // If course is not found, return 404 Not Found response
    if (!course) {
      return res.status(404).send("Course " + courseIDs + " is not found!");
    }
    // If course is full, return 400 Bad Request response
    else if (course.RegUser.length >= course.Capacity) {
      return res.status(400).send("Course " + course.CourseCode + " is full!");
    }
    // If course is available, check for time clash with registered courses and cart courses
    else {
      const courseDay = course.Date;
      const starttime = course.StartTime;
      const endtime = course.EndTime;

      // Check for time clash with registered courses
      const result = await checkTimeClash(courseDay, starttime, endtime, username);
      if (result.clash) {
        return res.status(400).send(course.CourseCode + ": Time clash with registered course " + result.clashCourse.CourseCode);
      }
      // Check for time clash with cart courses
      else {
        const resultCart = await checkTimeClashwithCart(courseDay, starttime, endtime, courseIDs, IDlist);
        if (resultCart.clash) {
          return res.status(400).send(course.CourseCode + ": Time clash with the cart course " + resultCart.clashCourse.CourseCode);
        }
        // If there is no time clash, proceed with registration
        else {
          // Find the user who is registering for the course
          const user = await User.findOne({ username: username }).populate('RegCourse');

          // If user is not found, return 400 Bad Request response
          if (user == null) {
            return res.send("no such user:" + username);
          }
          // If user has already registered for the course, return 400 Bad Request response
          else if (user.RegCourse.includes(course._id)) {
            return res.status(400).send("You have already registered for the course " + course.CourseCode);
          }
          // If user is eligible for registration, update course and user information
          else {
            course.RegUser.push(user);
            await course.save();

            user.RegCourse.push(course);
            await user.save();

            return res.status(200).send("Registered course " + course.CourseCode + " successfully!");
          }
        }
      }
    }
  } catch (err) {
    // If there is an error, return 500 Internal Server Error response
    console.error(err);
    return res.status(500).send("No corresponding course: courseID "+courseIDs);
  }
});

module.exports = router;