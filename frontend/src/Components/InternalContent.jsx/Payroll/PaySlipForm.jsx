import React, { useEffect, useState } from "react";
import { API_URLS } from "../../Configs/urls";
import { baseURL } from "../../Configs/axios";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const PaySlipForm = ({ isOpen, setIsOpen, id, onSuccess }) => {
  const [basicSalary, setBasicSalary] = useState([]);
  const [data, setData] = useState("0.00");

  const fetchEmployeeData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.salarySetting, {
        headers: { Authorization: `Bearer ${token}` },
        params: { employee_id: id },
      });

      if (response.status === 200) {
        setBasicSalary(response.data.data);
        setData(response.data.data[0]?.amount || "0.00");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch employee data. Please try again later.");
    }
  };

  useEffect(() => {
    if (!isOpen || !id) return;
    fetchEmployeeData();
  }, [isOpen, id]);

  const formik = useFormik({
    initialValues: {
      basicpay: data, 
      Payslipdate: "",
      Houserentallowance: "",
      Paid_days: "",
      casual_leave: "",
      Privilegeleave: "",
      Totaldeduction: "",
      netsalary: "",
      employee: id,
    },
    enableReinitialize: true, 
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          baseURL + API_URLS.EmployeePaySlipGenerationApi,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message || "Operation successful!");
          formik.resetForm();
          setIsOpen(false);
          onSuccess(id);
        } else {
          toast.error("Failed to add employee.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-lg shadow-lg w-[80%] max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Generate Pay Slip</h2>
          <button
            className="text-red-500 text-xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-2 gap-4 text-sm text-gray-700"
        >
          <div>
            <label className="block text-sm font-medium pb-2">Basic</label>
            <span className="pr-64 bg-gray-100 border border-gray-300 rounded pt-2 px-2 pb-2.5">
              {data}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium">Payslip Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.Payslipdate}
              name="Payslipdate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Houserent Allowance
            </label>
            <input
              type="text"
              placeholder="Enter houserent allowance"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.Houserentallowance}
              name="Houserentallowance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Paid Days</label>
            <input
              type="text"
              placeholder="Enter paid days"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.Paid_days}
              name="Paid_days"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Casual Leave</label>
            <input
              type="text"
              placeholder="Enter casual leave"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.casual_leave}
              name="casual_leave"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Privilege Leave</label>
            <input
              type="text"
              placeholder="Enter privilege leave"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.Privilegeleave}
              name="Privilegeleave"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Total Deduction</label>
            <input
              type="text"
              placeholder="Enter total deduction"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.Totaldeduction}
              name="Totaldeduction"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Net Salary</label>
            <input
              type="text"
              placeholder="Enter net salary"
              className="w-full border border-gray-300 rounded p-2"
              onChange={formik.handleChange}
              value={formik.values.netsalary}
              name="netsalary"
            />
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaySlipForm;
