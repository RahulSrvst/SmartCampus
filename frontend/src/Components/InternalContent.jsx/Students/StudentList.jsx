import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaHome, FaRegEye, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const StudentList = () => {


  const navigate = useNavigate();

  const [data,setData] = useState([]);
  const [FetchingLoader, setFetchingLoader] = useState(false); 
  const [deletingLoader, setDeletingLoader] = useState(false);


  const Fetchdata = async () =>{

    const token = localStorage.getItem("token");


    try{
      setFetchingLoader(true);
      const response = await axios.get(baseURL+API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        console.log(response.data.data)
        setData(response.data.data);
      } else {
        console.log("Error");
      }
  } catch (e) {
    console.log(e);
  }finally{
    setFetchingLoader(false);
  }
  }


  useEffect(()=>{
    Fetchdata();
  },[])


  const handleDelete = async (student_id) => {
    console.log("Attempting to delete course with ID in body:", student_id);

    const token = localStorage.getItem("token");
    try {
      setDeletingLoader(true);
      const response = await axios.delete(
        baseURL+API_URLS.studentAdmission,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          data: { student_id },
        }
      );

      if (response.status === 200) {
        toast.success("Student Data deleted successfully");
        Fetchdata();
      } else {
        console.error("Failed to delete course. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }finally{
      setDeletingLoader(false);
    }
  };




  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[22.5%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 text-sm mb-3 md:mb-8 ">
        <span className="text-lg">Students</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Student List
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 ">
        {/* Add Course Form */}
        <div className="bg-white  shadow-md rounded-lg w-[97%] md:w-[96%] mb-4">
          <h2 className="text-lg font-bold mb-4 dark-color p-6 text-white  rounded-t-lg">
            Student List
          </h2>

          <div className="bg-white px-3 pb-4    overflow-x-scroll">
            <div className="flex justify-between text-sm items-center mb-4">
              <div>
                <label>Show</label>
                <select className="mx-2 p-1 border border-gray-300 rounded">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <label>entries</label>
              </div>
              <div>
                <label className="ml-36">Search :</label>
                <input
                  type="text"
                  className="p-1 ml-2 border border-gray-300 rounded"
                  placeholder="Search..."
                />
              </div>
            </div>

            <div className="w-[100%]">
              <table className="w-full m-1">
                <thead>
                  <tr className=" border-b border-black">
                    <th className="pr-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Sr.No. <HiOutlineArrowsUpDown className=" text-sm" />
                      </div>
                    </th>
                    <th className="px-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Roll No
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    <th className="px-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Unique Id
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    
                    <th className="px-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Student Name
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    <th className="px-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Course
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    <th className="px-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Batch
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    <th className="pl-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Father Name
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    <th className="pl-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Father Mobile No.
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                    <th className="pl-2 py-2">
                      <div className="flex justify-between whitespace-nowrap gap-1 text-sm items-center">
                        Manage
                        <HiOutlineArrowsUpDown className=" text-sm " />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FetchingLoader && (
                <tr>
                  <td colSpan="12" className="text-center py-4">
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
                  {data.length >0 ? (data?.map((items, index) => (
                    <tr
                      key={items.id}
                      className="text-sm space-y-2 border-b border-slate-300 last:border-black odd:bg-gray-100"
                    >
                      <td className="border-r-2 whitespace-nowrap border-white px-4 ">
                        {index + 1}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.rollnumber}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.st_id}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.student_firstname} {" "}{items.student_middlename} {" "}{items.Student_lastname}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.course_name}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.batch_name}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.father_fullname}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4 ">
                        {items.father_mobile}
                      </td>
                      <td className="border-r-2 whitespace-nowrap border-white px-4 py-4  text-center">
                        <button
                          className="text-blue-900 mx-2"
                          aria-label="Edit course"
                        >
                          <FaRegEye onClick={()=>navigate(`/StudentsProfile/${items.id}`)} className="h-[16px] w-[16px] pt-0.5" />
                        </button>
                        <button
                          className="text-red-700"
                          aria-label="Delete course"
                        >
                          <FaTrashAlt onClick={()=>handleDelete(items.id)} className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                <tr>
                  <td colSpan="13" className="text-center text-gray-500 py-4">
                    No Student Data Available
                  </td>
                </tr>
              )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
              <p>Showing 1 to 1 of 1 entries</p>
              <div>
                <button className="text-blue-600 mx-2">Previous</button>
                <button className="bg-purple-500 text-white px-2 rounded">
                  1
                </button>
                <button className="text-blue-600 mx-2">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Course List Section */}
      </div>
    </div>
  );
};

export default StudentList;
