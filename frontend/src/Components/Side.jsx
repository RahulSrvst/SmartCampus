import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser, FaHome, FaCarAlt } from "react-icons/fa";
import {
  MdAccountBox,
  MdKeyboardArrowRight,
  MdOutlineAccountBox,
} from "react-icons/md";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TiArrowRightThick } from "react-icons/ti";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { GoDot } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { SiMdbook } from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { CiInboxIn } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import "./Side.css";
import { RiGitCommitLine } from "react-icons/ri";
import { HiMiniUser } from "react-icons/hi2";
import { PiDotFill, PiDotOutlineDuotone } from "react-icons/pi";
import { baseURL } from "./Configs/axios";
import superAdmin from "../Assests/avatar-13.png";
import crmi from "../Assests/custom-17.png";
import b1 from "../Assests/profile1.png"
import axios from "axios";
import { API_URLS } from "./Configs/urls";


const Side = ({CollegeData}) => {


  const location = useLocation();

  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const fetchEmployeeData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(baseURL + API_URLS.addEmployee, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          employee_id: localStorage.getItem("employee_id"),
        },
      });
      if (response.status === 200) {
        setSelectedEmployee(response.data.data || []);
      } else {
        console.log("Error fetching employees");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user_type") === "employee") {
      fetchEmployeeData();
    }
  }, [localStorage.getItem("user_type") === "employee"]);
  
  



  const [StudentData, setStudentData] = useState([]);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          student_id: localStorage.getItem("student_id"),
        },
      });
      if (response.status === 200) {
        setStudentData(response.data.data || []);
      } else {
        console.log("Error fetching Student");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user_type") === "student") {
      fetchStudentData();
    }
  }, [localStorage.getItem("user_type") === "student"]);

  const [isAcademicOpen, setAcademicOpen] = useState(false);
  const [isStudentOpen, setStudentOpen] = useState(false);
  const [isEmployeeOpen, setEmployeeOpen] = useState(false);
  const [isEmployeeAttendanceOpen, setEmployeeAttendanceOpen] = useState(false);
  const [isPayrollOpen, setPayrollOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [isLibraryOpen, setLibraryOpen] = useState(false);
  const [isDepartmentOpen, setDepartmentOpen] = useState(false);
  const [isLeaveOpen, setLeaveOpen] = useState(false);
  const [isAttendanceOpen, setAttendanceOpen] = useState(false);
  const [isTransportOpen, setTransportOpen] = useState(false);
  const [isHostelOpen, setHostelOpen] = useState(false);
  const [isNotificationOpen, setNotifactionOpen] = useState(false);
  const [isEventOpen, setEventOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCourseOpen, setCourseOpen] = useState(false);
  const [isSubjectOpen, setSubjectOpen] = useState(false);
  const [iseLearningtOpen, seteLaerningOpen] = useState(false);
  const [isLectureOpen, setLectureOpen] = useState(false);
  const [isTimeTableOpen, setTimeTableOpen] = useState(false);
  const [isExamsOpen, setExamsOpen] = useState(false);
  const [isOnlineExamOpen, setOnlineExamOpen] = useState(false);
  const [isAssignmentOpen, setAssignmentOpen] = useState(false);
  const [isCertificationOpen, setCertificationOpen] = useState(false);
  const [isPlacementsOpen, setPlacementsOpen] = useState(false);
  const [isPromotionOpen, setPromotionOpen] = useState(false);
  const [isOccuranceOpen, setoccuranceOpen] = useState(false);
  const [isCircularOpen, setCircularOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);

  const toggleAcademicDropdown = () => {
    setAcademicOpen((prev) => !prev);
  };

  const toggleDropdown = (dropdown) => {
    if (openDropdown && openDropdown !== dropdown) {
      switch (openDropdown) {
        case "student":
          setStudentOpen(false);
          break;
        case "employee":
          setEmployeeOpen(false);
          break;
        case "employeeAttendance":
          setEmployeeAttendanceOpen(false);
          break;
        case "payroll":
          setPayrollOpen(false);
          break;
        case "account":
          setAccountOpen(false);
          break;
        case "library":
          setLibraryOpen(false);
          break;
        case "department":
          setDepartmentOpen(false);
          break;
        case "leave":
          setLeaveOpen(false);
          break;
        case "attendance":
          setAttendanceOpen(false);
          break;
        case "transport":
          setTransportOpen(false);
          break;
        case "hostel":
          setHostelOpen(false);
          break;
        case "Notification":
          setNotifactionOpen(false);
          break;
        case "Event":
          setEventOpen(false);
          break;
        case "Course":
          setCourseOpen(false);
          break;
        case "Subject":
          setSubjectOpen(false);
          break;
        case "eleraning":
          seteLaerningOpen(false);
          break;
        case "Lecture":
          setLectureOpen(false);
          break;
        case "TimeTable":
          setTimeTableOpen(false);
          break;
        case "Exam":
          setExamsOpen(false);
          break;
        case "OnlineExam":
          setOnlineExamOpen(false);
          break;
        case "Assignment":
          setAssignmentOpen(false);
          break;
        case "Certification":
          setCertificationOpen(false);
          break;
        case "Placements":
          setPlacementsOpen(false);
          break;
        case "Promotion":
          setPromotionOpen(false);
          break;
        case "Occurrence":
          setoccuranceOpen(false);
          break;
        case "Circular":
          setCircularOpen(false);
          break;

        case "About":
          setAboutOpen(false);
          break;
        default:
          break;
      }
    }
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    switch (dropdown) {
      case "student":
        setStudentOpen((prev) => !prev);
        break;
      case "employee":
        setEmployeeOpen((prev) => !prev);
        break;
      case "employeeAttendance":
        setEmployeeAttendanceOpen((prev) => !prev);
        break;
      case "payroll":
        setPayrollOpen((prev) => !prev);
        break;
      case "account":
        setAccountOpen((prev) => !prev);
        break;
      case "library":
        setLibraryOpen((prev) => !prev);
        break;
      case "department":
        setDepartmentOpen((prev) => !prev);
        break;
      case "leave":
        setLeaveOpen((prev) => !prev);
        break;
      case "attendance":
        setAttendanceOpen((prev) => !prev);
        break;
      case "transport":
        setTransportOpen((prev) => !prev);
        break;
      case "hostel":
        setHostelOpen((prev) => !prev);
        break;
      case "Notification":
        setNotifactionOpen((prev) => !prev);
        break;
      case "Event":
        setEventOpen((prev) => !prev);
        break;
      case "Course":
        setCourseOpen((prev) => !prev);
        break;
      case "Subject":
        setSubjectOpen((prev) => !prev);
        break;
      case "eleraning":
        seteLaerningOpen((prev) => !prev);
        break;
      case "Lecture":
        setLectureOpen((prev) => !prev);
        break;
      case "TimeTable":
        setTimeTableOpen((prev) => !prev);
        break;
      case "Exam":
        setExamsOpen((prev) => !prev);
        break;
      case "OnlineExam":
        setOnlineExamOpen((prev) => !prev);
        break;
      case "Assignment":
        setAssignmentOpen((prev) => !prev);
        break;
      case "Certification":
        setCertificationOpen((prev) => !prev);
        break;
      case "Placements":
        setPlacementsOpen((prev) => !prev);
        break;
      case "Promotion":
        setPromotionOpen((prev) => !prev);
        break;
      case "Occurrence":
        setoccuranceOpen((prev) => !prev);
        break;
      case "Circular":
        setCircularOpen((prev) => !prev);
        break;
      case "About":
        setAboutOpen((prev) => !prev);
        break;
      default:
        break;
    }
  };
  let CourseMenuItems = [];

  if (localStorage.getItem("user_type") === "Admin") {
    CourseMenuItems = [
      { icon: <PiDotFill />, name: "Course", isActive: false },
      { icon: <PiDotFill />, name: "Batch", isActive: false },
      {
        icon: <PiDotFill />,
        name: "Class Teacher Allocation",
        isActive: false,
      },
    ];
  }

  let SubjectsMenuItems = [];

  if (localStorage.getItem("user_type") === "Admin") {
    SubjectsMenuItems = [
      { icon: <PiDotFill />, name: "Subjects", isActive: false },
      { icon: <PiDotFill />, name: "Assign Subjects", isActive: false },
      { icon: <PiDotFill />, name: "Subject Allocation", isActive: false },
      { icon: <PiDotFill />, name: "Elective Subject", isActive: false },
    ];
  }

  const ELearningMenuItems = [
    { icon: <PiDotFill />, name: "E-Learning", isActive: false },
  ];

  const LectureMenuItems = [
    { icon: <PiDotFill />, name: "Lecture Planning", isActive: false },
    { icon: <PiDotFill />, name: "Manage Lecture Plan", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Manage Syllabus Status",
      isActive: false,
    },
    { icon: <PiDotFill />, name: "Lecture", isActive: false },
    { icon: <PiDotFill />, name: "Topics", isActive: false },
  ];

  const TimeTableMenuItems = [
    { icon: <PiDotFill />, name: "Room", isActive: false },
    { icon: <PiDotFill />, name: "Set Time Table", isActive: false },
    { icon: <PiDotFill />, name: "Active Time Table", isActive: false },
    {
      icon: <PiDotFill />,
      name: "View Batch Time Table",
      isActive: false,
    },
    {
      icon: <PiDotFill />,
      name: "View Teacher Time Table",
      isActive: false,
    },
    { icon: <PiDotFill />, name: "Search Proxy", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Teaching Working Hours",
      isActive: false,
    },
    { icon: <PiDotFill />, name: "Time Table Export", isActive: false },
    { icon: <PiDotFill />, name: "Time Table Import", isActive: false },
  ];

  const ExamsMenuItems = [
    { icon: <PiDotFill />, name: "Exam Group", isActive: false },
    { icon: <PiDotFill />, name: "Exam Schedule", isActive: false },
    { icon: <PiDotFill />, name: "Exam Result", isActive: false },
    { icon: <PiDotFill />, name: "Design Admit Card", isActive: false },
    { icon: <PiDotFill />, name: "Print Admit Card", isActive: false },
    { icon: <PiDotFill />, name: "Design Marksheet", isActive: false },
    { icon: <PiDotFill />, name: "Marks Grade", isActive: false },
  ];

  const OnlineExamMenuItems = [
    { icon: <PiDotFill />, name: "Online Exam", isActive: false },
    { icon: <PiDotFill />, name: "Question Bank", isActive: false },
  ];

  const AssignmentMenuItems = [
    { icon: <PiDotFill />, name: "View Assignment", isActive: false },
    { icon: <PiDotFill />, name: "Add Assignment", isActive: false },
  ];

  const CertficationMenuItems = [
    { icon: <PiDotFill />, name: "Certificate Type", isActive: false },
    { icon: <PiDotFill />, name: "Custom Certificate", isActive: false },
    { icon: <PiDotFill />, name: "Template List", isActive: false },
    { icon: <PiDotFill />, name: "Generate List", isActive: false },
  ];

  const PlacementsMenuItems = [
    {
      icon: <PiDotFill />,
      name: "Placement Cell Members",
      isActive: false,
    },
    { icon: <PiDotFill />, name: "Placement Vendors", isActive: false },
    { icon: <PiDotFill />, name: "Attendees", isActive: false },
    { icon: <PiDotFill />, name: "Placed Details", isActive: false },
  ];

  const PromotionMenuItems = [
    { icon: <PiDotFill />, name: "Promotion & Alumuni", isActive: false },
    { icon: <PiDotFill />, name: "Alumuni Member", isActive: false },
  ];

  const OccuranceMenuItems = [
    { icon: <PiDotFill />, name: "Occurance Register", isActive: false },
  ];

  const CircularMenuItems = [
    { icon: <PiDotFill />, name: "Circular", isActive: false },
  ];

  let studentMenuItems = [];

  if (localStorage.getItem("user_type") === "Admin") {
    studentMenuItems = [
      { icon: <PiDotFill />, name: "Student Category", isActive: false },
      { icon: <PiDotFill />, name: "Student Document", isActive: false },
      { icon: <PiDotFill />, name: "Student Admission", isActive: false },
      { icon: <PiDotFill />, name: "Students List", isActive: false },
      { icon: <PiDotFill />, name: "Print List", isActive: false },
      { icon: <PiDotFill />, name: "Attendance", isActive: false },
      { icon: <PiDotFill />, name: "Roll Number", isActive: false },
      { icon: <PiDotFill />, name: "Student ID Card", isActive: false },
      { icon: <PiDotFill />, name: "Gate Pass", isActive: false },
      { icon: <PiDotFill />, name: "Disable Reasons", isActive: false },
      { icon: <PiDotFill />, name: "Disabled Students", isActive: false },
      { icon: <PiDotFill />, name: "Promoted Students", isActive: false },
    ];
  } else if (localStorage.getItem("usertype") === "employee") {
    studentMenuItems = [
      { icon: <PiDotFill />, name: "Print List", isActive: false },
      { icon: <PiDotFill />, name: "Attendance", isActive: false },
      { icon: <PiDotFill />, name: "Roll Number", isActive: false },
      { icon: <PiDotFill />, name: "Gate Pass", isActive: false },
      { icon: <PiDotFill />, name: "Disable Reasons", isActive: false },
      { icon: <PiDotFill />, name: "Disabled Students", isActive: false },
      { icon: <PiDotFill />, name: "Promoted Students", isActive: false },
    ];
  }

  let EmployeeMenuItems = [];

  if (localStorage.getItem("user_type") === "Admin") {
    EmployeeMenuItems = [
      { icon: <PiDotFill />, name: "Department", isActive: false },
      { icon: <PiDotFill />, name: "Designation", isActive: false },
      { icon: <PiDotFill />, name: "Add Employee", isActive: false },
      { icon: <PiDotFill />, name: "Employee List", isActive: false },
      { icon: <PiDotFill />, name: "Print Lists", isActive: false },
    ];
  }

  let EmployeeAttendanceMenuItems = [];

  if (
    localStorage.getItem("user_type") === "Admin" ||
    localStorage.getItem("user_type") === "employee"
  ) {
    EmployeeAttendanceMenuItems = [
      { icon: <PiDotFill />, name: "Employee Attendance", isActive: false },
      { icon: <PiDotFill />, name: "E-Attendance By Date", isActive: false },
    ];
  }

  const PayrollMenuItems = [
    { icon: <PiDotFill />, name: "Pay Head", isActive: false },
    { icon: <PiDotFill />, name: "Payment Type", isActive: false },
    { icon: <PiDotFill />, name: "Salary Setting", isActive: false },
    { icon: <PiDotFill />, name: "Employee Salary", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Generate Salary Slip",
      isActive: false,
    },
  ];

  const AccountMenuItems = [
    { icon: <PiDotFill />, name: "Manage Fees Structure", isActive: false },
    { icon: <PiDotFill />, name: "Manage Student Fees", isActive: false },
    { icon: <PiDotFill />, name: "View Student Fees", isActive: false },
    { icon: <PiDotFill />, name: "Collect Deposited Fees", isActive: false },
    { icon: <PiDotFill />, name: "View Remaning Fees", isActive: false },
    { icon: <PiDotFill />, name: "Fees Reminder", isActive: false },
  ];

  const LibraryMenuItems = [
    { icon: <PiDotFill />, name: "Add Book Category", isActive: false },
    { icon: <PiDotFill />, name: "Add Book", isActive: false },
    { icon: <PiDotFill />, name: "Book List", isActive: false },
    { icon: <PiDotFill />, name: "Issue Book", isActive: false },
    { icon: <PiDotFill />, name: "Request Detail", isActive: false },
    { icon: <PiDotFill />, name: "Issue Return", isActive: false },
    { icon: <PiDotFill />, name: "Add Student", isActive: false },
    { icon: <PiDotFill />, name: "Add Staff Member", isActive: false },
  ];

  let LeaveMenuItems = [];

  if (localStorage.getItem("user_type") === "Admin") {
    LeaveMenuItems = [
      { icon: <PiDotFill />, name: "Leave Type", isActive: false },
      { icon: <PiDotFill />, name: "Apply Leave", isActive: false },
      { icon: <PiDotFill />, name: "Approve Leave", isActive: false },
      { icon: <PiDotFill />, name: "Approve Leave Request", isActive: false },
    ];
  } else if (
    localStorage.getItem("user_type") === "employee" ||
    localStorage.getItem("user_type") === "student"
  ) {
    LeaveMenuItems = [
      { icon: <PiDotFill />, name: "Apply Leave", isActive: false },
    ];
  }

  let AttendanceMenuItems = [];

  if (
    localStorage.getItem("user_type") === "Admin" ||
    localStorage.getItem("user_type") === "employee"
  ) {
  AttendanceMenuItems = [
    { icon: <PiDotFill />, name: "Student Attendance", isActive: false },
    { icon: <PiDotFill />, name: "Attendance By Date", isActive: false },
  ];
}else if(localStorage.getItem("user_type") === "student"){
  AttendanceMenuItems = [ 
    { icon: <PiDotFill />, name: "Attendance By Date", isActive: false },
  ];
}

  const TransportMenuItems = [
    { icon: <PiDotFill />, name: "Add Vehciles", isActive: false },
    { icon: <PiDotFill />, name: "Add Driver", isActive: false },
    { icon: <PiDotFill />, name: "Add Route", isActive: false },
    { icon: <PiDotFill />, name: "Add Destination", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Transport Allocation",
      isActive: false,
    },
    { icon: <PiDotFill />, name: "Fees Collection", isActive: false },
  ];

  const HostelMenuItems = [
    { icon: <PiDotFill />, name: "Hostel Details", isActive: false },
    { icon: <PiDotFill />, name: "Hostel Room", isActive: false },
    { icon: <PiDotFill />, name: "Hostel Allocation", isActive: false },
    { icon: <PiDotFill />, name: "Request Details", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Hostel Transfer/Vacate",
      isActive: false,
    },
    { icon: <PiDotFill />, name: "Hostel Register", isActive: false },
    { icon: <PiDotFill />, name: "Hostel Visitors", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Hostel Fees Collection",
      isActive: false,
    },
  ];

  const NotificationMenuItems = [
    { icon: <PiDotFill />, name: "Notice Board", isActive: false },
    {
      icon: <PiDotFill />,
      name: "Login Credential Send",
      isActive: false,
    },
  ];

  const EventMenuItems = [
    { icon: <PiDotFill />, name: "Event Types", isActive: false },
    { icon: <PiDotFill />, name: "Add Events", isActive: false },
  ];

  const AboutMenuItems = [
    { icon: <PiDotFill />, name: "Profile Update", isActive: false },
    { icon: <PiDotFill />, name: "College Info", isActive: false },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (event) => {
    event.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const dropdownStyles = (isOpen) => ({
    maxHeight: isOpen ? "1000px" : "0px",
    opacity: isOpen ? 1 : 0,
    padding: isOpen ? "10px 0" : "0 0",
    overflow: "hidden",
    transition: "max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease",
  });


  console.log(StudentData);

  return (
    <div className="relative h-[100%]  rounded-lg  ">
      <div className="space-y-5 rounded-xl !fixed top-3 z-50 w-[163px] md:w-[300px] lg:w-[297px] xl:w-[20%] h-[100%] bg-white animate__animated animate__bounceInLeft">
        <div className="">
          <div
            className="flex flex-col ml-0 sm:ml-0 justify-center items-center mx-auto pt-5 hover:cursor-pointer "
            onClick={() => navigate("/dashboard")}
          >
            <img
              src={b1}
              alt="Error"
              className=" w-[200vw] sm:w-40 -mt-4 h-32 ml-24 sm:ml-0 "
            />
          </div>

          <div className="flex justify-between -mt-3 border border-slate-100 w-[130%] md:w-[85%] rounded-lg mx-6 md:mx-5 md:px-5 relative">
            <div className="flex items-center py-2">
              {localStorage.getItem("user_type") === "Super Admin" && (
                <img src={superAdmin} alt="Profile Avatar" className="w-14" />
              )}
              {localStorage.getItem("user_type") === "Admin" && (
                <img
                  src={`${CollegeData?.logo}`}
                  alt="Profile Avatar"
                  className="w-14 h-14"
                />
              )}
              {localStorage.getItem("user_type") === "employee" && (
                <img
                  src={`${selectedEmployee?.[0]?.image}`}
                  alt="Profile Avatar"
                  className="w-14 h-14"
                />
              )}
              {localStorage.getItem("user_type") === "student" && (
                <img
                  src={`${StudentData?.[0]?.student_image}`}
                  alt="Profile Avatar"
                  className="w-14 h-14"
                />
              )}
              <div className="ml-3 flex flex-col leading-none">
                <span className=" text-slate-700 text-lg font-medium">
                  {localStorage.getItem("user_type") === "Admin" &&
                    <span>
                      {CollegeData.college}
                    </span>}
                  {localStorage.getItem("user_type") === "employee" && (
                    <span>
                      {selectedEmployee?.[0]?.firstname} {selectedEmployee?.[0]?.lastname}
                    </span>
                  )}

                  {localStorage.getItem("user_type") === "student" &&
                    <span>
                      {StudentData?.[0]?.student_firstname} {StudentData?.[0]?.Student_lastname}
                    </span>}
                </span>
                <span className="text-gray-500 text-sm  -mt-1 ">
                  {localStorage.getItem("user_type").charAt(0).toUpperCase() +
                    localStorage.getItem("user_type").slice(1).toLowerCase()}
                </span>
              </div>
            </div>

            <button onClick={toggleMenu} className="flex items-center">
              <IoMdArrowDropdown />
            </button>

            {isOpen && (
              <div className="absolute top-14 right-0 md:right-10 xl:right-3 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 font-thin"
                    onClick={() => navigate("/login")}
                  >
                    <div className="flex items-center">
                      <CiUser />
                      <span className="ml-4 text-sm text-gray-800">
                        Profile
                      </span>
                    </div>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 font-thin">
                    <div className="flex items-center">
                      <CiInboxIn />
                      <span className="ml-4 text-sm text-gray-800">Inbox</span>
                    </div>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 font-thin">
                    <div className="flex items-center">
                      <GoLink />
                      <span className="ml-4 text-sm text-gray-800">
                        Conversation
                      </span>
                    </div>
                  </li>
                  {localStorage.getItem("token") && (
                    <li className="px-4 py-2 hover:bg-gray-100 font-thin border-t">
                      <div
                        className="flex items-center hover:cursor-pointer "
                        onClick={() => {
                          localStorage.clear();
                          navigate("/login") && window.location.reload();
                        }}
                      >
                        <CiLock />
                        <span className="ml-4 text-sm text-gray-800">
                          Log Out
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 pb-20 h-[80%] md:w-[100%] w-[150%] py-3 specific-scrollable-div overflow-y-auto ">
          <span className="ml-7 text-base text-slate-900">Main Menu</span>

          <div className="flex justify-between items-center md:mx-7 py-4 icon-purple">
            <div
              className="flex items-center hover:cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <GridViewRoundedIcon
                className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                  location.pathname === "/dashboard"
                    ? "text-[#7047ee]"
                    : "text-slate-700"
                } `}
              />
              <span
                className={` text-base ${
                  location.pathname === "/dashboard"
                    ? "text-[#7047ee]"
                    : "text-slate-500"
                } font-normal`}
              >
                Dashboard
              </span>
            </div>
          </div>

          {(localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "Admin") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer "
              onClick={toggleAcademicDropdown}
            >
              <div
                className={`flex items-center  ${
                  isAcademicOpen ? "text-[#7047ee]" : "text-slate-500"
                }`}
              >
                <AccountBoxIcon
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isAcademicOpen ? "text-[#7047ee]" : "text-slate-700"
                  } `}
                />
                <span className=" text-base font-normal ">Academic</span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isAcademicOpen ? "rotate-90" : ""
                  } transition-transform duration-300 ${
                    isAcademicOpen ? "text-[#7047ee]" : "text-slate-400"
                  } `}
                />
              </div>
            </div>
          )}
          {(localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "Admin") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isAcademicOpen ? "max-h-[50vh]" : "max-h-0"
              }`}
            >
              <div
                className={`dropdown-container ${
                  isAcademicOpen ? "dropdown-open" : "dropdown-closed"
                } mt-2 sm:mx-10 mx-3 space-y-2 md:w-[77.5%] w-[93.5%]`}
                style={dropdownStyles(isAcademicOpen)}
              >
                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-3 md:-mt-3 items-center ml-5 text-slate-500 hover-text hover:cursor-pointer "
                  onClick={() => toggleDropdown("Course")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isCourseOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isCourseOpen ? "text-[#7047ee]" : ""
                      }  ml-5`}
                    >
                      Courses & Batch
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isCourseOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500  `}
                    />
                  </span>
                </div>
                {isCourseOpen && (
                  <div className="pt-3 mx-6 space-y-2 w-full">
                    {CourseMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between md:-ml-3 text-sm md:text-sm -mt-2 md:-mt-4 items-center ml-1 text-slate-500 hover-text ${
                          isCourseOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  text-sm md:text-sm ml-5 md:ml-0 -mt-2 md:-mt-4 items-center  text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Subject")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isSubjectOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isSubjectOpen ? "text-[#7047ee]" : ""
                      } ml-5   `}
                    >
                      Subjects
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isSubjectOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isSubjectOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {SubjectsMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isSubjectOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-4 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("eleraning")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          iseLearningtOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        iseLearningtOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      E-Learning
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        iseLearningtOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {iseLearningtOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {ELearningMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          iseLearningtOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Lecture")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isLectureOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isLectureOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Lecture Plan
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isLectureOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isLectureOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {LectureMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isLectureOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("TimeTable")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isTimeTableOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isTimeTableOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Time Table
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isTimeTableOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isTimeTableOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {TimeTableMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isTimeTableOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Exam")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isExamsOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${isExamsOpen ? "text-[#7047ee]" : ""} ml-5`}
                    >
                      Exam
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isExamsOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isExamsOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {ExamsMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isExamsOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("OnlineExam")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isOnlineExamOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isOnlineExamOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Online Examination
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isOnlineExamOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isOnlineExamOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {OnlineExamMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isOnlineExamOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Assignment")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isAssignmentOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isAssignmentOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Assignment & Notes
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isAssignmentOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isAssignmentOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {AssignmentMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isAssignmentOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Certification")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isCertificationOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isCertificationOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Certification
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isCertificationOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isCertificationOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {CertficationMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isCertificationOpen && item.isActive
                            ? "icon-purple"
                            : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Placements")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isPlacementsOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isPlacementsOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Placements
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isPlacementsOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>
                {isPlacementsOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {PlacementsMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isPlacementsOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Promotion")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isPromotionOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isPromotionOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Promotion & Alumni
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isPromotionOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isPromotionOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {PromotionMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isPromotionOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Occurrence")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isOccuranceOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isOccuranceOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Occurance
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isOccuranceOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>

                {isOccuranceOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {OccuranceMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isOccuranceOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="flex justify-between  md:ml-0 text-sm md:text-sm -mt-2 md:-mt-2 items-center ml-5 text-slate-500 hover:cursor-pointer "
                  onClick={() => toggleDropdown("Circular")}
                >
                  <div className="flex items-center">
                    <span>
                      <AccountBoxIcon
                        className={`${
                          isCircularOpen ? "text-[#7047ee]" : ""
                        }  !w-4 !h-4 `}
                      />
                    </span>
                    <span
                      className={`${
                        isCircularOpen ? "text-[#7047ee]" : ""
                      } ml-5`}
                    >
                      Circular
                    </span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`transform ${
                        isCircularOpen ? "rotate-90" : ""
                      } transition-transform duration-300 text-slate-500 `}
                    />
                  </span>
                </div>
                {isCircularOpen && (
                  <div className="pt-2 mx-10 space-y-2 w-full">
                    {CircularMenuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between -ml-3 md:-ml-7 text-sm md:text-sm -mt-2 md:-mt-2 items-center  text-slate-500 hover-text ${
                          isCircularOpen && item.isActive ? "icon-purple" : ""
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer xl:text-[]"
                          role="button"
                          tabIndex="0"
                          onClick={() =>
                            (window.location.href = `/${item.name}`)
                          }
                        >
                          <span
                            className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`${
                              decodeURIComponent(location.pathname) ===
                              `/${item.name}`
                                ? "text-[#7047ee]"
                                : "text-slate-500"
                            } ml-3`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {(localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "Admin") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("student")}
            >
              <div className="flex items-center">
                <HiMiniUser
                  className={`mr-3 !text-sm md:ml-0 ml-7 h-6 w-6 ${
                    isStudentOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isStudentOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Students
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isStudentOpen
                      ? "rotate-90 text-[#7047ee]"
                      : "text-slate-500"
                  } transition-transform duration-300`}
                />
              </div>
            </div>
          )}

          {(localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "Admin") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isStudentOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {studentMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-3 items-center text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("employee")}
            >
              <div className="flex items-center">
                <HiMiniUser
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isEmployeeOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isEmployeeOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Employee Management
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isEmployeeOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isEmployeeOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {EmployeeMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between  md:ml-3 text-sm md:text-sm -mt-2 md:-mt-0  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("payroll")}
            >
              <div className="flex items-center">
                <MdAccountBox
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isPayrollOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isPayrollOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Payroll
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isPayrollOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isPayrollOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {PayrollMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("account")}
            >
              <div className="flex items-center">
                <IoTicketSharp
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isAccountOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isAccountOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Accounts
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isAccountOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isAccountOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {AccountMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("library")}
            >
              <div className="flex items-center">
                <SiMdbook
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isLibraryOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isLibraryOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Library
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isLibraryOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isLibraryOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {LibraryMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* <div
            className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
            onClick={() => toggleDropdown("department")}
          >
            <div className="flex items-center">
              <IoTicketSharp
                className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                  isDepartmentOpen ? "text-[#7047ee]" : "text-slate-700"
                }`}
              />
              <span
                className={`text-base ${
                  isDepartmentOpen ? "text-[#7047ee]" : "text-slate-500"
                } font-normal`}
              >
                Departments
              </span>
            </div>
            <div>
              <MdKeyboardArrowRight
                className={`transform ${
                  isDepartmentOpen
                    ? "rotate-90 text-[#7047ee] "
                    : "text-slate-500"
                }  transition-transform duration-300`}
              />
            </div>
          </div>
          <div
            className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
              isDepartmentOpen ? "max-h-[40vh]" : "max-h-0"
            }`}
          >
            <div className="mt-2 mx-10 space-y-2">
              {DepartmentMenuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                    item.isActive ? "icon-purple" : ""
                  }`}
                >
                  <div
                    className="flex items-center cursor-pointer xl:text-[]"
                    role="button"
                    tabIndex="0"
                    onClick={() => (window.location.href = `/${item.name}`)}
                  >
                    <span
                      className={`${
                        location.pathname === `/${item.name}`
                          ? "text-[#7047ee]"
                          : ""
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`${
                        location.pathname === `/${item.name}`
                          ? "text-[#7047ee]"
                          : ""
                      } ml-3 `}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "student") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("leave")}
            >
              <div className="flex items-center">
                <IoTicketSharp
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isLeaveOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isLeaveOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Leave Management
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isLeaveOpen ? "rotate-90 text-[#7047ee] " : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "student") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isLeaveOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {LeaveMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } whitespace-nowrap`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 whitespace-nowrap `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employee Attendance */}

          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("employeeAttendance")}
            >
              <div className="flex items-center">
                <HiMiniUser
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isEmployeeAttendanceOpen
                      ? "text-[#7047ee]"
                      : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isEmployeeAttendanceOpen
                      ? "text-[#7047ee]"
                      : "text-slate-500"
                  } font-normal`}
                >
                  Employee Attendance
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isEmployeeAttendanceOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isEmployeeAttendanceOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {EmployeeAttendanceMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between  md:ml-3 text-sm md:text-sm -mt-2 md:-mt-0  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "student") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("attendance")}
            >
              <div className="flex items-center">
                <IoTicketSharp
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isAttendanceOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isAttendanceOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Student Attendance
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isAttendanceOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {(localStorage.getItem("user_type") === "Admin" ||
            localStorage.getItem("user_type") === "employee" ||
            localStorage.getItem("user_type") === "student") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isAttendanceOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {AttendanceMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("transport")}
            >
              <div className="flex items-center">
                <FaCarAlt
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isTransportOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isTransportOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Transport
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isTransportOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isTransportOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {TransportMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer "
              onClick={() => toggleDropdown("hostel")}
            >
              <div className="flex items-center">
                <FaHome
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isHostelOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isHostelOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Hostel
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isHostelOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isHostelOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {HostelMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("Event")}
            >
              <div className="flex items-center">
                <FaStar
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isEventOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isEventOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Event
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isTransportOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isEventOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {EventMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          location.pathname === `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        } ml-3 `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("Notification")}
            >
              <div className="flex items-center ">
                <IoTicketSharp
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isNotificationOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isNotificationOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  Notification
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isNotificationOpen
                      ? "rotate-90 text-[#7047ee] "
                      : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {localStorage.getItem("user_type") === "Admin" && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isNotificationOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {NotificationMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : "text-slate-500"
                        } ml-3`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(localStorage.getItem("user_type") === "Admin") || (localStorage.getItem("user_type") === "Super Admin") && (
            <div
              className="flex justify-between items-center md:mx-7 hover:cursor-pointer"
              onClick={() => toggleDropdown("About")}
            >
              <div className="flex items-center ">
                <IoTicketSharp
                  className={`mr-3 md:ml-0 ml-7 h-6 w-6 ${
                    isAboutOpen ? "text-[#7047ee]" : "text-slate-700"
                  }`}
                />
                <span
                  className={`text-base ${
                    isAboutOpen ? "text-[#7047ee]" : "text-slate-500"
                  } font-normal`}
                >
                  About
                </span>
              </div>
              <div>
                <MdKeyboardArrowRight
                  className={`transform ${
                    isAboutOpen ? "rotate-90 text-[#7047ee] " : "text-slate-500"
                  }  transition-transform duration-300`}
                />
              </div>
            </div>
          )}
          {(localStorage.getItem("user_type") === "Admin") || (localStorage.getItem("user_type") === "Super Admin") && (
            <div
              className={`transition-[max-height] duration-400 ease-in-out overflow-hidden ${
                isAboutOpen ? "max-h-[40vh]" : "max-h-0"
              }`}
            >
              <div className="mt-2 mx-10 space-y-2">
                {AboutMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between md:ml-3 text-sm md:text-sm -mt-2 md:-mt-1  items-center  text-slate-500 hover-text ${
                      item.isActive ? "icon-purple" : ""
                    }`}
                  >
                    <div
                      className="flex items-center cursor-pointer xl:text-[]"
                      role="button"
                      tabIndex="0"
                      onClick={() => (window.location.href = `/${item.name}`)}
                    >
                      <span
                        className={`
                        ${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`${
                          decodeURIComponent(location.pathname) ===
                          `/${item.name}`
                            ? "text-[#7047ee]"
                            : "text-slate-500"
                        } ml-3`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative pt-20 ">
            <div className="flex flex-col items-center justify-center bg-slate-100 mx-5 rounded-lg h-32">
              <span className="block text-center mt-5 text-xl font-medium icon-purple">
                View Full Report
              </span>
              <span className="flex items-center icon-purple">
                Best CRM App here <TiArrowRightThick className="ml-2 h-5 w-5" />
              </span>
            </div>
            <div className="absolute top-0">
              <img
                src={crmi}
                alt="Not Found"
                className="w-[80%] h-auto mx-auto"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-slate-800">CRMi Dashboard</span>
            <span className="text-slate-700">© 2024 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Side;
