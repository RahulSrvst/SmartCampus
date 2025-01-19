import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaHome } from 'react-icons/fa';

const TransportAllocation = () => {
    const [data, setData] = useState([
        { id: 1, routeCode: 'DL4536', destination: 'Delhi', userType: 'Admin', name: 'Naveen', registerNo: '45334435' },
        { id: 2, routeCode: 'DL4536', destination: 'Delhi', userType: 'Admin', name: 'Naveen', registerNo: '45334435' },
        // Add more rows here
    ]);

    const [userType, setUserType] = useState('Student'); // Toggle between 'Student' and 'Employee'

    const columns = [
        { name: 'Sl No.', selector: row => row.id, sortable: true },
        { name: 'Route Code', selector: row => row.routeCode, sortable: true },
        { name: 'Destination', selector: row => row.destination, sortable: true },
        { name: 'User Type', selector: row => row.userType, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Register No.', selector: row => row.registerNo, sortable: true }
    ];

    return (
        <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[15%] mt-[34%] pb-10">
            <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
                Transport <FaHome className="text-blue-900 w-4 h-4" /> - Transport Allocation
            </div>

            {/* Top Tabs */}
            <div className="flex space-x-6 mb-4 bg-white p-3 w-[92%] lg:w-[97%] rounded-lg">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">Transport Allocation</button>
                <button className="text-gray-600 px-6 py-2">Manage</button>
                <button className="text-gray-600 px-6 py-2">Excel Report</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar Form */}
                <div className="bg-white  rounded-lg  shadow-md">
                    <h2 className="text-lg font-normal border-b p-5 mb-4">Transport Allocation</h2>

                    <div className="space-y-4 p-5">
                        <div>
                            <label className="text-gray-700">User Type *</label>
                            <select
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="Student">Student</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>

                        {userType === 'Student' && (
                            <>
                                <div>
                                    <label className="text-gray-700">Course *</label>
                                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                        <option>Select</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-700">Batch *</label>
                                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                        <option>Select</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-700">Student *</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="Enter Student Name" />
                                </div>
                            </>
                        )}

                        {userType === 'Employee' && (
                            <>
                                <div>
                                    <label className="text-gray-700">Designation *</label>
                                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                        <option>Select</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-700">Employee *</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="Enter Employee Name" />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="text-gray-700">Route Code *</label>
                            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="Enter Route Code" />
                        </div>

                        <div>
                            <label className="text-gray-700">Destination *</label>
                            <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                <option>Select Destination</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="md:col-span-2 bg-white shadow-md rounded-lg w-[96%] h-full mb-4 overflow-scroll p-6">
                    <div className="mb-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Copy</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">CSV</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Excel</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">PDF</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Print</button>
                        </div>
                        <div>
                            <input type="text" className="border border-gray-300 rounded-md p-2" placeholder="Search" />
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                    />
                </div>
            </div>
        </div>
    );
};

export default TransportAllocation;
