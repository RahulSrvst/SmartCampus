import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { API_URLS } from "../../Configs/urls";
import { baseURL } from "../../Configs/axios";
import { useFormik } from "formik";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import toast from "react-hot-toast";

const Attendance = () => {
  // State for switching between tabs
  const [activeTab, setActiveTab] = useState("view");
  const [courseData, setCourseData] = useState();
  const [leavetype, setStundentAttendance] = useState();
  const [BatchData, setBatchData] = useState();
  const [BatchId, setBatchId] = useState(null);
  const [id, setId] = useState();
  const [studentname, setStudentName] = useState([]);
  const [Specificstudentname, setSpecificStudentName] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [studentId, setStudentId] = useState(null);

  const initialValues = {
    student: "",
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

  const fetchStudentAttendance = async (year, month, studentId, BatchId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.attendance, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          student_id: studentId,
          month: month,
          year: year,
          batch_id: BatchId,
        },
      });
      setStundentAttendance(response.data.data);
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

  const fetchSpecificStudentDatas = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          student_id: studentId,
        },
      });

      console.log(response.data);
      setSpecificStudentName(response.data.data);
    } catch (e) {
      console.error("Error fetching batch data: ", e);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchSpecificStudentDatas();
    }
  }, [studentId]);

  useEffect(() => {
    fetchDatas();
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

  const fetchStundentDatas = async () => {
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
    if (BatchId) {
      fetchStundentDatas();
    }
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
            } else {
              toast.error(response.data.message.attach_document);
            }
          } else {
            toast.error(response.data.detail || "Unexpected error occurred");
          }
        } catch (e) {
          console.log(e);
        }
      },
    });

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const [year, month] = selectedDate.split("-");
      setMonth(month);
      setYear(year);
      if (studentId || BatchId) {
        fetchStudentAttendance(year, month, studentId, BatchId);
      }
    }
  }, [selectedDate, studentId]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);

    const [year, month] = newDate.split("-");
    fetchStudentAttendance(year, month, studentId, BatchId);
  };

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "view":
        return (
          <div>
            <div className="bg-white shadow rounded-lg ">
              <h2 className="text-lg border-b pb-3 font-normal mb-4 p-4">
                Staff
              </h2>
              <form className="filters mb-4  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center text-sm text-gray-700 p-4">
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
                <div className="-mt-4">
                  <label className="block text-sm font-medium">Student</label>

                  <Autocomplete
                    options={studentname  || []}
                    className="w-full !focus:outline-none !border-none"
                    getOptionLabel={(option) =>
                      `${option.student_firstname} ${option.Student_lastname}`
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" />
                    )}
                    onChange={(event, value) => {
                      if (value) {
                        setStudentId(value.id);
                      } else {
                        setStudentId(null);
                      }
                    }}
                  />
                </div>

                <div className="">
                  <label>Date</label>
                  <input
                    type="month"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
                {/* <div className="mt-5">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    
                  </button>
                </div> */}
              </form>
              {/* Table for Absentees Report */}
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              {/* Table for View Attendance */}
              <div className="w-full overflow-x-auto py-10">
                <table className="min-w-[1600px] border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border whitespace-nowrap px-4 py-2 text-sm">
                        Student Name
                      </th>
                      {[...Array(31)].map((_, i) => (
                        <th key={i + 1} className="border px-2 py-1 w-20">
                          {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody  >
                    { (studentId ? Specificstudentname : studentname).length > 0 ? ( (studentId ? Specificstudentname : studentname)?.map(
                      (student) => (
                        <tr key={student.id}>
                          <td className="border px-4 py-2 whitespace-nowrap text-sm">
                            {student.student_firstname}{" "}
                            {student.Student_lastname}
                          </td>
                          {[...Array(31)].map((_, i) => {
                            const date = `${year}-${month.padStart(2, "0")}-${(
                              i + 1
                            )
                              .toString()
                              .padStart(2, "0")}`;

                            const getAttendanceStatus = (studentId, date) => {
                              const record = leavetype?.find(
                                (item) =>
                                  item.student === studentId &&
                                  item.attendance === date
                              );
                              return record ? record.status : "--"; 
                            };

                            const status = getAttendanceStatus(
                              student.id,
                              date
                            );

                            let bgColor = "";
                            let statusText = "";

                            switch (status) {
                              case "Present":
                                bgColor = "bg-green-400";
                                statusText = "P";
                                break;
                              case "Absent":
                                bgColor = "bg-red-400";
                                statusText = "A";
                                break;
                              case "Late":
                                bgColor = "bg-yellow-400";
                                statusText = "L";
                                break;
                              case "Half day":
                                bgColor = "bg-blue-400";
                                statusText = "H";
                                break;
                              case "--":
                                bgColor = "bg-gray-100";
                                statusText = "--";
                                break;
                              default:
                                bgColor = "bg-gray-100";
                                statusText = "--";
                            }

                            return (
                              <td
                                key={i + 1}
                                className={`border px-2 py-3 text-center ${bgColor}`}
                              >
                                {statusText}
                              </td>
                            );
                          })}
                        </tr>
                      )
                    )):(
                      <tr>
                        <td colSpan={23}  className="text-sm py-3 text-center" >
                          <span> No Record Found</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "absentees":
        return (
          <div>
            <div className="bg-white shadow rounded-lg ">
              <h2 className="text-lg border-b pb-3 font-normal mb-4 p-4">
                Staff
              </h2>
              <form className="filters mb-4  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center text-sm text-gray-700 p-4">
                <div>
                  <label>Course</label>
                  <select className="w-full py-2 border border-gray-300 rounded-md px-3">
                    <option>Please Select</option>
                  </select>
                </div>
                <div>
                  <label>Batch</label>
                  <select className="w-full py-2 border border-gray-300 rounded-md px-3">
                    <option>Please Select</option>
                  </select>
                </div>

                <div>
                  <label>Date</label>
                  <input
                    type="date"
                    className="w-full py-2 border border-gray-300 rounded-md px-3"
                  />
                </div>
                <div className="mt-5">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Send SMS
                  </button>
                </div>
              </form>
              {/* Table for Absentees Report */}
            </div>
            <div className="mt-10 bg-white p-4 shadow rounded-lg">
              <table className="w-full border-separate border border-gray-300">
                <thead>
                  <tr className="">
                    <th className="border  py-4 text-sm font-normal px-2">
                      Roll No.
                    </th>
                    <th className="border  py-4 text-sm font-normal px-2">
                      Student Admission No.
                    </th>
                    <th className="border  py-4 text-sm font-normal px-2">
                      Student Name
                    </th>
                    <th className="border  py-4 text-sm font-normal px-2">
                      Guardian Name
                    </th>
                    <th className="border  py-4 text-sm font-normal px-2">
                      Guardian Mobile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border  py-4 text-sm font-normal px-2">
                      1200
                    </td>
                    <td className="border  py-4 text-sm font-normal px-2">
                      --
                    </td>
                    <td className="border  py-4 text-sm font-normal px-2">
                      --
                    </td>
                    <td className="border  py-4 text-sm font-normal px-2">
                      --
                    </td>
                    <td className="border  py-4 text-sm font-normal px-2">
                      --
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="gap-x-4 ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2 text-gray-700 text-sm mb-4">
        <FaHome className="text-blue-500" />
        <span>View Students</span>
      </div>

      {/* Tabs Section */}
      <div className="bg-white shadow rounded-lg w-[98%] p-3 mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-normal text-sm w-1/6 ${
              activeTab === "view"
                ? "bg-[#3036e0] text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("view")}
          >
            View Attendance
          </button>
          <button
            className={`py-2 px-4 font-normal text-sm w-1/6 ${
              activeTab === "absentees"
                ? "bg-[#3036e0] text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("absentees")}
          >
            Absentees Report
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="  w-[98%]">{renderTabContent()}</div>
    </div>
  );
};

export default Attendance;
