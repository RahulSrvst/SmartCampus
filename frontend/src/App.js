import "./App.css";
import Main from "./Components/Main";
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import StickyContent from "./Components/StickyContent";
import Login from "./Components/Login Page/Login";
import Course from "./Components/InternalContent.jsx/Course";
import Side from "./Components/Side";
import Navbar from "./Components/Navbar";
import Batch from "./Components/InternalContent.jsx/Batch";
import TeacherAllocation from "./Components/InternalContent.jsx/TeacherAllocation";
import Subject from "./Components/InternalContent.jsx/Subject";
import AssignSubject from "./Components/InternalContent.jsx/AssignSubject";
import SubjectAllocation from "./Components/InternalContent.jsx/SubjectAllocation";
import ElectiveSubject from "./Components/InternalContent.jsx/ElectiveSubject";
import ELearning from "./Components/InternalContent.jsx/E-Learning";
import LecturePlanning from "./Components/InternalContent.jsx/LecturePlanning";
import ManageLecturePlan from "./Components/InternalContent.jsx/ManageLecturePlan";
import SyllabusStatus from "./Components/InternalContent.jsx/SyllabusStatus";
import Lecture from "./Components/InternalContent.jsx/Lecture";
import TopicList from "./Components/InternalContent.jsx/Topic";
import Room from "./Components/InternalContent.jsx/Time Table/Room";
import SetTimeTable from "./Components/InternalContent.jsx/Time Table/SetTimeTable";
import ActiveTimeTable from "./Components/InternalContent.jsx/Time Table/ActiveTimeTable";
import ViewBatchTimeTable from "./Components/InternalContent.jsx/Time Table/ViewBatchTimeTable";
import ViewTeacherTimeTable from "./Components/InternalContent.jsx/Time Table/ViewTeacherTimeTable";
import SearchProxy from "./Components/InternalContent.jsx/Time Table/SearchProxy";
import TeacherWorkingHours from "./Components/InternalContent.jsx/Time Table/TeacherWorkingHours";
import TimeTableExport from "./Components/InternalContent.jsx/Time Table/TimeTableExport";
import TimeTableImport from "./Components/InternalContent.jsx/Time Table/TimeTableImport";
import ExamGroups from "./Components/InternalContent.jsx/Exams/ExamGroups";
import ExamSchedule from "./Components/InternalContent.jsx/Exams/ExamSchedule";
import ExamResult from "./Components/InternalContent.jsx/Exams/ExamResult";
import DesignAdmitCard from "./Components/InternalContent.jsx/Exams/DesignAdmitCard";
import DesignMarksheet from "./Components/InternalContent.jsx/Exams/DesignMarksheet";
import MarksGrade from "./Components/InternalContent.jsx/Exams/MarksGrade";
import PrintAdmitCard from "./Components/InternalContent.jsx/Exams/PrintAdmitCard";
import OnlineExam from "./Components/InternalContent.jsx/OnlineExam/OnlineExam";
import QuestionBank from "./Components/InternalContent.jsx/OnlineExam/QuestionBank";
import ViewAssignment from "./Components/InternalContent.jsx/Assignments/ViewAssignment";
import AddAssignment from "./Components/InternalContent.jsx/Assignments/AddAssignment";
import CertificateType from "./Components/InternalContent.jsx/Certifications/CertificateType";
import CustomCertificate from "./Components/InternalContent.jsx/Certifications/CustomCertificate";
import TemplateList from "./Components/InternalContent.jsx/Certifications/TemplateList";
import GenerateList from "./Components/InternalContent.jsx/Certifications/GenerateList";
import PlacementCellMembers from "./Components/InternalContent.jsx/Placements/PlacementCellMemebers";
import PlacementVendors from "./Components/InternalContent.jsx/Placements/PlacementVendors";
import Attendees from "./Components/InternalContent.jsx/Placements/Attendees";
import PlacedDetails from "./Components/InternalContent.jsx/Placements/PlacedDetails";
import PromotionAlumni from "./Components/InternalContent.jsx/Promotions/PromotionAlumuni";
import Occurance from "./Components/InternalContent.jsx/Occurance/Occurance";
import Circular from "./Components/InternalContent.jsx/Circular/Circular";
import StudentDocument from "./Components/InternalContent.jsx/Students/StudentDocument";
import StudentAdmission from "./Components/InternalContent.jsx/Students/StudentAdmission";
import StudentList from "./Components/InternalContent.jsx/Students/StudentList";
import PrintList from "./Components/InternalContent.jsx/Students/PrintList";
import Attendance from "./Components/InternalContent.jsx/Students/Attendance";
import RollNumber from "./Components/InternalContent.jsx/Students/RollNumber";
import StudentIdCard from "./Components/InternalContent.jsx/Students/StudentIdCard";
import GatePass from "./Components/InternalContent.jsx/Students/GatePass";
import DisableReasons from "./Components/InternalContent.jsx/Students/DisableReasons";
import DisableStudent from "./Components/InternalContent.jsx/Students/DisableStudent";
import PromotedStudent from "./Components/InternalContent.jsx/Students/PromotedStudent";
import AddStudent from "./Components/InternalContent.jsx/Students/StudentCategory";
import AddUserType from "./Components/InternalContent.jsx/Employees/AddUserType";
import AddDepartment from "./Components/InternalContent.jsx/Employees/AddDepartment";
import AddDesignation from "./Components/InternalContent.jsx/Employees/AddDesignation";
import AddEmployee from "./Components/InternalContent.jsx/Employees/AddEmployee";
import EmployeeList from "./Components/InternalContent.jsx/Employees/EmployeeList";
import Withdrawal from "./Components/InternalContent.jsx/Employees/Withdrawal";
import PayHaed from "./Components/InternalContent.jsx/Payroll/PayHead";
import PayementType from "./Components/InternalContent.jsx/Payroll/PaymentType";
import SalaryType from "./Components/InternalContent.jsx/Payroll/SalarySetting";
import EmployeeSalary from "./Components/InternalContent.jsx/Payroll/EmployeeSalary";
import GenerateSalarySlip from "./Components/InternalContent.jsx/Payroll/GenerateSalarySlip";
import SalaryStatement from "./Components/InternalContent.jsx/Payroll/SalaryStatement";
import AllFeesCollection from "./Components/InternalContent.jsx/Accounts/AllFeesCollection";
import SearchFeePayment from "./Components/InternalContent.jsx/Accounts/SearchFeePayement";
import FeesMaster from "./Components/InternalContent.jsx/Accounts/FeesMaster";
import FeesGroup from "./Components/InternalContent.jsx/Accounts/FeesGroup";
import FeesType from "./Components/InternalContent.jsx/Accounts/FeesType";
import FeesDiscount from "./Components/InternalContent.jsx/Accounts/FeesDiscount";
import FeesReminder from "./Components/InternalContent.jsx/Accounts/FeesReminder";
import AddBookCategory from "./Components/InternalContent.jsx/Library/AddBookCategory";
import AddBook from "./Components/InternalContent.jsx/Library/AddBook";
import Booklist from "./Components/InternalContent.jsx/Library/BookList";
import IssueBook from "./Components/InternalContent.jsx/Library/IssueBook";
import RequestDetail from "./Components/InternalContent.jsx/Library/RequestDetail";
import IssueReturn from "./Components/InternalContent.jsx/Library/IssueReturn";
import AddStaffMember from "./Components/InternalContent.jsx/Library/AddStaffMember";
import AddNewDepartment from "./Components/InternalContent.jsx/Departments/AddNewDepartment";
import ApproveLeaveRequest from "./Components/InternalContent.jsx/Leave/ApproveLeaveRequest";
import LeaveType from "./Components/InternalContent.jsx/Leave/LeaveType";
import ApproveLeave from "./Components/InternalContent.jsx/Leave/ApproveLeave";
import ApplyRequest from "./Components/InternalContent.jsx/Leave/ApplyRequest";
import StudentAttendance from "./Components/InternalContent.jsx/Attendance/StudentAttendance";
import AttendanceByDate from "./Components/InternalContent.jsx/Attendance/AttendancebyDate";
import AddVehciles from "./Components/InternalContent.jsx/Transport/AddVehciles";
import AddDriver from "./Components/InternalContent.jsx/Transport/AddDriver";
import AddRoute from "./Components/InternalContent.jsx/Transport/AddRoute";
import AddDestination from "./Components/InternalContent.jsx/Transport/AddDestination";
import TransportAllocation from "./Components/InternalContent.jsx/Transport/TransportAllocation";
import FeeCollection from "./Components/InternalContent.jsx/Transport/FeesCollection";
import HostelTransfer from "./Components/InternalContent.jsx/Hostels/HostelTransfer";
import HostelRegister from "./Components/InternalContent.jsx/Hostels/HostelRegister";
import HostelVisitor from "./Components/InternalContent.jsx/Hostels/HostekVisitors";
import HostelFeesCollection from "./Components/InternalContent.jsx/Hostels/HostelFeesCollection";
import EventsType from "./Components/InternalContent.jsx/Events/EventsType";
import AddEvents from "./Components/InternalContent.jsx/Events/AddEvents";
import NoticeBoard from "./Components/InternalContent.jsx/Notification/NoticeBoard";
import LoginCredentials from "./Components/InternalContent.jsx/Notification/LoginCredentials";
import PrintLists from "./Components/InternalContent.jsx/Employees/PrintList";
import Signup from "./Components/SignUp Page/Signup";
import TableComponent from "./Components/InternalContent.jsx/Pagination";
import Home from "./Components/HomePage/Home";
import Plan from "./Components/HomePage/Plans";
import PricingPlan from "./Components/HomePage/Services";
import ScrollToTop from "./Components/ScrollToTop";
import UserSignUp from "./Components/UserSignUp/UserSignUp";
import EmployeeProfile from "./Components/InternalContent.jsx/Employees/EmployeeProfile";
import DriverDetails from "./Components/InternalContent.jsx/Transport/DriverDetail";
import VehicleDetails from "./Components/InternalContent.jsx/Transport/VehicleDetails";
import StudentProfile from "./Components/InternalContent.jsx/Students/StudentDetails";
import EmployeeAttendance from "./Components/InternalContent.jsx/Employees/EmployeeAttendance";
import AttendanceDate from "./Components/InternalContent.jsx/Employees/AttendanceDate";
import Pdf from "./Components/InternalContent.jsx/Payroll/pdf";
import LeaveData from "./Components/InternalContent.jsx/Leave/LeaveData";
import UpdateProfile from "./Components/InternalContent.jsx/AboutSection/UpdateProfile";
import CollegeInfo from "./Components/InternalContent.jsx/AboutSection/CollegeInfo";
import StudentDashboard from "./Components/StudentDashboard/StundentDashboard";
import ManageFeeStructure from "./Components/InternalContent.jsx/Accounts/AllFeesCollection";

function App() {

  const location = useLocation();
  
  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login' ;
  const isSignUpPage = location.pathname === '/signup' ;
  const isHome = location.pathname === '/' ;
  const isPlan = location.pathname === '/Plan' ;
  const isServices = location.pathname === '/Services' ;
  const isUserSignUp = location.pathname === '/UserSignup' ;


  return (
    <main className="bg-gray-100 min-h-screen overflow-hidden  ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home/>} />
        <Route path="/Plan" element={<Plan/>} />
        <Route path="/Services" element={<PricingPlan/>} />
        <Route path="/UserSignup" element={<UserSignUp/>} />
      </Routes>

      {/* Only show Side and Navbar if not on the login page */}
      {!isLoginPage && !isUserSignUp  && !isSignUpPage && !isHome && !isPlan && !isServices && (
        <div className="flex bg-gray md:px-4">
          <div className="md:flex flex-col hidden lg:w-[23%] xl:w-[20%] w-[37%] mt-3 rounded-lg ">
            <Side />
          </div>

          <div className="lg:w-[77%] xl:w-[79.5%] md:w-[47.5%] w-[50%] xl:pl-2 lg:ml-0  md:ml-3 relative">
            <div className="fixed lg:w-[74.5%] xl:w-[77.5%] md:w-[58.5%] w-full lg:ml-0 top-0 z-[999]">
              <div className="md:h-3 h-16 bg-gray z-50">
                <div className="text-3xl flex md:hidden justify-center  pt-3">
                  <div className="flex items-center justify-center">
                    <img
                      src="https://bharaterp.org/static/media/logobhaarat-5-1.256f7a6e439770721e00.webp"
                      alt="Error"
                      className="w-40"
                    />
                    <div className="text-3xl font-bold mt-2">
                      <span className="custom-gray">CRM</span>
                      <span className="icon-purple">i</span>
                    </div>
                  </div>
                </div>
              </div>
              <Navbar />
            </div>
          </div>
        </div>
      )}
      <ScrollToTop/>
      <Routes>
        <Route path="/dashboard" element={<Main />} />
        <Route path="/Course" element={<Course  />} />
        <Route path="/Batch" element={<Batch  />} />
        <Route path="/Class Teacher Allocation" element={<TeacherAllocation />} />
        <Route path="/Subjects" element={<Subject />} />
        <Route path="/Assign Subjects" element={<AssignSubject />} />
        <Route path="/Subject Allocation" element={<SubjectAllocation />} />
        <Route path="/Elective Subject" element={<ElectiveSubject />} />
        <Route path="/E-Learning" element={<ELearning />} />
        <Route path="/Lecture Planning" element={<LecturePlanning />} />
        <Route path="/Manage Lecture Plan" element={<ManageLecturePlan  />} />
        <Route path="/Manage Syllabus Status" element={<SyllabusStatus  />} />
        <Route path="/Lecture" element={<Lecture/>} />
        <Route path="/Topics" element={<TopicList/>} />
        <Route path="/Room" element={<Room/>} />
        <Route path="/Set Time Table" element={<SetTimeTable/>} />
        <Route path="/Active Time Table" element={<ActiveTimeTable/>} />
        <Route path="/View Batch Time Table" element={<ViewBatchTimeTable/>} />
        <Route path="/View Teacher Time Table" element={<ViewTeacherTimeTable/>} />
        <Route path="/Search Proxy" element={<SearchProxy/>} />
        <Route path="/Teaching Working Hours" element={<TeacherWorkingHours/>} />
        <Route path="/Time Table Export" element={<TimeTableExport/>} />
        <Route path="/Time Table Import" element={<TimeTableImport/>} />
        <Route path="/Exam Group" element={<ExamGroups/>} />
        <Route path="/Exam Schedule" element={<ExamSchedule/>} />
        <Route path="/Exam Result" element={<ExamResult/>} />
        <Route path="/Print Admit Card" element={<PrintAdmitCard/>} />
        <Route path="/Design Admit Card" element={<DesignAdmitCard/>} />
        <Route path="/Design Marksheet" element={<DesignMarksheet/>} />
        <Route path="/Marks Grade" element={<MarksGrade/>} />
        <Route path="/Online Exam" element={<OnlineExam/>} />
        <Route path="/Question Bank" element={<QuestionBank/>} />
        <Route path="/View Assignment" element={<ViewAssignment/>} />
        <Route path="/Add Assignment" element={<AddAssignment/>} />
        <Route path="/Certificate Type" element={<CertificateType/>} />
        <Route path="/Custom Certificate" element={<CustomCertificate/>} />
        <Route path="/Template List" element={<TemplateList/>} />
        <Route path="/Generate List" element={<GenerateList/>} />
        <Route path="/Placement Cell Members" element={<PlacementCellMembers/>} />
        <Route path="/Placement Vendors" element={<PlacementVendors/>} />
        <Route path="/Attendees" element={<Attendees/>} />
        <Route path="/Placed Details" element={<PlacedDetails/>} />
        <Route path="/Promotion & Alumuni" element={<PromotionAlumni/>} />
        <Route path="/Alumuni Member" element={<PlacedDetails/>} />
        <Route path="/Occurance Register" element={<Occurance/>} />
        <Route path="/Circular" element={<Circular/>} />
        <Route path="/Student Category" element={<AddStudent/>} />
        <Route path="/Student Document" element={<StudentDocument/>} />
        <Route path="/Student Admission" element={<StudentAdmission/>} />
        <Route path="/Students List" element={<StudentList/>} />
        <Route path="/Print List" element={<PrintList/>} />
        <Route path="/Attendance" element={<Attendance/>} />
        <Route path="/Roll Number" element={<RollNumber/>} />
        <Route path="/Student ID Card" element={<StudentIdCard/>} />
        <Route path="/Gate Pass" element={<GatePass/>} />
        <Route path="/Disable Reasons" element={<DisableReasons/>} />
        <Route path="/Disabled Students" element={<DisableStudent/>} />
        <Route path="/Promoted Students" element={<PromotedStudent/>} />
        <Route path="/User Type" element={<AddUserType/>} />
        <Route path="/Department" element={<AddDepartment/>} />
        <Route path="/Designation" element={<AddDesignation/>} />
        <Route path="/Add Employee" element={<AddEmployee/>} />
        <Route path="/Employee List" element={<EmployeeList/>} />
        <Route path="/Print Lists" element={<PrintLists/>} />
        <Route path="/Withdrawal" element={<Withdrawal/>} />
        <Route path="/Pay Head" element={<PayHaed/>} />
        <Route path="/Payment Type" element={<PayementType/>} />
        <Route path="/Salary Setting" element={<SalaryType/>} />
        <Route path="/Employee Salary" element={<EmployeeSalary/>} />
        <Route path="/Generate Salary Slip" element={<GenerateSalarySlip/>} />
        <Route path="/Salary Statement" element={<SalaryStatement/>} />
        <Route path="/All Fees Collection" element={<AllFeesCollection/>} />
        <Route path="/Search Fee Payment" element={<SearchFeePayment/>} />
        <Route path="/Fees Master" element={<FeesMaster/>} />
        <Route path="/Manage Fees Structure" element={<ManageFeeStructure/>} />
        <Route path="/Fees Group" element={<FeesGroup/>} />
        <Route path="/Fees Type" element={<FeesType/>} />
        <Route path="/Fees Discount" element={<FeesDiscount/>} />
        <Route path="/Fees Reminder" element={<FeesReminder/>} />
        <Route path="/Add Book Category" element={<AddBookCategory/>} />
        <Route path="/Add Book" element={<AddBook/>} />
        <Route path="/Book List" element={<Booklist/>} />
        <Route path="/Issue Book" element={<IssueBook/>} />
        <Route path="/Request Detail" element={<RequestDetail/>} />
        <Route path="/Issue Return" element={<IssueReturn/>} />
        <Route path="/Add Student" element={<AddStudent/>} />
        <Route path="/Add Staff Member" element={<AddStaffMember/>} />
        <Route path="/Add Book Category" element={<AddBookCategory/>} />
        <Route path="/Add New Department" element={<AddNewDepartment/>} />
        <Route path="/Approve Leave Request" element={<ApproveLeaveRequest/>} />
        <Route path="/Apply Leave" element={<ApplyRequest/>} />
        <Route path="/Leave Type" element={<LeaveType/>} />
        <Route path="/Approve Leave" element={<ApproveLeave/>} />
        <Route path="/Student Attendance" element={<StudentAttendance/>} />
        <Route path="/Employee Attendance" element={<EmployeeAttendance/>} />
        <Route path="/Attendance By Date" element={<AttendanceByDate/>} />
        <Route path="/E-Attendance By Date" element={<AttendanceDate/>} />
        <Route path="/Approve Leave" element={<ApproveLeave/>} />
        <Route path="/Add Vehciles" element={<AddVehciles/>} />
        <Route path="/Add Driver" element={<AddDriver/>} />
        <Route path="/Add Route" element={<AddRoute/>} />
        <Route path="/Add Destination" element={<AddDestination/>} />
        <Route path="/Transport Allocation" element={<TransportAllocation/>} />
        <Route path="/Fees Collection" element={<FeeCollection/>} />
        <Route path="/Hostel Transfer/Vacate" element={<HostelTransfer/>} />
        <Route path="/Hostel Register" element={<HostelRegister/>} />
        <Route path="/Hostel Visitors" element={<HostelVisitor/>} />
        <Route path="/Hostel Fees Collection" element={<HostelFeesCollection/>} />
        <Route path="/Event Types" element={<EventsType/>} />
        <Route path="/Add Events" element={<AddEvents/>} />
        <Route path="/Notice Board" element={<NoticeBoard/>} />
        <Route path="/Login Credential Send" element={<LoginCredentials/>} />
        <Route path="/EmployeeProfile/:id" element={<EmployeeProfile/>} />
        <Route path="/DriverDetails/:id" element={<DriverDetails/>} />
        <Route path="/StudentsProfile/:id" element={<StudentProfile/>} />
        <Route path="/LeaveData" element={<LeaveData/>} />
        <Route path="/VehicleDetails/:id" element={<VehicleDetails/>} />
        <Route path="/pagination" element={<TableComponent/>} />
        <Route path="/pdf" element={<Pdf/>} />
        <Route path="/Profile Update" element={<UpdateProfile/>} />
        <Route path="/College Info" element={<CollegeInfo/>} />
        <Route path="/schooldashboard" element={<StudentDashboard/>} />
      </Routes>

      {/* Only show StickyContent if not on the login page */}
      {!isLoginPage && !isUserSignUp && !isSignUpPage && !isHome && !isPlan && !isServices && <StickyContent />}
    </main>
  );
}

// Wrap the App component with BrowserRouter
export default function Router() {
  return (
    <BrowserRouter  >
      <App />
    </BrowserRouter>
  );
}
