const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema ({
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true,
    },
    designation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Designation",
        required:true,
    },collegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
    employeecode:{
        type:String,
        required:true,
    },
    joiningdate:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    middlename:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    birthdate:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    bloodgroup:{
        type:String,
        required:true,
    },
    birthplace:{
        type:String,
        required:true,
    },
    nationality:{
        type:String,
        required:true,
    },
    mothertongue:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    religion:{
        type:String,
        required:true,
    },
    caste:{
        type:String,
        required:true,
    },
    adharnumber:{
        type:String,
        required:true,
    },
    EPFnumber:{
        type:String,
        required:true,
    },
    ESInumber:{
        type:String,
        required:true,
    },
    permanentaddress:{
        type:String,
        required:true,
    },
    alternateaddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pin:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    alternativemobile:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    account_holder_name:{
        type:String,
        required:true,
    },
    account_number:{
        type:String,
        required:true,
    },
    bank_name:{
        type:String,
        required:true,
    },
    IFSC_code:{
        type:String,
        required:true,
    },
    experienceletter: {
        type:Boolean,
        required:true,
    },
    bankStatement: {
        type:Boolean,
        required:true,
    },
    relievingletter: {
        type:Boolean,
        required:true,
    },
    castecertificate: {
        type:Boolean,
        required:true,
    },
    migrationcertificate: {
        type:Boolean,
        required:true,
    },
    affidavit: {
        type:Boolean,
        required:true,
    },password: {
        type:String,
        required:false,
    },image: {
        type:String,
        required:false,
    }
})


const EmployeeModel = mongoose.model("Employee",EmployeeSchema);
module.exports = {EmployeeModel}