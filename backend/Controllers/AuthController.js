const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const PlanModel = require("../Models/PlanModel");
const cloudinary = require("../utils/cloudinary");
const upload = require("../Middlewares/multer");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      country,
      address,
      college,
      mobile,
      selected_plan,
      state,
      city,
      pincode,
    } = req.body;
    if (!email || !name) {
      return res
        .status(400)
        .json({ message: "Name and Email are required!", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists!", success: false });
    }

    const plan = await PlanModel.findById(selected_plan);
    if(!plan){
        return res
        .status(400)
        .json({ message: "Selected Plan Not Found!", success: false });
    }

    let logourl = null;
    if (req.file) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: "",
          public_id: `${email}_logo`,
          resource_type: "image",
        });
        logourl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return res.status(500).json({ message: "Cloudinary upload failed", success: false });
      }
    }

    const randomPassword = crypto.randomBytes(4).toString("hex");

    const userModel = new UserModel({
      name,
      email,
      country,
      address,
      college,
      mobile,
      plan:selected_plan,
      state,
      city,
      pincode,
      logo:logourl
    });

    userModel.password = await bcrypt.hash(randomPassword, 10);
    const token = crypto.randomBytes(16).toString("hex");
    userModel.loginToken = token;
    await userModel.save();

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
      subject: "Your Account Registration Details",
      text: `Hello ${name},\n\nYour account has been successfully registered. Here are your login details:\n\nEmail: ${email}\nPassword: ${randomPassword}\n\nPlease change your password after logging in for the first time.\n\nRegards,\nRahSrv-Tech`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Registered Successfully! Password sent to your email.",
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Internal Server Error ,${e}`,
      success: false,
    });
  }
};

const getRegisteredCollege = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Fetching user with ID:", id);

    if (!id) {
      return res.status(400).json({
        message: "ID parameter is missing",
        success: false,
      });
    }

    const userData = await UserModel.findById(id);
    console.log("Fetched user data:", userData);

    if (!userData) {
      return res.status(404).json({
        message: "User not found with this ID",
        success: false,
      });
    }

    return res.status(200).json({
      message: "College Successfully Fetched !!",
      data: userData,
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


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(402).json({
        message: "Incorrect Email & Password !!",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({
        message: "Incorrect Email & Password !!",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id, collegeId: user.collegeId }, process.env.JWT_TOKEN, {
      expiresIn: "72h",
    });
    res.status(200).json({
      message: "Login successfully !!",
      success: true,
      id:user._id,
      token,
      name:user.name,
      user_type:"Admin",
      college:user.college,
      logo:user.logo,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { register, login,getRegisteredCollege};
