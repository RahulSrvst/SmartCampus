const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ClassTeacherAllocationSchema = new Schema({
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
    },collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})

const ClassTeacherModel = mongoose.model("classteacher",ClassTeacherAllocationSchema);
module.exports = {ClassTeacherModel};