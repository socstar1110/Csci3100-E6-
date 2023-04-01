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
const { name } = require('ejs');


mongoose.connect('mongodb+srv://stu003:p947642W@cluster0.wenbhsm.mongodb.net/stu003');
app.use(cors({origin: 'http://localhost:3000',credentials: true})); // cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); //cookies

const UserSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    permission: { type: Boolean, require: true },
    RegCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] 
})

const CourseSchema = mongoose.Schema({
    CourseCode: {type: String, require: true, unique: true },
    CourseName: {type: String, require: true, unique: true },
    CourseId: {type: String, require: true, unique: true },
    Venue: {type: String, require: true},
    Data: {type: String, require: true},
    StartTime: {type: String, require: true},
    EndTime: {type: String, require: true},
    Department: {type: String, require: true},
    Instructor: {type: String, require: true},
    Capacity: {type: Number, require: true},
    Outline: {type: String, require: true},
    RegUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
})

const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)


app.post('/allcourse',(req,res) =>{
    Course.find((err,result) =>{
        const obj =[]
        for (let i = 0; i< result.length;i++){
            obj.push({
                name:result[i].CourseName,
                id:result[i].CourseId,
                code:result[i].CourseCode,
                venue:result[i].Venue,
                Data:result[i].Data,
                StartTime:result[i].StartTime,
                EndTime:result[i].EndTime,
                department:result[i].Department,
                instructor:result[i].Instructor,
                capacity:result[i].Capacity,
                available:(result[i].Capacity - result[i].RegUser.length)
            })
        }
        //console.log(obj)
        res.send(obj)
        console.log("All course inforamtion is sent")
    })
})

app.post('/coursedetail',(req,res) =>{
    const obj = {}
    console.log(req.body['id'])
    Course.findOne({CourseId:req.body['id']}, (err,result) =>{
        if(result == null){
            obj.push({outline:"this course did not exist"})
        }else{
            obj.outline = result.Outline
            obj.name = result.CourseName
            obj.id = result.CourseId
            obj.code = result.CourseCode
            console.log('The required course information is sent')
            res.send(obj)
        }
    })
})


app.post('/addcourse',(req,res) =>{
    //console.log(req.body['id'] == '')
    for (const property in req.body) {
        if(req.body[property] == ''){
            console.log(property)
            res.send(property)
            return
        }
      }
    if(parseInt(req.body['StartTime']) >= parseInt(req.body['EndTime'])){
        res.send('Invaild time')
    }else{
        Course.create({
            CourseCode:req.body['code'],
            CourseName:req.body['name'],
            CourseId:req.body['id'],
            Venue:req.body['venue'],
            Data:req.body['Data'],
            StartTime:req.body['StartTime'],
            EndTime:req.body['EndTime'],
            Department:req.body['department'],
            Instructor:req.body['instructor'],
            Capacity:req.body['capacity'],
            Outline:req.body['outline']
        },(err , result) =>{
            console.log(result)
            if(result == null){
                res.send('Repeated')
            }else{
                res.send('Added')
            }
        })
    }
})


app.use('/', function (req, res) { // make sure the the server is work
    res.send('backend')
})

app.listen(2000, () => {
    console.log('Server up at 2000')
})