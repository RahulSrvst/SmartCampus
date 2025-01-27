const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SuperAdminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },pic:{
        type:String,
        required:false,
    },
    college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
})

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
