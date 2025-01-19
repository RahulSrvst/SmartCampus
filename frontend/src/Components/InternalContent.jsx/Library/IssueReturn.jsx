import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

const IssueReturn = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] md:mt-[10%] mt-[35%] h-screen" >
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8   ">
     <span className="text-xl" >Library </span><FaHome className="text-blue-900 w-4 h-4" /> - Issue Return

     </div>
 <div className=" ">
   {/* Add Batch Form */}
   

   {/* Batch List Section */}
   <div className="bg-white  shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[97%] md:w-[96%] h-[15%] overflow-auto">

   <div className="text-2xl border-b p-5" >Members</div>
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

     <table className="w-full text-[16px] mx-6">
       <thead>
         <tr>
           <th className="px-4 py-2 border">Member ID</th>
           <th className="px-4 py-2 border">Library Card No</th>
           <th className="px-4 py-2 border">Registration No</th>
           <th className="px-4 py-2 border">Name</th>
           <th className="px-4 py-2 border">Member Type</th>
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
             <button className="text-blue-600 mx-2" aria-label="Edit course"><RxExit /></button>
           </td>
         </tr><tr>
           <td className="border-t border-gray-300 px-2 border">12</td>
           <td className="border-t border-gray-300 px-4 py-2 border">12225</td>
           <td className="border-t border-gray-300 px-4 py-2 border">1342</td>
           <td className="border-t border-gray-300 px-4 py-2 border">john</td>
           <td className="border-t border-gray-300 px-4 py-2 border">Student</td>
           <td className="border-t border-gray-300 px-4 py-2 border">96945554546</td>
           <td className="border-t border-gray-300 px-4 py-2 border text-center">
             <button className="text-blue-600 mx-2" aria-label="Edit course"><RxExit /></button>
           </td>
         </tr><tr>
           <td className="border-t border-gray-300 px-2 border">12</td>
           <td className="border-t border-gray-300 px-4 py-2 border">12225</td>
           <td className="border-t border-gray-300 px-4 py-2 border">1342</td>
           <td className="border-t border-gray-300 px-4 py-2 border">john</td>
           <td className="border-t border-gray-300 px-4 py-2 border">Student</td>
           <td className="border-t border-gray-300 px-4 py-2 border">96945554546</td>
           <td className="border-t border-gray-300 px-4 py-2 border text-center">
             <button className="text-blue-600 mx-2" aria-label="Edit course"><RxExit /></button>
           </td>
         </tr>
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

export default IssueReturn;
