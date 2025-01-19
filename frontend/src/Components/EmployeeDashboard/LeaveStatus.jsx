import React from "react";

const LeaveStatus = () => {
  const leaves = [
    {
      type: "Emergency Leave",
      date: "15 Jun 2024",
      status: "Pending",
      statusColor: "bg-blue-500",
      cardColor: "bg-red-100",
      icon: "🚨",
    },
    {
      type: "Medical Leave",
      date: "15 Jun 2024",
      status: "Approved",
      statusColor: "bg-green-500",
      cardColor: "bg-blue-100",
      icon: "❄️",
    },
    {
      type: "Medical Leave",
      date: "16 Jun 2024",
      status: "Declined",
      statusColor: "bg-red-500",
      cardColor: "bg-blue-100",
      icon: "❄️",
    },
    {
      type: "Not Well",
      date: "16 Jun 2024",
      status: "Approved",
      statusColor: "bg-green-500",
      cardColor: "bg-red-100",
      icon: "🤒",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg  w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4 mb-4">
        <h2 className="text-lg font-normal">Leave Status</h2>
        <div className="text-sm text-gray-600 flex items-center">
          <span className="mr-1">This Month</span>
          <button className="text-blue-500 font-semibold">▼</button>
        </div>
      </div>

      {/* Leave Cards */}
      <div className="space-y-4 px-5 pb-4">
        {leaves.map((leave, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg ${leave.cardColor}`}
          >
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md mr-4">
              <span className="text-lg">{leave.icon}</span>
            </div>

            {/* Leave Details */}
            <div className="flex-1">
              <p className="text-sm font-bold">{leave.type}</p>
              <p className="text-sm text-gray-600">Date: {leave.date}</p>
            </div>

            {/* Status Badge */}
            <div
              className={`px-3 py-1 text-sm text-white rounded-full ${leave.statusColor}`}
            >
              {leave.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveStatus;
