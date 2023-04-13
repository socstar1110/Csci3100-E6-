const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// retrieve the courses that user registered or added to course cart
router.post('/timetable', (req, res)=>{
    console.log(req.body);
    switch(req.body['Condition']){
        case 'temporary':
            User.findOne({username: req.body['Username']})
            .then((result)=>{
                res.send(result.CartCourse);
            })
            .catch((error) => {
                console.log(error);
                res.send([]);
            })
            break;
        
        case 'registered':
            User.findOne({username: req.body['Username']})
            .then((result)=>{
                console.log(result.RegCourse)
                res.send(result.RegCourse);
            })
            .catch((error) => {
                console.log(error);
                res.send([]);
            })
            break;
    }
});

module.exports = router;