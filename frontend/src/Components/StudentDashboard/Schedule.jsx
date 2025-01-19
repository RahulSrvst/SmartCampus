import React, { useState } from "react";
import { FaPlus, FaCalendarAlt, FaClock } from "react-icons/fa";

const Schedules = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const getDaysInMonth = (year, month) => {
    return new Array(31)
      .fill(null)
      .map((_, index) => new Date(year, month, index + 1))
      .filter((date) => date.getMonth() === month);
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const exams = [
    {
      title: "1st Quarterly",
      subject: "Mathematics",
      date: "06 May 2024",
      time: "01:30 - 02:15 PM",
      room: "15",
      daysLeft: 19,
    },
    {
      title: "2nd Quarterly",
      subject: "Physics",
      date: "07 May 2024",
      time: "01:30 - 02:15 PM",
      room: "10",
      daysLeft: 20,
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg  w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between border-b p-4 items-center mb-4">
        <h2 className="font-normal text-lg">Schedules</h2>
        <button className="text-blue-500 text-sm flex items-center gap-1">
          <FaPlus />
          Add New
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-6 px-5">
        <div className="flex justify-between items-center mb-2">
          <button onClick={prevMonth} className="text-gray-500">
            &lt;
          </button>
          <h3 className="text-sm font-medium">
            {currentDate.toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentDate.getFullYear()}
          </h3>
          <button onClick={nextMonth} className="text-gray-500">
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-gray-500 text-sm">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <div key={index} className="font-medium">
              {day}
            </div>
          ))}
          {daysInMonth.map((date, index) => (
            <div
              key={index}
              className={`py-1 ${
                date.getDate() === currentDate.getDate() &&
                date.getMonth() === currentDate.getMonth()
                  ? "bg-blue-500 text-white rounded"
                  : ""
              }`}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>

      {/* Exams */}
      <div className="px-5 pb-2 " >
      <h3 className="font-medium mb-3">Exams</h3>
      <div className="space-y-3">
        {exams.map((exam, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold text-sm">{exam.title}</h4>
              <p className="text-sm text-gray-600">{exam.subject}</p>
              <div className="flex items-center text-gray-500 text-xs gap-2 mt-1">
                <FaClock />
                {exam.time}
              </div>
              <div className="flex items-center text-gray-500 text-xs gap-2 mt-1">
                <FaCalendarAlt />
                {exam.date}
              </div>
              <p className="text-xs text-gray-500">Room No: {exam.room}</p>
            </div>
            <div className="text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-lg">
              {exam.daysLeft} Days More
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Schedules;
