import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import Axios from "axios";

const GetAllStudentFees = () => {
  const [studentsFees, setStudentsFees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all student fees when the component mounts
  useEffect(() => {
    fetchStudentFees();
  }, []);

  // API call to fetch student fees
  const fetchStudentFees = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("https://api.example.com/fees"); 
      setStudentsFees(response.data);
    } catch (error) {
      console.error("Error fetching student fees:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        Account <FaHome className="text-blue-900 w-4 h-4" /> - Manage Student Fees
      </div>

      {/* Student Fees Data Table */}
      <div className="bg-white shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4">
        <h2 className="text-lg font-normal border-b mb-4 px-6 py-4 text-black rounded-t-lg">
          Student Fees Details
        </h2>

        <div className="bg-white p-2 mx-4">
          {/* Loading state */}
          {loading && <div>Loading student fee details...</div>}

          {/* Table for displaying student fees */}
          {!loading && studentsFees.length > 0 && (
            <div className="w-[100%] text-sm">
              <table className="w-full m-1 border border-separate">
                <thead>
                  <tr>
                    <th className="text-start border px-4 py-2">Name</th>
                    <th className="text-start border py-2">Roll Number</th>
                    <th className="text-start border py-2">Fee Amount</th>
                    <th className="text-start border px-4 py-2">Session</th>
                    <th className="text-start border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsFees.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="border border-gray-200 px-4">{student.name}</td>
                      <td className="border border-gray-200 px-4 py-5">{student.rollNumber}</td>
                      <td className="border border-gray-200 px-4 py-5">{student.feeAmount}</td>
                      <td className="border border-gray-200 px-4 py-5">{student.session}</td>
                      <td className="border border-gray-200 px-4 py-5">
                        <BsThreeDotsVertical />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* If no fees are found */}
          {!loading && studentsFees.length === 0 && (
            <div>No student fees found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllStudentFees;
