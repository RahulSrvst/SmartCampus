import React from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';

const LoginCredential = () => {
  return (
    <div className="p-8  ml-[5%] md:ml-[41%] lg:ml-[33%] xl:ml-[22%] xl:mt-[8%] md:mt-[10%] mt-[35%]">
      {/* Header Section */}
      <div className="text-gray-700 text-lg mb-4 flex items-center">
        <span className="font-bold">Notification</span><FaHome className='mx-2' /> - Login Credential Send
      </div>

      {/* Select Criteria Section */}
      

      {/* Data Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-scroll ">
      <div className=" mb-8">
        <h2 className="text-lg font-semibold mb-4">Select Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department <span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              {/* Add department options here */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stream <span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select</option>
              {/* Add stream options here */}
            </select>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 flex items-center gap-2">
          <FaSearch /> Search
        </button>
      </div>

      {/* Bulk Mail Section */}
      <div className=" mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" className="form-checkbox" />
              Select All <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Message To <span className="text-red-500">*</span></label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select</option>
                {/* Add options here */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notification Type <span className="text-red-500">*</span></label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select</option>
                {/* Add notification types here */}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <button className="bg-gray-200 px-3 py-2 rounded">Copy</button>
          <button className="bg-gray-200 px-3 py-2 rounded">CSV</button>
          <button className="bg-gray-200 px-3 py-2 rounded">Excel</button>
          <button className="bg-gray-200 px-3 py-2 rounded">PDF</button>
          <button className="bg-gray-200 px-3 py-2 rounded">Print</button>
        </div>
      </div>
        <table className="w-full text-left border-separate">
          <thead>
            <tr>
              <th className="border-b py-4"><input type="checkbox" /></th>
              <th className="border-b py-4">Admission No.</th>
              <th className="border-b py-4">Student Name</th>
              <th className="border-b py-4">Department</th>
              <th className="border-b py-4">Date of Birth</th>
              <th className="border-b py-4">Gender</th>
              <th className="border-b py-4">Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeat this table row for each student entry */}
            <tr>
              <td className="border-b py-4"><input type="checkbox" /></td>
              <td className="border-b py-4">31</td>
              <td className="border-b py-4">John</td>
              <td className="border-b py-4">BTech</td>
              <td className="border-b py-4">21/4/98</td>
              <td className="border-b py-4">Male</td>
              <td className="border-b py-4">955645555773</td>
            </tr><tr>
              <td className="border-b py-4"><input type="checkbox" /></td>
              <td className="border-b py-4">31</td>
              <td className="border-b py-4">Don</td>
              <td className="border-b py-4">BTech</td>
              <td className="border-b py-4">21/4/98</td>
              <td className="border-b py-4">Male</td>
              <td className="border-b py-4">955645555773</td>
            </tr><tr>
              <td className="border-b py-4"><input type="checkbox" /></td>
              <td className="border-b py-4">31</td>
              <td className="border-b py-4">MS</td>
              <td className="border-b py-4">BTech</td>
              <td className="border-b py-4">21/4/98</td>
              <td className="border-b py-4">Male</td>
              <td className="border-b py-4">955645555773</td>
            </tr><tr>
              <td className="border-b py-4"><input type="checkbox" /></td>
              <td className="border-b py-4">31</td>
              <td className="border-b py-4">Vinnet</td>
              <td className="border-b py-4">BTech</td>
              <td className="border-b py-4">21/4/98</td>
              <td className="border-b py-4">Male</td>
              <td className="border-b py-4">955645555773</td>
            </tr><tr>
              <td className="border-b py-4"><input type="checkbox" /></td>
              <td className="border-b py-4">31</td>
              <td className="border-b py-4">Sachin</td>
              <td className="border-b py-4">BTech</td>
              <td className="border-b py-4">21/4/98</td>
              <td className="border-b py-4">Male</td>
              <td className="border-b py-4">955645555773</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginCredential;
