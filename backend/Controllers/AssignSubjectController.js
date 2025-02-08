const { SubjectAssignModel } = require("../Models/AssignSubject");
const { BatchModel } = require("../Models/Batch");

const { CourseModel } = require("../Models/Course");
const { SubjectModel } = require("../Models/SubjectAllocation");

const add_AssignSubject = async (req, res) => {
  try {
    const { course, batch, subject } = req.body;
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
    const newteacher = new SubjectAssignModel({
      course,
      batch,
      subject,
      collegeId,
    });

    await newteacher.save();
    return res.status(201).json({
      message: "Subject Assigned Successfully!",
      data: newteacher,
      success: true,
    });

  } catch (err) {
    console.error("Error in add_AssignSubject:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

// Get Class Teacher API
const get_AssignSubject = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const teacherData = await SubjectAssignModel.findById(id)
        .populate("subject")
        .populate("course")
        .populate("batch");

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
      const data = await SubjectAssignModel.find()
        .populate("subject")
        .populate("course")
        .populate("batch");

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Assign Subject Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Assigned Subject Retrieved Successfully !!!",
        data: data,
        success: true, // Fixed success flag
      });
    }
  } catch (err) {
    console.error("Error in get_AssignSubject:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

module.exports = { add_AssignSubject, get_AssignSubject };
