import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import Downshift from "downshift";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";
import { Autocomplete, TextField } from "@mui/material";
const StudentIdCard = ({CollegeData}) => {
  const [content, setContent] = useState("batchwise");
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [id, setId] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [template, setTemplate] = useState("Template");
  const [template1, setTemplate1] = useState("Template1");
  const [employeeNameId, SetEmployeeNameId] = useState(null);
  const [designation, setDesignation] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [EmployeeData, setEmployeeData] = useState([]);

  const [data, setData] = useState([]);
  const [FetchingLoader, setFetchingLoader] = useState(false);

  console.log(employeeNameId);

  const Fetchdata = async () => {};

  useEffect(() => {
    Fetchdata();
  }, []);

  const initialValues = {
    course: "",
    batch: "",
  };

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourseData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        baseURL + API_URLS.batch,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            course_id: id,
          },
        }
      );

      console.log(response.data);
      setBatchData(response.data.data);
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

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");

      if (content === "batchwise") {
        if (!values.course || !values.batch) {
          toast.error("Course & Batch Are Empty OR may not Selected");
        }
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
                batch_id: values.batch,
              },
            }
          );
          if (response.status === 200) {
            console.log(response.data.data);
            setData(response.data.data);
            setFieldValue("batch", "");
          } else {
            console.log("Error");
          }
        } catch (e) {
          console.log(e);
        } finally {
          setFetchingLoader(false);
        }
      } else if (content === "individual") {
        try {
          setFetchingLoader(true);
          const response = await axios.get(baseURL + API_URLS.addEmployee, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              id: employeeNameId,
            },
          });
          if (response.status === 200) {
            setEmployeeData(response.data.data);
          } else {
            console.log("Error");
          }
        } catch (e) {
          console.log(e);
        } finally {
          setFetchingLoader(false);
        }
      }
    },
  });

  console.log(EmployeeData);

  function handleId(id) {
    setId(id);
  }

  const [designationID, setDesignationID] = useState(null);

  // Fetch Designations from the API
  const fetchDesignation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.designation, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 201) {
        setDesignation(response.data.data);
      }
    } catch (e) {
      console.error("Error fetching designations:", e);
    }
  };

  // Fetch Employees based on the selected Designation
  const fetchEmployeeName = async () => {
    if (designationID) {
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
          // console.log(response.data.data?.[0])
          setEmployeeName(response.data.data);
        } else {
          console.log("Error fetching employees");
        }
      } catch (e) {
        console.error("Error fetching employees:", e);
      }
    }
  };

  useEffect(() => {
    // Fetch designations on component mount
    fetchDesignation();
  }, []);

  useEffect(() => {
    if (designationID) {
      fetchEmployeeName(); // Fetch employee names based on designation
    }
  }, [designationID]);

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2">
        <span className="text-[20px]">Students</span>{" "}
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Student ID Card
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <div className="p-2 bg-white rounded-lg shadow-md w-[98%]">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setContent("batchwise")}
                className={`${
                  content === "batchwise"
                    ? "bg-purple text-white  rounded-l-md"
                    : ""
                } px-4 py-1.5`}
              >
                ID Card (Batch Wise)
              </button>
              <button
                onClick={() => setContent("individual")}
                className={`${
                  content === "individual"
                    ? "bg-purple text-white  rounded-r-md"
                    : ""
                } px-4 py-1.5`}
              >
                ID Card (Individual)
              </button>
            </div>
          </div>
        </div>

        {content === "batchwise" && (
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md w-[98%] mt-5">
              <div className="rounded-md shadow-sm pb-5">
                <h2 className="text-base font-normal mb-4 border-b p-4">
                  Student ID Card
                </h2>
                <form
                  className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 px-6 text-sm text-gray-600"
                  onSubmit={handleSubmit}
                >
                  {/* Course Selection */}
                  <div>
                    <label
                      htmlFor="course"
                      className="block text-sm font-medium mb-2"
                    >
                      Course
                    </label>
                    <select
                      className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                      name="course"
                      onChange={(e) => {
                        const selectedCourseId =
                          e.target.options[e.target.selectedIndex].getAttribute(
                            "data-id"
                          );
                        setFieldValue("course", selectedCourseId); // Update Formik value
                        handleId(selectedCourseId);
                      }}
                    >
                      <option value="">Please Select</option>
                      {courseData?.map((item) => (
                        <option
                          key={item._id}
                          value={item.course_name}
                          data-id={item._id}
                        >
                          {item.course_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Academic Year Selection */}
                  <div>
                    <label
                      htmlFor="academicYear"
                      className="block text-sm font-medium mb-2"
                    >
                      Batch
                    </label>
                    <select
                      className="w-full mb-4 p-2 border border-gray-300 rounded"
                      name="batch"
                      onChange={(e) => {
                        const selectedBatchId =
                          e.target.options[e.target.selectedIndex].getAttribute(
                            "data-id"
                          );
                        setFieldValue("batch", selectedBatchId); // Update Formik value
                      }}
                    >
                      <option value="">Please Select</option>
                      {Array.isArray(BatchData) && BatchData.length > 0 ? (
                        BatchData.map((item) => (
                          <option
                            key={item._id}
                            value={item.batch_name}
                            data-id={item._id}
                          >
                            {item.batch_name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No Batches Available</option>
                      )}
                    </select>
                  </div>

                  {/* ID Template Selection */}
                  <div>
                    <label
                      htmlFor="idTemplate"
                      className="block text-sm font-medium mb-2"
                    >
                      ID Template
                    </label>
                    <select
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="Template">Select ID Template</option>
                      <option value="Vertical Template">
                        Vertical ID Template
                      </option>
                      <option value="Horizontal Template">
                        Horizontal ID Template
                      </option>
                    </select>
                  </div>

                  {/* Barcode Upload */}
                  {/* <div>
                    <label
                      htmlFor="barcode"
                      className="block text-sm font-medium mb-2"
                    >
                      Barcode
                    </label>
                    <div>
                      {values.barcode ? (
                        <p className="text-sm">{values.barcode.name}</p>
                      ) : (
                        <label
                          htmlFor="barcode"
                          className="text-sm text-gray-400 rounded-lg border w-full h-10 flex items-center justify-center hover:cursor-pointer"
                        >
                          Click to Upload Barcode
                        </label>
                      )}
                      <input
                        id="barcode"
                        name="barcode"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* Signature Upload */}
                  {/* <div>
                    <label
                      htmlFor="barcode"
                      className="block text-sm font-medium mb-2"
                    >
                      Upload Signature
                    </label>
                    <div>
                      {values.signature ? (
                        <p className="text-sm">{values.signature.name}</p>
                      ) : (
                        <label
                          htmlFor="signature"
                          className="text-sm text-gray-400 rounded-lg border w-full h-10 flex items-center justify-center hover:cursor-pointer"
                        >
                          Click to Upload Signature
                        </label>
                      )}
                      <input
                        id="signature"
                        name="signature"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div> */}

                  {/* Submit Button */}
                  <div className="col-span-1 md:col-span-3 xl:col-span-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-yellow-500 text-white py-2 rounded-md px-6"
                    >
                      Generate ID Card
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {template === "Vertical Template" && (
              <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%]">
                <h2 className="text-lg font-normal mb-4 border-b p-5">
                  Student ID Card (Vertical)
                </h2>
                <div className="flex justify-between px-28">
                  {data?.map((items, index) => (
                    <div
                      key={index}
                      className="bg-white text-black rounded-xl shadow-lg  items-center w-[400px]"
                    >
                      {/* School Name - Upper Center */}
                      <div className="flex items-center">
                        <p className="flex items-center text-xl font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                          <img
                            src={`${CollegeData.logo}`}
                            className="w-12 h-12 mx-4 rounded-full"
                          />
                          {CollegeData.college}
                        </p>
                      </div>

                      {/* Student Photo and Details */}
                      <div className="flex flex-col  pt-4">
                        <div className="flex flex-col border-b  ">
                          <div className="w-36 h-36 bg-gray-300  mx-auto ">
                            <img
                              src={`${items.student_image}`}
                              alt="student"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="font-semibold text-center text-sm mb-1 ">
                            Student ID Card
                          </p>
                        </div>

                        <div className="text-sm font-semibold flex flex-col mx-10 mt-3 ">
                          <div>
                            Student Name : {items.student_firstname}{" "}
                            {items.Student_lastname}
                          </div>
                          <div>Unique ID : {items.st_id}</div>
                          <div>Roll No. : {items.rollnumber} </div>
                          <div>Course: {items.course.course_name} </div>
                          <div>Batch: {items.batch.batch_name}</div>
                          <div>Father Name : {items.father_fullname}</div>
                          <div>Contact No. : {items.father_mobile}</div>

                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                                alt="Director Signature"
                                className="w-full h-12 "
                              />
                              <p className="font-semibold text-sm text-center ">
                                Director
                              </p>
                            </div>
                            <div className="mt-3">
                              <img
                                src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                                alt="Barcode"
                                className="w-full h-8 mb-2"
                              />
                              <p className="font-semibold text-sm text-center ">
                                Bar Code
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Director Signature and Barcode - Bottom Center */}
                      <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                        {CollegeData.address}, {CollegeData.city},{" "}
                        {CollegeData.state}, {CollegeData.country}, Pincode
                        - {CollegeData.pincode}, telephone: +91 {CollegeData.mobile}
                      </p>
                    </div>
                  ))}

                  {/* Upload Barcode and Signature */}
                </div>
              </div>
            )}

            {template === "Horizontal Template" && (
              <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%]">
                <h2 className="text-lg font-normal mb-4 border-b p-5">
                  Student ID Card (Horizontal)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-10">
                  {data?.map((items, index) => (
                    <div
                      key={index}
                      className="bg-white text-black rounded-xl shadow-lg flex flex-col items-center w-[500px]"
                    >
                      {/* School Name - Upper Center */}
                      <p className=" flex items-center  text-2xl font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                        <img
                          src={`${CollegeData?.logo}`}
                          className="w-14  mx-8 rounded-full "
                        />
                        {CollegeData?.college}
                      </p>

                      {/* Student Photo and Details */}
                      <div className="flex  pt-4">
                        <div className="flex flex-col w-[40%]  ">
                          <div className="w-36 h-36 bg-gray-300 rounded-full mr-8">
                            <img
                              src={`${baseURL}${items.student_image}`}
                              alt="student"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="font-semibold text-center text-sm mb-1  whitespace-nowrap">
                            Student ID Card
                          </p>
                          <div>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                              alt="Director Signature"
                              className="w-32 h-12 "
                            />
                            <p className="font-semibold text-sm text-center ">
                              Director
                            </p>
                          </div>
                        </div>

                        <div className="text-sm font-semibold">
                          <div className="flex">
                            Student Name :{" "}
                            <p>
                              {" "}
                              {items.student_firstname} {items.Student_lastname}
                            </p>
                          </div>
                          <div>Unique ID :{items.st_id}</div>
                          <div>Roll No. : {items.rollnumber} </div>
                          <div>Course: {items.course.course_name} </div>
                          <div>Batch: {items.batch.batch_name}</div>
                          <div>Father Name : {items.father_fullname}</div>
                          <div>Contact No. : {items.father_mobile}</div>

                          <div className="mt-3">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                              alt="Barcode"
                              className="w-52 h-8 mb-2"
                            />
                            <p className="font-semibold text-sm ">Bar Code</p>
                          </div>
                        </div>
                      </div>

                      {/* Director Signature and Barcode - Bottom Center */}
                      <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                      {CollegeData?.address},{" "}
                      {CollegeData?.city},{CollegeData?.state}
                      , {CollegeData?.country}, Pincode -{" "}
                      {CollegeData?.pincode}, telephone: +91{" "}
                      {CollegeData?.mobile}
                    </p>
                    </div>
                  ))}

                  {/* Upload Barcode and Signature */}
                </div>
              </div>
            )}

            {template === "Template" && (
              <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%]">
                <h2 className="text-lg font-normal mb-4 border-b p-5">
                  Student ID Card Template (Horizontal)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-10">
                  {[1, 2].map((items, index) => (
                    <div
                      key={index}
                      className="bg-white text-black rounded-xl shadow-lg flex flex-col items-center w-[500px]"
                    >
                      {/* School Name - Upper Center */}
                      <p className="text-xl font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                        School Name
                      </p>

                      {/* Student Photo and Details */}
                      <div className="flex  pt-4">
                        <div className="flex flex-col w-[40%]  ">
                          <div className="w-36 h-36 bg-gray-300 rounded-full mr-8">
                            <img
                              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                              alt="student"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="font-semibold text-center text-sm mb-1  whitespace-nowrap">
                            Student ID Card
                          </p>
                          <div>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                              alt="Director Signature"
                              className="w-32 h-12 "
                            />
                            <p className="font-semibold text-sm text-center ">
                              Director
                            </p>
                          </div>
                        </div>

                        <div className="text-sm font-semibold">
                          <div className="flex">Student Name : </div>
                          <div>Unique ID :</div>
                          <div>Roll No. : </div>
                          <div>Course: </div>
                          <div>Batch:</div>
                          <div>Father Name : </div>
                          <div>Contact No. : </div>

                          <div className="mt-3">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                              alt="Barcode"
                              className="w-52 h-8 mb-2"
                            />
                            <p className="font-semibold text-sm ">Bar Code</p>
                          </div>
                        </div>
                      </div>

                      {/* Director Signature and Barcode - Bottom Center */}
                      <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                        Your School Address, Street Name, City, District, State,
                        Pincode - 208023, telephone: +91 123465798
                      </p>
                    </div>
                  ))}

                  {/* Upload Barcode and Signature */}
                </div>

                <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%]">
                  <h2 className="text-lg font-normal mb-4 border-b p-5">
                    Student ID Card Template (Vertical)
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-28">
                    {[1, 2].map((items, index) => (
                      <div
                        key={index}
                        className="bg-white text-black rounded-xl shadow-lg  items-center w-[400px]"
                      >
                        {/* School Name - Upper Center */}
                        <p className="text-xl font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                          School Name
                        </p>

                        {/* Student Photo and Details */}
                        <div className="flex flex-col  pt-4">
                          <div className="flex flex-col border-b  ">
                            <div className="w-36 h-36 bg-gray-300  mx-auto ">
                              <img
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                alt="student"
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <p className="font-semibold text-center text-sm mb-1 ">
                              Student ID Card
                            </p>
                          </div>

                          <div className="text-sm font-semibold flex flex-col mx-10 mt-3 ">
                            <div>Student Name : </div>
                            <div>Unique ID : </div>
                            <div>Roll No. : </div>
                            <div>Course: </div>
                            <div>Batch: </div>
                            <div>Father Name : </div>
                            <div>Contact No. :</div>

                            <div className="grid grid-cols-2 gap-5">
                              <div>
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                                  alt="Director Signature"
                                  className="w-full h-12 "
                                />
                                <p className="font-semibold text-sm text-center ">
                                  Director
                                </p>
                              </div>
                              <div className="mt-3">
                                <img
                                  src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                                  alt="Barcode"
                                  className="w-full h-8 mb-2"
                                />
                                <p className="font-semibold text-sm text-center ">
                                  Bar Code
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Director Signature and Barcode - Bottom Center */}
                        <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                          Your School Address, Street Name, City, District,
                          State, Pincode - 208023, telephone: +91 123465798
                        </p>
                      </div>
                    ))}

                    {/* Upload Barcode and Signature */}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* // For One Employee */}

        {content === "individual" && (
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md w-[98%] mt-5">
              <div className="rounded-md shadow-sm pb-5">
                <h2 className="text-base font-normal mb-4 border-b p-4">
                  ID Card (Individual)
                </h2>
                <form
                  className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 px-6 text-sm text-gray-600"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-6">
                    <label className="block mb-2">Designation</label>
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
                      className="w-60"
                      getOptionLabel={(option) =>
                        `${option.firstname} ${option.lastname}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Employee"
                          variant="outlined"
                          size="small"
                        />
                      )}
                      onChange={(event, value) => {
                        if (value) {
                          SetEmployeeNameId(value._id);
                        } else {
                          SetEmployeeNameId(null);
                        }
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="idTemplate"
                      className="block text-sm font-medium mb-2"
                    >
                      ID Template
                    </label>
                    <select
                      value={template1}
                      onChange={(e) => setTemplate1(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="Template1">Select ID Template</option>
                      <option value="Vertical Template1">
                        Vertical ID Template
                      </option>
                      <option value="Horizontal Template1">
                        Horizontal ID Template
                      </option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-3 xl:col-span-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-yellow-500 text-white py-2 rounded-md px-6"
                    >
                      Generate ID Card
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {template1 === "Vertical Template1" && (
              <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%]">
                <h2 className="text-lg font-normal mb-4 border-b p-5">
                  Employee ID Card (Vertical)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-28">
                  {/* {EmployeeData.length > 0 ?( */}
                  <div className="bg-white text-black rounded-xl shadow-lg  items-center w-[400px]">
                    {/* School Name - Upper Center */}
                    <p className="text-xl flex  items-center gap-3 px-4 font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                    <img
                        src={`${CollegeData?.logo} `}
                        className="w-12 h-12 mr-4 rounded-full"
                        alt="logo"
                      />
                       <div className="" >{CollegeData?.college}</div>
                    </p>

                    {/* Student Photo and Details */}
                    <div className="flex flex-col  pt-4">
                      <div className="flex flex-col border-b  ">
                        <div className="w-36 h-36 bg-gray-300  mx-auto ">
                          <img
                            src={`${EmployeeData?.image} `}
                            className="object-cover w-full h-full"
                            alt="logo"
                          />
                        </div>
                        <p className="font-semibold text-center text-sm mb-1 ">
                          Employee ID Card
                        </p>
                      </div>

                      <div className="text-sm font-semibold flex flex-col mx-10 mt-3 ">
                        <div className="flex">
                          Employee Name : {EmployeeData?.firstname}{" "}{EmployeeData?.lastname}
                        </div>
                        <div>Department : {EmployeeData?.department?.department_name}</div>
                        <div>Designation: {EmployeeData?.designation?.designation_name}</div>
                        <div>Employee Code :{EmployeeData?.employeecode}</div>
                        <div>Contact No. : {EmployeeData?.mobile}</div>

                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                              alt="Director Signature"
                              className="w-full h-12 "
                            />
                            <p className="font-semibold text-sm text-center ">
                              Director
                            </p>
                          </div>
                          <div className="mt-3">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                              alt="Barcode"
                              className="w-full h-8 mb-2"
                            />
                            <p className="font-semibold text-sm text-center ">
                              Bar Code
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Director Signature and Barcode - Bottom Center */}
                    <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                      {CollegeData?.address},{" "}
                      {CollegeData?.city},{CollegeData?.state}
                      , {CollegeData?.country}, Pincode -{" "}
                      {CollegeData?.pincode}, telephone: +91{" "}
                      {CollegeData?.mobile}
                    </p>
                  </div>
                  {/* ):(
                      <div>
                        NO ID CARD DATA FOUND
                      </div>
                    )} */}

                  {/* Upload Barcode and Signature */}
                </div>
              </div>
            )}

            {template1 === "Horizontal Template1" && (
              <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%] pb-10">
                <h2 className="text-lg font-normal mb-4 border-b p-5">
                  Employee ID Card (Horizontal)
                </h2>
                <div className="flex justify-center pl-10">
                  <div className="bg-white text-black rounded-xl shadow-lg flex flex-col items-center w-[500px]">
                    {/* School Name - Upper Center */}
                    <p className="text-xl flex justify-center -pl-8 items-center px-3 gap-3 font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                      <img
                        src={`${CollegeData?.logo} `}
                        className="w-14 h-14 mr-6 rounded-full"
                        alt="logo"
                      />
                       <div className="text-center" >{CollegeData?.college}</div>
                    </p>

                    {/* Student Photo and Details */}
                    <div className="flex items-center gap-1  pt-4">
                      <div className="flex flex-col w-[40%]  ">
                        <div className="w-36 h-36 bg-gray-300 rounded-full mr-4">
                          <img
                            src={`${EmployeeData?.image}`}
                            alt="student"
                            className="object-cover w-full h-full"
                          />
                         
                        </div>
                        <p className="font-semibold text-center text-sm mb-1 -ml-2  whitespace-nowrap">
                          Employee ID Card
                        </p>
                      </div>

                      <div className="text-sm -mt-6 font-semibold">
                        <div className="flex whitespace-nowrap">
                          Employee Name : {EmployeeData?.firstname}{" "}{EmployeeData?.lastname}
                        </div>
                        <div>Department : {EmployeeData?.department?.department_name}</div>
                        <div>Designation: {EmployeeData?.designation?.designation_name}</div>
                        <div>Employee Code :{EmployeeData?.employeecode}</div>
                        <div>Contact No : {EmployeeData?.mobile}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5" >
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                        alt="Director Signature"
                        className="w-32 h-12 "
                      />
                      <p className="font-semibold text-sm text-center ">
                        Director
                      </p>
                    </div>
                    <div className="mt-3">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                        alt="Barcode"
                        className="w-52 h-8 mb-2"
                      />
                      <p className="font-semibold text-sm ">Bar Code</p>
                    </div>
                    </div>

                    {/* Director Signature and Barcode - Bottom Center */}
                    <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                      {CollegeData?.address},{" "}
                      {CollegeData?.city},{CollegeData?.state}
                      , {CollegeData?.country}, Pincode -{" "}
                      {CollegeData?.pincode}, telephone: +91{" "}
                      {CollegeData?.mobile}
                    </p>
                  </div>

                  {/* Upload Barcode and Signature */}
                </div>
              </div>
            )}

            {template1 === "Template1" && (
              <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%]">
                <h2 className="text-lg font-normal mb-4 border-b p-5">
                  Student ID Card Template (Horizontal)
                </h2>
                <div className="flex justify-center gap-6 pl-10">
                  {[1].map((items, index) => (
                    <div
                      key={index}
                      className="bg-white text-black rounded-xl shadow-lg flex flex-col items-center w-[500px]"
                    >
                      {/* School Name - Upper Center */}
                      <p className="text-xl font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                        School Name
                      </p>

                      {/* Employee Photo and Details */}
                      <div className="flex  pt-4">
                        <div className="flex flex-col w-[40%]  ">
                          <div className="w-36 h-36 bg-gray-300 rounded-full mr-8">
                            <img
                              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                              alt="student"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="font-semibold text-center text-sm mb-1  whitespace-nowrap">
                            Employee ID Card
                          </p>
                          <div>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                              alt="Director Signature"
                              className="w-32 h-12 "
                            />
                            <p className="font-semibold text-sm text-center ">
                              Director
                            </p>
                          </div>
                        </div>

                        <div className="text-sm font-semibold">
                          <div className="flex">Employee Name : </div>
                          <div>Department : </div>
                          <div>Designation: </div>
                          <div>Employee Code :</div>
                          <div>Contact No. : </div>

                          <div className="mt-3">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                              alt="Barcode"
                              className="w-52 h-8 mb-2"
                            />
                            <p className="font-semibold text-sm ">Bar Code</p>
                          </div>
                        </div>
                      </div>

                      {/* Director Signature and Barcode - Bottom Center */}
                      <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                        Your School Address, Street Name, City, District, State,
                        Pincode - 208023, telephone: +91 123465798
                      </p>
                    </div>
                  ))}

                  {/* Upload Barcode and Signature */}
                </div>

                <div className=" bg-white rounded-lg shadow-md mt-6 w-[98%] ">
                  <h2 className="text-lg font-normal mb-4 border-b p-5">
                    Employee ID Card Template (Vertical)
                  </h2>
                  <div className="flex justify-center gap-6 pl-28">
                    {[1].map((items, index) => (
                      <div
                        key={index}
                        className="bg-white text-black rounded-xl shadow-lg  items-center w-[400px]"
                      >
                        {/* School Name - Upper Center */}
                        <p className="text-xl font-medium mb-2 text-center w-full text-white dark-color rounded-t-xl py-4">
                          School Name
                        </p>

                        {/* Student Photo and Details */}
                        <div className="flex flex-col  pt-4">
                          <div className="flex flex-col border-b  ">
                            <div className="w-36 h-36 bg-gray-300  mx-auto ">
                              <img
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                alt="student"
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <p className="font-semibold text-center text-sm mb-1 ">
                              Student ID Card
                            </p>
                          </div>

                          <div className="text-sm font-semibold flex flex-col mx-10 mt-3 ">
                            <div className="flex">Employee Name : </div>
                            <div>Department : </div>
                            <div>Designation: </div>
                            <div>Employee Code :</div>
                            <div>Contact No. : </div>

                            <div className="grid grid-cols-2 gap-5">
                              <div>
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
                                  alt="Director Signature"
                                  className="w-full h-12 "
                                />
                                <p className="font-semibold text-sm text-center ">
                                  Director
                                </p>
                              </div>
                              <div className="mt-3">
                                <img
                                  src="https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"
                                  alt="Barcode"
                                  className="w-full h-8 mb-2"
                                />
                                <p className="font-semibold text-sm text-center ">
                                  Bar Code
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Director Signature and Barcode - Bottom Center */}
                        <p className="text-sm px-6 font-medium   w-full text-white dark-color rounded-b-xl py-4">
                          Your School Address, Street Name, City, District,
                          State, Pincode - 208023, telephone: +91 123465798
                        </p>
                      </div>
                    ))}

                    {/* Upload Barcode and Signature */}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentIdCard;
