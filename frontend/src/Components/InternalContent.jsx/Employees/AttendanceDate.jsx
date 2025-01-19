import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import toast from "react-hot-toast";
import { Autocomplete, TextField } from "@mui/material";

const AttendanceDate = () => {
  const [designation, setDesignation] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [designationID, setDesignationID] = useState(null);
  const [employeeID, setEmployeeID] = useState(null);
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [date, setDate] = useState("");

  const fetchDesignation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.designation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setDesignation(response.data.data);
      }
    } catch (e) {
      console.error("Error fetching designations:", e);
    }
  };

  const fetchEmployeeName = async () => {
    if (!designationID) return;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.addEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          designation_id: designationID,
        },
      });
      if (response.status === 200) {
        console.log(response);
        setEmployeeName(response.data.data || []);
        fetchAttendanceData({ designation_id: designationID });
      }
    } catch (e) {
      console.error("Error fetching employees:", e);
    }
  };

  

  
  const fetchAttendanceData = async (params) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.EmployeeAttendance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      if (response.status === 200) {
        setEmployeeAttendance(response.data.data || []);
        toast.success(response.data.message)
      }else{
        console.log(response)
        toast.error(response?.data?.message);
      }
    } catch (e) {
      console.error("Error fetching attendance data:", e);
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  useEffect(() => {
    fetchEmployeeName();
  }, [designationID]);

  useEffect(() => {
    if (employeeID) {
      fetchAttendanceData({ employee_id: employeeID });
    }
  }, [employeeID]);


  useEffect(()=>{
    if(localStorage.getItem("employee_id")){
      fetchAttendanceData({employee_id: localStorage.getItem("employee_id")})
    }
  },[localStorage.getItem("employee_id")])
  
  useEffect(() => {
    if (date) {
      fetchAttendanceData({ attendance: date });
    }
  }, [date]);

  console.log(date);

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[10%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-4">
        Attendance <FaHome className="text-[#192b4c] w-4 h-4" /> - Employee
        Attendance
      </div>
      <div className="bg-white shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4">
        <h2 className="text-lg font-normal mb-4 border-b p-4">
          Employee Attendance
        </h2>
        <div className="text-sm text-gray-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {localStorage.getItem("user_type") === "Admin" && <div>
              <label className="block mb-2">Designation</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setDesignationID(selectedId);
                  setEmployeeName([]);
                  setEmployeeID(null);
                }}
              >
                <option value="">Please Select Designation</option>
                {designation.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.designation_name}
                  </option>
                ))}
              </select>
            </div>}

            {localStorage.getItem("user_type") === "Admin" && <div>
              <label className="block mb-2">
                Employee Name<span className="text-red-500">*</span>
              </label>
              <Autocomplete
                options={employeeName}
                getOptionLabel={(option) =>
                  `${option.firstname} ${option.lastname}`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(event, value) => {
                  setEmployeeID(value?._id || null);
                  setEmployeeAttendance([]);
                }}
              />
            </div>}

            <div>
              <label className="block mb-2">Attendance Date</label>
              <input
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <h3 className="text-lg font-normal mb-4 px-4 border-b pb-3">
          Employee Attendance Data
        </h3>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-separate border-gray-300">
            <thead>
              <tr>
                {[
                  "#",
                  "Name",
                  "Designation",
                  "Attendance Date",
                  "Status",
                  "Note",
                ].map((header) => (
                  <th
                    key={header}
                    className="border p-2 text-left text-sm font-medium text-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeAttendance?.map((attendance, index) => (
                <tr key={attendance.id} className="text-sm text-gray-700">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{attendance?.employee?.firstname}{" "}{attendance?.employee?.lastname}</td>
                  <td className="border p-2">
                    <div className="text-white bg-red-500 w-24 text-center rounded-lg py-1">
                      {attendance?.designation?.designation_name}
                    </div>
                  </td>
                  <td className="border p-2">{attendance.attendance}</td>
                  <td className="border p-2">
                    <div
                      className={` 
                    ${
                      attendance.status === "Present" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-green-500"
                    } 
                    ${
                      attendance.status === "Absent" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-red-500"
                    }  
                    ${
                      attendance.status === "Half Day" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-sky-300"
                    }   
                    ${
                      attendance.status === "Leave" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-yellow-400"
                    }`}
                    >
                      {attendance.status}
                    </div>
                  </td>
                  <td className="border p-2">
                    {attendance.note ? attendance.note : "N/A"}
                  </td>
                </tr>
              ))}
              {employeeAttendance.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDate;
