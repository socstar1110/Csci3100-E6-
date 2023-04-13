const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/modifyuser', async (req, res) => {
  let counter = 0;
  try {
    const result = await User.findOne({ Sid: req.body['OldSid'] });
    if (result == null) {
      return res.send('User not found! Please input the correct original SID!');
    }
    const { username, password, Sid, Sex, Department, Email, Phone } = req.body;
    if (!username && !password && !Sid && !Sex && !Department && !Email && !Phone) {
      return res.status(400).send('No input fields. Please input at least 1 attribute for update!');
    }
    const filter = { _id: { $ne: result._id } };
    if (username && username !== result.username) {
      filter.username = username; //store new username
      const user = await User.findOne({username:filter.username});
      if (user) {
        return res.status(400).send('Duplicate or non-changed username.');
    }
    }
    if (Sid && Sid !== result.Sid) {
      filter.Sid = Sid; //store new sid
      const sID = await User.findOne({Sid:filter.Sid});
      if (sID) {
        return res.status(400).send('Duplicate or non-changed Sid.');
      }
    }
    if (Phone && (!/^\d{8}$|^\d{13}$/.test(Phone) || isNaN(parseInt(Phone)))) {
      return res.status(400).send('Phone number must be a numeric value with either 8 or 13 digits.');
    }
    if (Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      return res.status(400).send('Invalid email format.');
    }

    for (const property in req.body) {
      if (counter > 0 && req.body[property] != '') {
        result[property] = req.body[property];
      }
      counter++;
    }

    // Modify user
    await result.save();
    res.send('User updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while updating user.');
  }
});
module.exports = router;