const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SubjectAllocationSchema = new Schema({
    discription:{
        type:String,
        required:true,
    },subject_code:{
        type:String,
        required:true,
    },subject_name:{
        type:String,
        required:true,
    },collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})

const SubjectModel = mongoose.model("subject_allocation",SubjectAllocationSchema);
module.exports = {SubjectModel};