const { BatchModel } = require("../Models/Batch");
const { ClassTeacherModel } = require("../Models/ClassTeacherAllocation");
const { CourseModel } = require("../Models/Course");
const { EmployeeModel } = require("../Models/EmployeeRegistration");

const add_class_teacher = async (req, res) => {
  try {
    const { course, batch, teacher } = req.body;
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
    const check_teacher = await EmployeeModel.findById(teacher);

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
    if (!check_teacher) {
      return res.status(400).json({
        message: "The Employee is not Valid !!",
        success: false,
      });
    }

    // Create a new ClassTeacher entry
    const newteacher = new ClassTeacherModel({
      course,
      batch,
      teacher,
      collegeId,
    });

    await newteacher.save();
    return res.status(201).json({
      message: "Class Teacher Added Successfully!",
      data: newteacher,
      success: true,
    });

  } catch (err) {
    console.error("Error in add_class_teacher:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

// Get Class Teacher API
const get_class_teacher = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const teacherData = await ClassTeacherModel.findById(id)
        .populate("teacher")
        .populate("course")
        .populate("batch");

      if (!teacherData) {
        return res.status(404).json({
          message: "Teacher Not Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Teacher Retrieved Successfully !!!",
        data: teacherData,
        success: true,
      });
    } else {
      // Fetch all class teachers
      const data = await ClassTeacherModel.find()
        .populate("teacher")
        .populate("course")
        .populate("batch");

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "No Class Teachers Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Class Teachers Retrieved Successfully !!!",
        data: data,
        success: true, // Fixed success flag
      });
    }
  } catch (err) {
    console.error("Error in get_class_teacher:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

module.exports = { add_class_teacher, get_class_teacher };
