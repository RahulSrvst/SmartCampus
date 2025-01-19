import React from "react";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

const AddBook = () => {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] md:mt-[10%] mt-[35%] pb-20" >
       <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3   xl:-ml-11 ">
        <span className="text-xl" >Library </span><FaHome className="text-blue-900 w-4 h-4" /> - Add Book 

        </div>
    <div className="flex flex-wrap gap-x-4 ">
      {/* Add Batch Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[96%] mb-4">
        <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white rounded-t-lg">Add New Book </h2>
        
        <form className="p-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 space-x-5 ">
          <div>
          <label className="block ml-5 mb-2">Purchase Date<span className="text-red-500">*</span></label>
          <input type="date" className="w-[95%] ml-5 pl-5 mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Bill No<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Add Book Category / Name<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Book ISBN no.<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Book No.<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Title<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Author<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Addition<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Book Category<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Publisher<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">No of Copies<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Shelf No.<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Book Position<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Book Cost<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
           <div>
          <label className="block mb-2">Language<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Book Category Name" />
          </div>
          
          

          
          <button type="submit" className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      </div>

      {/* Batch List Section */}
      
    </div>
      </div>

    
  );
};

export default AddBook;
