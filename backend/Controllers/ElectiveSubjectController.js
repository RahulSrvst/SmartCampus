const { SubjectAddModel } = require("../Models/AddSubject");
const { SubjectAssignModel } = require("../Models/AssignSubject");
const { BatchModel } = require("../Models/Batch");

const { CourseModel } = require("../Models/Course");
const { ElectiveSubjectModel } = require("../Models/ElectiveSubject");
const { EmployeeModel } = require("../Models/EmployeeRegistration");
const { StudentAdmissionModel } = require("../Models/StudentAdmission");
const { SubjectModel } = require("../Models/SubjectAllocation");

const add_electiveSubject = async (req, res) => {
  try {
    const {  batch, course, student, subject } = req.body;
    const { collegeId } = req.user;

    console.log("The requested body is:", req.body);

    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized. College ID not found.",
        success: false,
      });
    }

    // Check if course, batch, and teacher exist
    const check_course = await CourseModel.findById(course);
    const check_batch = await BatchModel.findById(batch);
    const check_subject = await SubjectModel.findById(subject);
    const check_student = await StudentAdmissionModel.findById(student);

    if (!check_student) {
      return res.status(400).json({
        message: "The Employee is not Valid !!",
        success: false,
      });
    }
    if (!check_course) {
      return res.status(400).json({
        message: "The Course is not Valid !!",
        success: false,
      });
    }
    if (!check_batch) {
      return res.status(400).json({
        message: "The Batch is not Valid !!",
        success: false,
      });
    }
    if (!check_subject) {
      return res.status(400).json({
        message: "The Subject is not Valid !!",
        success: false,
      });
    }

    // Create a new ClassTeacher entry
    const newteacher = new ElectiveSubjectModel({
      designation,
      batch,
      course,
      teacher,
      subject,
      collegeId,
    });

    await newteacher.save();
    return res.status(201).json({
      message: "Elective Subject Added Successfully!",
      data: newteacher,
      success: true,
    });
  } catch (err) {
    console.error("Error in add_electiveSubject:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

// Get Class Teacher API
const get_electiveSubject = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const teacherData = await ElectiveSubjectModel.findById(id)
        .populate("subject")
        .populate("course")
        .populate("batch")
        .populate("student");

      if (!teacherData) {
        return res.status(404).json({
          message: "Assign Subject Not Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Assign Subject Retrieved Successfully !!!",
        data: teacherData,
        success: true,
      });
    } else {
      // Fetch all class teachers
      const data = await ElectiveSubjectModel.find()
        .populate("subject")
        .populate("course")
        .populate("batch")
        .populate("student");

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Add Subject Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Add Subject Retrieved Successfully !!!",
        data: data,
        success: true,
      });
    }
  } catch (err) {
    console.error("Error in get_electiveSubject:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

module.exports = { add_electiveSubject, get_electiveSubject };
