const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

// This route is used to modify an existing user
router.post('/modifyuser', async (req, res) => {
  let counter = 0;
  try {
    // Find the user with the old SID in the database
    const result = await User.findOne({ Sid: req.body['OldSid'] });
    if (result == null) {
      return res.send('User not found! Please input the correct original SID!');
    }
    // Check if at least one attribute is provided for update
    const { username, password, Sid, Sex, Department, Email, Phone } = req.body;
    if (!username && !password && !Sid && !Sex && !Department && !Email && !Phone) {
      return res.status(400).send('No input fields. Please input at least 1 attribute for update!');
    }
    // Create a filter to check for duplicates and non-changed fields
    const filter = { _id: { $ne: result._id } };
    // Check if the new username is duplicate or non-changed
    if (username && username !== result.username) {
      filter.username = username;
      const user = await User.findOne({username:filter.username});
      if (user) {
        return res.status(400).send('Duplicate or non-changed username.');
      }
    }
    // Check if the new SID is duplicate or non-changed
    if (Sid && Sid !== result.Sid) {
      filter.Sid = Sid;
      const sID = await User.findOne({Sid:filter.Sid});
      if (sID) {
        return res.status(400).send('Duplicate or non-changed Sid.');
      }
    }
    // Check if the phone number is valid
    if (Phone && (!/^\d{8}$|^\d{13}$/.test(Phone) || isNaN(parseInt(Phone)))) {
      return res.status(400).send('Phone number must be a numeric value with either 8 or 13 digits.');
    }
    // Check if the email format is valid
    if (Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      return res.status(400).send('Invalid email format.');
    }
    // Loop through the request body to update the user properties
    for (const property in req.body) {
      if (counter > 0 && req.body[property] != '') {
        result[property] = req.body[property];
      }
      counter++;
    }
    // Save the updated user in the database
    await result.save();
    res.send('User updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while updating user.');
  }
});

module.exports = router;
