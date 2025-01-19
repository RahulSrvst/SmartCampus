const { default: mongoose } = require("mongoose");
const { BatchModel } = require("../Models/Batch");
const { CourseModel } = require("../Models/Course");

const addBatch = async (req, res) => {
  try {
    const { batch_name, course, add_batch, start_date, endDate, max_student } =
      req.body;

    // Ensure the course ID is valid
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({
        message: "Invalid Course ID",
        success: false,
      });
    }

    // Check if the course exists
    const courseData = await CourseModel.findById(course);

    if (!courseData) {
      return res.status(404).json({
        message: "Course Not Found !!",
        success: false,
      });
    }

    // Create a new batch object
    const newBatch = new BatchModel({
      batch_name,
      course: course, // course will be the ObjectId of the found course
      add_batch,
      start_date,
      endDate, // Ensure this is consistent with your field names
      max_student,
    });

    // Save the new batch to the database
    await newBatch.save();

    // Return the response with success
    return res.status(201).json({
      message: "Batch Added Successfully !!",
      data: newBatch,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

const getBatch = async (req, res) => {
  try {
    // Populate the course field with the course document (which includes the course name)
    const batches = await BatchModel.find().populate("course", "course_name "); // Populate the course field and only fetch the course_name

    // If no batches are found, return a 404 error
    if (!batches || batches.length === 0) {
      return res.status(404).json({
        message: "No batches found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Batches retrieved successfully",
      success: true,
      data: batches,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const updateBatch = async (req, res) => {
  try {
    const {
      id,
      batch_name, course, add_batch, start_date, endDate, max_student
    } = req.body;

    const updatedBatch = await BatchModel.findByIdAndUpdate(
      id,
      {
        batch_name, course, add_batch, start_date, endDate, max_student
      },
      { new: true, runValidators: true }
    );

    if (!updatedBatch) {
      return res.status(404).json({
        message: "Batch Not Found !!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Batch Updated Successfully !!",
      data: updatedBatch,
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

const deleteBatch = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Batch ID",
        success: false,
      });
    }

    // Find the course by ID and delete it
    const deletedBatch = await BatchModel.findByIdAndDelete(id);

    // If no Batch is found with that ID
    if (!deletedBatch) {
      return res.status(404).json({
        message: "Batch Not Found !!",
        success: false,
      });
    }

    // Return success response if Batch is deleted
    return res.status(200).json({
      message: "Batch Deleted Successfully !!",
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

module.exports = { addBatch, getBatch, deleteBatch,updateBatch };
