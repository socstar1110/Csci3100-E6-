const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    permission: { type: Boolean, require: true },
    CartCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    RegCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const AdminSchema = mongoose.Schema({
    adminName: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

const CourseSchema = mongoose.Schema({
    CourseCode: { type: String, require: true, unique: true },
    CourseName: { type: String, require: true, unique: true },
    CourseId: { type: String, require: true, unique: true },
    Venue: { type: String, require: true },
    Date: { type: String, require: true },
    StartTime: { type: String, require: true },
    EndTime: { type: String, require: true },
    Department: { type: String, require: true },
    Instructor: { type: String, require: true },
    Capacity: { type: Number, require: true },
    Outline: { type: String, require: true },
    RegUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)
const Admin = mongoose.model('Admin', AdminSchema)

module.exports ={User, Course,Admin}