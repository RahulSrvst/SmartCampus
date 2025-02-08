const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AddSubject = new Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
    },batch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"batch",
    },teacher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Employee",
    },subject:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"subject_allocation",
    },designation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Designation",
    },collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})

const SubjectAddModel = mongoose.model("class_teacher",AddSubject);
module.exports = {SubjectAddModel};