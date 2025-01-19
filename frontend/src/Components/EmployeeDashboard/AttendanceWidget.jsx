import React from "react";
import Chart from "react-apexcharts";

const AttendanceWidget = () => {
  const chartOptions = {
    series: [25, 1, 0, 2],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Present", "Late", "Half Day", "Absent"],
      colors: ["#28a745", "#007bff", "#f0ad4e", "#dc3545"], 
      legend: {
        show: false, 
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg  w-full  ">
      <div className="flex justify-between border-b p-4 items-center mb-4">
        <h2 className="text-lg font-normal">Attendance</h2>
        <div className="text-sm text-gray-600 flex items-center">
          <span className="mr-1">This Week</span>
          <button className="text-blue-500 font-semibold">▼</button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4 mx-8">
        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
          <span>Last 7 Days</span>
          <span>14 May 2024 - 21 May 2024</span>
        </div>
        <div className="flex space-x-2 mb-2">
          <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded">M</span>
          <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded">T</span>
          <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded">W</span>
          <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded">T</span>
          <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded">F</span>
          <span className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded">S</span>
          <span className="bg-gray-300 text-gray-500 w-6 h-6 flex items-center justify-center rounded">S</span>
        </div>
        <div className="text-sm text-gray-700">
          <span>🗓️</span> No of total working days: <b>28 Days</b>
        </div>
      </div>

      <div className="grid grid-cols-4 text-center text-sm mb-3  px-8">
        <div>
          <p className="font-bold text-lg">25</p>
          <p className="text-gray-600">Present</p>
        </div>
        <div>
          <p className="font-bold text-lg">2</p>
          <p className="text-gray-600">Absent</p>
        </div>
        <div>
          <p className="font-bold text-lg">0</p>
          <p className="text-gray-600">Halfday</p>
        </div>
        <div>
          <p className="font-bold text-lg">1</p>
          <p className="text-gray-600">Late</p>
        </div>
      </div>

      <div className="flex justify-center ">
        <Chart className="" options={chartOptions.options} series={chartOptions.series} type="donut" />
      </div>

      <div className="grid grid-cols-4 gap-2 text-sm pb-3 px-10">
        <div className="flex items-center">
          <span className="w-3 h-3 whitespace-nowrap bg-green-500 rounded-full mr-2"></span> Present
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 whitespace-nowrap bg-red-500 rounded-full mr-2"></span> Absent
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 whitespace-nowrap bg-yellow-500 rounded-full mr-2"></span><span className="whitespace-nowrap" >Half Day</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 whitespace-nowrap bg-blue-500 rounded-full mr-2"></span> Late
        </div>
      </div>
    </div>
  );
};

export default AttendanceWidget;
