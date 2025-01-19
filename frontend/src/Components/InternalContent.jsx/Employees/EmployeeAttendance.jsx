import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import toast from "react-hot-toast";

const EmployeeAttendance = () => {
  const [designation, setDesignation] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [designationID, setDesignationID] = useState(null);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
      console.log(e);
    }
  };

  const fetchEmployeeName = async () => {
    if (localStorage.getItem("user_type") === "Admin") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(baseURL + API_URLS.addEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            designation_id: designationID,
          },
        });
        if (response.status === 200) {
          setEmployeeName(response.data.data || []); 
        } else {
          console.log("Error fetching employees");
        }
      } catch (e) {
        console.error("Error:", e);
      }
    } else if (localStorage.getItem("user_type") === "employee") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(baseURL + API_URLS.addEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
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
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  useEffect(() => {
    if (designationID) fetchEmployeeName();
  }, [designationID]);

  useEffect(() => {
    if (localStorage.getItem("user_type") === "employee") {
      fetchEmployeeName();
    }
  }, [localStorage.getItem("user_type") === "employee"]);

  const { setFieldValue, handleSubmit ,resetForm ,handleChange} = useFormik({
    initialValues : {
      employee: localStorage.getItem("user_type") === "Admin" ? "" : localStorage.getItem("employee_id"),
      status: "",
      attendance: "",
      note: "",
    },
    onSubmit: (values) => {
      console.log("Submitting values:", values);

      const token = localStorage.getItem("token");
      try {
        axios
          .post(baseURL + API_URLS.EmployeeAttendance, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const Data = response.data.data;
            console.log(Data);
            if (Data) {
              console.log("Attendance submitted:", response.data);
              toast.success(response.data.message);
              if(localStorage.getItem("user_type")==="Admin"){
                setSelectedEmployee();
              }else if(localStorage.getItem("user_type")==="Admin"){
                resetForm();
              }
            } else {
                const errorMessage = response.data.message?.non_field_errors[0];
              toast.error(errorMessage);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
  });

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
          {localStorage.getItem("user_type") === "Admin" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Designation Dropdown */}
              <div>
                <label className="block mb-2">Designation</label>
                <select
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  onChange={(e) => {
                    const selectedId =
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "data-id"
                      );
                    setFieldValue("designation", selectedId);
                    setDesignationID(selectedId);
                    setEmployeeName([]); // Clear employee names when designation changes
                    setSelectedEmployee(null); // Clear the selected employee
                  }}
                >
                  <option value="">Please Select Designation</option>
                  {designation.map((item) => (
                    <option key={item._id} data-id={item._id}>
                      {item.designation_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee Name AutoComplete */}
              <div>
                <label className="block mb-2">Employee Name</label>
                <Autocomplete
                  options={employeeName}
                  getOptionLabel={(option) =>
                    `${option.firstname} ${option.lastname}`
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" size="small" />
                  )}
                  onChange={(event, value) => {
                    setFieldValue("employee", value?._id || "");
                    setSelectedEmployee(value);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {localStorage.getItem("user_type") === "Admin" && (
          <h3 className="text-lg font-normal mb-4 px-4 border-b pb-3">
            Selected Employee Details
          </h3>
        )}
        <form className="text-sm text-gray-800 p-4" onSubmit={handleSubmit}>
          {selectedEmployee ? (
            <div className="overflow-x-auto p-4">
              <div className="flex justify-between items-center ">
                <div>
                  <label className="block mb-2">
                    Attendance Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      setFieldValue("attendance", e.target.value)
                    }
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#192b4c] text-white text-base rounded-lg"
                  >
                    Save Attendance
                  </button>
                </div>
              </div>
              <table className="min-w-full bg-white border border-separate border-gray-300">
                <thead>
                  <tr>
                    {[
                      "#",
                      "Name",
                      "Employee Code",
                      "Designation",
                      "Attendance",
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
                  <tr className="text-sm text-gray-700">
                    <td className="border p-2">1</td>
                    <td className="border p-2">
                            {selectedEmployee.firstname}{" "}
                            {selectedEmployee.lastname}
                    </td>
                    <td className="border p-2">
                      {selectedEmployee.employeecode}
                    </td>
                    <td className="border p-2">
                      {selectedEmployee?.designation?.designation_name}
                    </td>
                    <td className="border p-2">
                      <div className="flex flex-col">
                        {["Present", "Half Day", "Leave", "Absent"].map(
                          (status, index) => (
                            <label
                              key={status}
                              className={`flex  items-center `}
                            >
                              <input
                                type="radio"
                                name="attendanceStatus"
                                value={status}
                                className="mr-1"
                                onChange={() => setFieldValue("status", status)} 
                              />
                              {status}
                            </label>
                          )
                        )}
                      </div>
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        className="w-full p-1 border border-gray-300 rounded"
                        placeholder="Note"
                        name="note"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No employee selected.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
