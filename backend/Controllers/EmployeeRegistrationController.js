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

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }

    const employee = await EmployeeModel.findOne({ email });
    if (employee) {
      return res.status(409).json({
        message: "Employee Email Already Exist's",
        success: false,
      });
    }

    const deprtment_n = await DepartmentModel.findById(department);
    if (!deprtment_n) {
      return res.status(409).json({
        message: "Department Doesn't Exist's",
        success: false,
      });
    }

    const designation_n = await DesignationModel.findById(designation);
    if (!designation_n) {
      return res.status(409).json({
        message: "Designation Doesn't Exist's",
        success: false,
      });
    }

    const temp_password = Math.random().toString(36).slice(4);
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
        return res
          .status(500)
          .json({ message: "Cloudinary upload failed", success: false });
      }
    }

    EmployeeModel.password = await bcrypt.hash(temp_password, 10);

    const newEmployee = new EmployeeModel({
      department: department,
      designation: designation,
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
      collegeId,
      affidavit,
      password: await bcrypt.hash(temp_password, 10),
    });

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

    const token = jwt.sign({ id: employee._id }, process.env.JWT_TOKEN, {
      expiresIn: "72h",
    });

    return res.status(200).json({
      message: "Login successful!",
      success: true,
      token,
      user_type: "employee",
    });
  } catch (error) {
    console.error("Login error: ", error);
    console.log("Login error: ", error);

    return res.status(500).json({
      message: "Internal Server Error, please try again later.",
      success: false,
    });
  }
};

const getEmployeeData = async (req, res) => {
  try {
    const { id, department_id, designation_id } = req.query;
    console.log("Fetching user with ID:", id);

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }

    if (id) {
      const EmployeeData = await EmployeeModel.findOne({ collegeId, _id: id })
        .populate("designation", "designation_name")
        .populate("department", "department_name");
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
    } else {
      const allEmployeeData = await EmployeeModel.find({ collegeId })
        .populate("designation", "designation_name")
        .populate("department", "department_name");
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
};

const updateEmployeeData = async (req, res) => {
  try {
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

    const { collegeId } = req.user;

    if (!collegeId) {
      return res.status(404).json({
        message: "UnAuthorized College !!!",
        success: true,
      });
    }

    const updatedEmployee = await EmployeeModel.findOne({
      id,
      collegeId,
    });

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee Not Found !!",
        success: false,
      });
    }

    // Employee Details
    department = department || updatedEmployee.department;
    designation = designation || updatedEmployee.designation;
    employeecode = employeecode || updatedEmployee.employeecode;

    // Personal Information
    firstname = firstname || updatedEmployee.firstname;
    middlename = middlename || updatedEmployee.middlename;
    lastname = lastname || updatedEmployee.lastname;
    birthdate = birthdate || updatedEmployee.birthdate;
    gender = gender || updatedEmployee.gender;
    bloodgroup = bloodgroup || updatedEmployee.bloodgroup;
    birthplace = birthplace || updatedEmployee.birthplace;
    nationality = nationality || updatedEmployee.nationality;
    mothertongue = mothertongue || updatedEmployee.mothertongue;

    // Social and Cultural Information
    category = category || updatedEmployee.category;
    religion = religion || updatedEmployee.religion;
    caste = caste || updatedEmployee.caste;

    // Identification Numbers
    adharnumber = adharnumber || updatedEmployee.adharnumber;
    EPFnumber = EPFnumber || updatedEmployee.EPFnumber;
    ESInumber = ESInumber || updatedEmployee.ESInumber;

    // Contact Information
    permanentaddress = permanentaddress || updatedEmployee.permanentaddress;
    alternateaddress = alternateaddress || updatedEmployee.alternateaddress;
    city = city || updatedEmployee.city;
    pin = pin || updatedEmployee.pin;
    mobile = mobile || updatedEmployee.mobile;
    alternativemobile = alternativemobile || updatedEmployee.alternativemobile;
    country = country || updatedEmployee.country;
    state = state || updatedEmployee.state;
    email = email || updatedEmployee.email;

    // Bank Details
    account_holder_name =
      account_holder_name || updatedEmployee.account_holder_name;
    account_number = account_number || updatedEmployee.account_number;
    bank_name = bank_name || updatedEmployee.bank_name;
    IFSC_code = IFSC_code || updatedEmployee.IFSC_code;

    // Documents
    image = image || updatedEmployee.image;
    experienceletter = experienceletter || updatedEmployee.experienceletter;
    bankStatement = bankStatement || updatedEmployee.bankStatement;
    relievingletter = relievingletter || updatedEmployee.relievingletter;
    castecertificate = castecertificate || updatedEmployee.castecertificate;
    migrationcertificate =
      migrationcertificate || updatedEmployee.migrationcertificate;
    affidavit = affidavit || updatedEmployee.affidavit;

    return res.status(200).json({
      message: "Employee Updated Successfully !!",
      data: updatedEmployee,
      success: true,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      message: "Internal Server Error, please try again later.",
      success: false,
    });
  }
};
module.exports = {
  add_employee,
  login_employee,
  getEmployeeData,
  updateEmployeeData,
};
