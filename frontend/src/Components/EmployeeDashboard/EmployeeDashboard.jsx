import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import PerformanceWidget from "./PerformanceWidget";
import AttendanceWidget from "./AttendanceWidget";
import CoursesWidget from "./CoursesWidget";
import TimeTableWidget from "./TimeTableWidgets";
import LectureScheduleWidget from "./LectureWidget";
import Announcement from "./AnnouncementsWidgets";
import GoodMorning from "./GoodMorning";
import SyllabusChart from "./Syllabus";
import UpcomingEvents from "../UpCommingEvents";
import LeaveStatus from "./LeaveStatus";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import axios from "axios";

const EmployeeDashboard = () => {
  const [selectedEmployee , setSelectedEmployee]  = useState([]);

  const fetchEmployeeData = async() =>{
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
  }
  

  useEffect(() => {
    if (localStorage.getItem("user_type") === "employee") {
      fetchEmployeeData();
    }
  }, [localStorage.getItem("user_type") === "employee"]);


  const coursesData = [
    { name: "BTech ", Time: "11:20 PM" },
    { name: "BSC", Time: "11:20 PM" },
    { name: "MSC", Time: "11:20 PM" },
    { name: "BTech ", Time: "11:20 PM" },
    { name: "BSC", Time: "11:20 PM" },
    { name: "MSC", Time: "11:20 PM" },
  ];

  const timetableData = [
    {
      time: "09:00 AM - 10:00 AM",
      activity: "Team Meeting",
      location: "Conference Room A",
    },
    {
      time: "10:30 AM - 12:00 PM",
      activity: "Client Presentation",
      location: "Zoom",
    },
    {
      time: "01:00 PM - 02:00 PM",
      activity: "Lunch Break",
      location: "Cafeteria",
    },
    { time: "02:30 PM - 04:00 PM", activity: "Project Work", location: "Desk" },
    {
      time: "04:30 PM - 05:30 PM",
      activity: "Training Session",
      location: "Training Room",
    },
  ];

  const lecturesData = [
    {
      name: "Mathematics - Algebra",
      time: "09:00 AM - 10:00 AM",
      teacher: "Mr. John Smith",
    },
    {
      name: "Physics - Mechanics",
      time: "10:15 AM - 11:15 AM",
      teacher: "Dr. Jane Doe",
    },
    {
      name: "Chemistry - Organic",
      time: "11:30 AM - 12:30 PM",
      teacher: "Ms. Clara Brown",
    },
    {
      name: "History - World Wars",
      time: "01:30 PM - 02:30 PM",
      teacher: "Mr. Henry Adams",
    },
    {
      name: "English Literature",
      time: "02:45 PM - 03:45 PM",
      teacher: "Mrs. Susan White",
    },
  ];

  const performanceData = {
    completedTasks: 45,
    rating: 4.8,
    goalsAchieved: 80,
  };

  const announcementsData = [
    {
      title: "Holiday Update",
      description: "Office will remain closed on Dec 25.",
      date: "Dec 5, 2024",
    },
    {
      title: "New Policy",
      description: "Work-from-home policy has been updated.",
      date: "Dec 1, 2024",
    },
    {
      title: "Team Meeting",
      description: "All employees must attend the meeting on Dec 10.",
      date: "Nov 30, 2024",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full  mb-4">
      <GoodMorning selectedEmployee={selectedEmployee}  />
      </div>

      <div className=" flex  w-[100%] gap-4 " >
      <div className="flex flex-col w-[66.5%] " >
      <div className="flex items-center space-x-4" >
      <div className="w-[600px]">
        <ProfileCard selectedEmployee={selectedEmployee}  />
      </div>
      <div className="w-[500px] h-[140px] ">
      <SyllabusChart/>
      </div>
      </div>
      <div className="my-3  w-[100%]">
        <CoursesWidget courses={coursesData} />
      </div>
      </div>

      <div className="w-[35%]" >
        <UpcomingEvents/>
      </div>
      </div>
      
      

      <div className=" flex items-center mt-2 gap-4 w-[100%]"  >
      <div className="w-[35%]" >
        <AttendanceWidget/>
      </div>
      <div className="w-[65%]">
          <TimeTableWidget timetable={timetableData} />
        </div>
      </div>
      


      <div className=" flex items-center w-[100%] gap-4 mt-4" >
      <div className="w-[65%]">
          <LectureScheduleWidget lectures={lecturesData} />
        </div>
      <div className="w-[35%]" >
        <LeaveStatus/>
      </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
