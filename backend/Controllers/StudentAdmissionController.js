const { BatchModel } = require("../Models/Batch");
const { CourseModel } = require("../Models/Course");
const { StudentAdmissionModel } = require("../Models/StudentAdmission");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");

const addStudentAdmission = async (req, res) => {
  try {
    const {
      Academicyear,
      st_id,
      admission_number,
      joindate,
      rollnumber,
      student_firstname,
      student_middlename,
      Student_lastname,
      dob,
      gender,
      bloodgroup,
      birthplace,
      nationality,
      mothertongue,
      category,
      religion,
      caste,
      student_aadhar_no,
      permanent_address,
      alternate_address,
      city,
      pin,
      student_mobile,
      student_alternate_mobile,
      country,
      state,
      email,
      father_fullname,
      father_mobile,
      father_aadhar,
      mother_fullname,
      father_job,
      mother_job,
      mother_mobile,
      mother_aadhar,
      complexion,
      weight,
      hieght,
      markforidentity,
      clinical_history,
      allergic_history,
      emergency_contact_name,
      emergency_mobile,
      prevous_schoolname,
      qualification,
      school_address,
      birthcertificate,
      castecertificate,
      marklist,
      birtlist,
      transfercertificate,
      migrationcertificate,
      affidavit,
      transport,
      hostel,
      user_type,
      course,
      batch,
    } = req.body;

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized College!",
        success: false,
      });
    }

    const courseValid = await CourseModel.findById(course);
    if (!courseValid) {
      return res.status(404).json({
        message: "Invalid Course",
        success: false,
      });
    }

    const batchValid = await BatchModel.findById(batch);
    if (!batchValid) {
      return res.status(404).json({
        message: "Invalid Batch",
        success: false,
      });
    }

    const temp_password = Math.random().toString(36).slice(4);

    // Handle uploaded images
    const student_image = req.files["student_image"]
      ? req.files["student_image"][0].path
      : null;
    const father_image = req.files["father_image"]
      ? req.files["father_image"][0].path
      : null;
    const mother_image = req.files["mother_image"]
      ? req.files["mother_image"][0].path
      : null;

    StudentAdmissionModel.password = await bcrypt.hash(temp_password, 10);

    const newStudent = new StudentAdmissionModel({
      Academicyear,
      st_id,
      admission_number,
      joindate,
      rollnumber,
      student_firstname,
      student_middlename,
      Student_lastname,
      dob,
      gender,
      bloodgroup,
      birthplace,
      nationality,
      mothertongue,
      category,
      religion,
      caste,
      student_aadhar_no,
      permanent_address,
      alternate_address,
      city,
      pin,
      student_mobile,
      student_alternate_mobile,
      country,
      state,
      email,
      student_image,
      father_fullname,
      father_mobile,
      father_aadhar,
      father_image,
      mother_fullname,
      father_job,
      mother_job,
      mother_mobile,
      mother_aadhar,
      mother_image,
      complexion,
      weight,
      hieght,
      markforidentity,
      clinical_history,
      allergic_history,
      emergency_contact_name,
      emergency_mobile,
      prevous_schoolname,
      qualification,
      school_address,
      birthcertificate,
      castecertificate,
      marklist,
      birtlist,
      transfercertificate,
      migrationcertificate,
      affidavit,
      transport,
      hostel,
      user_type,
      course: courseValid._id,
      batch: batchValid._id,
      collegeId,
    });

    await newStudent.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Student Login Details",
      text: `Hello ${student_firstname} ${Student_lastname},\n\nYour account has been successfully registered. Here are your login details:\n\nEmail: ${email}\nPassword: ${temp_password}\n\nPlease change your password after logging in for the first time.\n\nRegards,\nRahSrv-Tech`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message:
        "Student Admission Successful!, Password is send to thier registered Email",
      success: true,
    });
  } catch (err) {
    console.error("Internal Error:", err);
    return res.status(500).json({
      message: "Internal Error",
      success: false,
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists in the database
    const isValidStudent = await StudentAdmissionModel.findOne({ email });

    if (!isValidStudent) {
      return res.status(404).json({
        message: "Email is not registered!",
        success: false,
      });
    }

    // Check if password exists in the student document
    if (!isValidStudent.password) {
      return res.status(500).json({
        message: "Password not found for the student in the database!",
        success: false,
      });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, isValidStudent.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials, password doesn't match.",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: isValidStudent._id }, process.env.JWT_TOKEN, {
      expiresIn: "72h",
    });

    return res.status(200).json({
      message: "Login successful!",
      success: true,
      token,
      user_type: "student",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
    });
  }
};


const getStudent = async (req, res) => {
  try {
    const {
      id,
      course_id,
      batch_id,
      page = 1,
      limit = 10,
      sort = "student_firstname",
    } = req.query;

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(401).json({
        message: "Unauthorized College!",
        success: false,
      });
    }

    // If `id` is provided, fetch a single student by ID
    if (id) {
      const student = await StudentAdmissionModel.findOne({
        _id: id,
        collegeId,
      })
        .populate("course", "course_name")
        .populate("batch", "batch_name");

      if (!student) {
        return res.status(404).json({
          message: "Student not found.",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Student retrieved successfully.",
        success: true,
        data: student,
      });
    }

    // Build the query dynamically for `course_id` and `batch_id`
    const query = { collegeId };
    if (course_id) query.course = course_id;
    if (batch_id) query.batch = batch_id;

    // Pagination and sorting
    const skip = (page - 1) * limit;

    const students = await StudentAdmissionModel.find(query)
      .populate("course", "course_name")
      .populate("batch", "batch_name")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalStudents = await StudentAdmissionModel.countDocuments(query);

    if (!students.length) {
      return res.status(200).json({
        message: "No students found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Students retrieved successfully.",
      success: true,
      data: students,
      pagination: {
        total: totalStudents,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalStudents / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};



const getStudentStatics = async (req,res) =>{
  try{
    const {collegeId} = req.user;

    if(!collegeId){
      return res.status(403).json({
        message:"UnAuthorized College !!!",
        success:false,
      })
    }

    const totalStudents = await StudentAdmissionModel.countDocuments({collegeId});

    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const todayAdmissions = await StudentAdmissionModel.countDocuments({
      joindate: { $gte: todayStart, $lte: todayEnd },
      collegeId,
    });

    // Start of the week (Monday)
    const weekStart = moment().startOf("isoWeek").toDate();
    const weekEnd = moment().endOf("isoWeek").toDate();

    // Get students admitted this week
    const weekAdmissions = await StudentAdmissionModel.countDocuments({
      joindate: { $gte: weekStart, $lte: weekEnd },
      collegeId,
    });

    // Start of the current month
    const monthStart = moment().startOf("month").toDate();
    const monthEnd = moment().endOf("month").toDate();

    // Get students admitted this month
    const monthAdmissions = await StudentAdmissionModel.countDocuments({
      joindate: { $gte: monthStart, $lte: monthEnd },
      collegeId,
    });

    return res.status(200).json({
      message: "Student statistics retrieved successfully.",
      success: true,
      data: {
        totalStudents,
        todayAdmissions,
        weekAdmissions,
        monthAdmissions,
      },
    });
  }catch(err){
    console.log(err)
    res.status(500).json({
      message:"Internal Server Error !!!",
      success:false,
    })
  }
}

module.exports = { addStudentAdmission, loginStudent, getStudent ,getStudentStatics};
