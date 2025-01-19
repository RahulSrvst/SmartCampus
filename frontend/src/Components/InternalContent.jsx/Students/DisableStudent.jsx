import React from "react";
import { FaEdit, FaHome } from "react-icons/fa";

const DisableStudent = () => {
  const data = [
    { id: 'KU 00789', name: 'Cameron', address: '123 6th St. Melbourne, FL 32904', number: '404-447-4569', department: 'Medical' },
    { id: 'KU 00987', name: 'Alex', address: '123 6th St. Melbourne, FL 32904', number: '404-447-7412', department: 'M.COM' },
    { id: 'OU 00456', name: 'Joseph', address: '70 Bowman St. South Windsor, CT 06074', number: '404-447-6013', department: 'MCA' },
    { id: 'OU 00951', name: 'James', address: '44 Shirley Ave. West Chicago, IL 60185', number: '404-447-2589', department: 'MBA' },
  ];

  const getDepartmentClass = (department) => {
    switch (department) {
      case 'Medical':
        return 'bg-yellow-400 text-white';
      case 'M.COM':
        return 'bg-blue-500 text-white';
      case 'MCA':
        return 'bg-purple-500 text-white';
      case 'MBA':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-300 text-white';
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2">
        <span className="text-[20px]">Students</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Disabled Student
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4">
        <div className="bg-white shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto mb-5">
          <h2 className="text-lg border-b font-normal mb-4 px-6 py-4 text-black rounded-t-lg">Student List</h2>
          <form className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-5 text-sm text-gray-700">
            <div>
              <label className="block mb-2">Department</label>
              <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />
            </div>
            <div>
              <label className="block mb-2">Search By keyword</label>
              <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" />
            </div>
            <button type="submit" className="lg:w-[20%] w-[25%] h-9 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">Search</button>
          </form>
        </div>
        
        <div className="bg-white shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[96%] md:w-[96%] h-[15%] overflow-auto mb-5">
          <h2 className="text-lg font-normal border-b mb-4 px-6 py-4 text-black rounded-t-lg">Disabled Student List</h2>
          <div className="bg-white p-2 ml-4  pr-6">
            <div className="md:flex text-sm text-gray-700 hidden justify-between items-center mb-4">
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
              <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
            </div>
            
            <div className="w-full">
              <table className="min-w-full text-sm  border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-4 border-r px-4 border-b font-semibold">ID</th>
                    <th className="py-4 border-r px-4 border-b font-semibold">Name</th>
                    <th className="py-4 border-r px-4 border-b font-semibold">Disable Reason</th>
                    <th className="py-4 border-r px-4 border-b font-semibold">Address</th>
                    <th className="py-4 border-r px-4 border-b font-semibold">Number</th>
                    <th className="py-4 border-r px-4 border-b font-semibold">Department</th>
                    <th className="py-4 border-r px-4 border-b font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 border-r px-4">{item.id}</td>
                      <td className="py-4 border-r px-4">{item.name}</td>
                      <td className="py-4 border-r px-4"></td> {/* Empty for Disable Reason */}
                      <td className="py-4 border-r px-4">{item.address}</td>
                      <td className="py-4 border-r px-4">{item.number}</td>
                      <td className="py-4 border-r px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getDepartmentClass(item.department)}`}>
                          {item.department}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <button className="bg-purple-100 p-2 rounded-full text-purple-600">
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between text-sm items-center mt-4 py-3">
              <p>Showing 1 to 1 of 1 entries</p>
              <div className="text-sm" >
                <button className="text-blue-600 mx-2">Previous</button>
                <button className="bg-purple text-white px-2 rounded">1</button>
                <button className="text-blue-600 mx-2">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisableStudent;
