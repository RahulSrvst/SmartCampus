const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Adjust the destination path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
});

// Configure fields for three images
const uploadFields = upload.fields([
  { name: "student_image", maxCount: 1 },
  { name: "father_image", maxCount: 1 },
  { name: "mother_image", maxCount: 1 },
]);

module.exports = uploadFields;
