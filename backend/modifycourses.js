const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// This route is used to modify an existing course
router.post('/modifycourse', (req, res) => {
    let counter = 0;
    //console.log(req.body['oldId'])

    // Find the course with the old ID in the database
    Course.findOne({ CourseId: req.body['oldId'] }).then(function (result) {
        //console.log(parseInt(req.body['Capacity']) < result['RegUser'].length)
        if (result == null) {
            res.send('Not exist') // this course is not in the system 
        } else if (/^[A-Za-z]+$/.test(req.body['Capacity'])) {
            res.send('Invaild Capacity')
        } else if (parseInt(req.body['Capacity']) < result['RegUser'].length) {
            console.log('exceed')
            res.send("exceed")
        } else {
            // Loop through the request body to update the course properties
            for (const property in req.body) {
                if (counter > 0 && req.body[property] != '') { // the input is empty we do not modify it
                    console.log(req.body[property])
                    //console.log(result['RegUser'].length)
                    result[property] = req.body[property]
                }
                counter++;
            }
            // Update the EndTime property based on the new StartTime property
            const EndTime = ((parseInt(req.body["StartTime"])) + 1) + ":00"
            //console.log(EndTime)
            //console.log(result['EndTime'])
            result.EndTime = EndTime
            // Save the updated course in the database
            result.save(function (error) {
                console.log(typeof (parseInt(req.body['Capacity'])))
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
