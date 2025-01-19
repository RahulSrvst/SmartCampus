

import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const ViewTeacherTimeTable = () => {
  return (
    <div className=" gap-x-4 ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">

<div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2  ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Time Table</span><span className="text-[14px]  mt-0.5" > - View Time Table </span>
      </div>
      {/* Add Course Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[96%] mb-4">
        <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white  rounded-t-lg">View Time Table</h2>
        
        <form className="p-4">
          <label className="block mb-2">View Time Table<span className="text-red-500">*</span></label>
          <select className="xl:w-[25%] md:w-[60%] w-[100%] mb-4 p-2 border border-gray-300 rounded">
            <option>Please Select</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>          
          
          
          <button type="submit" className=" ml-10 xl:w-[15%] md:w-[25%] w-[35%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 whitespace-nowrap  ">Show Time Table</button>
        </form>
      </div>

      {/* Course List Section */}
      <h2 className="text-xl font-bold  dark-color p-6 text-white  rounded-t-lg w-[96%] lg:w-[96%] xl:w-[96%] md:w-[96%] ">View Time Table</h2>
      <div className="bg-white shadow-md rounded-b-xl w-[96%] lg:w-[96%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto">
      
        
      <div className="flex justify-between items-center mb-4 px-6 mt-3 ">
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
        
      <div className="w-[98%] px-6">
        
        <table className="w-full m-1">
          <thead>
            <tr>
              <th className=" px-4 py-2 border-b border-black">Week Days</th>
              <th className=" px-4 py-2 border-b border-black">Lecture 1</th>
              <th className=" px-4 py-2 border-b border-black">Lecture 2</th>
              <th className=" px-4 py-2 border-b border-black">Lecture 3</th>
              
            </tr>
          </thead>
          <tbody>
            <tr className="hover:cursor-pointer hover:bg-slate-100 py-5 border-b border-black">
              <td className=" px-2 border-r-4 border-white  ">Sunday</td>
              <td className=" px-4 py-2 border-r-4 border-white  "><span><p>C++ programming</p><p>Shubham</p><p>10:00 AM to 12:00 PM</p></span></td>
              <td className=" px-4 py-2 border-r-4 border-white "><span><p>C programming</p><p>Shubham</p><p>10:00 AM to 12:00 PM</p></span></td>
              <td className=" px-4 py-2  "><span><p>Python programming</p><p>Shubham</p><p>10:00 AM to 12:00 PM</p></span></td>
              
            </tr>
          </tbody>
        </table>
        
        
        </div>
        <div className="flex justify-between items-center mt-4 p-6 ">
          <p>Showing 1 to 1 of 1 entries</p>
          <div>
            <button className="text-blue-600 mx-2">Previous</button>
            <button className="bg-purple text-white px-2 rounded">1</button>
            <button className="text-blue-600 mx-2">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherTimeTable;

