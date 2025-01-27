const SuperAdmin = require("../Models/SuperAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

const RegisterSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pic = req.file;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    if (!pic) {
      return res.status(400).json({ message: "Profile picture is required", success: false });
    }

    const existingAdmin = await SuperAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "SuperAdmin already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let logourl = null;
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

    const newAdmin = new SuperAdmin({ email, password: hashedPassword, pic: logourl });
    await newAdmin.save();

    res.status(201).json({ message: "SuperAdmin registered successfully", success: true });
  } catch (err) {
    console.log("Internal server error:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const LoginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await SuperAdmin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "SuperAdmin not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });

    res.status(200).json({
      message: "SuperAdmin login successful",
      token,
      name: "Beast R",
      user_type: "Super Admin",
      success: true,
    });
  } catch (err) {
    console.log("Internal server error:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { RegisterSuperAdmin, LoginSuperAdmin };

