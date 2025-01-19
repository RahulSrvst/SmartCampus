import React from "react";
import "./Course.css";
import { FaBook, FaEdit, FaFileAlt, FaHome, FaPen, FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const ELearning = () => {
  return (
    <div className=" p-4  ml-[5%] md:ml-[43%] lg:ml-[32.5%] xl:ml-[22%] xl:mt-[7%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20 w-[95%] md:w-[56%] lg:w-[66.5%] xl:w-[77%]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        <span className="text-[20px]">Academic</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - E Learning
        </span>
        <span className="text-[14px] mt-0.5 -ml-2">- E Learning</span>
      </div>

      {/* Header Section */}
      <div className="dark-color text-white text-center rounded-t-md shadow-md relative">
        <h1 className="text-2xl font-semibold p-4">Welcome to E-Learning</h1>
        <p className="p-4 pt-0">Here you can find information, tools, and resources to support and enhance education delivery and management</p>
        <BsThreeDotsVertical className="absolute top-6 right-8" />
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-b-md shadow-md flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
        <div className="w-full">
          <label className="block mb-2 md:mb-0">Search for Lessons</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Search the Lessons"
              className="border border-gray-300 rounded-md p-2 w-full md:w-[40vw] flex-grow mr-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">Search</button>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Knowledge Base Card */}
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <div className="text-green-600 text-4xl mb-4 flex justify-center">
            <FaBook className="border-4 border-green-600 rounded-full p-3 w-16 h-16" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Knowledge Base</h2>
          <p className="text-gray-600 mb-4">Ouch found swore much dear conductively hid submissively hatchet vexed far inanimately alongside candidly much and jeez</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Browse Videos</button>
        </div>

        {/* Worksheets Center Card */}
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <div className="text-red-500 text-4xl mb-4 flex justify-center">
            <FaBook className="border-4 border-red-500 rounded-full p-3 w-16 h-16" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Worksheets Center</h2>
          <p className="text-gray-600 mb-4">Dear spryly growled much far jeepers vigilantly less and far hideous and some mannishly less jeepers less and and crud</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Go To</button>
        </div>

        {/* Articles and Lessons Card */}
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <div className="text-purple-600 text-4xl mb-4 flex justify-center">
            <FaBook className="border-4 border-purple-600 rounded-full p-3 w-16 h-16" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Articles and Lessons</h2>
          <p className="text-gray-600 mb-4">Diabolically somberly astride crass one endearingly blatant depending peculiar antelope piquantly popularly adept much</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">Browse Lessons</button>
        </div>
      </div>

      {/* Browse Lessons by Subject Section */}
      <div className="dark-color text-white text-center p-4 mt-6 rounded-t-md shadow-md">
        <h2 className="text-xl font-semibold">Browse Lessons by Subject</h2>
      </div>
      <div className="bg-white h-12 rounded-b-md"></div>

      {/* Latest Learning Videos Section */}
      <div className="dark-color text-white text-center p-4 mt-6 rounded-t-md shadow-md">
        <h2 className="text-xl font-semibold">Latest Learning Videos</h2>
      </div>
      <div className="bg-white h-12 rounded-b-md"></div>
    </div>
  );
};

export default ELearning;
