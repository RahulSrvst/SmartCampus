import React from 'react';
import { FaHome } from 'react-icons/fa';

const PromotionAlumni = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[22.5%] xl:mt-[ 8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8  ">
     <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Promotion & Alumuni</span><span className="text-[14px]  mt-0.5 lg:flex hidden " > - Promotion & Alumuni</span>
   </div>
      {/* Step Indicator */}
      <div className="flex space-x-4 mb-6">
        <div className="flex items-center">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-tl-lg rounded-bl-lg">STEP 1</div>
          <div className="h-10 w-1 bg-gray-200"></div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-200 text-gray-600 px-4 py-2">STEP 2</div>
        </div>
      </div>

      {/* Promotion & Alumni Section */}
      <div className="bg-white shadow-md rounded-lg p-5 w-[96%] md:w-[96%] lg:w-[95%] xl:w-[98%] mb-4">
        <h2 className="text-xl font-semibold mb-4">Promotion & Alumni</h2>

        {/* Form Fields */}
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">Course</label>
            <select className="w-full p-2 border rounded-md">
              <option>BCA</option>
              {/* Add more course options if needed */}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">Batch</label>
            <select className="w-full p-2 border rounded-md">
              <option>2020-2021</option>
              {/* Add more batch options if needed */}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Student Admission No.</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Student Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Attendance %</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Status</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Check</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows can be dynamically generated here */}
              <tr>
                <td className="py-2 px-4 border-b border-gray-200"></td>
                <td className="py-2 px-4 border-b border-gray-200"></td>
                <td className="py-2 px-4 border-b border-gray-200"></td>
                <td className="py-2 px-4 border-b border-gray-200"></td>
                <td className="py-2 px-4 border-b border-gray-200"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Promote To Button */}
        <div className="mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">Promote To</button>
        </div>
      </div>
    </div>
  );
};

export default PromotionAlumni;
