import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { TiPencil } from "react-icons/ti";

const SalaryType = () => {
  const [designation, setDesignation] = useState([]);
  const [payHead, setPayHead] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [designationID, setDesignationID] = useState([]);
  const [salarySetting, setSalarySetting] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchDesignation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.designation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setDesignation(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchPayHead = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.payType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPayHead(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchPaymentType = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.payableType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPaymentType(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchEmoployeeName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(baseURL + API_URLS.addEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          designation_id: designationID,
        },
      });
      if (response.status === 200) {
        const Emp_data = response.data.data;
        if (Emp_data && Emp_data.length > 0) {
          setEmployeeName(Emp_data);
          // console.log(Emp_data);
        } else {
          // setEmployeeName([]);
          // toast.success("There is No Employee Name for this Designation")
        }
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDesignation();
    fetchPayHead();
    fetchPaymentType();
    fetchSalarySetting();
  }, []);

  const initialValues = {
    designation: "",
    employeename: "",
    payhead: "",
    paymenttype: "",
    amount: "",
    startdate: "",
    enddate: "",
    issuedate: "",
  };

  const handleEdit = (salarySetting) => {
    console.log(salarySetting);
    setEditId(salarySetting.id);
    setValues({
      // designation: salarySetting.designation,
      // employeename: salarySetting.employeename,
      // payhead: salarySetting.payhead,
      // paymenttype: salarySetting.paymenttype,
      amount: salarySetting.amount,
      startdate: salarySetting.startdate,
      enddate: salarySetting.enddate,
      issuedate: salarySetting.issuedate,
    });
  };

  const {
    values,
    setValues,
    setFieldValue,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        // setSubmittingLoader(true);
        const token = localStorage.getItem("token");

        let response;
        if (editId) {
          response = await axios.patch(
            baseURL + API_URLS.salarySetting,
            {
              designation: values.designation,
              employeename: values.employeename,
              payhead: values.payhead,
              paymenttype: values.paymenttype,
              amount: values.amount,
              startdate: values.startdate,
              enddate: values.enddate,
              issuedate: values.issuedate,
              salary_id: editId,
            },
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
            baseURL + API_URLS.salarySetting,
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
        fetchSalarySetting();
      } catch (error) {
        toast.error("Error submitting form:", error);
      }
      //  finally {
      //   setSubmittingLoader(false);
      // }
    },
  });

  function handleDesignationID(id) {
    setDesignationID(id);
  }

  useEffect(() => {
    fetchEmoployeeName();
  }, [designationID]);

  const fetchSalarySetting = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.salarySetting, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSalarySetting(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (salary_id) => {
    console.log("Deleting User Type with ID:", salary_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("salary_id", salary_id);

    try {
      // setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.salarySetting, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchSalarySetting();
      } else {
        console.error("Failed to delete user type:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user type:", error);
    }
    // finally {
    //   setDeletingLoader(false);
    // }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%]  ">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:-ml-7 ">
        Payroll
        <FaHome className="text-blue-900 w-4 h-4" /> - Salary Setting
      </div>
      <div className="flex flex-wrap gap-x-4 ">
        {/* Add Batch Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add New Payable Type</h2>
            <BsThreeDotsVertical />
          </div>
          <form className="p-4 text-sm text-gray-700 " onSubmit={handleSubmit}>
            <label className="block mb-2">
              Designation<span className="text-red-500">*</span>
            </label>

            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const selectedCourseId =
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-id"
                  );

                setFieldValue("designation", selectedCourseId);
                handleDesignationID(selectedCourseId);
              }}
            >
              <option>Please Select Designation Name</option>
              {designation?.map((items) => (
                <option data-id={items._id}>{items.designation_name}</option>
              ))}
            </select>

            <label className="block mb-2">
              Employee Name<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const selectedCourseId =
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-id"
                  );

                setFieldValue("employeename", selectedCourseId);
              }}
            >
              <option>Please Select Employee Name</option>
              {employeeName?.map((items) => (
                <option data-id={items._id}>
                  {items.firstname} {items.lastname}{" "}
                </option>
              ))}
            </select>

            <label className="block mb-2">
              Pay Head Master<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const selectedPayHeadId =
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-id"
                  );

                setFieldValue("payhead", selectedPayHeadId);
                console.log(selectedPayHeadId);
              }}
            >
              <option>Please Select Pay Head </option>
              {payHead?.map((items) => (
                <option data-id={items._id}>{items.payheadtype}</option>
              ))}
            </select>

            <label className="block mb-2">
              {" "}
              Payment Type<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              name="paymenttype"
              value={values.paymenttype || ""}
              onChange={(e) => {
                const selectedPaymentID = e.target.value; // Use the value attribute of the selected option
                setFieldValue("paymenttype", selectedPaymentID); // Update the Formik state
                console.log("Selected Payment Type ID:", selectedPaymentID);
              }}
            >
              <option value="" disabled>
                Please Select Payment Type
              </option>
              {paymentType?.map((items) => (
                <option key={items.id} value={items._id}>
                  {items.typename}
                </option>
              ))}
            </select>

            <label className="block mb-2">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              name="amount"
              onChange={handleChange}
              value={values.amount}
            />
            <label className="block mb-2">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              name="startdate"
              onChange={handleChange}
              value={values.startdate}
            />
            <label className="block mb-2">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              name="enddate"
              onChange={handleChange}
              value={values.enddate}
            />
            <label className="block mb-2">
              Issue Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              name="issuedate"
              onChange={handleChange}
              value={values.issuedate}
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              {editId ? "Update" : "Save"}
            </button>
          </form>
        </div>

        {/* Batch List Section */}
        <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%]">
          <div className=" overflow-auto">
            <div className="flex flex-wrap text-sm md:flex-nowrap justify-between items-center mb-4">
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
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Sr. No. <HiOutlineArrowsUpDown className=" text-sm " />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Employee Name
                      <HiOutlineArrowsUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Pay Head
                      <HiOutlineArrowsUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Start Date
                      <HiOutlineArrowsUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      End Date
                      <HiOutlineArrowsUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Issue Date
                      <HiOutlineArrowsUpDown className="text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Amount
                      <HiOutlineArrowsUpDown className=" text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Payment Type
                      <HiOutlineArrowsUpDown className=" text-sm" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between text-sm whitespace-nowrap gap-2 items-center">
                      Option <HiOutlineArrowsUpDown className="text-sm" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {salarySetting.length > 0 ? (
                  salarySetting?.map((items, index) => (
                    <tr className=" space-y-2 text-sm border-b border-slate-300  bg-gray-100">
                      <td className="border-r-2 border-white px-4 ">
                        {index + 1}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items?.employeename?.firstname} {items?.employeename?.lastname}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items?.payhead?.payheadtype}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items.startdate}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items.enddate}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items.issuedate}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        ₹ {items.amount}
                      </td>
                      <td className="border-r-2 border-white px-4 py-4 ">
                        {items?.paymenttype?.typename}
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
              <p className="text-sm text-slate-500 ">
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
    </div>
  );
};

export default SalaryType;
