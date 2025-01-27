import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";

const RollNumber = () => {
  const [courses, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [id, setID] = useState(null);
  const [Batchid, setBatchID] = useState(null);
  const [Rollno, setRollno] = useState([]);

  // Fetch courses
  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.course, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 200) {
        setCourse(response.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch batches for a course
  const fetchBatch = async (id) => {
    if (!id) return; // Skip fetch if no valid ID
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.batch, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          course_id: id,
        },
      });
      if (response.status === 200) {
        setBatch(response.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch batches when a course is selected
  useEffect(() => {
    fetchBatch(id);
  }, [id]);

  const fetchStudentRollNo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          batch_id: Batchid,
        },
      });
      if (response.status === 200) {
        setRollno(response.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2">
        <span className="text-[20px]">Students</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Roll Number
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[97%] mb-4">
          <h2 className="text-lg border-b font-normal mb-4 px-4 py-4 text-black rounded-t-lg">
            Student Roll Number
          </h2>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-700">
            <div>
              <label className="block mb-2">Course</label>
              <select
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setID(e.target.value)}
              >
                <option value="">Please Select</option>
                {courses?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Batch</label>
              {batch && batch.length > 0 ? (
                <select
                  className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                  onChange={(e) => setBatchID(e.target.value)}
                >
                  <option>Please Select</option>
                  {batch.map((b, index) => (
                    <option key={index} value={b._id}>
                      {b.batch_name}
                    </option>
                  ))}
                </select>
              ) : (
                <select className="w-[100%] mb-4 p-2 border border-gray-300 rounded">
                  <option>No batch data available.</option>
                </select>
              )}
            </div>

            <button
              onClick={fetchStudentRollNo}
              className=" w-[20%] h-9  bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
        {/* Add Course Form */}
        <div className="bg-white  shadow-md rounded-lg w-[96%] md:w-[97%] mb-4">
          <h2 className="text-lg font-normal border-b mb-4 px-6 py-4 text-black  rounded-t-lg">
            Student List
          </h2>

          <div className="bg-white p-2 ml-4 pr-6">
            <div className="md:flex text-sm  hidden justify-between items-center mb-4">
              <div>
                <label>Show</label>
                <select className="mx-2 p-1 border border-gray-300 rounded">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <label>entries</label>
              </div>
              <label className="ml-[62%]">Search :</label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search..."
              />
            </div>

            <div className="w-[100%]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-sm border-b border-black">
                    <th className="px-4 py-2">
                      <div className="flex justify-between">
                        Sl No.
                        <HiOutlineArrowsUpDown />
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div className="flex justify-between">
                        Course Name
                        <HiOutlineArrowsUpDown />
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div className="flex justify-between">
                        Batch Name
                        <HiOutlineArrowsUpDown />
                      </div>
                    </th>

                    <th className="px-4 py-2">
                      <div className="flex justify-between">
                        Student Roll No. <HiOutlineArrowsUpDown />
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <div className="flex justify-between">
                        Student Name
                        <HiOutlineArrowsUpDown />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Rollno.map((items, index) => (
                    <tr className="text-sm space-y-2 border-b border-slate-300  odd:bg-gray-100">
                      <td className="border-r-2 border-white px-4 ">
                        {index + 1}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items.course.course_name}
                      </td>
                      <td className="border-r-2 border-white px-2 py-4 ">
                        {items.batch.batch_name}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items.rollnumber}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items.student_firstname} {items.Student_lastname}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex text-sm justify-between items-center mt-4 py-2">
              <p>Showing 1 to 1 of 1 entries</p>
              <div className="text-sm">
                <button className="text-blue-600 mx-2">Previous</button>
                <button className="bg-purple text-white px-2 rounded">1</button>
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

export default RollNumber;
