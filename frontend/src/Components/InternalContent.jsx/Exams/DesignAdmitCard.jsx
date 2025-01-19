import React from "react";
import { FaEdit, FaHome, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function DesignAdmitCard() {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20 ">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2 ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Exam</span><span className="text-[14px]  mt-0.5" > - Design Admit Card</span>
      </div>
      <div className=" bg-white shadow-md rounded-lg w-[98%] md:w-[96%] lg:w-[95%] xl:w-[96%] mb-4">
        <div className="p-4 rounded-t-lg border-b ">
          <h1 className="text-xl font-bold">Exam Admit Card</h1>
        </div>
        <div className="p-4 grid grid-cols-3 gap-3">
          <div className=""></div>
        </div>

        <div className="w-[97%] grid grid-cols-2 md:gap-5 gap-2 ml-4 pr-2">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
            <label className="block mb-2 font-medium">
              Left logo <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              className=" mb-4 p-1 border border-gray-300 file:border-none  file:border-r bg-slate-100 rounded w-[50%]"
            />
          </div>

          <div className="">
            <label className="block mb-2 font-medium">
              Right logo <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              className=" mb-4 p-1 border border-gray-300 file:border-none  file:border-r bg-slate-100 rounded w-[50%]"
            />
          </div>

          <div className="">
            <label className="block mb-2 font-medium">
              Sign <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              className=" mb-4 p-1 border border-gray-300 file:border-none  file:border-r bg-slate-100 rounded w-[50%]"
            />
          </div>

          <div className="">
            <label className="block mb-2 font-medium">
              Background Image <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              className=" mb-4 p-1 border border-gray-300 file:border-none  file:border-r bg-slate-100 rounded w-[50%]"
            />
          </div>

          <div className="">
            <label className="block mb-2 font-medium">
              Left logo <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              className=" mb-4 p-1 border border-gray-300 file:border-none  file:border-r bg-slate-100 rounded w-[50%]"
            />
          </div>
        </div>

        <div className="w-[97%] grid grid-cols-3 gap-5 ml-4 mt-5">
          <div className="flex flex-col xl:space-x-10 space-y-3">
            <div className="xl:ml-10"><input type="checkbox" /> <span>Name</span></div>
            <div><input type="checkbox" /> <span>Father Name</span></div>
            <div><input type="checkbox" /> <span>Mother Name</span></div>
            <div><input type="checkbox" /> <span>DOB</span></div>
            
          </div>

          <div className="flex flex-col xl:space-x-10 space-y-3">
            <div className="xl:ml-10"><input type="checkbox" /> <span>Admission No</span></div>
            <div><input type="checkbox" /> <span>Gender</span></div>
            <div><input type="checkbox" /> <span>Roll No</span></div>
            <div><input type="checkbox" /> <span>Address</span></div>
            
          </div>

          <div className="flex flex-col xl:space-x-10 space-y-3">
            <div className="xl:ml-10"><input type="checkbox" /> <span>Photo</span></div>
            <div><input type="checkbox" /> <span>Department</span></div>
            <div><input type="checkbox" /> <span>Stream</span></div>
            
            
          </div>
        </div>

        <button className="dark-color text-white rounded ml-5  mt-4 px-10 py-2">
          Search
        </button>

        <div className="ml-5 text-2xl font-bold   py-10">
          <span>Admit Card List</span>
        </div>

        <div className="mx-5 lg:flex hidden justify-between">
          <div className="">
            <button className="px-6 text-lg py-1.5 rounded-l-lg bg-slate-200 mr-0.5">
              Copy
            </button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">
              CSV
            </button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">
              Excel
            </button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">
              PDF
            </button>
            <button className="px-6 text-lg py-1.5 rounded-r-lg bg-slate-200">
              Print
            </button>
          </div>

          <div>
            <label>Search: </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg py-1"
            />
          </div>
        </div>

        <div className="overflow-x-auto lg:mt-10 p-5">
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
                  <button className="bg-blue-500 px-3 py-0.5 rounded-md text-white font-semibold">
                    M.Com
                  </button>
                </td>
                <td className="p-4">Civil</td>
                <td className="p-4">Subject Group 1</td>
                <td className="pl-5 p-4">Accounting</td>
                <td className="pl-16 p-4">lecture 1</td>
                <td className="pl-16 p-4 flex">
                  <FaEdit
                    className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white"
                    size={40}
                  />
                  <RiDeleteBin6Line
                    className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white"
                    size={40}
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-100 hover:cursor-pointer">
                <td className="p-4">
                  <button className="bg-purple-500 px-3 py-0.5 rounded-md text-white font-semibold">
                    MAC
                  </button>
                </td>
                <td className="p-4">CS</td>
                <td className="p-4">Subject Group 2</td>
                <td className="pl-5 p-4">Economics</td>
                <td className="pl-16 p-4">lecture 2</td>
                <td className="pl-16 p-4 flex">
                  <FaEdit
                    className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white"
                    size={40}
                  />
                  <RiDeleteBin6Line
                    className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white"
                    size={40}
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-100 hover:cursor-pointer">
                <td className="p-4">
                  <button className="bg-yellow-500 px-3 py-0.5 rounded-md text-white font-semibold">
                    Medical
                  </button>
                </td>
                <td className="p-4">Mechnical</td>
                <td className="p-4">Subject Group 3</td>
                <td className="pl-5 p-4">English</td>
                <td className="pl-16 p-4">lecture 3</td>
                <td className="pl-16 p-4 flex">
                  <FaEdit
                    className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white"
                    size={40}
                  />
                  <RiDeleteBin6Line
                    className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white"
                    size={40}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DesignAdmitCard;
