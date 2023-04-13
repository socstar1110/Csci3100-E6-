
const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/adduser', async (req, res) => {
    try {
      // Validate input fields
      const { username, password, Sid, Sex, Department, Email, Phone } = req.body;
      if (!username || !password || !Sid || !Sex || !Department || !Email || !Phone) {
        return res.status(400).send('All input fields are required.');
      }
    
      // Check for duplicate username
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).send('Username already exists.');
      }
  
      // Check for duplicate Sid
      const existingSid = await User.findOne({ Sid });
      if (existingSid) {
        return res.status(409).send('Sid already exists.');
      }
    
      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        return res.status(400).send('Invalid email format.');
      }
    
      // Validate phone number
      if (!/^\d{8}$|^\d{13}$/.test(Phone) || isNaN(parseInt(Phone))) {
        return res.status(400).send('Phone number must be a numeric value with either 8 or 13 digits.');
      }
    
      // Create user
      const newUser = await User.create({
        username,
        password,
        permission: false,
        Sid,
        Sex,
        Department,
        Email,
        Phone
      });
    
      if (newUser) {
        return res.status(200).send('User added successfully.');
      } else {
        return res.status(500).send('Failed to add user.');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred while adding user.');
    }
  });

module.exports = router;