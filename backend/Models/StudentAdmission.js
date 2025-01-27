const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentAdmissionSchema = new Schema({
  Academicyear: {
    type: String,
    required: true,
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  st_id: {
    type: String,
    required: false,
  },
  admission_number: {
    type: String,
    required: true,
  },
  joindate: {
    type: String,
    required: true,
  },
  rollnumber: {
    type: String,
    required: true,
  },
  student_firstname: {
    type: String,
    required: true,
  },
  student_middlename: {
    type: String,
    required: true,
  },
  Student_lastname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  birthplace: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  mothertongue: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  student_aadhar_no: {
    type: String,
    required: true,
  },
  permanent_address: {
    type: String,
    required: true,
  },
  alternate_address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  student_mobile: {
    type: String,
    required: true,
  },
  student_alternate_mobile: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  student_image: {
    type: String,
    required: true,
  },
  father_fullname: {
    type: String,
    required: true,
  },
  father_mobile: {
    type: String,
    required: true,
  },
  father_aadhar: {
    type: String,
    required: true,
  },
  father_image: {
    type: String,
    required: true,
  },
  mother_fullname: {
    type: String,
    required: true,
  },
  father_job: {
    type: String,
    required: true,
  },
  mother_job: {
    type: String,
    required: true,
  },
  mother_mobile: {
    type: String,
    required: true,
  },
  mother_aadhar: {
    type: String,
    required: true,
  },
  mother_image: {
    type: String,
    required: true,
  },
  complexion: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  hieght: {
    type: String,
    required: true,
  },
  markforidentity: {
    type: String,
    required: true,
  },
  clinical_history: {
    type: String,
    required: true,
  },
  allergic_history: {
    type: String,
    required: true,
  },
  emergency_contact_name: {
    type: String,
    required: true,
  },
  emergency_mobile: {
    type: String,
    required: true,
  },
  prevous_schoolname: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  school_address: {
    type: String,
    required: true,
  },
  birthcertificate: {
    type: Boolean,
    required: true,
  },
  castecertificate: {
    type: Boolean,
    required: true,
  },
  marklist: {
    type: Boolean,
    required: true,
  },
  birtlist: {
    type: Boolean,
    required: true,
  },
  transfercertificate: {
    type: Boolean,
    required: true,
  },
  migrationcertificate: {
    type: Boolean,
    required: true,
  },
  affidavit: {
    type: Boolean,
    required: true,
  },
  transport: {
    type: Boolean,
    required: true,
  },
  hostel: {
    type: Boolean,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
    required: true,
  },password:{
    type:String,
    required:false,
  },
});

const StudentAdmissionModel = mongoose.model(
  "StudentAdmission",
  StudentAdmissionSchema
);
module.exports = { StudentAdmissionModel };
