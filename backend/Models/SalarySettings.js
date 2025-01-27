const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySettings = new Schema({
    designation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Designation",
    },payhead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payhead",
    },paymenttype:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment",
    },amount:{
        type:String,
        required:true,
    },employeename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
    },startdate:{
        type:String,
        required:true,
    },enddate:{
        type:String,
        required:true,
    },issuedate:{
        type:String,
        required:true,
    },collegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
})

const SalarySettingsModel = mongoose.model("SalarySetting",SalarySettings);
module.exports ={SalarySettingsModel}