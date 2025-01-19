import React from "react";
import { FaHome, FaPlus } from "react-icons/fa";

function SyllabusStatus() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dates = ["12/14/2021", "12/15/2021", "12/16/2021", "12/17/2021", "12/18/2021", "12/19/2021"];

  return (
    <div className="ml-5 md:ml-[43%] lg:ml-[32.5%] xl:ml-[22.5%] mt-[35%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%] pb-20 w-[90%] md:w-[54.5%] lg:w-[65.5%] xl:w-[76%] h-screen">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        <span className="text-[20px]">Academic</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Lecture Plan
        </span>
        <span className="text-[14px] mt-0.5 -ml-2">- Syllabus Status</span>
      </div>
      <div className="bg-white rounded-md" >
      <div>
        <div className="p-4 rounded-t-lg border-b">
          <h1 className="text-xl font-semibold">Syllabus Status</h1>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="w-full">
            <label className="block mb-2 font-medium">
              Department <span className="text-red-500">*</span>
            </label>
            <select className="mb-4 p-1 border border-gray-300 rounded w-full">
              <option>Select</option>
              <option>Teacher 1</option>
              <option>Teacher 2</option>
              <option>Teacher 3</option>
              <option>Teacher 4</option>
              <option>Teacher 5</option>
              <option>Teacher 6</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-2 font-medium">
              Stream <span className="text-red-500">*</span>
            </label>
            <select className="mb-4 p-1 border border-gray-300 rounded w-full">
              <option>Select</option>
              <option>Teacher 1</option>
              <option>Teacher 2</option>
              <option>Teacher 3</option>
              <option>Teacher 4</option>
              <option>Teacher 5</option>
              <option>Teacher 6</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-2 font-medium">
              Subject Group <span className="text-red-500">*</span>
            </label>
            <select className="mb-4 p-1 border border-gray-300 rounded w-full">
              <option>Select</option>
              <option>Teacher 1</option>
              <option>Teacher 2</option>
              <option>Teacher 3</option>
              <option>Teacher 4</option>
              <option>Teacher 5</option>
              <option>Teacher 6</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-2 font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <select className="mb-4 p-1 border border-gray-300 rounded w-full">
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

        <button className="dark-color text-white rounded ml-5 px-7 py-2">
          Search
        </button>

        <div className="ml-5 text-2xl font-bold my-5">
          <span>Syllabus Status for: Subject(1)</span>
        </div>

        <div className="mx-5 flex flex-col md:flex-row md:justify-between mb-4">
          <div className="lg:flex hidden space-x-1 mb-2 md:mb-0">
            <button className="px-6 text-lg py-1.5 rounded-l-lg bg-slate-200">Copy</button>
            <button className="px-6 text-lg py-1.5 bg-slate-200">CSV</button>
            <button className="px-6 text-lg py-1.5 bg-slate-200">Excel</button>
            <button className="px-6 text-lg py-1.5 bg-slate-200">PDF</button>
            <button className="px-6 text-lg py-1.5 rounded-r-lg bg-slate-200">Print</button>
          </div>

          <div>
            <label>Search: </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg py-1 px-2 w-full md:w-auto"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-10 p-5">
        <table className="w-full table-double-border">
          <thead>
            <tr>
              <th className="w-[10%]">#</th>
              <th className="w-[18%]">Topic</th>
              <th>Topic Completion Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {["topic 1", "topic 2", "topic 3", "topic 4"].map((topic, index) => (
              <tr key={index}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{topic}</td>
                <td className="p-4">8/12/21</td>
                <td className="pl-5 p-4 text-center">
                  <button className={`px-3 py-0.5 text-sm font-semibold rounded-md text-white ${index % 2 === 0 ? "bg-purple" : "bg-yellow-500"}`}>
                    {index % 2 === 0 ? "Completed" : "Incomplete"}
                  </button>
                </td>
                <td className="pl-16 p-4 text-center">
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default SyllabusStatus;
