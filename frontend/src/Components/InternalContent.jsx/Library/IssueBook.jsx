import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";

const IssueBook = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[8%] md:mt-[10%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8   ">
        <span className="text-xl">Library </span>
        <FaHome className="text-blue-900 w-4 h-4" /> - Issue Book
      </div>
      <div className=" ">
        {/* Add Batch Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[96%] mb-4">
          <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white rounded-t-lg">
            Issue Book
          </h2>

          <form className="p-4">
            <input
              type="text"
              className="lg:w-[75%] w-[98%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Search Book No./ISBN No./Book Title Author"
            />

            <button
              type="submit"
              className=" w-[100%] mb-2 md:w-[50%] lg:w-[10%] bg-blue-900 text-white py-2 lg:ml-5 rounded-lg "
            >
              Search
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
              <div>
                <label className="block mb-2">User Type</label>
                <input
                  type="number"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block mb-2">Book Issue Date</label>
                <input
                  type="date"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder=""
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full lg:w-[10%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              Create
            </button>
          </form>
        </div>

        {/* Batch List Section */}
        <div className="bg-white  shadow-md rounded-xl w-[96%] lg:w-[95.5%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto">
          <div className="text-xl border-b p-6">Issue List</div>
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
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search..."
              />
            </div>
          </div>

          <table className="w-[98%] text-sm ml-3">
            <thead>
              <tr className="text-[16px] border-b border-black">
                <th className="px-4 py-2">
                  <div className="flex justify-between">Sl.No.</div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">UserType</div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">User</div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">Book Number</div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">Title</div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">Book Issue Date</div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">Book Due Date</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-[16px] space-y-2 border-b h-6 border-slate-300  bg-gray-100"></tr>
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 p-5">
            <p className="text-sm">Showing 1 to 1 of 1 entries</p>
            <div className="flex">
              <button className="text-blue-600 mx-2">Previous</button>
              <button className="bg-purple-500 text-white px-2 rounded">
                1
              </button>
              <button className="text-blue-600 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueBook;
