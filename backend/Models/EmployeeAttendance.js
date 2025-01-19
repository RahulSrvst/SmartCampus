const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeAttendanceSchema = new Schema({
  attendance: {
    type: Date,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designation",
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave", "Half Day"],
    required: true,
  },
  payslip: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "PaySlipModel"
   },
});

const EmployeeAttendanceModel = mongoose.model(
  "EmployeeAttendance",
  EmployeeAttendanceSchema
);
module.exports = { EmployeeAttendanceModel };
