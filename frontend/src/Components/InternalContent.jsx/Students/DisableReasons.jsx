import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";

const DisableReasons = () => {
  const data = [
    { name: "Alex" },
    { name: "Alex" },
    { name: "Cameron" },
    { name: "Cameron" },
    { name: "Charlie" },
    { name: "Charlie" },
    { name: "James" },
  ];
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:-ml-0  ">
        <span className="">Students</span>{" "}
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Disable Reason
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 ">
        {/* Add Course Form */}
        <div className="bg-white   shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[40%] md:w-[96%] h-[15%] overflow-auto mb-5">
          <h2 className="text-lg font-normal   p-4  border-b  rounded-t-lg">
            Add Disable Reasons
          </h2>

          <form className="p-4 text-sm text-gray-700">
            <label className="block mb-2">
            Disable Reasons
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
            />

            <button
              type="submit"
              className=" w-[15%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              Save
            </button>
          </form>
        </div>

        {/* Course List Section */}
        <div className="bg-white  shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[57%] md:w-[96%] h-[15%] overflow-auto">
          {/* Header */}
          <h2 className="text-xl font-normal mb-2 p-4 border-b">Disable Reason List</h2>

          {/* Export Buttons */}
          <div className="flex justify-between text-sm px-4" >
          <div className="flex space-x-2 mb-4 ">
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
              Copy
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
              CSV
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
              Excel
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
              PDF
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
              Print
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <label className="text-gray-600 mr-2">Search:</label>
            <input
              type="text"
              className="border rounded p-1 w-full"
              placeholder="Search"
            />
          </div>

          </div>



          {/* Table */}
          <div className="overflow-x-auto text-sm px-4 pb-10">
            <table className="min-w-full border-separate bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 border font-semibold">
                    Name
                  </th>
                  <th className="text-left py-2 px-4 border font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4  border">
                      <div className="flex space-x-2">
                        <button className="bg-purple-100 p-2 rounded-full text-purple-600">
                          <FaEdit />
                        </button>
                        <button className="bg-purple-100 p-2 rounded-full text-purple-600">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisableReasons;
