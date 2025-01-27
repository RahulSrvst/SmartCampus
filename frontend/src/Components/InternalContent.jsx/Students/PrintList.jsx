import React, { useEffect, useState } from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { FaFilePdf, FaFileExcel, FaFileWord, FaPrint } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import { Circles, ColorRing } from "react-loader-spinner";
import { LiaFileExcel } from "react-icons/lia";
import { IoDocumentTextSharp } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiOutlineFileExcel, AiOutlineFileWord } from "react-icons/ai";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useFormik } from "formik";
import { initOnLoad } from "apexcharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

const PrintList = () => {
  const [studentList, setStudentList] = useState([]);
  const [FetchingLoader, setFetchingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  // const FetchstudentList = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     setFetchingLoader(true);
  //     const response = await axios.get(baseURL + API_URLS.addEmployee, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.status === 200) {
  //       console.log(response.data.data);
  //       setStudentList(response.data.data);
  //     } else {
  //       console.log("Error");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setFetchingLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   FetchstudentList();
  // }, []);

  const [reportType, setReportType] = useState("");

  const [course, setCourse] = useState();
  const [batchData, setbatchData] = useState();
  const [designationData, setDesignationData] = useState();
  const [course_id, setCourseId] = useState();
  const [batch_id, setbatch_id] = useState();
  const [designationId, setDesignationId] = useState();

  const initialValues = {
    department: "",
    usertype: "",
    designation: "",
  };

  const fetchCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.course, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setCourse(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatches = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.batch, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setbatchData(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDesignationTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.batch, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setDesignationData(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchBatches();
    fetchDesignationTypes();
  }, []);

  function handleCourseId(id) {
    setCourseId(id);
  }

  function handleBatchId(id) {
    setbatch_id(id);
  }

  function handleDesignationID(id) {
    setDesignationId(id);
  }

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      if (reportType === "Course Wise") {
        try {
          setFetchingLoader(true);
          const response = await axios.get(
            baseURL + API_URLS.studentAdmission,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              params: {
                course_id: course_id,
              },
            }
          );
          if (response.status === 200) {
            const st_data = response.data.data;
            if (st_data && st_data.length > 0) {
              setStudentList(st_data);
              console.log(st_data);
            } else {
              setStudentList([]);
              toast.success("There is No Data for this Course")
            }
          } else {
            console.log("Error");
          }
        } catch (e) {
          console.log(e);
        } finally {
          setFetchingLoader(false);
        }
      } else if (reportType === "Batch Wise") {
        try {
          setFetchingLoader(true);
          const response = await axios.get(
            baseURL + API_URLS.studentAdmission,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              params: {
                batch_id: batch_id,
              },
            }
          );
          if (response.status === 200) {
            const st_data = response.data.data;
            if (st_data && st_data.length > 0) {
              setStudentList(st_data);
              console.log(st_data);
            } else {
              setStudentList([]);
              toast.success("There is No Data for this Batch")
            }
          } else {
            console.log("Error");
          }
        } catch (e) {
          console.log(e);
        } finally {
          setFetchingLoader(false);
        }
      } else {
        
      }
    },
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student List", 14, 10);
    const tableColumn = [
      "Sl.No.",
      "Unique ID",
      "Student Ad. No.",
      "Course",
      "Student Name",
      "Guardian Name",
      "Guardian Mobile",
    ];
    const tableRows = [];

    studentList.forEach((item, index) => {
      const row = [
        index + 1,
        item.st_id,
        item.admission_number,
        item.course_name,
        `${item.student_firstname} ${item.Student_lastname}`,
        item.father_fullname,
        item.father_mobile,
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("student-list.pdf");
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      studentList.map((item, index) => ({
        "Sl.No.": index + 1,
        "Unique ID": item.st_id,
        "Student Admission Number": item.admission_number,
        "Course":item.course_name,
        "Student Name":`${item.student_firstname} ${item.Student_lastname}`,
        "Guardian Name": item.father_fullname,
        "Guardian Mobile": item.father_mobile,
        
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student List");
    XLSX.writeFile(workbook, "student-list.xlsx");
  };

  // Download Word Document (Simple Table)
  const downloadWord = () => {
    const tableHTML = `
      <table border="1">
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th>Unique ID</th>
            <th>Stud. Ad. No.</th>
            <th>Course</th>
            <th>Student Name</th>
            <th>Guardian Name</th>
            <th>Guardian Mobile</th>
          </tr>
        </thead>
        <tbody>
          ${studentList
            .map(
              (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.st_id}</td>
              <td>${item.admission_number}</td>
              <td>${item.course_name}</td>
              <td>${item.student_firstname} ${item.Student_lastname}</td>
              <td>${item.father_fullname}</td>
              <td>${item.father_mobile}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const blob = new Blob([tableHTML], { type: "application/msword" });
    saveAs(blob, "student-list.doc");
  };

  return (
    <div className="ml-5 md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] md:mt-[15%] lg:mt-[10%] mt-[35%] h-screen">
      {deletingLoader && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        Employee Management <FaHome className="text-blue-900 w-4 h-4" /> - Print
        List
      </div>
      <div className="flex flex-wrap gap-x-4 ">
        {/* Add Batch Form */}
        <div className="bg-white  shadow-md rounded-lg w-[96%] md:w-[97%] mb-4">
          <h2 className="text-lg border-b  mb-4 px-6 py-4 text-black  rounded-t-lg">
            Report Generation
          </h2>

          <form
            onSubmit={handleSubmit}
            className="p-4 grid grid-cols-4 gap-5 text-sm text-gray-700"
          >
            <div>
              <label className="block mb-2">Report Type</label>
              <select
                className="w-[100%] mb-4 p-1.5 border border-gray-300 rounded"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="">Select Report Type</option>
                <option value="Course Wise">Course Wise</option>
                <option value="Batch Wise">Batch Wise</option>
              </select>
            </div>
            <div>
              {reportType === "Batch Wise" && (
                <div>
                  <label className="block mb-2">
                    Batch<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      handleBatchId(e.target.value);
                    }}
                    value={values.add_batch}
                    name="department"
                  >
                    <option value="" >
                      Please Select
                    </option>
                    {batchData?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.batch_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {reportType === "Course Wise" && (
                <div>
                  <label className="block mb-2">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e); // Handles Formik change if using it
                      handleCourseId(e.target.value); // Call handleCourseId with selected ID
                    }}
                    value={values.user_type}
                    name="user_type"
                  >
                    <option value="" >
                      Select Course
                    </option>
                    {/* Exclude "student" from the options */}
                    {course?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.course_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {reportType === "Designation Wise" && (
                <div>
                  <label className="block mb-2">
                    Batch <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      handleDesignationID(e.target.value);
                    }}
                    value={values.designation}
                    name="designation"
                  >
                    <option value="" disabled>
                      Select Designation
                    </option>
                    {designationData?.map((items) => (
                      <option key={items.id} value={items.id}>
                        {items.designation_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              className=" w-[30%] h-8 mt-7  bg-red-500 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Batch List Section */}
        <div className="bg-white  shadow-md rounded-lg w-[96%] md:w-[97%] mb-4 p-6">
          <h2 className="text-lg mb-4">Student List</h2>
          {/* Export Buttons */}
          <div className="flex mb-4">
            <button
              onClick={downloadPDF}
              className="text-2xl bg-sky-100 p-2 text-green-600 rounded-l-md"
            >
              <BsFileEarmarkPdf />
            </button>
            <button
              onClick={downloadExcel}
              className="text-2xl bg-sky-100 p-2 text-yellow-500"
            >
              <AiOutlineFileExcel />
            </button>
            <button
              onClick={downloadWord}
              className="text-2xl bg-sky-100 p-2 text-sky-500 rounded-r-md"
            >
              <AiOutlineFileWord />
            </button>

            {/* <button className="text-2xl bg-sky-100 p-2 text-red-500">
              <HiOutlineDocumentAdd />
            </button>
            <button className="text-2xl bg-sky-100 p-2 text-sky-500 rounded-r-md">
              <AiOutlineFileWord />
            </button> */}
          </div>
          {/* Table */}
          <div className="bg-white  overflow-auto">
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 text-sm text-gray-600">
              <div className="flex items-center mb-2 md:mb-0">
                <label>Show</label>
                <select className="mx-2 p-1 border border-gray-300 rounded">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <label>entries</label>
              </div>
              <div className="flex items-center">
                <label className="mr-2">Search:</label>
                <input
                  type="text"
                  className="p-1 border border-gray-300 rounded"
                  placeholder=""
                />
              </div>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-[16px] border-b border-black">
                  <th className="pr-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Sl.No. <HiOutlineArrowsUpDown className=" text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Unique ID
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Student Ad. No.
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Course
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Student Name
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Guardian Name
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Guardian Mobile
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FetchingLoader && (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      <div className="flex justify-center items-center">
                        <ColorRing
                          visible={true}
                          height="60"
                          width="60"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                )}
                {studentList.length > 0 ? (
                  studentList?.map((items, index) => {
                    return (
                      <tr key={items.id} className="border-b text-sm odd:bg-gray-100 last:border-black">
                        <td className="py-4 whitespace-nowrap px-4 border-l border-white">
                          {index + 1}
                        </td>
                        <td className="py-4 whitespace-nowrap px-4 border-l border-white">
                          {items.st_id}
                        </td>
                        <td className="py-4 whitespace-nowrap px-4 border-l border-white pl-6">
                          {items.admission_number}
                        </td>

                        <td className=" whitespace-nowrap  ">
                          <span className="text-white bg-[#7047ee] px-4 py-1  rounded-lg">
                            {" "}
                            {items.course_name}
                          </span>
                        </td>
                        <td className="py-4 whitespace-nowrap px-4 border-l border-white">
                          {items.student_firstname} {items.Student_lastname}
                        </td>
                        <td className="py-4 whitespace-nowrap px-4 border-l border-white">
                          <span className="">{items.father_fullname}</span>
                        </td>
                        <td className="py-4 whitespace-nowrap px-4 border-l border-white">
                          <span className="">{items.father_mobile}</span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center text-gray-500 py-4">
                      No Student List Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-[14px] text-slate-500 ">
              Showing 1 to 1 of 1 entries
            </p>
            <div className="flex text-sm">
              <button className="text-slate-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">
                1
              </button>
              <button className="text-slate-500 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintList;
