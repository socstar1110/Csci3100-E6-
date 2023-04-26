// Import the required modules
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// Define a route handler for POST requests to the '/dropfromcart/:username/:courseId' endpoint
router.post("/dropfromcart/:username/:courseId", function (req, res) {  
  // Extract the courseId from the request body
  const courseId = req.body.courseId;
  // Find the user with the given username and populate the 'CartCourse' property with the course records
  User.findOne({ username: req.body.username }, 'CartCourse')
    .populate('CartCourse')
    .then((user) => {
      if (user == null) {
        // If no user is found with the given username, send a message indicating that the user does not exist
        res.send("no such user");
      } else {
        // If the user is found, filter the 'CartCourse' array to remove the course with the given courseId
        const updatedCart = user.CartCourse.filter((c) => c.CourseId !== courseId);
        if (updatedCart.length === user.CartCourse.length) {
          // If the length of the updated cart is the same as the original cart, the course was not found in the cart
          res.send("Course not found in cart");
        } else {
          // If the course was found and removed from the cart, update the user's 'CartCourse' property and save the changes
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

// Export the router for use by other modules
module.exports = router;
