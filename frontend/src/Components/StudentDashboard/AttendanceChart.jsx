import React from "react";
import Chart from "react-apexcharts";

const Attendance = () => {
  const chartOptions = {
    series: [89.3, 7.1, 0, 3.6],
    labels: ["Present", "Late", "Half Day", "Absent"],
    colors: ["#00C853", "#2196F3", "#E0E0E0", "#D50000"],
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg  w-full max-w-sm">
      <div className="flex justify-between border-b p-4 items-center mb-4">
        <h2 className="font-normal text-lg">Attendance</h2>
        <button className="text-sm text-gray-600 border px-2 py-1 rounded-lg">
          This Week
        </button>
      </div>


      <div className="px-4 pb-4 " >

      {/* Stats Section */}
      <p className="text-sm text-gray-500 mb-3">
        <span className="mr-1 text-lg font-medium text-black">
          No of total working days
        </span>{" "}
        <span>28 Days</span>
      </p>
      <div className="grid grid-cols-3 text-center mb-6">
        <div>
          <p className="text-lg font-bold text-green-500">25</p>
          <p className="text-sm text-gray-500">Present</p>
        </div>
        <div>
          <p className="text-lg font-bold text-red-500">2</p>
          <p className="text-sm text-gray-500">Absent</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-500">0</p>
          <p className="text-sm text-gray-500">Half Day</p>
        </div>
      </div>

      <Chart options={chartOptions} series={chartOptions.series} type="donut" width="95%" />

      <div className="mt-5">
        <h3 className="font-medium mb-1">Last 7 Days</h3>
        <p className="text-sm text-gray-500 mb-1">14 May 2024 - 21 May 2024</p>
        <div className="flex justify-between px-5 border p-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center  ${
                index === 5 || index === 6
                  ? "bg-gray-200 text-gray-400"
                  : index === 4
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Attendance;
