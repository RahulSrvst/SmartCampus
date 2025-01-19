import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";

const LeaveData = () => {
  const [data, setData] = useState();

  const {state} = useLocation();
  

  console.log(state);

  const FetchLeaveRequest = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(baseURL + API_URLS.leaveRequestApi, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          leave_id: state.id,
        },
      });
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchLeaveRequest();
  }, []);

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[15%] mt-[34%]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Leave</span>
        <span className="text-blue-900">/</span>
        <span className="">Leave Request Details</span>
      </div>

      <div className="bg-white shadow-md rounded-lg w-[98%] ">
        <h2 className="text-lg font-normal text-gray-800 mb-4 px-5 py-3 border-b">
          Leave Request Details 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 px-6 pb-6">
         {state.usertype === "" && 
         <div>
         <div className="flex items-center">
            <span className="font-bold w-1/3">Student Name :</span>
            <span>{data?.student_name}{" "} {data?.last_name}</span>
          </div>
         </div>
         }{state.usertype === "" && 
         <div>
         <div className="flex items-center">
            <span className="font-bold w-1/3">Course :</span>
            <span>{data?.course_name}</span>
          </div>
         </div>
         }{state.usertype === "" && 
         <div>
         <div className="flex items-center">
            <span className="font-bold w-1/3">Batch :</span>
            <span>{data?.batch_name}</span>
          </div>
         </div>
         }
         
         {state.usertype === "class teacher" || state.usertype === "HOD" && 
         <div>
         <div className="flex items-center">
            <span className="font-bold w-1/3">Employee Name :</span>
            <span>{data?.employee_name}{" "}{data?.lastname}</span>
          </div>
         </div>
         }{state.usertype === "class teacher" || state.usertype === "HOD" && 
         <div>
         <div className="flex items-center">
            <span className="font-bold w-1/3">Designation Name :</span>
            <span>{data?.designation_name}</span>
          </div>
         </div>
         }
          <div className="flex items-center">
            <span className="font-bold w-1/3">Leave Type:</span>
            <span>{data?.leave_type}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">From Date:</span>
            <span>{data?.fromdate}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">To Date:</span>
            <span>{data?.enddate}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Apply Date:</span>
            <span>{data?.apllydate}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-1/3">Status:</span>
            <span>{data?.status}</span>
          </div>
        </div>
      </div>
      
      
      <div className="bg-white shadow-md rounded-lg p-6 w-[98%] mt-6 ">
      <h2 className="text-lg font-normal text-gray-800 mb-4 px-5 py-3 border-b">
          Attached Document
        </h2>
        <img src={`${baseURL}${data?.attach_document}`} className="w-[40vw] h-[50vh]" />
      </div>
    </div>
  );
};

export default LeaveData;
