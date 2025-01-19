import React from 'react';
import { FaHome } from 'react-icons/fa';

const HostelVisitor = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] md:mt-[10%] mt-[35%] pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-500 space-x-2">
      <span className='text-xl' >Hostel</span>
        <FaHome />
        <span className="text-sm"> - Hostel Visitor</span>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm w-[96%] lg:w-[98%] ">
          <button className="px-4 py-2 text-white bg-purple rounded-md">Hostel Visitor</button>
          <button className="px-4 py-2 text-gray-500">List</button>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm w-[96%] lg:w-[98%]">
        <h2 className="text-xl font-semibold mb-4">Room Transfer/Vacate</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">User Type <span className="text-red-500">*</span></label>
            <select className="mt-2 p-2 border border-gray-300 rounded">
              <option>Select</option>
              {/* Options can be added here */}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Student/Employee Name <span className="text-red-500">*</span></label>
            <input type="text" className="mt-2 p-2 border border-gray-300 rounded" placeholder="Enter Name" />
          </div>

          <div className="flex items-end">
            <button className="p-2 w-full bg-blue-500 text-white rounded">Go</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Visitor Name <span className="text-red-500">*</span></label>
            <select className="mt-2 p-2 border border-gray-300 rounded">
              <option>Select</option>
              {/* Options can be added here */}
            </select>
          </div>

          

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Relation <span className="text-red-500">*</span></label>
            <select className="mt-2 p-2 border border-gray-300 rounded">
              <option>Select</option>
              {/* Options can be added here */}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Date<span className="text-red-500">*</span></label>
            <select className="mt-2 p-2 border border-gray-300 rounded">
              <option>Select</option>
              {/* Options can be added here */}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Time<span className="text-red-500">*</span></label>
            <select className="mt-2 p-2 border border-gray-300 rounded">
              <option>Select</option>
              {/* Options can be added here */}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-900 text-white rounded">Create</button>
        </div>
      </div>
    </div>
  );
};

export default HostelVisitor;
