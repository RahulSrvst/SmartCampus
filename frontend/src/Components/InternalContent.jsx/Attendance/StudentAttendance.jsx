import React, { useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Margin, usePDF } from "react-to-pdf";
import CsvDownloader from 'react-csv-downloader';


const StudentAttendance = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [id, setId] = useState();
  const [batch_ID, setBatch_id] = useState();
  const [Data, setData] = useState([]);
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
  }, []);

  useEffect(() => {
    if (id) {
      fetchBatchDatas(id);
    }
  }, [id]);

  function handleId(id) {
    setId(id);
  }

  const initialValues = {
    course: "",
    batch: "",
    students: {},
  };

  const handleClick = async () => {
    if (!values.batch) {
      console.error("Batch is not selected. Please select a batch.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          batch_id: values.batch,
        },
      });

      if (response.status === 200) {
        console.log("Student data fetched successfully:", response.data.data);
        setData(response.data.data);
        setFieldValue("batch", "");
      } else {
        console.error("Error fetching student data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const setRefs = (node) => {
    tableRef.current = node;
    targetRef.current = node;
  };

  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        const token = localStorage.getItem("token");

        const attendanceDate = values.attendanceDate;

        // Construct payload
        // const payload = Object.entries(values.students).map(
        //   ([studentId, data]) => ({
        //     student: studentId,
        //     attendance: attendanceDate, // Pass attendance date
        //     ...data, // Include status and note
        //   })
        // );

        const payload = {
          attendance: Object.entries(values.students).map(
            ([studentId, data]) => ({
              student: parseInt(studentId), 
              attendance: attendanceDate, 
              course: id,
              batch: batch_ID,
              ...data,
            })
          ),
        };

        try {
          const response = await axios.post(
            `${baseURL}${API_URLS.attendance}`,
            payload,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            console.log(response.data.data);
            const st = response.data.data;

            if (st && st.length > 0) {
              toast.success(response.data.message); // Assuming this is the success message
              setData();
              resetForm();
            } else {
              // Assuming the error messages are in `response.data.message`
              response.data.message.forEach((msg) => {
                if (msg.non_field_errors) {
                  msg.non_field_errors.forEach((errorMessage) => {
                    toast.error(errorMessage);
                  });
                }
              });
            }
          } else {
            console.error("Error submitting attendance");
          }
        } catch (error) {
          console.error("Error submitting attendance:", error);
        }
      },
    });



  const handleAttendanceChange = (studentId, field, value) => {
    setFieldValue(`students.${studentId}.${field}`, value);
  };

  const tableRef = useRef(null);

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf' , page: {margin:Margin.MEDIUM} });

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[10%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 lg:text-base text-sm mb-3 md:mb-4">
        Attendance <FaHome className="text-[#192b4c] w-4 h-4" /> - Student
        Attendance
      </div>

      <div className="bg-white  shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4 ">
        <h2 className="text-lg font-normal mb-4 border-b p-4">
          Student Attendance
        </h2>
        <div className="text-sm text-gray-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-1">Course</label>
              <select
                className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                name="course"
                onChange={(e) => {
                  const selectedCourseId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );
                  setFieldValue("course", selectedCourseId);

                  handleId(selectedCourseId);
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
              <label className="block mb-1">Batch</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                name="batch"
                onChange={(e) => {
                  const selectedBatchId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );

                  setBatch_id(selectedBatchId);
                  setFieldValue("batch", selectedBatchId);
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
          </div>

          <button
            onClick={handleClick}
            className="bg-[#192b4c] text-white py-2 px-4 rounded mb-4"
          >
            Search
          </button>
        </div>

        <form onSubmit={handleSubmit} className="text-sm text-gray-700" >
          <h3 className="text-lg font-normal mb-4 px-4 border-b pb-3">
            Student List
          </h3>
          <div className="flex justify-between items-center px-4">
            

            <div>
              <label className="block mb-1">Attendance Date</label>
              <input
                type="date"
                name="attendanceDate"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="dd-mm-yyyy"
                onChange={handleChange}
                value={values.attendanceDate || ""}
              />
            </div>

            <div>
            <button
              type="submit"
              className="bg-[#192b4c] text-white py-2 px-4 rounded"
            >
              Save Attendance
            </button>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table  ref={setRefs}  className="min-w-full bg-white border border-separate border-gray-300">
              <thead>
                <tr>
                  {[
                    "#",
                    "Admission No",
                    "Roll Number",
                    "Name",
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
                {Data?.length > 0 ? (
                  Data?.map((student, index) => (
                    <tr key={student.id} className="text-sm text-gray-700">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{student.admission_number}</td>
                      <td className="border p-2">{student.rollnumber}</td>
                      <td className="border p-2">
                        {student.student_firstname} {student.Student_lastname}
                      </td>
                      <td className="border p-2">
                        <div className="flex flex-col items-start ">
                          {["Present", "Late", "Absent", "Half day"].map(
                            (status) => (
                              <label key={status} className="flex items-center">
                                <input
                                  type="radio"
                                  name={`students.${student.id}.status`}
                                  className="mr-1"
                                  onChange={() =>
                                    handleAttendanceChange(
                                      student.id,
                                      "status",
                                      status
                                    )
                                  }
                                  checked={
                                    values.students?.[student.id]?.status ===
                                    status
                                  }
                                />
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
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
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.id,
                              "note",
                              e.target.value
                            )
                          }
                          value={values.students?.[student.id]?.note || ""}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-sm py-5 text-center" colSpan={11}>
                      No Student Data Searched
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAttendance;
