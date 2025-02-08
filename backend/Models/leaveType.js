const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leavetypeSchema = new Schema ({
    leavetype:{
        type:String,
        required:true,
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
})


const leaveTypeModel = mongoose.model("LeaveTypeModel",leavetypeSchema)
module.exports = {leaveTypeModel};