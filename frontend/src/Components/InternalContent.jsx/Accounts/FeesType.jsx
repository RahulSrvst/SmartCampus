import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const FeesType = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        Accounts <FaHome className="text-blue-900 w-4 h-4" /> - Fees Type
      </div>

      <div className="bg-white  shadow-md rounded-lg w-[96%] lg:w-[98%] mb-4">
        <h2 className="text-lg border-b font-normal mb-4 px-6 py-4 text-black  rounded-t-lg">
          Add Fees Type
        </h2>

        <form className="p-4 grid grid-cols-3 gap-5 text-sm text-gray-700">
          <div>
            <label className="block mb-2">
              Fees Group
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>
          <div>
            <label className="block mb-2">
              Fees Type 
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>
          <div>
            <label className="block mb-2">
              Due Date 
            </label>
            <input
              type="text"
              className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>

          <button
            type="submit"
            className=" lg:w-[20%] w-[70%] h-9 -mt-4  bg-blue-900 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Save
          </button>
        </form>

        </div>

        <div className="bg-white w-[96%] lg:w-[98%] mb-4 rounded-lg shadow-lg">
          <h2 className="text-lg border-b font-normal mb-4 px-6 py-4 text-black  ">
            Fees Type List
          </h2>

          <div className="bg-white  mx-4  ">
            <div className="flex text-sm justify-between items-center mb-4">
              <div>
                <label>Show</label>
                <select className="mx-2 p-1 border border-gray-300 rounded">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <label>entries</label>
              </div>
              <label className="ml-[62%]">Search :</label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search..."
              />
            </div>

            <div className="text-sm">
              <table className="w-full border border-separate m-1">
                <thead>
                  <tr>
                    <th className="border text-start px-4 py-2">Name</th>
                    <th className="border text-start py-2">Fees Code</th>
                    <th className="border text-start px-4 py-2">Action</th>
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

                  <tr className="">
                    <td className="border border-gray-200 px-4  ">Joseph</td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      ₹ 626661461
                    </td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      <BsThreeDotsVertical />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="border border-gray-200 px-4  ">Joseph</td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      ₹ 626661461
                    </td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      <BsThreeDotsVertical />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="border border-gray-200 px-4  ">Joseph</td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      ₹ 626661461
                    </td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      <BsThreeDotsVertical />
                    </td>
                  </tr>
                  <tr className="">
                    <td className="border border-gray-200 px-4  ">Joseph</td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      ₹ 626661461
                    </td>
                    <td className="border border-gray-200 px-4 py-5  ">
                      <BsThreeDotsVertical />
                    </td>
                  </tr>
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
            <div className="flex text-sm justify-between items-center mt-4  py-2 ">
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

export default FeesType;
