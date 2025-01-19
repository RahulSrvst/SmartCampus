import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const FeesMaster = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 md:-ml-1">
        Account <FaHome className="text-blue-900 w-4 h-4" /> - Fees Master
      </div>

      <div className="bg-white  shadow-md rounded-lg w-[96%] lg:w-[97%] mb-4">
        <h2 className="text-lg border-b font-normal mb-4 px-4 py-4 text-black  rounded-t-lg">
          Add Fees Master : 2021-2022
        </h2>

        <form className="p-4 grid grid-cols-2 gap-5 text-sm text-gray-700">
          <div>
            <label className="block mb-2">
              Fees Group<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>
          <div>
            <label className="block mb-2">
              Fees Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>
          <div>
            <label className="block mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>
          <div>
            <label className="block mb-2">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>

          <div className="lg:flex lg:gap-5 ">
            <div>
              <input type="radio" />
              <span className="ml-3">None</span>
            </div>
            <div>
              <input type="radio" />
              <span className="ml-3">Percentage</span>
            </div>
            <div>
              <input type="radio" />
              <span className="ml-3">Fix Amount</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-3">
            <div>
              <label className="block mb-2">
                Percenatge <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Please Select"
              />
            </div>

            <div>
              <label className="block mb-2">
                Fine Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Please Select"
              />
            </div>
          </div>

          <button
            type="submit"
            className=" lg:w-[15%] w-[40%] h-9 -mt-16  bg-[#192b4c] text-white py-2 rounded-lg hover:bg-red-700"
          >
            Save
          </button>
        </form>

        </div>

        <div className="bg-white w-[97%] rounded-lg  mb-4">
          <h2 className="text-lg font-normal border-b mb-4 px-4 py-4 text-black  rounded-t-lg">
            Details
          </h2>

          <div className="bg-white rounded-b-lg px-5 shadow-lg   ">
            <div className="flex text-sm text-gray-700 justify-between items-center mb-4">
              <div>
                <label>Show</label>
                <select className="mx-2 p-1 border border-gray-300 rounded">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <label>entries</label>
              </div>
              <div>
              <label className="">Search :</label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search..."
              />
              </div>
            </div>

            <div className="w-[100%]">
              <table className="w-full m-1 border border-separate text-sm ">
                <thead>
                  <tr>
                    <th className="text-start border px-4 py-2">Fees Group</th>
                    <th className="text-start border px-4 py-2">Fees Code</th>
                    <th className="text-start border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="border border-gray-200 px-4  ">Joseph</td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      ₹ 626661461
                    </td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      <BsThreeDotsVertical />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex text-sm justify-between items-center pb-4 my-4">
              <p>Showing 1 to 1 of 1 entries</p>
              <div className="text-sm" >
                <button className="text-blue-600 mx-2">Previous</button>
                <button className="bg-purple text-white px-2 rounded">1</button>
                <button className="text-blue-600 mx-2">Next</button>
              </div>
      
            </div>
          </div>
        </div>
      {/* Add Course Form */}

      {/* Course List Section */}
    </div>
  );
};

export default FeesMaster;
