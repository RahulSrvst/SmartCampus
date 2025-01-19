import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";

const CertificateType = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20" >
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-10 ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Certificate</span><span className="text-[14px]  mt-0.5" > - Certificate Type</span>
      </div>
    <div className="flex flex-wrap gap-x-4 ">
      {/* Add Course Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
      <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Certificate Type</h2>
            <BsThreeDotsVertical />
          </div>
        
        <form className="p-4 flex flex-col">
          <label className="block mb-2">Certificate type <span className="text-red-500">*</span></label>
          <input type="text" className="w-[33%] mb-4 p-2 border border-gray-300 rounded" placeholder="" />
          
          
          
          
          

          
          <button type="submit" className=" w-[15%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      </div>

      {/* Course List Section */}
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
                <th className="px-4 py-2"><div className="flex justify-between" >SI.No. <HiOutlineArrowsUpDown className="mt-1 w-4 h-4" /></div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Certification Type<HiOutlineArrowsUpDown className="mt-1 w-4 h-4 " /></div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Manage<HiOutlineArrowsUpDown className="mt-1 w-4 h-4 " /></div></th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="text-[16px] space-y-2 border-b border-slate-300  bg-gray-100" >
                <td className="border-r-2 border-white px-4 "> - - </td>
                <td className="border-r-2 border-white px-4 py-4 "> - - </td>
          
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

export default CertificateType;
