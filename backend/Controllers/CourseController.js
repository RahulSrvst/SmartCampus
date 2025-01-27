const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../Models/Course");

const getCourse = async (req, res) => {
  const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized. College ID not found.",
        success: false,
      });
    }
  try {
    const course = await CourseModel.find({collegeId});

    return res.status(200).json({
      message: "The Course Fetched Successfully !!",
      data: course,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error!!",
      success: true,
    });
  }
};

const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      description,
      code,
      min_attendance,
      attendance_type,
      totalworking,
      syllabus_name,
    } = req.body;

    
    const {collegeId} = req.user;
    
    console.log("the requested body is :",req.user)
    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized. College ID not found.",
        success: false,
      });
    }

    const newCourse = new CourseModel({
      course_name,
      description,
      code,
      min_attendance,
      attendance_type,
      totalworking,
      syllabus_name,
      collegeId,
    });

    await newCourse.save();
    return res.status(201).json({
      message: "Course added successfully!",
      data: newCourse,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const {
      id,
      course_name,
      description,
      code,
      min_attendance,
      attendance_type,
      totalworking,
      syllabus_name,
    } = req.body;

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized. College ID not found.",
        success: false,
      });
    }

    const course = await CourseModel.findOne({ _id: id, collegeId });

    if (!course) {
      return res.status(404).json({
        message: "Course not found for this college.",
        success: false,
      });
    }

    course.course_name = course_name || course.course_name;
    course.description = description || course.description;
    course.code = code || course.code;
    course.min_attendance = min_attendance || course.min_attendance;
    course.attendance_type = attendance_type || course.attendance_type;
    course.totalworking = totalworking || course.totalworking;
    course.syllabus_name = syllabus_name || course.syllabus_name;

    await course.save();

    return res.status(200).json({
      message: "Course updated successfully!",
      data: course,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};


const deleteCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized. College ID not found.",
        success: false,
      });
    }

    const course = await CourseModel.findOneAndDelete({ _id: id, collegeId });

    if (!course) {
      return res.status(404).json({
        message: "Course not found for this college.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


module.exports = { addCourse, getCourse, updateCourse, deleteCourse };
