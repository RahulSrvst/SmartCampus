const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DesignationSchema = new Schema({
    designation_name:{
        type:String,
        required:true,
    }
})


const DesignationModel = mongoose.model("Designation",DesignationSchema)
module.exports = {DesignationModel};