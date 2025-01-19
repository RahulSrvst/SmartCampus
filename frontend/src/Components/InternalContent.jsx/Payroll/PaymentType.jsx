import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import toast from "react-hot-toast";

import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";

import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";

const PayType = () => {
  const [payabletype, setPayableType] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    typename: "",
  };

  const fetchPayableType = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.payableType, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Pay roll:", response.data);

        const payableData = response.data.data || [];

        if (Array.isArray(payableData)) {
          setPayableType(payableData);
        } else {
          console.error("The response data is not an array", response.data);
        }
      } else {
        console.error("Failed to fetch Payable:", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingLoader(false);
    }
  };

  useEffect(() => {
    fetchPayableType();
  }, []);

  const handleEdit = (typename) => {
    console.log(typename);
    setEditId(typename.id);
    setValues({ typename: typename.typename });
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
            baseURL + API_URLS.payableType,
            { typename: values.typename, typename_id: editId },
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
          response = await axios.post(baseURL + API_URLS.payableType, values, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            toast.success(response.data.message);
          }
        }

        resetForm();
        fetchPayableType();
      } catch (error) {
        toast.error("Error submitting form:", error);
      } finally {
        setSubmittingLoader(false);
      }
    },
  });

  const handleDelete = async (paymenttype_id) => {
    console.log("Deleting User Type with ID:", paymenttype_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("paymenttype_id", paymenttype_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.payableType, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchPayableType();
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
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%]  h-screen">
      <div className="flex items-center gap-2 md:gap-. lg:text-base text-sm mb-3 md:mb-8 xl:-ml-6 ">
        Payroll <FaHome className="text-blue-900 w-4 h-4" /> - Add Payable Type
      </div>
      <div className="flex flex-wrap gap-x-4 ">
        {/* Add Batch Form */}
        <div className="bg-white shadow-md rounded-lg h-full w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add New Payable Type</h2>
            <BsThreeDotsVertical />
          </div>
          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-700">
            <label className="block mb-2">
              Add payable Type Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={values.typename}
              name="typename"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              Save
            </button>
          </form>
        </div>

        {/* Batch List Section */}
        <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%] overflow-auto">
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
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search..."
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-[16px] border-b border-black">
                <th className="px-4 py-2">
                  <div className="flex justify-between whitespace-nowrap text-sm">
                    Sr. No. <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between whitespace-nowrap text-sm">
                    Payable Type
                    <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between whitespace-nowrap text-sm">
                    Option <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {payabletype.length > 0 ? (
                payabletype?.map((items, index) => (
                  <tr className=" space-y-2 text-sm border-b border-slate-300  bg-gray-100">
                    <td className="border-r-2 border-white px-4 ">
                      {index + 1}
                    </td>
                    <td className="border-r-2 border-white px-4 py-4 ">
                      {items.typename}
                    </td>

                    <td className="border-r-2 border-white px-4 py-4  text-center">
                      <button
                        className="text-blue-900 mx-2"
                        aria-label="Edit course"
                      >
                        <TiPencil
                          onClick={() => handleEdit(items)}
                          className="text-base"
                        />
                      </button>
                      <button
                        className="text-blue-900"
                        aria-label="Delete course"
                      >
                        <FaTrashAlt
                          onClick={() => handleDelete(items.id)}
                          className="text-sm"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No Payable Type available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-[14px] text-slate-500 ">
              Showing 1 to 1 of 1 entries
            </p>
            <div className="flex text-sm">
              <button className="text-slate-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">
                1
              </button>
              <button className="text-slate-500 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayType;
