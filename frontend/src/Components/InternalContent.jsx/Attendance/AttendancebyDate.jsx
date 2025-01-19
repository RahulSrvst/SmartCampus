import React, { useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Margin, usePDF } from "react-to-pdf";
import CsvDownloader from "react-csv-downloader";
import { useReactToPrint } from "react-to-print";



const AttendanceBydate = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [id, setId] = useState();
  const [Data, setData] = useState();

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
    attendance: "",
  };

  const { values, handleChange, handleSubmit, setFieldValue} =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(baseURL + API_URLS.attendance, {
            params: {
              attendance: values.attendance,
              batch_id: values.batch,
              student_id:localStorage.getItem("student_id"),
            },
            headers: {
              // Authorization: "Token 6d1e22f7f6f570e556706fd9afffded39846b5cf",
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            console.log(response);

            const Stu_data = response.data.data;
            if (Stu_data && Stu_data.length > 0) {
              setData(Stu_data);
              // console.log(Emp_data);
              setFieldValue("batch", "");
            } else {
              setData([]);
              toast.success(response.data.message);
            }
          } else {
            console.log("Error");
          }
        } catch (e) {
          console.log(e);
        }
      },
    });

  const tableRef = useRef(null);

  const { toPDF, targetRef } = usePDF({
    filename: "page.pdf",
    page: { margin: Margin.MEDIUM },
  });

  const componentRef = useRef();

  const setRefs = (node) => {
    tableRef.current = node;
    targetRef.current = node;
    componentRef.current = node;
  };


  

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[10%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-4">
        Attendance <FaHome className="text-[#192b4c] w-4 h-4" /> - Student
        Attendance
      </div>
      <div className="bg-white  shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4 ">
        <h2 className="text-lg font-normal mb-4 border-b p-4">
          Student Attendance
        </h2>
        <form onSubmit={handleSubmit} className="text-sm text-gray-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {(localStorage.getItem("user_type") === "Admin" || localStorage.getItem("user_type") === "employee") && <div>
              <label className="block mb-1">Course</label>
              <select
                className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                name="course"
                onChange={(e) => {
                  const selectedCourseId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );

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
            </div>}
            {(localStorage.getItem("user_type") === "Admin" || localStorage.getItem("user_type") === "employee") &&<div>
              <label className="block mb-1">Batch</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                name="batch"
                onChange={(e) => {
                  const selectedBatchId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );
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
            </div>}
            <div>
              <label className="block mb-1">Attendance Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="dd-mm-yyyy"
                name="attendance"
                value={values.attendance}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#192b4c] text-white py-2 px-4 rounded mb-4"
          >
            Search
          </button>
        </form>
        <h3 className="text-lg font-normal mb-4 px-4 border-b pb-3">
          Student List
        </h3>

        <div className="flex space-x-2 ml-4 text-sm">
          <button className="bg-gray-200 py-0 h-8 px-4 rounded-l-xl">Copy</button>
          <CsvDownloader>
            <button className="bg-gray-200 py-0 h-8 px-4 ">CSV</button>
          </CsvDownloader>
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button className="bg-gray-200 py-0 h-8 px-4 ">
              Excel
            </button>
          </DownloadTableExcel>
          <button
            className="bg-gray-200 py-0 h-8 px-4 "
            onClick={toPDF}
          >
            PDF
          </button>
          <button className="bg-gray-200 py-0 h-8 px-4 rounded-r-xl" onClick={()=>handlePrint} >Print</button>
        </div>

        <div className="overflow-x-auto p-4">
          <table
            ref={setRefs}
            className="min-w-full bg-white border border-separate border-gray-300"
          >
            <thead>
              <tr>
                {[
                  "#",
                  "Student Name",
                  "Roll Number",
                  "Attendance",
                  "Attendance Date",
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
                    <td className="border p-2">
                      {student.student_name} {student.last_name}
                    </td>
                    <td className="border p-2">{student.rollnumber}</td>
                    <td className="border p-2">
                      <div
                        className={` 
                    ${
                      student.status === "Present" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-green-500"
                    } 
                    ${
                      student.status === "Absent" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-red-500"
                    }  
                    ${
                      student.status === "Half day" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-sky-300"
                    }   
                    ${
                      student.status === "Late" &&
                      " text-white rounded-lg w-20 text-center py-1 bg-yellow-400"
                    }`}
                      >
                        {student.status}
                      </div>
                    </td>

                    <td className={`border p-2 `}>{student.attendance}</td>
                    <td className="border p-2">
                      {student.note && student.note.length > 0
                        ? student.note
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-sm py-5 text-center" colSpan={11}>
                    No Student Record Found
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

export default AttendanceBydate;
