import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const AddStudent = () => {
  return (
    <div className="flex flex-wrap gap-x-4 ml-[23%] mt-[8%] pb-16">

    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
            Account <FaHome className="text-blue-900 w-4 h-4" /> - Fees Type
    
            </div>
    
    
    
    
    <div className="bg-white  shadow-md rounded-lg w-full md:w-[98%] mb-4">
            <h2 className="text-xl border-b font-bold mb-4 px-6 py-4 text-black  rounded-t-lg">Add Fees Type</h2>
            
            <form className="p-4 grid grid-cols-3 gap-5">
            <div>
            <label className="block mb-2">Fees Group<span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Please Select" />
            </div>
            <div>
            <label className="block mb-2">Fees Type <span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Please Select" />
            </div>
            <div>
            <label className="block mb-2">Due Date <span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Please Select" />
            </div>
            
              
              
    
              
    
              
              <button type="submit" className=" w-[20%] h-12 -mt-6  bg-blue-900 text-white py-2 rounded-lg hover:bg-red-700">Save</button>
            </form>
    
            <div className="bg-white w-full md:w-[98%] mb-4">
            <h2 className="text-lg font-semibold mb-4 px-6 py-4 text-black  rounded-t-lg">Fees Type List</h2>
            
            <div className="bg-white p-2 ml-4  overflow-scroll">
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
              <label className="ml-[62%]">Search :</label>
              <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
            </div>
            
          <div className="w-[100%]">
            
            <table className="w-full m-1">
              <thead>
                <tr>
                  <th className="flex justify-start px-4 py-2">Fees Group</th>
                  <th className="flex justify-start px-4 py-2">Fees Code</th>
                  <th className="px-4 py-2">Action</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="border-t border-black px-4  bg-slate-100">BCA</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">Daily</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">80</td>
                  
                </tr>
    
                <tr className="">
                  <td className="border-t border-black px-5  bg-slate-100">BCA</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">Daily</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">80</td>
                  
                </tr>
    
                <tr className="">
                  <td className="border-t border-black px-5  bg-slate-100">BCA</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">Daily</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">80</td>
                  
                </tr>
    
                <tr className="">
                  <td className="border-t border-black px-5  bg-slate-100">BCA</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">Daily</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">80</td>
    
                </tr>
    
    
                <tr className="">
                  <td className="border-t border-black px-5  bg-slate-100">BCA</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">Daily</td>
                  <td className="border-t border-black px-4 py-5 bg-slate-100 ">80</td>
                 
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
          </div>
          {/* Add Course Form */}
         
    
          {/* Course List Section */}
          
        </div>


    
  );
};

export default AddStudent;
