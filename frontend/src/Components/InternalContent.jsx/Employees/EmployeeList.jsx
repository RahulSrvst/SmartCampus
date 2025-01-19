import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaRegEye, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Circles, ColorRing } from "react-loader-spinner";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState();
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
        console.log(response);
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

  const handleDelete = async (employee_id) => {
    console.log("Attempting to delete course with ID in body:", employee_id);

    const token = localStorage.getItem("token");
    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.addEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { employee_id },
      });

      if (response.status === 200) {
        toast.success("Employee Data deleted successfully");
        FetchEmployeeList();
      } else {
        console.error("Failed to delete course. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setDeletingLoader(false);
    }
  };

  return (
    <div className="ml-5 md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[6%] md:mt-[15%] lg:mt-[10%] mt-[35%] h-screen">
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
      <div className="flex items-center gap-2  md:gap-2 lg:text-base text-sm mb-3 md:mb-6">
        Employee Management <FaHome className="text-blue-900 w-4 h-4" /> -
        Employee List
      </div>

      <div className="flex justify-between text-xl w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%]  font-bold  p-4 md:p-6 dark-color text-white rounded-t-lg">
        <h2>Employee List</h2>
        <BsThreeDotsVertical />
      </div>

      <div className="shadow-md rounded-b-xl p-4 w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%]  bg-white">
        {/* Add New User Type Form */}
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

          <table className="w-[96%]  text-sm ">
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
                    Department
                    <HiOutlineArrowsUpDown className=" text-sm " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                    Higher Qualification
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
                    Email
                    <HiOutlineArrowsUpDown className=" text-sm " />
                  </div>
                </th>
                <th className="pl-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                    Manage
                    <HiOutlineArrowsUpDown className=" text-sm " />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {FetchingLoader && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
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
              {employeeList?.map((items, index) => (
                <tr
                  key={items.id}
                  className="text-sm  space-y-2 border-b border-slate-300 last:border-black  odd:bg-gray-100"
                >
                  <td className="border-r-2 whitespace-nowrap border-white px-4 ">
                    {index + 1}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                    {" "}
                    {items.employeecode}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                    {items.firstname} {items.lastname}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                    {" "}
                    {items?.department?.department_name}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                    {" "}
                    {items.qualification}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                    {items?.designation?.designation_name}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                    {items.email}
                  </td>
                  <td className="border-r-2 whitespace-nowrap border-white px-4 py-4  text-center">
                    <button
                      className="text-blue-900 mx-2"
                      aria-label="Edit course"
                    >
                      <FaRegEye
                        onClick={() => navigate(`/EmployeeProfile/${items._id}`)}
                        className="h-[16px] w-[16px] pt-0.5"
                      />
                    </button>
                    <button className="text-red-700" aria-label="Delete course">
                      <FaTrashAlt
                        onClick={() => handleDelete(items._id)}
                        className="h-3 w-3"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 py-2">
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

export default EmployeeList;
