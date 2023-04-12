const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser()); //cookies


router.post('/showSelected',(req,res) =>{
    //console.log(req.body)
    
    User.findOne({username: req.body['username']})
    .populate('RegCourse')
    .exec(
        function(err,result){
            //console.log(result.CartCourse)
            res.send(result.RegCourse)
        }
    )
    //res.send('test')
    
})

module.exports = router;