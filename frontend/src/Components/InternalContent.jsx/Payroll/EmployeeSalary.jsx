// import { useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";

// import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
// import { HiOutlineArrowsUpDown } from "react-icons/hi2";
// import { TiPencil } from "react-icons/ti";
// import { baseURL } from "../../Configs/axios";
// import { API_URLS } from "../../Configs/urls";
// import axios from "axios";

// const EmployeeSalary = () => {
//   const [designation, setDesignation] = useState([]);

//   const [employeeName, setEmployeeName] = useState([]);
//   const [designationID, setDesignationID] = useState([]);
//   const [salarySetting, setSalarySetting] = useState([]);

//   const fetchDesignation = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(baseURL + API_URLS.designation, {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setDesignation(response.data.data);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const fetchEmoployeeName = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(baseURL + API_URLS.printList, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "application/json",
//         },
//         params: {
//           designation_id: designationID,
//         },
//       });
//       if (response.status === 200) {
//         const Emp_data = response.data.data;
//         if (Emp_data && Emp_data.length > 0) {
//           setEmployeeName(Emp_data);
//           // console.log(Emp_data);
//         } else {
//           // setEmployeeName([]);
//           // toast.success("There is No Employee Name for this Designation")
//         }
//       } else {
//         console.log("Error");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     fetchDesignation();
//   }, []);

//   const initialValues = {
//     designation: "",
//     employeename: "",
//     year: "",
//     month: "",
//     endDate: "",
//     StartDate: "",
//   };

//   const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
//     initialValues: initialValues,
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   function handleDesignationID(id) {
//     setDesignationID(id);
//   }

//   useEffect(() => {
//     fetchEmoployeeName();
//   }, [designationID]);

//   const fetchSalarySetting = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(baseURL + API_URLS, {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         setSalarySetting(response.data.data);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%]  ">
//       <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:-ml-7 ">
//         Payroll <FaHome className="text-blue-900 w-4 h-4" /> - Employee Salary
//       </div>
//       <div className="flex flex-wrap gap-x-4 ">
//         {/* Add Batch Form */}
//         <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
//           <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-5 dark-color text-white rounded-t-lg">
//             <h2>Add Salary</h2>
//             <BsThreeDotsVertical />
//           </div>
//           <form className="p-4 text-sm text-gray-700">
//             <label className="block mb-2">
//               Designation <span className="text-red-500">*</span>
//             </label>
//             <select
//               className="w-full mb-4 p-2 border border-gray-300 rounded"
//               onChange={(e) => {
//                 const selectedCourseId =
//                   e.target.options[e.target.selectedIndex].getAttribute(
//                     "data-id"
//                   );

//                 setFieldValue("designation", selectedCourseId);
//                 handleDesignationID(selectedCourseId);
//               }}
//             >
//               <option>Please Select</option>
//               {designation?.map((items) => (
//                 <option data-id={items.id}>{items.designation_name}</option>
//               ))}
//             </select>

//             <label className="block mb-2">
//               Employee Name<span className="text-red-500">*</span>
//             </label>
//             <select
//               className="w-full mb-4 p-2 border border-gray-300 rounded"
//               onChange={(e) => {
//                 const selectedCourseId =
//                   e.target.options[e.target.selectedIndex].getAttribute(
//                     "data-id"
//                   );

//                 setFieldValue("employeename", selectedCourseId);
//               }}
//             >
//               <option>Please Select </option>
//               {employeeName?.map((items) => (
//                 <option data-id={items.id}>
//                   {items.firstname} {items.lastname}{" "}
//                 </option>
//               ))}
//             </select>

//             <label className="block mb-2">
//               Year <span className="text-red-500">*</span>
//             </label>
//             <select className="w-full mb-4 p-2 border border-gray-300 rounded" onChange={handleChange} value={values.year} name="year">
//             <option>Please Select</option>
//               <option>2020</option>
//               <option>2021</option>
//               <option>2022</option>
//               <option>2023</option>
//               <option>2024</option>
//               <option>2025</option>
//               <option>2026</option>
//               <option>2027</option>
//               <option>2028</option>
//               <option>2029</option>
//               <option>2030</option>
//             </select>

//             <label className="block mb-2">
//               Month <span className="text-red-500">*</span>
//             </label>
//             <select className="w-full mb-4 p-2 border border-gray-300 rounded" onChange={handleChange} value={values.month} name="month">
//             <option>Please Select</option>
//               <option>Januray</option>
//               <option>Febuary</option>
//               <option>March</option>
//               <option>April</option>
//               <option>May</option>
//               <option>June</option>
//               <option>July</option>
//               <option>August</option>
//               <option>September</option>
//               <option>Octuber</option>
//               <option>November</option>
//               <option>Decmeber</option>
//             </select>

//             <label className="block mb-2">
//               Start Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               className="w-full mb-4 p-2 border border-gray-300 rounded"
             
//                onChange={handleChange} value={values.StartDate} name="StartDate"
//             />

//             <label className="block mb-2">
//               End Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               className="w-full mb-4 p-2 border border-gray-300 rounded"
//               placeholder="Please Select"
//                onChange={handleChange} value={values.endDate} name="endDate"
//             />

//             {/* <label className="block mb-2">Pay Head <span className="text-red-500">*</span></label>
//           <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Pay Head" />

//           <label className="block mb-2">Amount <span className="text-red-500">*</span></label>
//           <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="Amount" /> */}

//             <button
//               type="submit"
//               className="w-full lg:w-[12%] bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500"
//             >
//               Go
//             </button>

//             <table className="w-full text-[14px]">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 text-start">Pay Head</th>
//                   <th className="px-4 py-2 text-start">Amt or %</th>
//                   <th className="px-4 py-2 text-start">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border-y border-gray-300 px-2 ">
//                     Basic Salary
//                   </td>
//                   <td className="border-y border-gray-300 px-4 py-2 ">1000</td>
//                   <td className="border-y border-gray-300 px-4 py-2 ">1000</td>
//                 </tr>
//               </tbody>
//             </table>
//             <button
//               type="submit"
//               className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 mt-2 "
//             >
//               Save
//             </button>
//           </form>
//         </div>

//         {/* Batch List Section */}
//         <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%]">
//           <div className=" overflow-auto">
//             <div className="flex flex-wrap text-sm text-gray-600 md:flex-nowrap justify-between items-center mb-4">
//               <div className="flex items-center mb-2 md:mb-0">
//                 <label>Show</label>
//                 <select className="mx-2 p-1 border border-gray-300 rounded">
//                   <option>10</option>
//                   <option>20</option>
//                   <option>50</option>
//                 </select>
//                 <label>entries</label>
//               </div>
//               <div className="flex items-center">
//                 <label className="mr-2">Search:</label>
//                 <input
//                   type="text"
//                   className="p-1 border border-gray-300 rounded"
//                   placeholder="Search..."
//                 />
//               </div>
//             </div>

//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-[16px] border-b border-black">
//                   <th className="px-4 py-2">
//                     <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
//                       Sr. No. <HiOutlineArrowsUpDown className="text-sm" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-2">
//                     <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
//                       Designation
//                       <HiOutlineArrowsUpDown className="text-sm" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-2">
//                     <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
//                       Employee Name
//                       <HiOutlineArrowsUpDown className="text-sm" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-2">
//                     <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
//                       Months
//                       <HiOutlineArrowsUpDown className="text-sm" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-2">
//                     <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
//                       Issue Date
//                       <HiOutlineArrowsUpDown className="text-sm" />
//                     </div>
//                   </th>
//                   <th className="px-4 py-2">
//                     <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
//                       Option <HiOutlineArrowsUpDown className="text-sm" />
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="text-sm space-y-2 border-b border-slate-300  bg-gray-100">
//                   <td className="border-r-2 border-white px-4 ">1</td>
//                   <td className="border-r-2 border-white px-4 py-4 ">
//                     Basic Salary
//                   </td>
//                   <td className="border-r-2 border-white px-4 py-4 "></td>
//                   <td className="border-r-2 border-white px-4 py-4 "></td>
//                   <td className="border-r-2 border-white px-2 py-4 ">
//                     <div>
//                       <button className="bg-green-600 px-2 py-1 rounded text-white ">
//                         Addtion
//                       </button>
//                     </div>
//                   </td>
//                   <td className="border-r-2 border-white px-4 py-4  text-center">
//                     <button
//                       className="text-blue-900 mx-2"
//                       aria-label="Edit course"
//                     >
//                       <TiPencil className="h-[16px] w-[16px] pt-0.5" />
//                     </button>
//                     <button
//                       className="text-blue-900"
//                       aria-label="Delete course"
//                     >
//                       <FaTrashAlt className="h-3 w-3" />
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <div className="flex justify-between items-center mt-4">
//               <p className="text-sm text-slate-500 ">
//                 Showing 1 to 1 of 1 entries
//               </p>
//               <div className="flex text-sm">
//                 <button className="text-slate-500 mx-2">Previous</button>
//                 <button className="bg-purple text-white px-3 py-2 rounded-sm">
//                   1
//                 </button>
//                 <button className="text-slate-500 mx-2">Next</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSalary;



import React from 'react'

const EmployeeSalary = () => {
  return (
    <div className='ml-[23%] mt-[6%] ' >
      <img src='https://blog.fluidui.com/assets/images/posts/dribble.png'  className='w-[98%]' />
    </div>
  )
}

export default EmployeeSalary