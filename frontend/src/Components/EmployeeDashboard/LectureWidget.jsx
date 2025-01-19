import React from "react";

const LectureScheduleWidget = ({ lectures }) => {
  return (
    <div className="bg-white  rounded-xl pb-4 shadow-lg"  >
      <h3 className="text-lg p-4 border-b font-normal text-gray-700 mb-6">Lecture Schedule</h3>
      <table className="min-w-[95%] bg-white border border-gray-200 rounded-lg overflow-hidden mx-5">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-4 px-6 text-left">Lecture</th>
            <th className="py-4 px-6 text-left">Time</th>
            <th className="py-4 px-6 text-left">Teacher</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {lectures.map((lecture, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : ""
              }`}
            >
              <td className="py-5 px-6">{lecture.name}</td>
              <td className="py-5 px-6">{lecture.time}</td>
              <td className="py-5 px-6">{lecture.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureScheduleWidget;
