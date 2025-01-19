import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";

import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";

const PayHaed = () => {

  const [payroll, setPayroll] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    payheadtype:"",description:"",addition_or_deduction:""
  }


  const fetchPayroll = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(
        baseURL+API_URLS.payType,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Fetched Pay roll:", response.data);

        const payrollData = response.data.data || [];

        if (Array.isArray(payrollData)) {
          setPayroll(payrollData);
        } else {
          console.error("The response data is not an array", response.data);
        }
      } else {
        console.error("Failed to fetch Pay roll:", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingLoader(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const handleEdit = (payroll) => {
    console.log(payroll);
    setEditId(payroll.id);
    setValues({ 
      payheadtype: payroll.payheadtype,
      description:payroll.description,
      addition_or_deduction:payroll.addition_or_deduction,
     });
  };

 
  const {
    values,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        setSubmittingLoader(true);
        const token = localStorage.getItem("token");

        let response;
        if (editId) {
          response = await axios.patch(
            baseURL+API_URLS.payType,
            { payheadtype: values.payheadtype,description: values.description,addition_or_deduction: values.addition_or_deduction, paytype_id: editId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            setEditId(null);
          }
        } else {
          response = await axios.post(
            baseURL+API_URLS.payType,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success(response.data.message);
          }
        }

        resetForm();
        fetchPayroll();
      } catch (error) {
        toast.error("Error submitting form:", error);
      } finally {
        setSubmittingLoader(false);
      }
    },
  });

  const handleDelete = async (paytype_id) => {
    console.log("Deleting User Type with ID:", paytype_id);
    const token = localStorage.getItem("token");


    const formData = new FormData();
    formData.append("paytype_id", paytype_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(
        baseURL+API_URLS.payType,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchPayroll();
      } else {
        console.error("Failed to delete user type:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user type:", error);
    } finally {
      setDeletingLoader(false);
    }
  };



  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%]  h-screen" >
       <div className="flex items-center gap-2 md:gap-5 lg:text-base text-sm mb-3 md:mb-8 xl:-ml-6 ">
        Payroll <FaHome className="text-blue-900 w-4 h-4" /> - Add Pay Head Type
      </div>
    <div className="flex flex-wrap gap-x-4 ">
      {/* Add Batch Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
      <div className="flex justify-between text-base font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>{editId?"Update":"Add"} New Pay Head Type</h2>
            <BsThreeDotsVertical />
          </div>
        <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-700">
          <label className="block mb-2">Pay Head Type <span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" onChange={handleChange} onBlur={handleBlur} value={values.payheadtype} name="payheadtype" />

          <label className="block mb-2">Description </label>
          <input type="text" className="w-full h-20 mb-4 p-2 border border-gray-300 rounded" placeholder="" onChange={handleChange} onBlur={handleBlur} value={values.description} name="description" />

          <label className="block mb-2">Addition / Deduction <span className="text-red-500" >*</span></label>
          <select className="w-full  mb-4 p-2 border border-gray-300 rounded" onChange={handleChange} onBlur={handleBlur} value={values.addition_or_deduction} name="addition_or_deduction" >
            <option>Please Select</option>
            <option>Addition</option>
            <option>Deduction</option>
          </select>

          <button type="submit" className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">{editId?"Update":"Save"}</button>
        </form>
      </div>

      {/* Batch List Section */}
      <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%]" >
      <div className=" overflow-auto">
          <div className="flex flex-wrap text-sm text-gray-700 md:flex-nowrap justify-between items-center mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <label>Show</label>
              <select className="mx-2 p-1 border border-gray-300 rounded">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <label>entries</label>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Search:</label>
              <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-[16px] border-b border-black" >
                <th className="px-4 py-2"><div className="flex justify-between gap-2 text-sm whitespace-nowrap items-center" >Sr. No. <HiOutlineArrowsUpDown className=" text-sm" /></div></th>
                <th className="px-4 py-2"><div className="flex justify-between gap-2 text-sm whitespace-nowrap items-center" >Pay Head Type<HiOutlineArrowsUpDown className="text-sm" /></div></th>
                <th className="px-4 py-2"><div className="flex justify-between gap-2 text-sm whitespace-nowrap items-center" >Description<HiOutlineArrowsUpDown className="text-sm" /></div></th>
                <th className="px-4 py-2"><div className="flex justify-between gap-2 text-sm whitespace-nowrap items-center" >Addition / Deduction <HiOutlineArrowsUpDown className="text-sm" /></div></th>
                <th className="px-4 py-2"><div className="flex justify-between gap-2 text-sm whitespace-nowrap items-center" >Option <HiOutlineArrowsUpDown className="text-sm" /></div></th>
              </tr>
            </thead>
            <tbody>
            { payroll.length > 0 ? ( payroll?.map((items, index)=>(
              <tr className=" space-y-2 text-sm border-b border-slate-300 last:border-black  odd:bg-gray-100" >
                <td className="border-r-2 border-white px-4 ">{index+1}</td>
                <td className="border-r-2 border-white px-4 py-4 ">{items.payheadtype}</td>
                <td className="border-r-2 border-white px-4 py-4 ">{items.description}</td>
                <td className="border-r-2 border-white px-2 py-4 "><div><button className={` ${items.addition_or_deduction === "Addition" ?"bg-yellow-400":"bg-red-500"} px-2 py-1 rounded text-white `} >{items.addition_or_deduction}</button></div></td>
                <td className="border-r-2 border-white px-4 py-4  text-center">
                  <button className="text-blue-900 mx-2" aria-label="Edit course"><TiPencil onClick={()=>handleEdit(items)} className="text-base" /></button>
                  <button className="text-blue-900" aria-label="Delete course"><FaTrashAlt onClick={()=>handleDelete(items.id)} className="text-sm" /></button>
                </td>
              </tr>
            ))
            ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No Pay Head available
                  </td>
                </tr>
              )}
              
            </tbody>
          </table>

          <div className="flex justify-between items-center my-4">
            <p className="text-[14px] text-slate-500 ">Showing 1 to 1 of 1 entries</p>
            <div className="flex text-sm">
              <button className="text-slate-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">1</button>
              <button className="text-slate-500 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>

    
  );
};

export default PayHaed;
