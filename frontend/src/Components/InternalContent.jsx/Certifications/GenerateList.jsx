import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const GenerateList = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
     <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 -ml-2 ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Certificate</span><span className="text-[14px]  mt-0.5" > - Generate Certificate</span>
      </div>
      <div className=" bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[97%] pb-8 mb-4">
        <div className="p-4 rounded-t-lg border-b dark-color text-white ">
          <h1 className="text-2xl font-bold">Generate Cerificate</h1>
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

          


        </div>

        <div className="w-[100%] ml-4">
          
          </div>
          


        <button className="dark-color text-white rounded ml-5  mt-4 px-7 py-2">
            Save
          </button>


          
        
      

          
      </div>



      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[97.5%] pb-8 mb-4">
      <div className="pl text-2xl font-bold dark-color  py-5 rounded-t-xl text-white ">
                <span className="pl-5">Assignment List</span>
          </div>


          <div className="mx-5 lg:flex hidden justify-between pt-8">
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
        <th className="w-[10%]">Student/Employee register No.</th>
        <th className="w-[18%]">Student/Employee Name</th>
        <th>View Certificate</th>
        <th>Issue Certificate</th>
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
        
      </tr>
      
    </tbody>
  </table>
</div>

      </div>



    </div>
  );
};

export default GenerateList;
