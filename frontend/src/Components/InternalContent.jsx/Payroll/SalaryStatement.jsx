import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const SalaryStatement = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%]">
    <div className="flex items-center gap-2 text-sm lg:text-lg mb-5 md:-ml-3 xl:-ml-7 ">
      Payroll <FaHome className="text-blue-900 w-4 h-4" /> - Salary Statement
    </div>

    <div className="bg-white shadow-md rounded-lg mb-8 w-[97%] ">
      <h2 className="text-xl font-semibold border-b px-6 py-4">Employee Wise</h2>
      <form className="p-4 flex flex-wrap gap-4">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <label className="block mb-2">Employee Name<span className="text-red-500">*</span></label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Please Select" />
        </div>
        
        <div className="w-full">
          <button type="submit" className="w-full md:w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700">
            Get Report
          </button>
        </div>
      </form>
    </div>

    <div className="bg-white shadow-md rounded-lg mb-8 w-[97%] ">
      <h2 className="text-xl font-semibold border-b px-6 py-4">Month Wise</h2>
      <form className="p-4 flex flex-wrap gap-4">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block mb-2">Year & Months <span className="text-red-500">*</span></label>
          <input type="date" className="w-full p-2 border border-gray-300 rounded" placeholder="Category Name" />
        </div>
        
        <div className="w-full">
          <button type="submit" className="w-full md:w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700">
            Generate
          </button>
        </div>
      </form>
    </div>

    <div className="bg-white shadow-md rounded-lg mb-8">
      <h2 className="text-lg font-semibold border-b px-6 py-4">Salary Ledger</h2>
      <div className="p-4 overflow-x-auto">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center">
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
            <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
          </div>
        </div>
        
        <table className="w-full text-[16px] border-collapse">
          <thead>
            <tr className="border-b ">
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Total Deduction</th>
              <th className="px-4 py-2 text-left">Net Payable Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeat this <tr> block for each data entry */}
            <tr className="border-b ">
              <td className="px-4 py-3"> - - </td>
              <td className="px-4 py-3"> - - </td>
              <td className="px-4 py-3"> - - </td>
              <td className="px-4 py-3"> - - </td>
              
            </tr>
          </tbody>
        </table>
        
        <div className="flex flex-wrap justify-between items-center mt-4">
          <p>Showing 1 to 1 of 1 entries</p>
          <div className="flex items-center">
            <button className="text-blue-600 mx-2">Previous</button>
            <button className="bg-purple text-white px-2 rounded">1</button>
            <button className="text-blue-600 mx-2">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SalaryStatement;
