import React from "react";
import { FaHome, FaPlus } from "react-icons/fa";

function ManageLecturePlan() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dates = [
    "12/14/2021",
    "12/15/2021",
    "12/16/2021",
    "12/17/2021",
    "12/18/2021",
    "12/19/2021",
    "12/19/2021",
  ];

  return (
    <div className="  ml-[5%] md:ml-[43%] lg:ml-[32.5%] xl:ml-[22.5%] xl:mt-[7%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20 w-[90%] md:w-[54.5%] lg:w-[65.5%] xl:w-[76%]   rounded-md ">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        <span className="text-[20px]">Academic</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Lecture Plan
        </span>
        <span className="text-[14px] mt-0.5 -ml-2">- Manage Lecture Plan</span>
      </div>

      <div className="bg-white rounded-md">
        <div className="border-b w rounded-t-lg">
          <h1 className="text-lg font-normal p-6">Manage Lecture Plan</h1>
        </div>
        <div className="p-4 text-sm text-gray-700">
          <label className="block mb-2">
            Teachers <span className="text-red-500">*</span>
          </label>
          <select className="w-[50%] mb-4 p-1 border border-gray-300 rounded">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          <button className="dark-color text-white rounded ml-5 px-5 py-1">
            Search
          </button>
        </div>

        <div className="flex justify-center items-center mt-5 mb-4">
          <span>{"<  "}</span>
          <span className="text-3xl font-medium">"From Date" To "To Date"</span>
          <span>{"  >"}</span>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="min-w-full  border-gray-200">
            <thead>
              <tr className="border  ">
                {days.map((day, index) => (
                  <th
                    key={index}
                    className="p-0.5  border-gray-200 font-bold text-center"
                  >
                    <div className="border p-3">
                      {day}
                      <br />
                      {dates[index]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="">
                {days.map((day, index) => (
                  <td
                    key={index}
                    className=" border-gray-200 p-0.5 text-center align-top "
                  >
                    {index === 0 ? (
                      <div className="space-y-0.5">
                        {[1, 2, 3].map((item, idx) => (
                          <div
                            className="border  p-4 flex flex-col items-start"
                            key={idx}
                          >
                            <div className="bg-gray-100 rounded-full p-2 w-8 mr-3">
                              <FaPlus className="text-purple-500 " />
                            </div>
                            <div className="bg-green-50 p-2 rounded-sm  shadow-sm flex-grow w-full text-[#05825f] font-extrabold">
                              <div className="flex  space-x-2 mb-2">
                                <div>
                                  <p className="text-sm ">
                                    Subject: English (002)
                                  </p>
                                  <p className="text-sm">
                                    Department: Btech (CSE)
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm">1:58 PM - 1:58 PM</p>
                              <p className="text-sm">Room No: 121</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 flex justify-center items-center xl:h-[160px] h-[252px] border hover:bg-gray-100 ">
                        Not Scheduled
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageLecturePlan;
