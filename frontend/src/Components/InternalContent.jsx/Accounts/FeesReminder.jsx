import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const FeesReminder = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8">
        Account <FaHome className="text-blue-900 w-4 h-4" /> - Fees Reminder
      </div>

      {/* Add Course Form */}
      <div className="bg-white  shadow-md rounded-lg w-full md:w-[98%] mb-4">
        <h2 className="text-lg font-normal mb-4 px-6 py-4 text-black border-b  rounded-t-lg">
          Fees Reminder
        </h2>

        <div className="bg-white p-2 ml-4  ">
          <div className="w-[100%]">
            <table className="w-full m-1 text-sm border border-separate">
              <thead>
                <tr>
                  <th className="text-start border px-4 py-2">Action</th>
                  <th className="text-start border py-2">Reminder Type</th>
                  <th className="text-start border py-2">Days</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4  ">
                    <input type="checkbox" checked className="text-sm" /> <span className="-mt-1" >Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    Before / After
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    <input
                      type="text"
                      className="border w-[80%] h-10 rounded"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4  ">
                    <input type="checkbox" checked className="text-sm" />{" "}
                    <span className="-mt-1" >Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    Before / After
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    <input
                      type="text"
                      className="border w-[80%] h-10 rounded"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4  ">
                    <input type="checkbox" checked className="text-sm" />{" "}
                    <span className="-mt-1" >Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    Before / After
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    <input
                      type="text"
                      className="border w-[80%] h-10 rounded"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4  ">
                    <input type="checkbox" checked className="text-sm" />{" "}
                    <span className="-mt-1" >Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    Before / After
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    <input
                      type="text"
                      className="border w-[80%] h-10 rounded"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4  ">
                    <input type="checkbox" checked className="text-sm" />{" "}
                    <span className="-mt-1" >Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    Before / After
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    <input
                      type="text"
                      className="border w-[80%] h-10 rounded"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4  ">
                    <input type="checkbox" checked className="text-sm" />{" "}
                    <span className="-mt-1" >Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    Before / After
                  </td>
                  <td className="border border-gray-200 px-4 py-5  ">
                    <input
                      type="text"
                      className="border w-[80%] h-10 rounded"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex text-sm justify-between items-center pb-4 mt-4">
            <p>Showing 1 to 1 of 1 entries</p>
            <div className="text-sm" >
              <button className="text-blue-600 mx-2">Previous</button>
              <button className="bg-purple-500 text-white px-2 rounded">
                1
              </button>
              <button className="text-blue-600 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Course List Section */}
    </div>
  );
};

export default FeesReminder;
