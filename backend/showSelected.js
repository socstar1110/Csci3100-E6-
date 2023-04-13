const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); //cookies


router.post('/showSelected', (req, res) => {
    //console.log(req.body)

    User.findOne({ username: req.body['username'] })
        .populate('RegCourse')
        .exec()
        .then(result => {
            res.send(result.RegCourse);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
    //res.send('test')

})

module.exports = router;