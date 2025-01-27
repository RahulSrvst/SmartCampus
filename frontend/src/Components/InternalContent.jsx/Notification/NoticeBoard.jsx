import React, { useState } from "react";
import { FaHome, FaEdit, FaTrash } from "react-icons/fa";
import NotificationForm from "./NotificationForm"; // Import the form

const NoticeBoard = () => {
  const [openForm, setOpenForm] = useState(false); // State to manage form visibility

  return (
    <div className="p-6 ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[22%] xl:mt-[8%] md:mt-[10%] mt-[35%]">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-500 space-x-2">
        <span className="text-xl">Notification</span>
        <FaHome />
        <span className="text-sm"> - Notice Board</span>
      </div>

      {openForm ? (
        <div>
          {/* Show NotificationForm */}
          <h2 className="text-xl font-semibold mb-4">Post New Message</h2>
          <NotificationForm />
          <button
            onClick={() => setOpenForm(false)}
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          {/* Notice Board Container */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Notice Board</h2>
            <button
              onClick={() => setOpenForm(true)} // Open the form
              className="px-4 py-2 bg-blue-900 text-white rounded-md"
            >
              Post New Message
            </button>
          </div>

          {/* Notice Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg border-separate">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 text-blue-600 border">Holiday</td>
                  <td className="p-4 flex justify-end space-x-2 border">
                    <button className="p-2 bg-purple-100 rounded-full">
                      <FaEdit className="text-blue-600" />
                    </button>
                    <button className="p-2 bg-purple-100 rounded-full">
                      <FaTrash className="text-blue-600" />
                    </button>
                  </td>
                </tr>

                {/* Additional Notices */}
                {["Notice 2", "Notice 3", "Notice 4"].map((notice, index) => (
                  <tr key={index} className="border">
                    <td className="p-4 text-blue-600 border">{notice}</td>
                    <td className="p-4 flex justify-end space-x-2 border">
                      <button className="p-2 bg-purple-100 rounded-full">
                        <FaEdit className="text-blue-600" />
                      </button>
                      <button className="p-2 bg-purple-100 rounded-full">
                        <FaTrash className="text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
