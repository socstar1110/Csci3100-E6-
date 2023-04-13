const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/retrievecourseinfo', (req, res) => {
    console.log(req.body);
    const { courseIds } = req.body;
    const conditions = courseIds.map((id) => ({ _id: id }));
    Course.find({ $or: conditions }, { CourseCode: 1, CourseName: 1, Venue: 1, Date: 1, StartTime: 1, EndTime: 1, Instructor: 1 })
        .then((courses) => {
            console.log(courses);
            res.send(courses);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error retrieving courses');
        });
});

module.exports = router;