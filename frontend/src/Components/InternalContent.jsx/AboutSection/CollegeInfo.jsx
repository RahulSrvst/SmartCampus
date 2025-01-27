import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";

const CollegeInfo = () => {
    const [selectedCollege, setSelectedCollege] = useState(null);
  const [colleges, setColleges] = useState([]);

  // Fetch colleges data from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(baseURL + API_URLS.getCollegeDetails); // Replace with your API endpoint
        setColleges(response.data.data);
      } catch (error) {
        console.error("Error fetching colleges data", error);
      }
    };

    fetchColleges();
  }, []);


const colleges1 = [
    {
      "id": "C001",
      "name": "XYZ College",
      "email": "contact@xyzcollege.com",
      "mobile": "1234567890",
      "address": "123 Main Street, City, Country"
    },
    {
      "id": "C002",
      "name": "ABC University",
      "email": "info@abcuniversity.com",
      "mobile": "9876543210",
      "address": "456 Elm Street, Another City, Country"
    }
  ]
  

  const handleViewInfo = (college) => {
    setSelectedCollege(college);
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[21.5%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5" >
    <div className="w-[96%] mx-auto  bg-white shadow-md rounded-md">
      <h1 className="text-lg font-normal p-5 border-b text-gray-800 mb-6">College Dashboard</h1>
      <div className="overflow-x-auto px-5 pb-6">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">#</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">College Name</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Email</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Contact</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colleges?.map((college, index) => (
              <tr key={college.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{college.name}</td>
                <td className="px-4 py-2">{college.email}</td>
                <td className="px-4 py-2">{college.mobile}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewInfo(college)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to display college details */}
      {selectedCollege && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[999] bg-opacity-30">
          <div className="bg-white  rounded-lg shadow-lg max-w-2xl ">
            <h2 className="text-lg font-normal border-b p-3 mb-4">College Information</h2>

            <img src={selectedCollege.logo} className="w-40 h-40 mx-auto" />
            <p className="text-sm text-gray-700 px-5 pt-5">
              <strong>College ID:</strong> {selectedCollege._id}
            </p>
            <p className="text-sm text-gray-700 px-5">
              <strong>Name:</strong> {selectedCollege.name}
            </p>
            <p className="text-sm text-gray-700 px-5">
              <strong>Selected Plan:</strong> {selectedCollege.plan.name}
            </p><p className="text-sm text-gray-700 px-5">
              <strong>Selected Plan Price:</strong> ₹{selectedCollege.plan.price}
            </p><p className="text-sm text-gray-700 px-5">
              <strong>College Name:</strong> {selectedCollege.college}
            </p><p className="text-sm text-gray-700 px-5">
              <strong>Email:</strong> {selectedCollege.email}
            </p>
            <p className="text-sm text-gray-700 px-5">
              <strong>Mobile:</strong> {selectedCollege.mobile}
            </p>
            <p className="text-sm text-gray-700 px-5">
              <strong>Address:</strong> {selectedCollege.address}
            </p>
            <div className="mt-4 px-5 pb-4 space-x-5">
              
              <button
                onClick={() => setSelectedCollege(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login College
              </button>
              <button
                onClick={() => setSelectedCollege(null)}
                className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CollegeInfo;
