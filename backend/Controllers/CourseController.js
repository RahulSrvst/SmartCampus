const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../Models/Course");

const getCourse = async (req, res) => {
  try {
    const course = await CourseModel.find();

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

    console.log("the requested body is :",req.body)

    const newCourse = new CourseModel({
      course_name,
      description,
      code,
      min_attendance,
      attendance_type,
      totalworking,
      syllabus_name,
      collegeId: req.collegeId,
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

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        course_name,
        description,
        code,
        min_attendance,
        attendance_type,
        totalworking,
        syllabus_name,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course Not Found !!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course Updated Successfully !!",
      data: updatedCourse,
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
  
      // Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid Course ID",
          success: false
        });
      }
  
      // Find the course by ID and delete it
      const deletedCourse = await CourseModel.findByIdAndDelete(id);
  
      // If no course is found with that ID
      if (!deletedCourse) {
        return res.status(404).json({
          message: "Course Not Found !!",
          success: false
        });
      }
  
      // Return success response if course is deleted
      return res.status(200).json({
        message: "Course Deleted Successfully !!",
        success: true
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error !!",
        success: false
      });
    }
  };
  

module.exports = { addCourse, getCourse, updateCourse, deleteCourse };
