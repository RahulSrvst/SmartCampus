const { EmployeeModel } = require("../Models/EmployeeRegistration");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const { DepartmentModel } = require("../Models/Department");
const { DesignationModel } = require("../Models/Designation");
const add_employee = async (req, res) => {
  try {
    const {
      department,
      designation,
      employeecode,
      joiningdate,
      qualification,
      experience,
      firstname,
      middlename,
      lastname,
      birthdate,
      gender,
      bloodgroup,
      birthplace,
      nationality,
      mothertongue,
      category,
      religion,
      caste,
      adharnumber,
      EPFnumber,
      ESInumber,
      permanentaddress,
      alternateaddress,
      city,
      pin,
      mobile,
      alternativemobile,
      country,
      state,
      email,
      account_holder_name,
      account_number,
      bank_name,
      IFSC_code,
      experienceletter,
      bankStatement,
      relievingletter,
      castecertificate,
      migrationcertificate,
      affidavit,
    } = req.body;


    const employee = await EmployeeModel.findOne({email});
    if(employee){
        return res.status(409).json({
            message:"Employee Email Already Exist's",
            success:false,
        })
    }
    
    const deprtment_n = await DepartmentModel.findById(department);
    if(!deprtment_n){
        return res.status(409).json({
            message:"Department Doesn't Exist's",
            success:false,
        })
    }
    
    const designation_n = await DesignationModel.findById(designation);
    if(!designation_n){
        return res.status(409).json({
            message:"Designation Doesn't Exist's",
            success:false,
        })
    }

    const temp_password =  Math.random().toString(36).slice(4);
        let image = null;
        if (req.file) {
          try {
            const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
              folder: "",
              public_id: `${mobile}_logo`,
              resource_type: "image",
            });
            image = uploadResponse.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary upload failed:", uploadError);
            return res.status(500).json({ message: "Cloudinary upload failed", success: false });
          }
        }
    
        EmployeeModel.password = await bcrypt.hash(temp_password, 10);


    const newEmployee = new EmployeeModel({
            department:department,
            designation:designation,
            employeecode,
            joiningdate,
            qualification,
            experience,
            firstname,
            middlename,
            lastname,
            birthdate,
            gender,
            bloodgroup,
            birthplace,
            nationality,
            mothertongue,
            category,
            religion,
            caste,
            adharnumber,
            EPFnumber,
            ESInumber,
            permanentaddress,
            alternateaddress,
            city,
            pin,
            mobile,
            alternativemobile,
            country,
            state,
            email,
            account_holder_name,
            account_number,
            bank_name,
            IFSC_code,
            image,
            experienceletter,
            bankStatement,
            relievingletter,
            castecertificate,
            migrationcertificate,
            affidavit,
            password: await bcrypt.hash(temp_password, 10), // Hash the password
    })

    await newEmployee.save();

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
          subject: "Employee Login Details",
          text: `Hello ${firstname} ${lastname},\n\nYour account has been successfully registered. Here are your login details:\n\nEmail: ${email}\nPassword: ${temp_password}\n\nPlease change your password after logging in for the first time.\n\nRegards,\nRahSrv-Tech`,
        };
    
        await transporter.sendMail(mailOptions);
    
        res.status(201).json({
          message: "Registered Successfully! Password sent to your email.",
          success: true,
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal Server Error ,${error}`,
      success: false,
    });
  }
};



const login_employee = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Step 1: Find employee by email
      const employee = await EmployeeModel.findOne({ email });
      if (!employee) {
          return res.status(404).json({
              message: "Employee doesn't exist!",
              success: false,
          });
      }

      // Step 2: Check if password matches
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
          return res.status(401).json({
              message: "Invalid credentials, password doesn't match.",
              success: false,
          });
      }

      // Step 3: Generate JWT token (if needed)
      const token = jwt.sign(
          { id: employee._id },
          process.env.JWT_TOKEN, // Your secret key for JWT signing
          { expiresIn: '72h' } // Token expiration time (72 hours here)
      );

      // Step 4: Return the response with the token
      return res.status(200).json({
          message: "Login successful!",
          success: true,
          token,
          user_type: "employee",
      });

  } catch (error) {
      // Log error to server console (not exposing error details to the client)
      console.error("Login error: ", error);
      console.log("Login error: ", error);

      // Send a generic error response to the client without sensitive details
      return res.status(500).json({
        
          message: "Internal Server Error, please try again later.",
          success: false,
      });
  }
};



const getEmployeeData = async (req, res) => {
  try {
    const { id ,department_id,designation_id} = req.query;
    console.log("Fetching user with ID:", id);

    // If an ID is provided, fetch a specific employee by ID
    if (id) {
      const EmployeeData = await EmployeeModel.findById(id).populate("designation", "designation_name");
      console.log("Fetched Employee data:", EmployeeData);

      if (!EmployeeData) {
        return res.status(404).json({
          message: "Employee not found with this ID",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Employee Data Successfully Fetched by ID",
        data: EmployeeData,
        success: true,
      });
    } else if (designation_id || department_id) {
      const filters = {};
      
      if (designation_id) {
        filters.designation = designation_id;
      }
      
      if (department_id) {
        filters.department = department_id;
      }

      const filteredEmployeeData = await EmployeeModel.find(filters)
        .populate("designation", "designation_name")
        .populate("department", "department_name");

      console.log("Fetched filtered Employee data:", filteredEmployeeData);

      if (!filteredEmployeeData || filteredEmployeeData.length === 0) {
        return res.status(404).json({
          message: "No employees found matching the criteria.",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Filtered Employee Data Successfully Fetched",
        data: filteredEmployeeData,
        success: true,
      });
    } 
    // If no ID is provided, fetch all employee data
    else {
      const allEmployeeData = await EmployeeModel.find().populate("designation", "designation_name").populate("department","department_name");
      console.log("Fetched all Employee data:", allEmployeeData);

      if (!allEmployeeData || allEmployeeData.length === 0) {
        return res.status(404).json({
          message: "No employees found.",
          success: false,
        });
      }

      return res.status(200).json({
        message: "All Employee Data Successfully Fetched",
        data: allEmployeeData,
        success: true,
      });
    }

  } catch (error) {
    // Log error to server console (not exposing error details to the client)
    console.error("Server error:", error);

    // Send a generic error response to the client without sensitive details
    return res.status(500).json({
      message: "Internal Server Error, please try again later.",
      success: false,
    });
  }
}





const updateEmployeeData = async (req,res) =>{
  try{
    const {
      id,
      department,
      designation,
      employeecode,
      joiningdate,
      qualification,
      experience,
      firstname,
      middlename,
      lastname,
      birthdate,
      gender,
      bloodgroup,
      birthplace,
      nationality,
      mothertongue,
      category,
      religion,
      caste,
      adharnumber,
      EPFnumber,
      ESInumber,
      permanentaddress,
      alternateaddress,
      city,
      pin,
      mobile,
      alternativemobile,
      country,
      state,
      email,
      account_holder_name,
      account_number,
      bank_name,
      IFSC_code,
      image,
      experienceletter,
      bankStatement,
      relievingletter,
      castecertificate,
      migrationcertificate,
      affidavit,
    } = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        department,
      designation,
      employeecode,
      joiningdate,
      qualification,
      experience,
      firstname,
      middlename,
      lastname,
      birthdate,
      gender,
      bloodgroup,
      birthplace,
      nationality,
      mothertongue,
      category,
      religion,
      caste,
      adharnumber,
      EPFnumber,
      ESInumber,
      permanentaddress,
      alternateaddress,
      city,
      pin,
      mobile,
      alternativemobile,
      country,
      state,
      email,
      account_holder_name,
      account_number,
      bank_name,
      IFSC_code,
      image,
      experienceletter,
      bankStatement,
      relievingletter,
      castecertificate,
      migrationcertificate,
      affidavit,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee Not Found !!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Employee Updated Successfully !!",
      data: updatedEmployee,
      success: true,
    });
  }catch(error){
    // Log error to server console (not exposing error details to the client)
    console.error("Server error:", error);

    // Send a generic error response to the client without sensitive details
    return res.status(500).json({
      message: "Internal Server Error, please try again later.",
      success: false,
    });
  }
}





module.exports = {add_employee,login_employee , getEmployeeData , updateEmployeeData}
