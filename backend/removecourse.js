const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/removecourse', (req, res) => {
    //console.log(typeof(req.body['id']))
    Course.findOne({ CourseId: req.body['id'] }).then(function (course){
        console.log(course._id)
        User.find().then(function(user){
            for (let i = 0; i < user.length; i++){
                if(user[i].CartCourse.includes(course._id)){
                    const temp = user[i].CartCourse.indexOf(course._id)
                    console.log(temp)
                    user[i].CartCourse.splice(temp,1)
                    user[i].save();
                }else if(user[i].RegCourse.includes(course._id)){
                    const temp = user[i].RegCourse.indexOf(course._id)
                    console.log(temp)
                    user[i].RegCourse.splice(temp,1)
                    user[i].save();
                }else{
                    console.log("testing")
                }
                
            }
        })
    })

    Course.deleteOne({ CourseId: req.body['id'] }).then(function (result) {// del course base on the id 
        res.send('Deleted')
    })
})

module.exports = router;