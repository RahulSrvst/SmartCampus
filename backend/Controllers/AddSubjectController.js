const { SubjectAddModel } = require("../Models/AddSubject");
const { SubjectAssignModel } = require("../Models/AssignSubject");
const { BatchModel } = require("../Models/Batch");

const { CourseModel } = require("../Models/Course");
const { EmployeeModel } = require("../Models/EmployeeRegistration");
const { SubjectModel } = require("../Models/SubjectAllocation");

const add_subjectadd = async (req, res) => {
  try {
    const { designation, batch, course, teacher, subject } = req.body;
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
    const check_designation = await EmployeeModel.findById(designation);
    const check_teacher = await EmployeeModel.findById(teacher);

    if (!check_designation) {
      return res.status(400).json({
        message: "The Designation is not Valid !!",
        success: false,
      });
    }
    if (!check_teacher) {
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
    const newteacher = new SubjectAddModel({
      designation,
      batch,
      course,
      teacher,
      subject,
      collegeId,
    });

    await newteacher.save();
    return res.status(201).json({
      message: "Subject Alocated Successfully!",
      data: newteacher,
      success: true,
    });
  } catch (err) {
    console.error("Error in add_subjectadd:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

// Get Class Teacher API
const get_subject_add = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const teacherData = await SubjectAddModel.findById(id)
        .populate("subject")
        .populate("course")
        .populate("batch")
        .populate("designation")
        .populate("teacher");

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
      const data = await SubjectAddModel.find()
        .populate("subject")
        .populate("course")
        .populate("batch")
        .populate("designation")
        .populate("teacher");

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Add Subject Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Add Subject Retrieved Successfully !!!",
        data: data,
        success: true, // Fixed success flag
      });
    }
  } catch (err) {
    console.error("Error in get_subject_add:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

module.exports = { add_subjectadd, get_subject_add };
