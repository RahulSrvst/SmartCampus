import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";

const PlacementCellMembers = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20" >
       <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-10 ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Placements</span><span className="text-[14px]  mt-0.5" > - Placement Cells Members</span>
      </div>
    <div className="flex flex-wrap gap-x-4 ">
      {/* Add Batch Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
      <div className="flex justify-between text-xl font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add Placement Cell Members</h2>
            <BsThreeDotsVertical />
          </div>
        
        <form className="p-4">
          
          
          <label className="block mb-2">User Type</label>
          <select className="w-full mb-4 p-2 border border-gray-300 rounded">
            <option>Please Select</option>
            <option>BCA</option>
            <option>MCA</option>
          </select>

          <label className="block mb-2">Student / Employee Name</label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />

          <label className="block mb-2">Designation</label><select className="w-full mb-4 p-2 border border-gray-300 rounded">
            <option>Please Select</option>
            <option>BCA</option>
            <option>MCA</option>
          </select>
          
          
          
         

          <label className="block mb-2">Positions</label>
          <input type="number" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />

          <button type="submit" className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      </div>

      {/* Batch List Section */}
      <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[50%] md:w-[96%] h-[15%] overflow-auto">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4">
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

          <table className="w-full text-sm">
            <thead>
              <tr className="text-[16px] border-b border-black" >
                <th className="px-4 py-2"><div className="flex justify-between" >Type</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >User</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Designation</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Position </div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Option </div></th>
                <th className="px-4 py-2"><div className="flex justify-between" ></div></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-[16px] space-y-2 border-b border-slate-300  bg-gray-100" >
                <td className="border-r-2 border-white px-4 "> - - </td>
                <td className="border-r-2 border-white px-4 py-4 "> - - </td>
                <td className="border-r-2 border-white px-4 py-4 "> - - </td>
                <td className="border-r-2 border-white px-4 py-4 "> - - </td>
                <td className="border-r-2 border-white px-2 py-4 "> - - </td>
                <td className="border-r-2 border-white px-4 py-4  text-center">
                  <button className="text-blue-900 mx-2" aria-label="Edit course"><TiPencil className="h-[16px] w-[16px] pt-0.5" /></button>
                  <button className="text-blue-900" aria-label="Delete course"><FaTrashAlt className="h-3 w-3" /></button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-[14px] text-slate-500 ">Showing 1 to 1 of 1 entries</p>
            <div className="flex">
              <button className="text-slate-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">1</button>
              <button className="text-slate-500 mx-2">Next</button>
            </div>
          </div>
        </div>
    </div>
      </div>
  );
};

export default PlacementCellMembers;
