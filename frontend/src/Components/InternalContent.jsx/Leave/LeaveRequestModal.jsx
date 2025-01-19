import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { Autocomplete, TextField } from "@mui/material";
import toast from "react-hot-toast";

const LeaveRequestModal = ({ handleCloseModal }) => {
  const [see, setSee] = useState(() => {
    const userType = localStorage.getItem("user_type");
    if (userType === "Admin") {
      return "Student Request";
    } else if (userType === "employee") {
      return "Employee Request";
    } else if (userType === "student") {
      return "Student Request";
    } else {
      return ""; 
    }
  });
  
  const [courseData, setCourseData] = useState();
  const [leavetype, setLeaveType] = useState();
  const [BatchData, setBatchData] = useState();
  const [BatchId, setBatchId] = useState();
  const [id, setId] = useState();
  const [studentname, setStudentName] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [employeename, setEmployeeName] = useState([]);


  const initialValues = {
    student: localStorage.getItem("user_type") === "Admin" ? "" :localStorage.getItem("student_id") || "",
    employee: localStorage.getItem("user_type") === "Admin" ? "" :localStorage.getItem("employee_id") || ""  ,
    leavetype: "",
    apllydate: "",
    fromdate: "",
    enddate: "",
    reason: "",
    attach_document: null,
  };

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.teacherAllocation, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setCourseData(response.data.course);
    } catch (e) {
      console.log(e);
    }
  };
  
  
 

  const fetchLeaveType = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.leavetypeapi, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setLeaveType(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseURL}get-teacher-allocation-field/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            course_id: id,
          },
        }
      );

      console.log(response.data);
      setBatchData(response.data.batch);
    } catch (e) {
      console.error("Error fetching batch data: ", e);
    }
  };

  useEffect(() => {
    fetchDatas();
    fetchLeaveType();
  }, []);

  useEffect(() => {
    if (id) {
      fetchBatchDatas(id);
    }
  }, [id]);

  function handleBatchId(id) {
    setBatchId(id);
  }
  function handleId(id) {
    setId(id);
  }

  const fetchStundentDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          batch_id: BatchId,
        },
      });

      console.log(response.data);
      setStudentName(response.data.data);
    } catch (e) {
      console.error("Error fetching batch data: ", e);
    }
  };

  useEffect(() => {
    fetchStundentDatas();
  }, [BatchId]);

  const { handleChange, setFieldValue, handleSubmit, values, resetForm } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value);
        }
        try {
          const response = await axios.post(
            baseURL + API_URLS.leaveRequestApi,
            formData,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(response);
          if (response.status === 200) {
            if (response.data.data) {
              toast.success(response.data.message);
              resetForm();
              handleCloseModal();
            }else{
                toast.error(response.data.message.attach_document)
            }
          }else{
            toast.error(response.data.detail || 'Unexpected error occurred');
          }
        } catch (e) {
          console.log(e);
        }
      },
    });

  const handleFileChange = (event) => {
    const { name, files } = event.target; 
    if (files.length > 0) {
      const selectedFile = files[0]; 
      setFieldValue(name, selectedFile); 
    }
  };

  const [designationID, setDesignationID] = useState(null);

  const fetchDesignation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.designation, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 200) {
        setDesignation(response.data.data);
      }
    } catch (e) {
      console.error("Error fetching designations:", e);
    }
  };

  const fetchEmployeeName = async () => {
    if (designationID) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(baseURL + API_URLS.printList, {
          headers: {
            Authorization: `Token ${token}`,
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
        console.error("Error fetching employees:", e);
      }
    }
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  useEffect(() => {
    if (designationID) {
      fetchEmployeeName();
    }
  }, [designationID]);

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
        <div className="bg-white  shadow-lg xl:-mt-28 w-11/12 md:w-2/3 lg:w-1/2  relative">
          {/* Modal Header */}
          <div className="flex border-b pr-6 justify-between items-center mb-4">
            <div className="flex w-[60%] space-x-3 text-sm">
              {(localStorage.getItem("user_type") ==="Admin" || localStorage.getItem("user_type") ==="student") && 
              <button
                onClick={() => setSee("Student Request")}
                className={`${
                  see === "Student Request"
                    ? " bg-[#7047ee] text-white "
                    : "text-gray-600"
                } w-[100%] h-10`}
              >
                Student Request
              </button>}
              {(localStorage.getItem("user_type") ==="Admin" || localStorage.getItem("user_type") ==="employee") && <button
                onClick={() => setSee("Employee Request")}
                className={`${
                  see === "Employee Request"
                    ? " bg-[#7047ee] text-white "
                    : "text-gray-600"
                } w-[100%] h-10`}
              >
                Employee Request
              </button>}
            </div>
            <button
              onClick={handleCloseModal}
              className="text-gray-600 hover:text-gray-800 border px-2 border-red-500  rounded-full"
            >
              <span className="text-red-500">✖</span>
            </button>
          </div>

          {see === "Student Request" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-sm text-gray-700 px-6 pb-6"
            >
             
              {localStorage.getItem("user_type") ==="Admin" &&
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              <div>
                  <label className="block">Course</label>
                  <select
                    className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                    name="course"
                    onChange={(e) => {
                      const selectedCourseId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-id"
                        );
                      handleId(selectedCourseId);
                      setFieldValue("course", selectedCourseId);
                    }}
                  >
                    <option value="">Please Select</option>
                    {courseData?.map((item) => (
                      <option
                        key={item.id}
                        value={item.course_name}
                        data-id={item.id}
                      >
                        {item.course_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block">Batch</label>
                  <select
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    name="batch"
                    onChange={(e) => {
                      const selectedBatchId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-id"
                        );
                      setFieldValue("batch", selectedBatchId);
                      handleBatchId(selectedBatchId);
                    }}
                  >
                    <option value="">Please Select</option>
                    {Array.isArray(BatchData) && BatchData.length > 0 ? (
                      BatchData.map((item) => (
                        <option
                          key={item.id}
                          value={item.batch_name}
                          data-id={item.id}
                        >
                          {item.batch_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Batches Available</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Student</label>
                  {/* <select className="w-full border rounded px-3 py-2">
                    <option value="">Select</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                  </select> */}

                  <Autocomplete
                    options={studentname}
                    className="w-full !focus:outline-none !border-none"
                    getOptionLabel={(option) =>
                      `${option.student_firstname} ${option.Student_lastname}`
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" />
                    )}
                    onChange={(event, value) => {
                      if (value) {
                        setFieldValue("student", value.id);
                      } else {
                        setFieldValue("student", null);
                      }
                    }}
                  />
                </div>
                </div>}
                
                
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                <div>
                  <label className="block text-sm font-medium">From Date</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                    value={values.fromdate}
                    name="fromdate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">To Date</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                    value={values.enddate}
                    name="enddate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Apply Date
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                    value={values.apllydate}
                    name="apllydate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Leave Type
                  </label>
                  <select
                    className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                    name="leavetype"
                    onChange={(e) => {
                      const selectedleavetypeId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-id"
                        );
                      setFieldValue("leavetype", selectedleavetypeId);
                    }}
                  >
                    <option value="">Please Select</option>
                    {leavetype?.map((item) => (
                      <option
                        key={item.id}
                        value={item.leave_type}
                        data-id={item.id}
                      >
                        {item.leave_type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              


              <div>
                <label className="block text-sm font-medium">Reason</label>
                <textarea
                  rows="3"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter reason"
                  onChange={handleChange}
                  value={values.reason}
                  name="reason"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="attach_document"
                  className="block text-sm font-medium"
                >
                  Attach Document
                </label>
                <input
                  type="file"
                  className="w-full border rounded px-3 py-2"
                  onChange={handleFileChange}
                  id="attach_document"
                  name="attach_document"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {see === "Employee Request" && (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700 px-6 pb-6">
              {localStorage.getItem("user_type") === "Admin" && 
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Designation
                  </label>
                  <select
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    onChange={(e) => {
                      const selectedId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-id"
                        );
                      setDesignationID(selectedId);
                      setEmployeeName([]); 
                    }}
                  >
                    <option value="">Please Select Designation</option>
                    {designation.map((item) => (
                      <option key={item.id} data-id={item.id}>
                        {item.designation_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Employee Name
                  </label>

                  <Autocomplete
                    options={employeename}
                    className="w-full !focus:outline-none !border-none"
                    getOptionLabel={(option) =>
                      `${option.firstname} ${option.lastname}`
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" />
                    )}
                    onChange={(event, value) => {
                      if (value) {
                        setFieldValue("employee", value.id);
                      } else {
                        setFieldValue("employee", null);
                      }
                    }}
                  />
                </div>
              </div>}
              <div className="grid grid-cols-1 md:grid-cols-3  gap-4 ">
                
                <div>
                  <label className="block text-sm font-medium">From Date</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                    value={values.fromdate}
                    name="fromdate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">To Date</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                    value={values.enddate}
                    name="enddate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Apply Date
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                    value={values.apllydate}
                    name="apllydate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Leave Type
                  </label>
                  <select
                    className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                    name="leavetype"
                    onChange={(e) => {
                      const selectedleavetypeId =
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-id"
                        );
                      setFieldValue("leavetype", selectedleavetypeId);
                    }}
                  >
                    <option value="">Please Select</option>
                    {leavetype?.map((item) => (
                      <option
                        key={item.id}
                        value={item.leave_type}
                        data-id={item.id}
                      >
                        {item.leave_type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Reason</label>
                <textarea
                  rows="3"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter reason"
                  onChange={handleChange}
                  value={values.reason}
                  name="reason"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="attach_document"
                  className="block text-sm font-medium"
                >
                  Attach Document
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded px-3 py-2"
                  id="attach_document"
                  name="attach_document"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
