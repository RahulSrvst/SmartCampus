import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import Axios from "axios";
import { Formik, Field, Form } from "formik";

// Component for managing student fees
const ManageStudentFees = () => {
  const [studentsFees, setStudentsFees] = useState([]);

  // Fetch student fees from API on component mount
  useEffect(() => {
    fetchStudentFees();
  }, []);

  // API call to fetch all student fees
  const fetchStudentFees = async () => {
    try {
      const response = await Axios.get("https://api.example.com/fees"); // Replace with your API endpoint
      setStudentsFees(response.data);
    } catch (error) {
      console.error("Error fetching student fees:", error);
    }
  };

  // API call to post new student fee data
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await Axios.post("https://api.example.com/fees", values); // Replace with your API endpoint
      fetchStudentFees(); // Refresh the fee data
      resetForm(); // Reset form after submission
    } catch (error) {
      console.error("Error posting student fee data:", error);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        Account <FaHome className="text-blue-900 w-4 h-4" /> - Manage Student Fees
      </div>

      {/* Add New Fees Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4">
        <h2 className="text-lg border-b font-normal mb-4 px-4 py-4 text-black rounded-t-lg">
          Add Student Fees
        </h2>

        <Formik
          initialValues={{ name: "", rollNumber: "", feeAmount: "", session: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="p-4 grid grid-cols-2 gap-5 text-sm text-gray-700">
            <div>
              <label className="block mb-2">Student Name</label>
              <Field
                name="name"
                type="text"
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Student Name"
              />
            </div>
            <div>
              <label className="block mb-2">Roll Number</label>
              <Field
                name="rollNumber"
                type="text"
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Roll Number"
              />
            </div>
            <div>
              <label className="block mb-2">Fee Amount</label>
              <Field
                name="feeAmount"
                type="text"
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Fee Amount"
              />
            </div>
            <div>
              <label className="block mb-2">Session</label>
              <Field
                name="session"
                type="text"
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Session"
              />
            </div>

            <button
              type="submit"
              className="w-[50%] lg:w-[15%] h-12 -mt-6 bg-[#192b4c] text-white py-2 rounded-lg"
            >
              Save
            </button>
          </Form>
        </Formik>
      </div>

      {/* Fees Data Table */}
      <div className="bg-white shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4">
        <h2 className="text-lg font-normal border-b mb-4 px-6 py-4 text-black rounded-t-lg">
          Student Fees Details
        </h2>

        <div className="bg-white p-2 mx-4">
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
            <label className="ml-[62%]">Search :</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              placeholder="Search..."
            />
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default ManageStudentFees;
