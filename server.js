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
const { count } = require('console');


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


app.post('/allcourse',(req,res) =>{ // access all course 
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

app.post('/coursedetail',(req,res) =>{ // access course information in detail
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


app.post('/addcourse',(req,res) =>{ //add a new course
    console.log(req.body)
    for (const property in req.body) { // loop the object to see another value is empty 
        if(req.body[property] == ''){
            console.log(property)
            res.send(property)
            return
        }
      }
    if(parseInt(req.body['StartTime']) >= parseInt(req.body['EndTime'])){ // check any invaild time ie : ie : 10:30 - 9:15
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
            //console.log(result)
            if(result == null){
                res.send('Repeated') // this course already exist in this system
            }else{
                res.send('Added')
            }
        })
    }
})


app.post('/modifycourse' , (req,res) =>{
    //console.log(req.body)
    let counter = 0;
    //console.log(req.body['oldId'])
    Course.findOne({CourseId:req.body['oldId']} ,(err,result) =>{ // find the course we need and modify it 
        if(result == null){ 
            res.send('Not exist') // this course is not in the system 
        }else if(parseInt(req.body['StartTime']) >= parseInt(req.body['EndTime'])){
            res.send('Invaild time') // unresonable time slot 
        }else{
            for (const property in req.body){
                if(counter > 0 && req.body[property] != ''){ // the input is empty we do not modify it
                    result[property] = req.body[property] 
                }
                counter++;
            }
            result.save()
            res.send('Updated')
        }
        
    })
})






app.use('/', function (req, res) { // make sure the the server is work
    res.send('backend')
})

app.listen(2000, () => {
    console.log('Server up at 2000')
})