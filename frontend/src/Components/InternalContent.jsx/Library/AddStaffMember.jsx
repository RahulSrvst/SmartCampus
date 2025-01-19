import React from "react";
import { FaEdit, FaHome, FaPlus, FaTrashAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

const AddStaffMember = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] md:mt-[10%] mt-[35%] h-screen">

    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
            Library <FaHome className="text-blue-900 w-4 h-4" /> - Add Staff Members
    
            </div>
    
    
    
    
    <div className="bg-white  shadow-md rounded-lg w-[96%] lg:w-[97%] mb-4">
            <h2 className="text-xl border-b font-bold mb-4 px-6 py-4 text-black  rounded-t-lg">Add Members</h2>
            
           
    
            <div className="bg-white w-full md:w-[98%] mb-4">
                     
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
            
          <table className="w-full text-[16px] mx-6">
       <thead>
         <tr>
           <th className="px-4 py-2 border">Member ID</th>
           <th className="px-4 py-2 border">Library Card No</th>
           <th className="px-4 py-2 border">Staff Name</th>
           <th className="px-4 py-2 border">Email</th>
           <th className="px-4 py-2 border">Date Of Birth</th>
           <th className="px-4 py-2 border">Phone </th>
           <th className="px-4 py-2 border">Action</th>
           
         </tr>
       </thead>
       <tbody>
         <tr>
           <td className="border-t border-gray-300 px-2 border">12</td>
           <td className="border-t border-gray-300 px-4 py-2 border">12225</td>
           <td className="border-t border-gray-300 px-4 py-2 border">1342</td>
           <td className="border-t border-gray-300 px-4 py-2 border">john</td>
           <td className="border-t border-gray-300 px-4 py-2 border">Student</td>
           <td className="border-t border-gray-300 px-4 py-2 border">96945554546</td>
           <td className="border-t border-gray-300 px-4 py-2 border text-center">
             <button className="text-blue-600 mx-2 bg-gray-100 p-3 rounded-full" aria-label="Edit course"><FaPlus /></button>
           </td>
         </tr><tr>
           <td className="border-t border-gray-300 px-2 border">12</td>
           <td className="border-t border-gray-300 px-4 py-2 border">12225</td>
           <td className="border-t border-gray-300 px-4 py-2 border">1342</td>
           <td className="border-t border-gray-300 px-4 py-2 border">john</td>
           <td className="border-t border-gray-300 px-4 py-2 border">Student</td>
           <td className="border-t border-gray-300 px-4 py-2 border">96945554546</td>
           <td className="border-t border-gray-300 px-4 py-2 border text-center">
             <button className="text-blue-600 mx-2 bg-gray-100 p-3 rounded-full" aria-label="Edit course"><FaPlus /></button>
           </td>
         </tr><tr>
           <td className="border-t border-gray-300 px-2 border">12</td>
           <td className="border-t border-gray-300 px-4 py-2 border">12225</td>
           <td className="border-t border-gray-300 px-4 py-2 border">1342</td>
           <td className="border-t border-gray-300 px-4 py-2 border">john</td>
           <td className="border-t border-gray-300 px-4 py-2 border">Student</td>
           <td className="border-t border-gray-300 px-4 py-2 border">96945554546</td>
           <td className="border-t border-gray-300 px-4 py-2 border text-center">
             <button className="text-blue-600 mx-2 bg-gray-100 p-3 rounded-full" aria-label="Edit course"><FaPlus/></button>
           </td>
         </tr>
       </tbody>
     </table>
            
            
            </div>
            <div className="flex justify-between items-center mt-4">
              <p>Showing 1 to 1 of 1 entries</p>
              <div>
                <button className="text-blue-600 mx-2">Previous</button>
                <button className="bg-purple text-white px-2 rounded">1</button>
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

export default AddStaffMember;
