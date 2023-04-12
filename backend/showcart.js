const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); //cookies


router.post('/showcart',(req,res) =>{
    res.cookie('firstName', "testing");
    console.log(req.body)
    /*
    User.findOne({username: req.body['username']})
    .populate('CartCourse')
    .exec(
        function(err,result){
            console.log(result)
        }
    )
    */
    res.send('test')
})

module.exports = router;