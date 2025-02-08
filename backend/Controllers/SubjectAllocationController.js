const { SubjectModel } = require("../Models/SubjectAllocation");

const add_subject = async (req, res) => {
  try {
    const { discription, subject_code, subject_name } = req.body;
    const { collegeId } = req.user;

    console.log("The requested body is:", req.body);

    if (!collegeId) {
      return res.status(403).json({
        message: "Unauthorized. College ID not found.",
        success: false,
      });
    }

    

    // Create a new ClassTeacher entry
    const newSubject = new SubjectModel({
        discription, subject_code, subject_name,
      collegeId,
    });

    await newSubject.save();
    return res.status(201).json({
      message: "Class Teacher Added Successfully!",
      data: newSubject,
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
const get_subject = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const subjectdata = await SubjectModel.findById(id);

      if (!subjectdata) {
        return res.status(404).json({
          message: "Teacher Not Found !!!",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Teacher Retrieved Successfully !!!",
        data: subjectdata,
        success: true,
      });
    } else {
      // Fetch all class teachers
      const data = await SubjectModel.find();

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "No Subject Found !!!",
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

module.exports = {add_subject,get_subject};
