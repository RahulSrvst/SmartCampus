import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import toast from "react-hot-toast";
import { TiPencil } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";

const ManageFeeStructure = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [id, setId] = useState();
  const [batch_ID, setBatch_id] = useState();
  const [Data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.teacherAllocation, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setCourseData(response.data.course);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseURL}get-teacher-allocation-field/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            course_id: id,
          },
        }
      );

      console.log(response.data);
      setBatchData(response.data.batch);
    } catch (e) {
      console.error("Error fetching batch data: ", e);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  useEffect(() => {
    if (id) {
      fetchBatchDatas(id);
    }
  }, [id]);

  function handleId(id) {
    setId(id);
  }
  const [feeStructures, setFeeStructures] = useState([]);

  const fetchFeesDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.feesStructure, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFeeStructures(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFeesDatas();
  }, []);

  const initialValues = {
    course: "",
    batch: "",
    fee_amount: "",
    session: "",
  };

  const handleEdit = (fee) => {
    console.log(fee);
    setEditId(fee.id);
    setValues({
      course: fee.course,
      batch: fee.batch,
      fee_amount: fee.fee_amount,
      session: fee.session,
    });
  };
  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    resetForm,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");

        let response;
        if (editId) {
          response = await axios.patch(
            baseURL + API_URLS.feesStructure,
            {
              course: values.course,
              batch: values.batch,
              fee_amount: values.fee_amount,
              session: values.session,
              fee_id: editId,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success("Fees Structure updated successfully");
            setEditId(null);
          }
        } else {
          response = await axios.post(
            baseURL + API_URLS.feesStructure,
            values,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success(response.data.message);
          }
        }

        resetForm();
        fetchFeesDatas();
      } catch (error) {
        toast.error("Error submitting form:", error);
      }
    },
  });

  const handleDelete = async (fee_id) => {
    console.log("Deleting User Type with ID:", fee_id);
    const token = localStorage.getItem("token");

    // Create FormData and append usertype_id
    const formData = new FormData();
    formData.append("fee_id", fee_id);

    try {
      const response = await axios.delete(baseURL + API_URLS.feesStructure, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("User type deleted successfully");
        fetchFeesDatas();
      } else {
        console.error("Failed to delete user type:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user type:", error);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 md:-ml-3 xl:-ml-0">
        Accounts - Manage Fees Structure
      </div>

      {/* Fee Structure Form */}
      <div className="bg-white shadow-md rounded-lg w-[97%] md:w-[97%] mb-4">
        <h2 className="text-lg border-b font-normal mb-4 px-6 py-4 text-black rounded-t-lg">
          Fee Structure Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="p-4 gap-5 text-sm text-gray-700"
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-1">Course</label>
              <select
                className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                name="course"
                onChange={(e) => {
                  const selectedCourseId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );
                  setFieldValue("course", selectedCourseId);

                  handleId(selectedCourseId);
                }}
              >
                <option value="">Please Select</option>
                {courseData?.map((item) => (
                  <option
                    key={item.id}
                    value={item.course_name}
                    data-id={item.id}
                  >
                    {item.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Batch</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                name="batch"
                onChange={(e) => {
                  const selectedBatchId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );

                  setBatch_id(selectedBatchId);
                  setFieldValue("batch", selectedBatchId);
                }}
              >
                <option value="">Please Select</option>
                {Array.isArray(BatchData) && BatchData.length > 0 ? (
                  BatchData.map((item) => (
                    <option
                      key={item.id}
                      value={item.batch_name}
                      data-id={item.id}
                    >
                      {item.batch_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Batches Available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block mb-2">
                Fee Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fee_amount"
                value={values.fee_amount}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
                placeholder="Enter Fee Amount"
              />
            </div>
            <div>
              <label className="block mb-2">
                Session <span className="text-red-500">*</span>
              </label>
              <select
                name="session"
                value={values.session}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[100%] mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Session</option>
                {["2023-2024", "2024-2025", "2025-2026"].map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
              {touched.session && errors.session ? (
                <div className="text-red-500 text-sm">{errors.session}</div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="md:w-[20%] w-[50%] h-8 bg-[#172b4c] text-white py-1 rounded-lg hover:bg-blue-900"
          >
            {editId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* Display Fee Structures */}
      <div className="bg-white shadow-md rounded-lg w-[97%] md:w-[97%]">
        <h2 className="text-lg font-normal border-b mb-4 px-6 py-4 text-black rounded-t-lg">
          All Fee Structures
        </h2>

        <div className="bg-white p-2">
          <table className="min-w-full bg-white text-sm border border-separate">
            <thead className="border-b">
              <tr>
                <th className="py-4 px-4 border">ID</th>
                <th className="py-4 px-4 border">Course</th>
                <th className="py-4 px-4 border">Batch</th>
                <th className="py-4 px-4 border">Fee Amount</th>
                <th className="py-4 px-4 border">Session</th>
                <th className="py-4 px-4 border">Manage</th>
              </tr>
            </thead>
            <tbody>
              {feeStructures.map((fee, index) => (
                <tr key={fee.id} className="border-t">
                  <td className="py-4 px-4 border">{index + 1}</td>
                  <td className="py-4 px-4 border">{fee.course}</td>
                  <td className="py-4 px-4 border">{fee.batch}</td>
                  <td className="py-4 px-4 border">₹ {fee.fee_amount}</td>
                  <td className="py-4 px-4 border">₹ {fee.session}</td>
                  <td className="py-4 px-4 border  ">
                    <button
                      className="text-blue-900 mx-2"
                      aria-label="Edit designation"
                    >
                      <TiPencil
                        onClick={() => handleEdit(fee)}
                        className="h-[16px] w-[16px] pt-0.5"
                      />
                    </button>
                    <button
                      className="text-blue-900"
                      aria-label="Delete designation"
                    >
                      <FaTrashAlt
                        onClick={() => handleDelete(fee.id)}
                        className="h-3 w-3"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFeeStructure;
