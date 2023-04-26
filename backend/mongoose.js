const mongoose = require('mongoose')

// Define the User schema
const UserSchema = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    Sid:{ type: String, require: true, unique: true },
    Sex:{ type: String, require: true },
    Department:{ type: String, require: true },
    Email:{ type: String, require: true },
    Phone:{ type: String, require: true },
    CartCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    RegCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

// Define the Admin schema
const AdminSchema = mongoose.Schema({
    adminName: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

// Define the Course schema
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

// Create the User model using the User schema
const User = mongoose.model('User', UserSchema)

// Create the Course model using the Course schema
const Course = mongoose.model('Course', CourseSchema)

// Create the Admin model using the Admin schema
const Admin = mongoose.model('Admin', AdminSchema)

// Export the User, Course, and Admin models
module.exports ={User, Course,Admin}
