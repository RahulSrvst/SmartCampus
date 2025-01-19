import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";

const TableComponent = () => {
  const [allData, setAllData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Assume you retrieve the token from local storage or context
  const token = localStorage.getItem("token"); // Replace with your token retrieval logic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.188:9090/course-api/?id=2", {
          method: "GET", // Specify the method (GET is default, but explicit is clearer)
          headers: {
            "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
            "Content-Type": "application/json" // Ensure you are sending JSON
          }
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        setAllData(data);
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const results = allData.filter(entry =>
      entry.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, allData]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white p-4 md:p-6 shadow-md rounded-xl ml-[33%] mt-[12%] w-[96%] lg:w-[97%] xl:w-[50%] md:w-[96%] h-[15%] overflow-auto">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4">
        <div className="flex items-center mb-2 md:mb-0">
          <label>Show</label>
          <select className="mx-2 p-1 border border-gray-300 rounded" value={entriesPerPage} onChange={handleEntriesPerPageChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <label>entries</label>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Search:</label>
          <input
            type="text"
            className="p-1 border border-gray-300 rounded"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-[16px] border-b border-black">
            <th className="px-4 py-2">
              <div className="flex justify-between">Course <HiOutlineArrowsUpDown className="mt-6 w-12 h-" /></div>
            </th>
            <th className="px-4 py-2">
              <div className="flex justify-between">Attendance Type <HiOutlineArrowsUpDown className="mt-6 w-12 h-" /></div>
            </th>
            <th className="px-4 py-2">
              <div className="flex justify-between">Minimum Attendance %<HiOutlineArrowsUpDown className="mt-8 w-12 h-" /></div>
            </th>
            <th className="px-4 py-2">
              <div className="flex justify-between">Total Working Days <HiOutlineArrowsUpDown className="mt-8 w-12 h-" /></div>
            </th>
            <th className="px-4 py-2">
              <div className="flex justify-between">Option <HiOutlineArrowsUpDown className="mt-6 w-12 h-" /></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index} className="text-[16px] space-y-2 border-b border-slate-300 bg-gray-100">
              <td className="border-r-2 border-white px-4 ">{entry.course}</td>
              <td className="border-r-2 border-white px-4 py-4 ">{entry.type}</td>
              <td className="border-r-2 border-white px-4 py-4 ">{entry.minAttendance}</td>
              <td className="border-r-2 border-white px-4 py-4 ">{entry.workingDays}</td>
              <td className="border-r-2 border-white px-4 py-4 text-center">
                <button className="text-blue-900 mx-2" aria-label="Edit course">
                  <TiPencil className="h-[16px] w-[16px] pt-0.5" />
                </button>
                <button className="text-blue-900" aria-label="Delete course">
                  <FaTrashAlt className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <p className="text-[14px] text-slate-500 ">
          Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
        </p>
        <div className="flex">
          <button className="text-slate-500 mx-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button className="bg-purple text-white px-3 py-2 rounded-sm">{currentPage}</button>
          <button className="text-slate-500 mx-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
