import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const SearchProxy = () => {
  return (
    <div className="  gap-x-4 ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2 ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Time Table</span><span className="text-[14px]  mt-0.5" > - Serach Proxy</span>
      </div>
      {/* Add Course Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[96%] mb-4">
        <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white  rounded-t-lg">Allocate Proxy</h2>
        
        <form className="p-4 xl:flex grid grid-cols-3 gap-3 ">
          
               
          <div>
          <label className="block mb-2">Choose Date<span className="text-red-500">*</span></label>
          <input type="date" className=" w-[98%]  mb-4 p-2 border border-gray-300 rounded mt-6 md:mt-0 " />
          
          </div>

          <div>
          <label className="block mb-2">View Time Table<span className="text-red-500">*</span></label>
          <select className=" w-[98%]  mb-4 p-2 border border-gray-300 rounded">
            <option>Please Select</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>  
          </div>   


            <div>
            <label className="block mb-2">View Time Table<span className="text-red-500">*</span></label>
          <select className=" w-[98%]  mb-4 p-2 border border-gray-300 rounded">
            <option>Please Select</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>   
            </div>       
          
          
          <button type="submit" className=" xl:ml-10 xl:my-6 xl:w-[15%] w-[100%] whitespace-nowrap bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Show Time Table</button>
        </form>
      </div>

      {/* Course List Section */}
      <div className="bg-white  shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto">
      
        <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white  rounded-t-lg">Proxy Teacher Available List</h2>
      <div className="flex justify-between items-center mb-4 px-6">
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
          <input type="text" className="p-1 border border-gray-300 rounded lg:flex hidden " placeholder="Search..." />
        </div>
        
      <div className="w-[98%] px-6">
        
        <table className="w-full m-1">
          <thead>
            <tr>
              <th className=" px-4 py-2 border-b border-black">Teachre Name</th>
              <th className=" px-4 py-2 border-b border-black">Allocate</th>
              <th className=" px-4 py-2 border-b border-black">SMS</th>
              
            </tr>
          </thead>
          <tbody>
            <tr className="hover:cursor-pointer hover:bg-slate-100 py-5 border-b border-black">
              <td className=" px-2 border-r-4 border-white py-5  ">- -</td>
              <td className=" px-2 border-r-4 border-white py-5 ">- -</td>
              <td className=" px-2 border-r-4 border-white py-5 ">- -</td>
              
            </tr>
          </tbody>
        </table>
        
        
        </div>
        <div className="flex justify-between items-center mt-4 p-6 ">
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

export default SearchProxy;
