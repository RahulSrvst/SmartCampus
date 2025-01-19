import React from "react";
import { IoMdTimer } from "react-icons/io";

const CoursesWidget = ({ courses }) => {
  return (
    <div className="bg-white rounded-xl h-[270px] " >
      <h3 className="text-lg font-normal border-b p-4 text-gray-700 mb-4">Today Classes</h3>
      <div className="grid grid-cols-3 gap-5 px-5 pb-5" >
      {courses?.map((item ,index)=>(
        <div className="bg-gray-100 p-3 rounded-lg space-y-1">
          <div className={`${index%2 !== 0 ?"bg-red-600" :"bg-blue-600"} text-white w-[60%]  rounded-md `} >
          <div className="flex items-center space-x-4" > <IoMdTimer/> <span className="text-base" >{item.Time}</span></div>
          </div>
          <div className="text-base text-gray-600 " >Course Name: <span className="text-yellow-500 text-base" >{item.name}</span></div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CoursesWidget;
