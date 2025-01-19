import React from "react";

const Announcement = ({ announcements }) => {
  return (
    <div className="bg-white p-5 rounded-xl" >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Latest Announcements</h3>
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-bold text-gray-800">{announcement.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{announcement.description}</p>
            <span className="text-xs text-gray-500 mt-1 block">{announcement.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
