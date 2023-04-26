const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); // Use cookie-parser middleware to handle cookies

// Route for showing selected courses for a user
router.post('/showSelected', (req, res) => {
    // Find the user with the given username and populate their list of registered courses
    User.findOne({ username: req.body['username'] })
        .populate('RegCourse')
        .exec()
        .then(result => {
            // Send the user's list of registered courses to the client
            res.send(result.RegCourse);
        })
        .catch(err => {
            // Handle any errors that occur
            console.error(err);
            res.status(500).send('An error occurred');
        });
})

// Export the router object
module.exports = router;
