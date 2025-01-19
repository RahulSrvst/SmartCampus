import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const SearchFeePayment = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5 ">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        Payroll <FaHome className="text-blue-900 w-4 h-4" /> - Serach Student
        Fees
      </div>

      <div className="bg-white  shadow-md rounded-lg w-[97%] md:w-[97%] mb-4">
        <h2 className="text-lg border-b font-normal mb-4 px-6 py-4 text-black  rounded-t-lg">
          Search Student Fees
        </h2>

        <form className="p-4  gap-5 text-sm text-gray-700">
          <div>
            <label className="block mb-2">
              Payment ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-[50%] mb-4 p-2 border border-gray-300 rounded"
              placeholder="Please Select"
            />
          </div>
          <div></div>

          <button
            type="submit"
            className=" w-[10%] h-9 mt-3 bg-[#192b4c] text-white py-2 rounded-lg "
          >
            Search
          </button>
        </form>
      </div>
      {/* Add Course Form */}
      <div className="bg-white  shadow-md rounded-lg w-[97%] mb-4">
        <h2 className="text-lg border-b font-normal mb-4 px-6 py-4 text-black  rounded-t-lg">
          Payment Id Details
        </h2>

        <div className="bg-white p-2 ml-4  overflow-x-scroll">
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
            <label className="ml-[62%]">Search :</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded"
              placeholder="Search..."
            />
          </div>

          <div className="w-[100%]">
            <table className="min-w-full border border-separate text-sm bg-white">
              <thead className="border-b  border-purple-400 ">
                <tr>
                  <th className="py-4 px-4 text-left border">Payment Id </th>
                  <th className="py-4 px-4 text-left border">Date</th>
                  <th className="py-4 px-4 text-left border">Name</th>
                  <th className="py-4 px-4 text-left border">Department</th>
                  <th className="py-4 px-4 text-left border">Fees Group</th>
                  <th className="py-4 px-4 text-left border">Fees Type</th>
                  <th className="py-4 px-4 text-left border">Mode</th>
                  <th className="py-4 px-4 text-left border">Amount</th>
                  <th className="py-4 px-4 text-left border">Discount</th>
                  <th className="py-4 px-4 text-left border">Fine</th>
                  <th className="py-4 px-4 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t ">
                  <td className="py-4 px-4 border">OU065</td>
                  <td className="py-4 px-4 border">Joseph</td>
                  <td className="py-4 px-4 border">Joseph</td>
                  <td className="py-4 px-4 border">Joseph</td>
                  <td className="py-4 px-4 border">Joseph</td>
                  <td className="py-4 px-4 border">Joseph</td>
                  <td className="py-4 px-4 border">Joseph</td>
                  <td className="py-4 px-4 border whitespace-nowrap">
                    70 Bowman St. South 
                  </td>
                  <td className="py-4 px-4 border">₹ 1000</td>
                  <td className="py-4 px-4 border whitespace-nowrap ">
                    <span className="px-4 py-1 bg-red-500 text-white rounded">
                      ₹ 0
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap border">
                    <span className="px-2 py-1 bg-[#172b4c] text-white rounded">
                      Collect Fees
                    </span>
                  </td>
                </tr>

                
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-700 mt-4 py-3">
            <p>Showing 1 to 1 of 1 entries</p>
            <div className="text-sm" >
              <button className="text-blue-600 mx-2">Previous</button>
              <button className="bg-purple text-white px-2 rounded">1</button>
              <button className="text-blue-600 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Course List Section */}
    </div>
  );
};

export default SearchFeePayment;
