const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post("/dropfromcart/:username/:courseId", function (req, res) {  
  const courseId = req.body.courseId;
  User.findOne({ username: req.body.username }, 'CartCourse')
    .populate('CartCourse')
    .then((user) => {
      if (user == null) {
        res.send("no such user");
      } else {
        const updatedCart = user.CartCourse.filter((c) => c.CourseId !== courseId);
        if (updatedCart.length === user.CartCourse.length) {
          // Course not found in cart
          res.send("Course not found in cart");
        } else {
          user.CartCourse = updatedCart;
          user.save()
            .then(() => {
              res.send("Course " + courseId + " dropped from cart successfully!");
            })
            .catch((err) => {
              console.error(err);
              res.send("Error occurred");
            });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.send("Error occurred");
    });
});

module.exports = router;