const { add_subjectadd, get_subject_add } = require("../Controllers/AddSubjectController");
const { add_AssignSubject, get_AssignSubject } = require("../Controllers/AssignSubjectController");
const { register, login, getRegisteredCollege } = require("../Controllers/AuthController");
const { addBatch, getBatch, deleteBatch, updateBatch } = require("../Controllers/BatchController");
const { add_class_teacher, get_class_teacher } = require("../Controllers/ClassTeacherAllocationController");
const { addCourse, getCourse, updateCourse, deleteCourse } = require("../Controllers/CourseController");
const { add_department, get_department } = require("../Controllers/Department");
const { add_Designation, get_Designation } = require("../Controllers/Designation");
const { add_electiveSubject, get_electiveSubject } = require("../Controllers/ElectiveSubjectController");
const { add_attendance, get_attendance, get_attendance_by_date, get_employee_attendance } = require("../Controllers/EmployeeAttendanceController");
const { add_employee, login_employee, getEmployeeData, updateEmployeeData } = require("../Controllers/EmployeeRegistrationController");
const { addPaySlip, getPaySlip } = require("../Controllers/GeneratePaySlipController");
const { addleavetype, getleaveType } = require("../Controllers/leaveTypeContr");
const { addNotification, sendNotification } = require("../Controllers/NotificationController");
const { add_paytype, get_paytype } = require("../Controllers/PayheadController");
const { createOrder, verifyPayment } = require("../Controllers/PaymentController");
const { add_payment_type, get_PaymentType } = require("../Controllers/PaymentTypeController");
const { getPlan, addPlan } = require("../Controllers/PlanController");
const { add_Salary, get_salary } = require("../Controllers/SalarySettingsController");
const { addStudentAdmission, getStudent, getStudentStatics, loginStudent } = require("../Controllers/StudentAdmissionController");
const { add_subject, get_subject } = require("../Controllers/SubjectAllocationController");
const { RegisterSuperAdmin, LoginSuperAdmin } = require("../Controllers/SuperAdminController");
const authMiddleware = require("../Middlewares/AuthValidation");
const upload = require("../Middlewares/multer");
const uploadFields = require("../Middlewares/MultipleFIleMulter");

const router = require("express").Router();


router.post("/register", upload.single("logo"), register);
router.post('/login',login)
router.get('/get-college', getRegisteredCollege);
router.get('/get-plans',getPlan)
router.post('/add-plans',addPlan)

router.post('/create-order',createOrder)
router.post('/verify-payment',verifyPayment)


router.post('/course-api',authMiddleware,addCourse);
router.get('/course-api',authMiddleware,getCourse);
router.patch('/course-api',authMiddleware,updateCourse);
router.delete('/course-api',authMiddleware,deleteCourse);

router.post('/batch-api',authMiddleware,addBatch);
router.get('/batch-api',authMiddleware,getBatch);
router.patch('/batch-api',authMiddleware,updateBatch);
router.delete('/batch-api',authMiddleware,deleteBatch);


router.post('/department-api',authMiddleware,add_department);
router.get('/department-api',authMiddleware,get_department);
router.patch('/department-api',authMiddleware);
router.delete('/department-api',authMiddleware,deleteBatch);

router.post('/designation-api',authMiddleware,add_Designation);
router.get('/designation-api',authMiddleware,get_Designation);
router.patch('/designation-api',authMiddleware);
router.delete('/batch-api',authMiddleware,deleteBatch);

router.post("/add-employee",authMiddleware, upload.single("image"), add_employee);
router.get("/add-employee",authMiddleware,getEmployeeData);
router.patch("/add-employee",authMiddleware,updateEmployeeData);
router.post('/login-employee',login_employee);


router.post("/paytype-api",authMiddleware,add_paytype)
router.get("/paytype-api",authMiddleware,get_paytype)

router.post("/leavetype-api",authMiddleware,addleavetype)
router.get("/leavetype-api",authMiddleware,getleaveType)

router.post("/paymenttype-api",authMiddleware,add_payment_type)
router.get("/paymenttype-api",authMiddleware,get_PaymentType)

router.post("/salarysetting-api",authMiddleware,add_Salary)
router.get("/salarysetting-api",authMiddleware,get_salary)

router.post("/Add-teacher-allocation",authMiddleware,add_class_teacher)
router.get("/Add-teacher-allocation",authMiddleware,get_class_teacher)


router.post("/add_subject_api",authMiddleware,add_subject)
router.get("/add_subject_api",authMiddleware,get_subject)

router.post("/assign-subject",authMiddleware,add_AssignSubject)
router.get("/assign-subject",authMiddleware,get_AssignSubject)

router.post("/subject-allowcation",authMiddleware,add_subjectadd)
router.get("/subject-allowcation",authMiddleware,get_subject_add)

router.post("/add-elective-subject",authMiddleware,add_electiveSubject)
router.get("/add-elective-subject",authMiddleware,get_electiveSubject)

router.post("/employee-attendance-api",authMiddleware,add_attendance)
router.get("/employee-attendance-api",authMiddleware,get_attendance)
router.get("/get-employee-attendance-api",authMiddleware,get_employee_attendance) 

router.post("/student-admission-api",authMiddleware,uploadFields,addStudentAdmission)
router.get("/student-admission-api",authMiddleware,getStudent)
router.get("/student-statics-api",authMiddleware,getStudentStatics)
router.post("/student-login",loginStudent)
router.get("/get-employee-attendance-api",authMiddleware,get_employee_attendance)   

router.post("/employee-payslip-api",upload.single(""),authMiddleware,addPaySlip)
router.get("/employee-payslip-api",authMiddleware,getPaySlip)


router.post("/register-superadmin",upload.single("pic"),RegisterSuperAdmin)
router.post("/login-superadmin",LoginSuperAdmin)


router.post("/notification-api",addNotification)
router.get("/notifiaction-api",sendNotification)

module.exports = router;