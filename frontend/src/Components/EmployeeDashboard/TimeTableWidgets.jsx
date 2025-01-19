import React from "react";

const TimeTableWidget = ({ timetable }) => {
  return (
    <div className="bg-white  rounded-xl pb-10 shadow-lg" >
      <h3 className="text-lg font-normal p-4 border-b text-gray-700 mb-4">Daily Timetable</h3>
      <table className="min-w-[94%] bg-white border border-gray-200 rounded-lg overflow-hidden m-5 ">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-6 px-6 text-left">Time</th>
            <th className="py-6 px-6 text-left">Activity</th>
            <th className="py-6 px-6 text-left">Location</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {timetable.map((entry, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : ""
              }`}
            >
              <td className="py-6 px-6">{entry.time}</td>
              <td className="py-6 px-6">{entry.activity}</td>
              <td className="py-6 px-6">{entry.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTableWidget;
