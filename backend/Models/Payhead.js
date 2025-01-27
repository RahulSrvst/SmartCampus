const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayHeadSchema = new Schema({
    payheadtype:{
        type:String,
        required:true,
    },description:{
        type:String,
        required:true,
    },addition_or_deduction:{
        type:String,
        required:true,
    },collegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
})

const PayheadModel = mongoose.model("Payhead",PayHeadSchema);
module.exports = {PayheadModel};