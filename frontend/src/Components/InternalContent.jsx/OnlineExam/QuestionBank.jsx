import React from "react";
import { FaEdit, FaHome, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function QuestionBank() {
  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20 ">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-2 ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Online Exam</span><span className="text-[14px]  mt-0.5" > - Question Bank</span>
      </div>
      <div className=" bg-white shadow-md rounded-lg w-[98%] md:w-[96%] lg:w-[95%] xl:w-[96%] mb-4">
        {/* Header with Title and Add Exam Button */}
        <div className="flex justify-between py-6 px-5 border-b">
          <span className="text-xl font-semibold">Question Bank</span>
          <button className="bg-dark-color text-white rounded px-4 py-1 text-lg mr-5">
            Add Exam
          </button>
        </div>

        {/* Export Buttons and Search Input */}
        <div className="mx-5 lg:flex hidden justify-between py-4">
          <div>
            <button className="px-6 py-1.5 rounded-l-lg bg-slate-200 mr-0.5">
              Copy
            </button>
            <button className="px-6 py-1.5 bg-slate-200 mr-0.5">CSV</button>
            <button className="px-6 py-1.5 bg-slate-200 mr-0.5">Excel</button>
            <button className="px-6 py-1.5 bg-slate-200 mr-0.5">PDF</button>
            <button className="px-6 py-1.5 rounded-r-lg bg-slate-200">Print</button>
          </div>

          <div>
            <label className="mr-2">Search:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg py-1 px-2"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4 p-5">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Exam</th>
                <th className="p-3 border">Quiz</th>
                <th className="p-3 border">Questions</th>
                <th className="p-3 border">Attempt</th>
                <th className="p-3 border">Exam From</th>
                <th className="p-3 border">Exam To</th>
                <th className="p-3 border">Duration</th>
                <th className="p-3 border">Exam Publish</th>
                <th className="p-3 border">Result Publish</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1011</td>
                <td className="p-3 border text-center text-blue-600">Sophia</td>
                <td className="p-3 border text-center">sophia@gmail.com</td>
                <td className="p-3 border text-center">How to customize the template?</td>
                <td className="p-3 border text-center">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full">New</span>
                </td>
                <td className="p-3 border text-center">Elijah</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
              </tr>
              {/* Additional rows can be added here similarly */}
              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>


              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>


              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>


              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>



              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>


              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>


              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>


              <tr className="hover:bg-slate-100">
                <td className="p-3 border text-center">1024</td>
                <td className="p-3 border text-center text-blue-600">Jayden</td>
                <td className="p-3 border text-center">jayden@gmail.com</td>
                <td className="p-3 border text-center">How to set Horizontal nav</td>
                <td className="p-3 border text-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Complete</span>
                </td>
                <td className="p-3 border text-center">Andrew</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">14-10-2018</td>
                <td className="p-3 border text-center">13-10-2018</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuestionBank;
