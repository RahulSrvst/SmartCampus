import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaHome,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { API_URLS } from "../../Configs/urls";
import { baseURL } from "../../Configs/axios";
import axios from "axios";
import { BsEye } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

function ApproveLeave() {
  const [see, setSee] = useState("Student Request");

  const [leaveRequest, setLeaveRequest] = useState([]);

  const fetchLeaveData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.leaveRequestApi, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setLeaveRequest(response.data.data.all_leaves);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(leaveRequest);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const handleApproved = async (id, student_id, employee_id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        baseURL + API_URLS.leaveRequestApi,
        {
          leave_id: id,
          status: "Approved",
          student: student_id,
          employee: employee_id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Approved !");
        fetchLeaveData();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleREjected = async (id, student_id, employee_id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        baseURL + API_URLS.leaveRequestApi,
        {
          leave_id: id,
          status: "Rejected",
          student: student_id,
          employee: employee_id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Rejected !");
        fetchLeaveData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[10%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 lg:text-sm text-gray-800 text-sm mb-3 md:mb-5">
        Leave Management
        <FaHome className="text-[#192b4c] w-4 h-4" />- Approve Leave
      </div>

      {/* <div className="bg-white shadow-md rounded-t-lg  w-[98%]">
        <div className="text-lg border-b p-4">Approve Leave</div>

        <form className="text-sm text-gray-700 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Department</label>
              <input
                type="text"
                className="border w-full rounded-lg py-2 px-3"
              />
            </div>
            <div>
              <label>Stream</label>
              <input
                type="text"
                className="border w-full rounded-lg py-2 px-3"
              />
            </div>
          </div>
          <div>
            <button className="text-base bg-[#192b4c] text-white px-5 py-2 mt-4 rounded-lg">
              Search
            </button>
          </div>
        </form>
      </div> */}

      <div className="bg-white shadow-md rounded-b-lg  w-[98%]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-4 border-b">
          <h2 className="text-lg font-normal">Approve Leave List</h2>
        </div>

        <div className="bg-white w-full md:w-[98%] mb-4">
          <div className="border-b w-full">
            <div className="flex w-[60%]  text-sm">
              <button
                onClick={() => setSee("Student Request")}
                className={`${
                  see === "Student Request"
                    ? " bg-[#7047ee] text-white "
                    : "text-gray-600  bg-gray-100"
                } w-[100%] h-10`}
              >
                Student Request's
              </button>
              <button
                onClick={() => setSee("Employee Request")}
                className={`${
                  see === "Employee Request"
                    ? " bg-[#7047ee] text-white "
                    : "text-gray-600  bg-gray-100"
                } w-[100%] h-10`}
              >
                Employee Request's
              </button>
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
                        Approved By
                      </th>
                      <th className="text-start border border-gray-300 px-4 py-2">
                        Manage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequest?.filter(
                      (item) =>
                        !item.employee &&
                        item.status === "Pending"
                    ).length > 0 ? (
                      leaveRequest
                        ?.filter(
                          (item) =>
                            !item.employee &&
                            item.status === "Pending"
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
                              {item.fromdate}
                            </td>
                            <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                              {item.enddate}
                            </td>
                            <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                              {item.apllydate}
                            </td>
                            <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                              <span
                                className={`${
                                  item.status === "Pending" &&
                                  "bg-yellow-100 text-yellow-600 py-1 px-3 rounded-3xl"
                                } ${
                                  item.status === "Approved" &&
                                  "bg-green-100 text-green-600 py-1 px-3 rounded-3xl"
                                } ${
                                  item.status === "Rejected" &&
                                  "bg-red-100 text-red-600 py-1 px-3 rounded-3xl"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                              Admin
                            </td>
                            <td className="py-5 px-4 border space-x-1 text-xs flex">
                              <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                                <FaCheck
                                  onClick={() =>
                                    handleApproved(
                                      item.id,
                                      item.student,
                                      item.employee
                                    )
                                  }
                                />
                              </button>
                              <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                                <RxCross2
                                  onClick={() =>
                                    handleREjected(
                                      item.id,
                                      item.student,
                                      item.employee
                                    )
                                  }
                                />
                              </button>
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
                  </tbody>
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
                        Approved By
                      </th>
                      <th className="text-start border border-gray-300 px-4 py-2">
                        Manage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequest?.filter(
                      (item) => item.employee && item.status === "Pending"
                    ).length > 0 ? (
                      leaveRequest
                        ?.filter(
                          (item) => item.employee && item.status === "Pending"
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
                              {item.fromdate}
                            </td>
                            <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                              {item.enddate}
                            </td>
                            <td className="border border-gray-300 px-2 whitespace-nowrap py-5">
                              {item.apllydate}
                            </td>
                            <td
                              className={`border border-gray-300 px-2 whitespace-nowrap py-5`}
                            >
                              <span
                                className={`${
                                  item.status === "Pending" &&
                                  "bg-yellow-100 text-yellow-600 py-1 px-3 rounded-3xl"
                                } ${
                                  item.status === "Approved" &&
                                  "bg-green-100 text-green-600 py-1 px-3 rounded-3xl"
                                } ${
                                  item.status === "Rejected" &&
                                  "bg-red-100 text-red-600 py-1 px-3 rounded-3xl"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="border border-gray-300 whitespace-nowrap px-4 py-5">
                              Admin
                            </td>
                            <td className="py-5 px-4 border space-x-1 text-xs flex">
                              <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                                <FaCheck
                                  onClick={() =>
                                    handleApproved(
                                      item.id,
                                      item.student,
                                      item.employee
                                    )
                                  }
                                />
                              </button>
                              <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                                <RxCross2
                                  onClick={() =>
                                    handleREjected(
                                      item.id,
                                      item.student,
                                      item.employee
                                    )
                                  }
                                />
                              </button>
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
                  </tbody>
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

      {/* Modal */}
    </div>
  );
}

export default ApproveLeave;
