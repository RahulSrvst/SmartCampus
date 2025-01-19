import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const StudentCategory = () => {
  return (
    <div className="flex flex-wrap gap-x-4 ml-[25%] mt-[8%]">
      {/* Add Course Form */}
      <div className="bg-white  shadow-md rounded-lg w-full md:w-[40%] mb-4">
        <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white  rounded-t-lg">Add Batch</h2>
        
        <form className="p-4">
          <label className="block mb-2">Add New Category <span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Enter course name" />
          
          
          <label className="block mb-2">Course</label>
          <select className="w-full mb-4 p-2 border border-gray-300 rounded">
            <option>Please Select</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>

          <label className="block mb-2">Batch Name</label>
          <input type="number" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Enter working days" />

          <label className="block mb-2">Start Date</label>
          <input type="date" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Enter working days" />
          
          <label className="block mb-2">End Date</label>
          <input type="date" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Enter working days" />

          <label className="block mb-2">Max. no. of Student</label>
          <input type="number" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Enter working days" />

          

          
          <button type="submit" className=" w-[15%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      </div>

      {/* Course List Section */}
      <div className="bg-white p-6 shadow-md rounded-xl w-[50%] ml-4 h-[15%] overflow-scroll">
      <div className="flex justify-between items-center mb-4">
          <div>
            <label>Show</label>
            <select className="mx-2 p-1 border border-gray-300 rounded">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <label>entries</label>
          </div>
          <label className="ml-36">Search :</label>
          <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
        </div>
        
      <div className="w-[110%]">
        
        <table className="w-full m-1">
          <thead>
            <tr>
              <th className=" px-4 py-2">Course</th>
              <th className=" px-4 py-2">Attendance Type</th>
              <th className=" px-4 py-2">Minimum Attendance %</th>
              <th className=" px-4 py-2">Total Working Days</th>
              <th className=" px-4 py-2">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="border-t border-black px-2  bg-slate-100">BCA</td>
              <td className="border-t border-black px-4 py-2 bg-slate-100 ">Daily</td>
              <td className="border-t border-black px-4 py-2 bg-slate-100 ">80</td>
              <td className="border-t border-black px-4 py-2 bg-slate-100 ">365</td>
              <td className="border-t border-black px-4 py-2 bg-slate-100  text-center">
                <button className="text-blue-600 mx-2" aria-label="Edit course"><FaEdit /></button>
                <button className="text-red-600" aria-label="Delete course"><FaTrashAlt /></button>
              </td>
            </tr>
          </tbody>
        </table>
        
        
        </div>
        <div className="flex justify-between items-center mt-4">
          <p>Showing 1 to 1 of 1 entries</p>
          <div>
            <button className="text-blue-600 mx-2">Previous</button>
            <button className="bg-purple-500 text-white px-2 rounded">1</button>
            <button className="text-blue-600 mx-2">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCategory;
