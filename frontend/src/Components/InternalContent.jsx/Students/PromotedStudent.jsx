import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const PromotedStudent = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2">
        <span className="text-[20px]">Students</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Promoted Student
        </span>
      </div>
    <div className="flex flex-wrap gap-x-4 ">


    <div className="bg-white  shadow-md rounded-lg w-[96%] md:w-[97%] mb-4">
            <h2 className="text-xl border-b font-semibold mb-4 px-6 py-4 text-black  rounded-t-lg">Search Student Promotion</h2>
            
            <form className="p-4  gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
            <label className="block mb-2">Department<span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Category Name" />
            </div>
            <div>
            <label className="block mb-2">Stream<span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Category Name" />
            </div>
            </div>
              
              
              
    
              
    
              
            </form>


            <h2 className="text-xl border-b font-semibold mb-4 px-6 py-4 text-black  rounded-t-lg">Student Promote To</h2>
            
            <form className="p-4  gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
            <label className="block mb-2">Promoted Session<span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Category Name" />
            </div>
            <div>
            <label className="block mb-2">Department<span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Category Name" />
            </div>
            <div>
            <label className="block mb-2">Stream <span className="text-red-500">*</span></label>
            <input type="text" className="w-[100%] mb-4 p-2 border border-gray-300 rounded" placeholder="Category Name" />
            </div>
            </div>
              
              
              
    
              
    
              
            </form>
          </div>
          {/* Add Course Form */}
          
    
          {/* Course List Section */}
          
        </div>

        </div>
  );
};

export default PromotedStudent;
