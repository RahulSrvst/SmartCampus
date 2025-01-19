import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";

const Booklist = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20" >
       <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8  xl:-ml-11 ">
        <span className="text-xl" >Library </span><FaHome className="text-blue-900 w-4 h-4" /> - Add Book Category

        </div>
    <div className="flex flex-wrap gap-x-4 ">
      {/* Add Batch Form */}
      
      {/* Batch List Section */}
      <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto">
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

          <table className="w-[94%] text-sm">
            <thead>
              <tr className="text-[16px] border-b border-black" >
                <th className="px-4 py-2"><div className="flex justify-between" >Book Title</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Description</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Book Number</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >ISBN Number</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Publisher</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Author</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Subject</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Rack Number</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Qty</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Available</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Book Price</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Past Date</div></th>
                <th className="px-4 py-2"><div className="flex justify-between" >Action</div></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-[16px] space-y-2 border-b border-slate-300  " >
                <td className="border-r-2 border-white px-4 ">title</td>
                <td className="border-r-2 border-white px-4 py-4 ">Description</td>
                <td className="border-r-2 border-white px-4 py-4 ">25</td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4  text-center flex flex-col items-center ">
                  <button className="text-blue-900 mx-2" aria-label="Edit course"><TiPencil className="h-[16px] w-[16px] -ml-3 mb-1" /></button>
                  <button className="text-blue-900" aria-label="Delete course"><FaTrashAlt className="h-3 w-3" /></button>
                </td>
              </tr>

              <tr className="text-[16px] space-y-2 border-b border-slate-300  " >
                <td className="border-r-2 border-white px-4 ">title</td>
                <td className="border-r-2 border-white px-4 py-4 ">Description</td>
                <td className="border-r-2 border-white px-4 py-4 ">25</td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4  text-center flex flex-col items-center ">
                  <button className="text-blue-900 mx-2" aria-label="Edit course"><TiPencil className="h-[16px] w-[16px] -ml-3 mb-1" /></button>
                  <button className="text-blue-900" aria-label="Delete course"><FaTrashAlt className="h-3 w-3" /></button>
                </td>
              </tr>

              <tr className="text-[16px] space-y-2 border-b border-slate-300  " >
                <td className="border-r-2 border-white px-4 ">title</td>
                <td className="border-r-2 border-white px-4 py-4 ">Description</td>
                <td className="border-r-2 border-white px-4 py-4 ">25</td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4 "></td>
                <td className="border-r-2 border-white px-4 py-4  text-center flex flex-col items-center ">
                  <button className="text-blue-900 mx-2" aria-label="Edit course"><TiPencil className="h-[16px] w-[16px] -ml-3 mb-1" /></button>
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

export default Booklist;
