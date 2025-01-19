import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import Classes from "./Classes";
import Attendance from "./AttendanceChart";
import Exams from "./Exam";
import PerformanceGraph from "./PerformanceGraph";
import HomeWorks from "./HomeWork";
import Schedule from "./Schedule";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import axios from "axios";

const App = () => {


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


  return (
    <div className=" pb-10 " >
      <div className="w-[98%] ">


      <div className="flex space-x-5 pb-3 " >
        <div className="flex flex-col gap-3 w-[30%]" > 
        <div className="">
          <ProfileCard StudentData={StudentData} />
        </div>
        <div className="">
          <Classes />
        </div>
        <div className="">
          <Exams />
        </div>
        </div>
        <div className="w-[35%]">
          <Attendance />
        </div>
        <div className="-ml-1 w-[35%]">
          <Schedule />
        </div>
        </div>
        
        
        
      </div>

      <div className="flex space-x-5 w-[98%]">
        <div className="w-[65%]">
          <PerformanceGraph />
        </div>
        <div className="w-[35%]">
          <HomeWorks />
        </div>
      </div>
    </div>
  );
};

export default App;
