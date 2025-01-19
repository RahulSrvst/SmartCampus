const { register, login, getRegisteredCollege } = require("../Controllers/AuthController");
const { addBatch, getBatch, deleteBatch, updateBatch } = require("../Controllers/BatchController");
const { addCourse, getCourse, updateCourse, deleteCourse } = require("../Controllers/CourseController");
const { add_department, get_department } = require("../Controllers/Department");
const { add_Designation, get_Designation } = require("../Controllers/Designation");
const { add_attendance, get_attendance, get_attendance_by_date, get_employee_attendance } = require("../Controllers/EmployeeAttendanceController");
const { add_employee, login_employee, getEmployeeData, updateEmployeeData } = require("../Controllers/EmployeeRegistrationController");
const { addPaySlip, getPaySlip } = require("../Controllers/GeneratePaySlipController");
const { add_paytype, get_paytype } = require("../Controllers/PayheadController");
const { createOrder, verifyPayment } = require("../Controllers/PaymentController");
const { add_payment_type, get_PaymentType } = require("../Controllers/PaymentTypeController");
const { getPlan, addPlan } = require("../Controllers/PlanController");
const { add_Salary, get_salary } = require("../Controllers/SalarySettingsController");
const upload = require("../Middlewares/multer");
const verifyToken = require("../Middlewares/TokenVerification");

const router = require("express").Router();


router.post("/register", upload.single("logo"), register);
router.post('/login',login)
router.get('/get-college', getRegisteredCollege);
router.get('/get-plans',getPlan)
router.post('/add-plans',addPlan)

router.post('/create-order',createOrder)
router.post('/verify-payment',verifyPayment)


router.post('/course-api',verifyToken,addCourse);
router.get('/course-api',verifyToken,getCourse);
router.patch('/course-api',verifyToken,updateCourse);
router.delete('/course-api',verifyToken,deleteCourse);

router.post('/batch-api',verifyToken,addBatch);
router.get('/batch-api',verifyToken,getBatch);
router.patch('/batch-api',verifyToken,updateBatch);
router.delete('/batch-api',verifyToken,deleteBatch);


router.post('/department-api',verifyToken,add_department);
router.get('/department-api',verifyToken,get_department);
router.patch('/department-api',verifyToken);
router.delete('/department-api',verifyToken,deleteBatch);

router.post('/designation-api',verifyToken,add_Designation);
router.get('/designation-api',verifyToken,get_Designation);
router.patch('/designation-api',verifyToken);
router.delete('/batch-api',verifyToken,deleteBatch);

router.post("/add-employee",verifyToken, upload.single("image"), add_employee);
router.get("/add-employee",verifyToken,getEmployeeData);
router.patch("/add-employee",verifyToken,updateEmployeeData);
router.post('/login-employee',login_employee);


router.post("/paytype-api",add_paytype)
router.get("/paytype-api",get_paytype)

router.post("/paymenttype-api",add_payment_type)
router.get("/paymenttype-api",get_PaymentType)

router.post("/salarysetting-api",add_Salary)
router.get("/salarysetting-api",get_salary)

router.post("/employee-attendance-api",add_attendance)
router.get("/employee-attendance-api",get_attendance)
router.get("/get-employee-attendance-api",get_employee_attendance)

router.post("/employee-payslip-api",addPaySlip)
router.get("/employee-payslip-api",getPaySlip)
// router.get("/employee-payslip-api",get_employee_attendance)

module.exports = router;