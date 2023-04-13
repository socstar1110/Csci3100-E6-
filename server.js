const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const cors = require('cors');
const cookieParser = require('cookie-parser');
const displayAllCourses = require('./backend/displayallcourse');
const courseDetails = require('./backend/coursedetail');
const addCourse = require('./backend/addcourse');
const search = require('./backend/searchcourses');
const modifycourse = require('./backend/modifycourses');
const removecourse = require('./backend/removecourse');
const addToCourseCart = require('./backend/addtocart');
const showSelected = require('./backend/showSelected');
const removeSelected = require('./backend/removeSelected');
const login = require('./backend/login');
const regCourse = require('./backend/regcourse');
const dropFromCart = require('./backend/dropfromcart');
const Timetable = require('./backend/backendtimetable');
const retrievecourseinfo = require('./backend/retrievecourseinformation');


mongoose.connect('mongodb+srv://stu003:p947642W@cluster0.wenbhsm.mongodb.net/stu003');
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); //cookies
app.use(displayAllCourses);
app.use(courseDetails);
app.use(addCourse);
app.use(search);
app.use(modifycourse);
app.use(removecourse);
app.use(addToCourseCart);
app.use(showSelected)
app.use(removeSelected)
app.use(login)
app.use(regCourse);
app.use(dropFromCart);
app.use(Timetable);
app.use(retrievecourseinfo);

app.use('/', function (req, res) { // make sure the the server is work
    res.send('backend')
})

app.listen(80, () => {
    console.log('Server up at 80')
})
