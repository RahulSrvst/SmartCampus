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
import toast from "react-hot-toast";

const PrintLists = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [FetchingLoader, setFetchingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const FetchEmployeeList = async () => {
    const token = localStorage.getItem("token");

    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.addEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(response.data.data);
        setEmployeeList(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setFetchingLoader(false);
    }
  };

  useEffect(() => {
    FetchEmployeeList();
  }, []);

  const [reportType, setReportType] = useState("UserType Wise");

  const [userData, setUserData] = useState();
  const [departmentData, setDepartmentData] = useState();
  const [designationData, setDesignationData] = useState();
  const [userId, setUserId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [designationId, setDesignationId] = useState();

  const initialValues = {
    department: "",
    designation: "",
  };



  const fetchDepartmentTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.department, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setDepartmentData(response.data.data);
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
      const response = await axios.get(baseURL + API_URLS.designation, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setDesignationData(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDepartmentTypes();
    fetchDesignationTypes();
  }, []);

  function handleUserTypeID(id) {
    setUserId(id);
  }

  function handleDepartmentID(id) {
    setDepartmentId(id);
  }

  function handleDesignationID(id) {
    setDesignationId(id);
  }

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: initialValues,
    onSubmit:async (values) => {
      console.log(values);

      

      const token = localStorage.getItem("token");
      if (reportType === "UserType Wise") {
      try {
        setFetchingLoader(true);
        const response = await axios.get(baseURL + API_URLS.addEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },params:{
            user_type_id:userId,
          }
        });
        if (response.status === 200) {
          const Emp_data = response.data.data;
            if (Emp_data && Emp_data.length > 0) {
              setEmployeeList(Emp_data);
              // console.log(Emp_data);
            } else {
              setEmployeeList([]);
              toast.success("There is No Data for this UserType")
            }
        } else {
          console.log("Error");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setFetchingLoader(false);
      }
      }else if(reportType === "Department Wise"){
        try {
          setFetchingLoader(true);
          const response = await axios.get(baseURL + API_URLS.addEmployee, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },params:{
              department_id:departmentId,
            }
          });
          if (response.status === 200) {
            
            const Emp_data = response.data.data;
            if (Emp_data && Emp_data.length > 0) {
              setEmployeeList(Emp_data);
              // console.log(Emp_data);
            } else {
              setEmployeeList([]);
              toast.success("There is No Data for this Department")
            }
          } else {
            console.log("Error");
          }
        } catch (e) {
          console.log(e);
        } finally {
          setFetchingLoader(false);
        }
      }else{
        try {
          setFetchingLoader(true);
          const response = await axios.get(baseURL + API_URLS.addEmployee, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },params:{
              designation_id:designationId,
            }
          });
          if (response.status === 200) {
            const Emp_data = response.data.data;
            if (Emp_data && Emp_data.length > 0) {
              setEmployeeList(Emp_data);
              // console.log(Emp_data);
            } else {
              setEmployeeList([]);
              toast.success("There is No Data for this Designation")
            }
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

  console.log(employeeList);

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

          <form onSubmit={handleSubmit} className="p-4 grid grid-cols-4 gap-5 text-sm text-gray-700">
            <div>
              <label className="block mb-2">Report Type</label>
              <select
                className="w-[100%] mb-4 p-1.5 border border-gray-300 rounded"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="">Select Report Type</option>
                <option value="Department Wise">Department Wise</option>
                <option value="Designation Wise">Designation Wise</option>
              </select>
            </div>
            <div>
            {reportType==="Department Wise" && 
              <div>
              <label className="block mb-2">
                Department<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleDepartmentID(e.target.value);
                }}
                value={values.department}
                name="department"
              >
                <option value="" disabled>
                  Please Select
                </option>
                {departmentData?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.department_name}
                  </option>
                ))}
              </select>
              </div>
            }



            {reportType==="Designation Wise" && 
              <div>
              <label className="block mb-2">
                  Designation <span className="text-red-500">*</span>
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
                    <option key={items._id} value={items._id}>
                      {items.designation_name}
                    </option>
                  ))}
                </select>
              </div>
            }
              
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
        <div className="bg-white  shadow-md rounded-lg w-[96%] md:w-[97%] mb-4 p-5">
          <h2 className="text-lg mb-4">Employee List</h2>
          {/* Export Buttons */}
          <div className="flex  mb-4">
            <button className="text-2xl bg-sky-100 p-2 text-green-600 rounded-l-md">
              <BsFileEarmarkPdf />
            </button>
            <button className="text-2xl bg-sky-100 p-2 text-purple-500">
              <IoDocumentTextSharp />
            </button>
            <button className="text-2xl bg-sky-100 p-2 text-yellow-500">
              <AiOutlineFileExcel />
            </button>
            <button className="text-2xl bg-sky-100 p-2 text-red-500">
              <HiOutlineDocumentAdd />
            </button>
            <button className="text-2xl bg-sky-100 p-2 text-sky-500 rounded-r-md">
              <AiOutlineFileWord />
            </button>
          </div>
          {/* Table */}
          <div className="bg-white pb-5  overflow-auto">
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
                      Sr.No. <HiOutlineArrowsUpDown className=" text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Employee Code
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Employee Name
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Joining Date
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Designation
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Address
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Email
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="pl-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Mobile
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="pl-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      DOB
                      <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="pl-4 py-2">
                    <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                      Higher Qualification
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
                {employeeList.length > 0 ? ( employeeList?.map((items, index) => {
                  const date = new Date(items.joiningdate).toLocaleDateString();

                  return (
                    <tr key={items.id} className="border-b text-sm odd:bg-gray-100 last:border-black">
                      <td className="py-4 whitespace-nowrap px-4">
                        {index + 1}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        {items.employeecode}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        {items.firstname} {items.lastname}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">{date}</td>
                      <td className="py-4 whitespace-nowrap px-4">
                        <span className="px-4 py-1 bg-purple-500 text-white rounded">
                          {items?.designation?.designation_name}
                        </span>
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        {items.permanentaddress}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        {items.email}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        {items.mobile}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        {items.birthdate}
                      </td>
                      <td className="py-4 whitespace-nowrap px-4">
                        <span className="px-4 py-1  bg-red-500 text-white rounded">
                          {items.qualification}
                        </span>
                      </td>
                    </tr>
                  );
                }))
               :(
                <tr>
                  <td colSpan={11}  className="text-center text-gray-500 text-sm py-3 " >
                    No Employee Data Available
                  </td>
                </tr>
               ) }
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-2">
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

export default PrintLists;
