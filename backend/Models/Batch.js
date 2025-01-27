const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  batch_name:{
    type:String,
    required:true,
  },
  // course:{
  //   type:String,
  //   required:true,
  // },
  add_batch:{
    type:String,
    required:true,
  },
  start_date:{
    type:Date,
    required:true,
  },
  endDate:{
    type:Date,
    required:false,
  },
  max_student:{
    type:String,
    required:true,
  },
   course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  collegeId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true,
  }
});


const BatchModel = mongoose.model("batch",BatchSchema);

module.exports = {BatchModel};
