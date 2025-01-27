const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the PaySlip schema
const PaySlipSchema = new Schema({
    employee:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Employee",
      required:true,
    },
    basicpay: {
      type: Number,
      required: true,
    },
    Payslipdate: {
      type: String,
      required: true,
    },
    Houserentallowance: {
      type: String,
      required: true,
    },
    Paid_days: {
      type: String,
      required: true,
    },
    casual_leave: {
      type: String,
      required: true,
    },
    Privilegeleave: {
      type: String,
      required: true,
    },
    Totaldeduction: {
      type: String,
      required: true,
    },
    netsalary: {
      type: String,
      required: true,
    },
    payslipYear: {
      type: Number,
      required: false,
    },
    payslipmonth: {
      type: Number,
      required: false,
    },
    collegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
  });
  
  const PaySlipModel = mongoose.model("PaySlip", PaySlipSchema);
  module.exports = { PaySlipModel };
  