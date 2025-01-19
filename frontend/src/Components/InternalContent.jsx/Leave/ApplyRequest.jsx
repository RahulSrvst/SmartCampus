import React, { useEffect, useState } from "react";
import { FaHome, FaTrashAlt } from "react-icons/fa";
import LeaveRequestModal from "./LeaveRequestModal";
import axios from "axios";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { BsEye } from "react-icons/bs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ApplyRequest() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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

  const [leaveRequest, setLeaveRequest] = useState([]);

  const navigate = useNavigate();

  const fetchLeaveData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.leaveRequestApi, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params:{
          employee_id:localStorage.getItem("employee_id"),
          student_id:localStorage.getItem("student_id"),
        }
      });
      if(localStorage.getItem("user_type") === "Admin"){
        setLeaveRequest(response.data.data.all_leaves);
      }else if(localStorage.getItem("user_type") === "employee"){
        setLeaveRequest(response.data.data);
      }else if(localStorage.getItem("user_type") === "student"){
        setLeaveRequest(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(leaveRequest);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const handleDelete = async (leave_id) => {
    console.log("Deleting Driver with ID:", leave_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("leave_id", leave_id);

    try {
      // setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.leaveRequestApi, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Leave Data deleted successfully");
        fetchLeaveData();
      } else {
        console.error("Failed to delete Room Data:", response.status);
      }
    } catch (error) {
      console.error("Error deleting Room Data:", error);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] mt-[35%] md:mt-[10%] xl:mt-[8%] pb-20">
      <div>
        <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8">
          Leave <FaHome className="text-[#192b4c] w-4 h-4" /> - Apply Leave
        </div>

        <div className="bg-white shadow-md rounded-lg w-[96%] lg:w-[97%] mb-4">
          <div className="flex justify-between text-lg border-b font-normal  px-6 py-4 text-black rounded-t-lg">
            <h2>Apply Leave Request</h2>
            <button
              onClick={handleOpenModal}
              className="text-base px-3 py-1 bg-[#192b4c] text-white rounded-lg"
            >
              Add Leave Request
            </button>
          </div>

          <div className="bg-white w-full md:w-[98%] mb-4">
            <div className="border-b w-full">
              <div className="flex w-[60%]  text-sm">
                {(localStorage.getItem("user_type") === "Admin" || localStorage.getItem("user_type") === "students") && <button
                  onClick={() => setSee("Student Request")}
                  className={`${
                    see === "Student Request"
                      ? " bg-[#7047ee] text-white "
                      : "text-gray-600  bg-gray-100"
                  } w-[100%] h-10`}
                >
                  Student Request's
                </button>}
                {(localStorage.getItem("user_type") === "Admin" || localStorage.getItem("user_type") === "employee") && <button
                  onClick={() => setSee("Employee Request")}
                  className={`${
                    see === "Employee Request"
                      ? " bg-[#7047ee] text-white "
                      : "text-gray-600  bg-gray-100"
                  } w-[100%] h-10`}
                >
                  Employee Request's
                </button>}
              </div>
            </div>
            {see === "Student Request" && (
              <div className="bg-white p-2 ml-4 overflow-auto">
                <div className="flex text-sm justify-between items-center mb-4">
                  <div className="flex items-center">
                    <label>Show</label>
                    <select className="mx-2 p-1 border border-gray-300 rounded">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                    <label>entries</label>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2">Search :</label>
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                <div className="w-[100%] overflow-x-scroll">
                  <table className="w-full m-1 text-sm border border-separate">
                    <thead>
                      <tr>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Sl No.
                        </th>{" "}
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Student Name
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Course
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Batch
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Leave Type
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          From Date
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          To Date
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Apply Date
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Status
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    {localStorage.getItem("user_type")=== "Admin" &&<tbody>
                      {leaveRequest?.filter(
                        (item) =>
                          !item.employee && item.status === "Pending"
                      ).length > 0 ? (
                        leaveRequest
                          ?.filter(
                            (item) =>
                              !item.employee && item.status === "Pending"
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 whitespace-nowrap px-4">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4">
                                {item.student_name} {item.last_name}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.course_name}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.batch_name}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.leave_type}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.fromdate}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.enddate}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.apllydate}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.status}
                              </td>
                              <td className="py-5 px-4 border space-x-1 text-xs flex">
                                <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                                  <BsEye
                                    onClick={() =>
                                      navigate("/LeaveData", {
                                        state: {
                                          id: item.id,
                                          usertype: item.usertype,
                                        },
                                      })
                                    }
                                  />
                                </button>
                                {localStorage.getItem("user_type") === "Admin" && <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                                  <FaTrashAlt
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </button>}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center py-5">
                            No Record Found
                          </td>
                        </tr>
                      )}
                    </tbody>}

                    {localStorage.getItem("user_type")=== "student" &&<tbody>
                      {leaveRequest?.filter(
                        (item) =>
                          !item.employee
                      ).length > 0 ? (
                        leaveRequest
                          ?.filter(
                            (item) =>
                              !item.employee 
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 whitespace-nowrap px-4">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4">
                                {item.student_name} {item.last_name}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.course_name}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.batch_name}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.leave_type}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.fromdate}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.enddate}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.apllydate}
                              </td>
                              <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                                {item.status}
                              </td>
                              <td className="py-5 px-4 border space-x-1 text-xs flex">
                                <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                                  <BsEye
                                    onClick={() =>
                                      navigate("/LeaveData", {
                                        state: {
                                          id: item.id,
                                          usertype: item.usertype,
                                        },
                                      })
                                    }
                                  />
                                </button>
                                {localStorage.getItem("user_type") === "Admin" && <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                                  <FaTrashAlt
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </button>}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center py-5">
                            No Record Found
                          </td>
                        </tr>
                      )}
                    </tbody>}
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p>Showing 1 to 1 of 1 entries</p>
                  <div>
                    <button className="text-blue-600 mx-2">Previous</button>
                    <button className="bg-purple text-white px-2 rounded">
                      1
                    </button>
                    <button className="text-blue-600 mx-2">Next</button>
                  </div>
                </div>
              </div>
            )}

            {see === "Employee Request" && (
              <div className="bg-white p-2 ml-4 overflow-auto">
                <div className="flex text-sm justify-between items-center mb-4">
                  <div className="flex items-center">
                    <label>Show</label>
                    <select className="mx-2 p-1 border border-gray-300 rounded">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                    <label>entries</label>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2">Search :</label>
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                <div className="w-[100%]">
                  <table className="w-full m-1 text-sm border border-separate">
                    <thead>
                      <tr>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Sl No.
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Employee Name
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Designation Name
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Leave Type
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          From Date
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          To Date
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Apply Date
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Status
                        </th>
                        <th className="text-start border border-gray-300 px-4 py-2">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    {localStorage.getItem("user_type")=== "Admin" && <tbody>
                      {leaveRequest?.filter(
                        (item) =>
                          item.employee &&
                          item.status === "Pending"
                      ).length > 0 ? (
                        leaveRequest
                          ?.filter(
                            (item) =>
                              item.employee &&
                              item.status === "Pending"
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 px-2 whitespace-nowrap">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap">
                                {item.employee_name} {item.lastname}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.designation_name}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.leave_type}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.fromdate}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.enddate}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.apllydate}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.status}
                              </td>
                              <td className="py-5 px-2 border space-x-1 text-xs flex">
                                <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                                  <BsEye
                                    onClick={() =>
                                      navigate("/LeaveData", {
                                        state: {
                                          id: item.id,
                                          usertype: item.usertype,
                                        },
                                      })
                                    }
                                  />
                                </button>
                                {localStorage.getItem("user_type") === "Admin" && <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                                  <FaTrashAlt
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </button>}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-5">
                            No Record Found
                          </td>
                        </tr>
                      )}
                    </tbody>}

                    {localStorage.getItem("user_type")=== "employee" && <tbody>
                      {leaveRequest?.filter(
                        (item) =>
                          item.employee
                      ).length > 0 ? (
                        leaveRequest
                          ?.filter(
                            (item) =>
                              item.employee 
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 px-2 whitespace-nowrap">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap">
                                {item.employee_name} {item.lastname}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.designation_name}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.leave_type}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.fromdate}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.enddate}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.apllydate}
                              </td>
                              <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                                {item.status}
                              </td>
                              <td className="py-5 px-2 border space-x-1 text-xs flex">
                                <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                                  <BsEye
                                    onClick={() =>
                                      navigate("/LeaveData", {
                                        state: {
                                          id: item.id,
                                          usertype: item.usertype,
                                        },
                                      })
                                    }
                                  />
                                </button>
                                {localStorage.getItem("user_type") === "Admin" && <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                                  <FaTrashAlt
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </button>}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-5">
                            No Record Found
                          </td>
                        </tr>
                      )}
                    </tbody>}
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p>Showing 1 to 1 of 1 entries</p>
                  <div>
                    <button className="text-blue-600 mx-2">Previous</button>
                    <button className="bg-purple text-white px-2 rounded">
                      1
                    </button>
                    <button className="text-blue-600 mx-2">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div>
          <LeaveRequestModal handleCloseModal={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default ApplyRequest;
