const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ElectiveSubjectSchema = new Schema({
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
    },student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"StudentAdmission",
    },collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})

const ElectiveSubjectModel = mongoose.model("elective_subject",ElectiveSubjectSchema);
module.exports = {ElectiveSubjectModel};