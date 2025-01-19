import React from "react";

import { FaCheckCircle, FaEdit, FaHome, FaTimesCircle, FaTrashAlt } from "react-icons/fa";

const AddEvents = () => {
  const tableData = [
    { studentName: '1', department: '31', stream: '34', applyDate: '8/4/21', fromDate: '10/4/21', toDate: '12/4/21', status: 'Pending', approvedBy: 'Super Admin' },
    { studentName: '2', department: '45', stream: '34', applyDate: '8/4/21', fromDate: '10/4/21', toDate: '12/4/21', status: 'Pending', approvedBy: 'Super Admin' },
    { studentName: '3', department: '31', stream: '34', applyDate: '8/4/21', fromDate: '10/4/21', toDate: '12/4/21', status: 'Pending', approvedBy: 'Super Admin' },
    { studentName: '4', department: '31', stream: '34', applyDate: '8/4/21', fromDate: '10/4/21', toDate: '12/4/21', status: 'Pending', approvedBy: 'Super Admin' },
  ];
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[22.5%] xl:mt-[8%] md:mt-[10%] mt-[35%] h-screen" >
       <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        Events <FaHome className="text-blue-900 w-4 h-4" /> - Add Events

        </div>
    <div className="flex xl:flex-row flex-col gap-x-4 ">
      {/* Add Batch Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[45%] mb-4 h-full">
        <h2 className="text-xl font-bold mb-4  p-6 border-b  rounded-t-lg">Add Events</h2>
        
        <form className="p-4">
          <label className="block mb-2">Event Type <span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />

          <div>
          <input type="checkbox" checked /> <label className="ml-3" >Holiday?</label>
          </div>

          <label className="block mb-2">Description <span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />


          <label className="block mb-2">Start Date <span className="text-red-500">*</span></label>
          <input type="date" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />

          <label className="block mb-2">End Date<span className="text-red-500">*</span></label>
          <input type="date" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />

          <label className="block mb-2">Organizer / Incharge Name <span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />

          <label className="block mb-2">Event For<span className="text-red-500">*</span></label>
          <select className="w-full mb-4 p-2 border border-gray-300 rounded">
            <option>Select</option>
          </select>
          
          
          <button type="submit" className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      </div>

      {/* Batch List Section */}
      <div className="bg-white  shadow-md rounded-lg w-[96%] lg:w-[96%] xl:w-[50%] mb-4 h-full ">
                
       
        <div className="p-4">
      <div className="flex space-x-2 mb-4">
        <button className="bg-gray-200 py-2 px-4 rounded">Copy</button>
        <button className="bg-gray-200 py-2 px-4 rounded">CSV</button>
        <button className="bg-gray-200 py-2 px-4 rounded">Excel</button>
        <button className="bg-gray-200 py-2 px-4 rounded">PDF</button>
        <button className="bg-gray-200 py-2 px-4 rounded">Print</button>
      </div>
      <div className="overflow-x-auto">
        <table className=" bg-white border border-gray-300 border-separate">
          <thead>
            <tr>
              {['Sl. No.', 'Event ', 'Start Date','End Date','Event for','Course ','Department', 'Action'].map((header) => (
                <th key={header} className="border p-2 text-left font-medium text-gray-600">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border p-5">{row.studentName}</td>
                <td className="border p-5">{row.department}</td>
                <td className="border p-5"> - - </td>
                <td className="border p-5"> - - </td>
                <td className="border p-5"> - - </td>
                <td className="border p-5"> - - </td>
                <td className="border p-5"> - - </td>
                
                <td className="border p-5 flex space-x-2 justify-center">
                  <FaCheckCircle className="text-green-500 cursor-pointer" />
                  <FaTimesCircle className="text-red-500 cursor-pointer" />
                  <FaTrashAlt className="text-purple-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </div>
      </div>

    
  );
};

export default AddEvents;
