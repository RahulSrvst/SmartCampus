import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


function MarksGrade() {
  
  return (
    <div className="ml-[22.5%] mt-[8%] w-[76%] h-[] ">
      <div className=" bg-white rounded-xl shadow-lg mb-20 pb-12">
        <div className="p-4 rounded-t-lg border-b ">
          <h1 className="text-xl font-semibold">Referening to Login Page</h1>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="">
          <label className="block mb-2 font-medium">
            Department <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>

          <div className="w-[100%]">
          <label className="block mb-2 font-medium">
            Stream <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>

          <div className="w-[100%]">
          <label className="block mb-2 font-medium">
            Subject Group <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>

          <div className="w-[100%]">
          <label className="block mb-2 font-medium">
            Subject <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>
          
        </div>

        <div className="w-[100%] ml-4">
          <label className="block mb-2 font-medium">
            Subject <span className="text-red-500">*</span>
          </label>
          <select className="  p-1 border border-gray-300 rounded w-[35%]">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>
          <button className="bg-blue-500 text-xs my-2 text-white rounded ml-5 px-1 py-0.5 block">
            Add More
          </button>


        <button className="dark-color text-white rounded ml-5  mt-4 px-10 py-2">
            Search
          </button>


          
      </div>

<div className=" bg-white rounded-xl shadow-lg mb-20 ">
<div className="ml-5 text-xl font-semibold  flex justify-center py-10">
                <span>Topic List</span>
          </div>


          <div className="mx-5 flex justify-between">
            <div className="">
                
            <button className="px-6 text-lg py-1.5 rounded-l-lg bg-slate-200 mr-0.5">Copy</button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">CSV</button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">Excel</button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">PDF</button>
            <button className="px-6 text-lg py-1.5 rounded-r-lg bg-slate-200">Print</button>
            </div>

            <div>
                <label>Search: </label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg py-1"
                />
            </div>
          </div>

          <div className="overflow-x-auto mt-10 p-5">
  <table className="w-full table-double-border">
    <thead>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <th className="w-[10%]">Department</th>
        <th className="w-[18%]">Stream</th>
        <th>Subject Group</th>
        <th>Subject</th>
        <th>Lecture</th>
        <th className="w-[15%]">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <td className="p-4">
        <button className="bg-blue-500 px-3 py-0.5 rounded-md text-white font-semibold">M.Com</button>
        </td>
        <td className="p-4">Civil</td>
        <td className="p-4">Subject Group 1</td>
        <td className="pl-5 p-4">
          Accounting
        </td>
        <td className="pl-16 p-4">lecture 1</td>
        <td className="pl-16 p-4 flex">
        <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        <RiDeleteBin6Line className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        </td>
      </tr>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <td className="p-4">
        <button className="bg-purple-500 px-3 py-0.5 rounded-md text-white font-semibold">MAC</button>
        </td>
        <td className="p-4">CS</td>
        <td className="p-4">Subject Group 2</td>
        <td className="pl-5 p-4">
          Economics
        </td>
        <td className="pl-16 p-4">lecture 2</td>
        <td className="pl-16 p-4 flex">
        <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        <RiDeleteBin6Line className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        </td>
      </tr>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <td className="p-4">
        <button className="bg-yellow-500 px-3 py-0.5 rounded-md text-white font-semibold">Medical</button>
        </td>
        <td className="p-4">Mechnical</td>
        <td className="p-4">Subject Group 3</td>
        <td className="pl-5 p-4">
          English
        </td>
        <td className="pl-16 p-4">lecture 3</td>
        <td className="pl-16 p-4 flex">
        <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        <RiDeleteBin6Line className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        </td>
      </tr>
      
    </tbody>
  </table>
</div>

        
      </div>

      



    </div>
  );
}

export default MarksGrade;
