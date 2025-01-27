const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CourseSchema = new Schema ({
    course_name:{
        type:String,
        required:true,
    },description:{
        type:String,
        required:true,
    },code:{
        type:String,
        required:true,
    },min_attendance:{
        type:String,
        required:true,
    },attendance_type:{
        type:String,
        required:true,
    },totalworking:{
        type:String,
        required:true,
    },syllabus_name:{
        type:String,
        required:true,
    },collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
})

const CourseModel = mongoose.model('Course',CourseSchema);

module.exports = {CourseModel}