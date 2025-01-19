import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const RequestDetail = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] md:mt-[10%] mt-[35%] pb-20" >
       <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8   ">
        <span className="text-xl" >Library </span><FaHome className="text-blue-900 w-4 h-4" /> - Request Details

        </div>
    <div className=" ">
      {/* Add Batch Form */}
      

      {/* Batch List Section */}
      <div className="bg-white  shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto">

      <div className="text-xl border-b p-6" >Request Book List</div>
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 p-6">
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
            <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
          </div>
        </div>

        <table className="w-full text-[16x] mx-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Sl. No.</th>
              <th className="px-4 py-2">User Type</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Book Number</th>
              <th className="px-4 py-2">Book Request Date</th>
              <th className="px-4 py-2">Need Level</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Accept/Reject</th>
            </tr>
          </thead>
          <tbody>
            
            <tr className="border-y h-5 border-black" ></tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 p-5">
          <p className="text-sm">Showing 1 to 1 of 1 entries</p>
          <div className="flex">
            <button className="text-blue-600 mx-2">Previous</button>
            <button className="bg-purple text-white px-2 rounded">1</button>
            <button className="text-blue-600 mx-2">Next</button>
          </div>
        </div>
      </div>
    </div>
      </div>
    
  );
};

export default RequestDetail;
