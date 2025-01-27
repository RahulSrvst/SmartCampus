const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DepartmentSchema = new Schema({
    department_name:{
        type:String,
        required:true,
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
})


const DepartmentModel = mongoose.model("Department",DepartmentSchema)
module.exports = {DepartmentModel};