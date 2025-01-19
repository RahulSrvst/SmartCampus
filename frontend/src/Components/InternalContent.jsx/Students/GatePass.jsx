import React, { useState } from "react";
import { FaHome, FaPrint } from "react-icons/fa";

const GatePass = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    studentName: "",
    reason: "",
    contactNumber: "",
    guardianName: "",
    guardianContact: "",
  });

  const [gatePass, setGatePass] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate gate pass
  const generateGatePass = () => {
    setGatePass({ ...formData });
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:-ml-0">
        <span className="">Students</span>
        <span className="text-blue-900 flex items-center text-[14px] ">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Gate Pass
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <div className=" bg-white rounded-lg shadow-md w-[98%]">
          {/* Form Section */}
          <h2 className="text-lg border-b p-4 font-normal mb-4">Student Gate Pass</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-700 px-4">
            <div>
              <label className="block font-normal mb-1">Course</label>
              <select
                name="course"
                className="w-full p-2 border rounded"
                value={formData.course}
                onChange={handleInputChange}
              >
                <option value="">Select Course</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
              </select>
            </div>
            <div>
              <label className="block font-normal mb-1">Batch</label>
              <select
                name="batch"
                className="w-full p-2 border rounded"
                value={formData.batch}
                onChange={handleInputChange}
              >
                <option value="">Select Batch</option>
                <option value="2020-2021">2020-2021</option>
                <option value="2021-2022">2021-2022</option>
              </select>
            </div>
            <div>
              <label className="block font-normal mb-1">Student Name</label>
              <input
                name="studentName"
                type="text"
                className="w-full p-2 border rounded"
                placeholder=""
                value={formData.studentName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-700 px-4">
            <div>
              <label className="block font-normal mb-1">Reason</label>
              <input
                name="reason"
                type="text"
                className="w-full p-2 border rounded"
                placeholder=""
                value={formData.reason}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-normal mb-1">Contact Number</label>
              <input
                name="contactNumber"
                type="text"
                className="w-full p-2 border rounded"
                placeholder=""
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-normal mb-1">Guardian Name</label>
              <input
                name="guardianName"
                type="text"
                className="w-full p-2 border rounded"
                placeholder=""
                value={formData.guardianName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-normal mb-1">
                Guardian Contact
              </label>
              <input
                name="guardianContact"
                type="text"
                className="w-full p-2 border rounded"
                placeholder=""
                value={formData.guardianContact}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center mt-6">
            <button
              type="button"
              onClick={generateGatePass}
              className="w-full md:w-auto bg-yellow-500 text-white font-normal px-4 py-1 rounded"
            >
              Generate Pass
            </button>
          </div>
          </div>
          

          {/* Gate Pass Display */}
          {gatePass && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-normal mb-4">Generated Gate Pass</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Name of Student:</h4>
                  <p>{gatePass.studentName}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Course:</h4>
                  <p>{gatePass.course}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Batch:</h4>
                  <p>{gatePass.batch}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Reason:</h4>
                  <p>{gatePass.reason}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Contact Number:</h4>
                  <p>{gatePass.contactNumber}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Guardian Name:</h4>
                  <p>{gatePass.guardianName}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Guardian Contact:</h4>
                  <p>{gatePass.guardianContact}</p>
                </div>
              </div>
              <div className="flex justify-start mt-4">
                <button className="bg-pink-500 text-white font-normal px-4 py-2 rounded flex items-center gap-2">
                  <FaPrint /> Print
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GatePass;
