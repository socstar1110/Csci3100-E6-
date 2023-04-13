const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/modifycourse', (req, res) => {
    let counter = 0;
    //console.log(req.body['oldId'])
    Course.findOne({ CourseId: req.body['oldId'] }).then(function (result) {
        if (result == null) {
            res.send('Not exist') // this course is not in the system 
        } else if (parseInt(req.body['StartTime']) >= parseInt(req.body['EndTime'])) {
            res.send('Invaild time') // unresonable time slot 
        } else if(/^[A-Za-z]+$/.test(req.body['Capacity'])){
            res.send('Invaild Capacity')
        }else {
            for (const property in req.body) {
                if (counter > 0 && req.body[property] != '') { // the input is empty we do not modify it
                    console.log(req.body[property])
                    result[property] = req.body[property]
                }
                counter++;
            }
            result.save(function (error) {
                console.log(typeof(parseInt(req.body['Capacity'])))
                if (error) {
                    res.send("duplicate")
                } else {
                    res.send('Updated')
                }
            })

        }
    })
})

module.exports = router;