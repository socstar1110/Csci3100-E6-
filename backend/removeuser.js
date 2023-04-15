const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/removeuser', async (req, res) => {
  /*
    try {
      console.log(req.body['id'] );
      const userId = req.body['id'];
      // Find the user to be deleted
      const user = await User.findOne({ username: req.body['id'] });
      if (!user) {
        return res.status(404).send('User not found');
      }
      // Remove the user from their registered courses
      const courses = await Course.find({ RegUser: user._id });
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        course.RegUser.remove(user._id);
        await course.save();
      }
      // Delete the user
      await User.findByIdAndDelete(userId);
      res.send('Deleted');
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred while deleting user.');
    }
    */
    User.findOne({ username: req.body['id'] }).then(function (user){
      if(user == null){
        res.send('No exit user')
      }
        console.log(user)
        Course.find().then(function(course){
          for (let i = 0; i < course.length; i++){
            if(course[i].RegUser.includes(user._id)){
              const temp = course[i].RegUser.indexOf(user._id)
              console.log(temp)
              course[i].RegUser.splice(temp,1)
              course[i].save();
            }
          }
      })

    })

    User.deleteOne({ username: req.body['id'] }).then(function (result) {// del course base on the id 
      res.send('Deleted')
    })
  });


module.exports = router;