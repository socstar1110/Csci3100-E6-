const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/removecourse', (req, res) => {
    //console.log(typeof(req.body['id']))
    Course.findOne({ CourseId: req.body['id'] }).then(function (result){
        console.log(result._id)
    })

    //Course.deleteOne({ CourseId: req.body['id'] }).then(function (result) {// del course base on the id 
    //    res.send('Deleted')
    //})
})

module.exports = router;