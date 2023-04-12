const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post("/dropfromcart", function (req, res) {  
    const courseId = req.body.courseId;
    console.log(courseId);
    User.findOne({ username: req.body.username }, 'CartCourse')
      .populate('CartCourse')
      .then((user) => {
        if (user == null) {
          res.send("no such user");
        } else {
          Course.findOne({ CourseId: courseId })
            .then((course) => {
              if (course == null) {
                res.send("no such course");
              } else {
                const index = user.CartCourse.findIndex((c) => c.CourseId == courseId);
                console.log(index)
                if (index !== -1) {
                  user.CartCourse.splice(index, 1);
                  user.save();
                }
                res.send("Course dropped from cart successfully!");
              }
            })
            .catch((err) => {
              console.error(err);
              res.send("Error occurred");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.send("Error occurred");
      });
  });

module.exports = router;