const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
//const xml2json = require('xml-js')
//const parseXml = require('xml-js')
//const convert = require('xml-js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');


mongoose.connect('mongodb+srv://Henry:1234@atlascluster.ruprns0.mongodb.net/test');

const UserSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    permission: { type: Boolean, require: true },
    RegCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] 
    
})

const CourseSchema = mongoose.Schema({
    CourseName: {type: String, require: true, unique: true }
})

const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)


User.create({
    username: 'henry',
    password: '1234',
    permission: true
},(err,user) => {
    if(user == null)
        return ('Error!')
})

User.create({
    username: 'gary',
    password: '1234',
    permission: true
},(err,user) => {
    if(user == null)
        return ('Error!')
})



app.use('/', function (req, res) { // make sure the the server is work
    res.send('backend')
})

app.listen(2000, () => {
    console.log('Server up at 2000')
})