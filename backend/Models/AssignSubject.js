const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AssignSubjectSchema = new Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
    },batch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"batch",
    },subject:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"subject_allocation",
    },collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})

const SubjectAssignModel = mongoose.model("assign_subject",AssignSubjectSchema);
module.exports = {SubjectAssignModel};