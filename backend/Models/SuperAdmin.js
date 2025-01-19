const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SuperAdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
})

module.exports = mongoose.model("Admin", SuperAdminSchema);
