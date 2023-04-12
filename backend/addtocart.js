const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
router.post('/addToCourseCart', (req,res) =>{
    console.log(req.body)
    User.findOne({username: req.body['username']}).then(function(user){
        Course.findOne({CourseId: req.body['id']}).then(function(course){
            if(user.CartCourse.includes(course._id) == true){
                res.send('duplicate')
            }else{
                user.CartCourse.push(course)
                user.save()
                res.send('successfully')
            }
        })
    })

})
module.exports = router;