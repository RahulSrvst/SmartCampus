import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import PaySlipForm from "./PaySlipForm";
import { CiCirclePlus } from "react-icons/ci";
import { IoCardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const GenerateSalarySlip = () => {
  const [generatedPayslips, setGeneratedPayslips] = useState([]);

  const handlePayslipSuccess = (employeeId) => {
    setGeneratedPayslips((prev) => [...prev, employeeId]);
    fetchEmployeeData(month,year);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [employeeNameId, SetEmployeeNameId] = useState(null);
  const [designation, setDesignation] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();
  const [designationID, setDesignationID] = useState(null);

  
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
      console.error("Error fetching designations:", e);
    }
  };

  
  const fetchEmployeeName = async () => {
    if (designationID) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(baseURL + API_URLS.addEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            designation_id: designationID,
          },
        });
        if (response.status === 200) {
          setEmployeeName(response.data.data || []);
        } else {
          console.log("Error fetching employees");
        }
      } catch (e) {
        console.error("Error fetching employees:", e);
      }
    }
  };

  useEffect(() => {
    
    fetchDesignation();
  }, []);

  useEffect(() => {
    if (designationID) {
      fetchEmployeeName(); 
    }
  }, [designationID]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const fetchEmployeeData = async (year, month, employeeNameId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.EmployeePayroll, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { year, month, employee_id: employeeNameId },
      });
      if (response.status === 200) {
        setSelectedEmployee(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    
    const [year, month] = selectedDate.split("-");
    setMonth(month);
    setYear(year);
    fetchEmployeeData(year, month, employeeNameId);
  }, [selectedDate, employeeNameId]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);

    const [year, month] = newDate.split("-");
    fetchEmployeeData(year, month, employeeNameId);
  };
  console.log(employeeNameId);

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[33%] xl:ml-[22.5%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
    <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:-ml-0 ">
        Payroll <FaHome className="text-blue-900 w-4 h-4" /> - Generate Salary Slip
      </div>
    
      <div className=" bg-white rounded-lg w-[98%] p-6">
        <div className="flex justify-between text-sm text-gray-700 ">
          <div className="flex space-x-5" >
          <div className="mb-6">
            <label className="block mb-2">Designation</label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const selectedId =
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-id"
                  );
                setDesignationID(selectedId);
                setEmployeeName([]);
              }}
            >
              <option value="">Please Select Designation</option>
              {designation.map((item) => (
                <option key={item._id} data-id={item._id}>
                  {item.designation_name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block mb-2">Employee Name</label>
            <Autocomplete
              options={employeeName}
              className="w-60"
              getOptionLabel={(option) =>
                `${option.firstname} ${option.lastname}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Employee"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(event, value) => {
                if (value) {
                  SetEmployeeNameId(value._id); 
                } else {
                  SetEmployeeNameId(null); 
                }
              }}
            />
          </div>
          </div>

          <div>
            <label className="block mb-2">Year & Month's</label>
            <input
              type="month"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Payroll Summary */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="bg-[rgba(152,242,193,0.8)] p-4 rounded-md ">
            <div className="flex  items-center text-sm ">
              <span className="font-medium  ">Employee Net Pay:</span>
              <span className="">0</span>
            </div>
            <div className="flex  items-center text-sm ">
              <span className="font-medium  ">Pay Roll Cost:</span>
              <span className="">0</span>
            </div>
          </div>
          <div className="bg-[rgba(245,212,255,0.8)] p-4  rounded-md">
            <div className="flex  items-center text-sm ">
              <span className="font-medium  ">Taxes:</span>
              <span className="">0</span>
            </div>
            <div className="flex  items-center text-sm ">
              <span className="font-medium  ">Post-Tax Deduction:</span>
              <span className="">0</span>
            </div>
          </div>
          <div className="bg-[rgba(251,185,94,0.8)] p-4 rounded-md">
            <div className="flex  items-center text-sm ">
              <span className="font-medium  ">Pre-Tax Deduction:</span>
              <span className="">0</span>
            </div>
            <div className="flex  items-center text-sm ">
              <span className="font-medium  ">Pre-Tax Deduction:</span>
              <span className="">0</span>
            </div>
          </div>
        </div>

        {/* Payroll Table */}
        <table className="min-w-full table-auto border border-separate ">
          <thead>
            <tr className="text-[16px] border-b border-black">
              <th className="pr-4 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  Sr.No. <HiOutlineArrowsUpDown className=" text-sm" />
                </div>
              </th>
              <th className="px-2 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Employee</p>
                    <p className="block text-start">Name</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="px-2 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Total</p>
                    <p className="block text-start">Working Days</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="px-2 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Present</p>
                    <p className="block text-start">Days</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="px-2 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Half</p>
                    <p className="block text-start">Days</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="px-2 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Absent</p>
                    <p className="block text-start">Days</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="px-2 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Leave</p>
                    <p className="block text-start">Days</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="pl-4 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Pay</p>
                    <p className="block text-start">Slip</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="pl-4 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  Pay
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="pl-4 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Payment</p>
                    <p className="block text-start">Status</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
              <th className="pl-4 py-2 border">
                <div className="flex justify-between items-center whitespace-nowrap text-sm gap-2">
                  <div>
                    <p className="block text-start">Payment</p>
                    <p className="block text-start">Slip PDF</p>
                  </div>
                  <HiOutlineArrowsUpDown className=" text-sm " />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedEmployee.length > 0 ? ( (selectedEmployee && Array.isArray(selectedEmployee)
              ? selectedEmployee
              : []
            ).map((employee, index) => (
              <tr
                key={employee.id}
                className="border-b bg-white text-gray-700 text-sm hover:bg-gray-100"
              >
                <td className="px-2 py-2 border">{index + 1}</td>
                <td className="px-2 py-2 border">
                  {employee.employeename}
                </td>
                <td className="px-2 py-2 border">27</td>
                <td className="px-2 py-2 border">{employee.present_count}</td>
                <td className="px-2 py-2 border">{employee.halfday_count}</td>
                <td className="px-2 py-2 border">{employee.absent_count}</td>
                <td className="px-2 py-2 border">{employee.leave_count}</td>
                <td className="px-2 py-2 border text-center">
                  <button
                    className="px-2 py-1 rounded"
                    onClick={() => {
                      setSelectedEmployeeId(employee.employee_id);
                      setIsOpen(true);
                    }}
                  >
                    <CiCirclePlus className="text-xl" />
                  </button>
                </td>
                <td className="px-2 py-2 text-center border">
                  <button className="px-2 py-1 rounded">
                    <IoCardOutline className="text-2xl" />
                  </button>
                </td>
                <td className="px-2 py-2 text-center border">
                  <div className="text-white bg-orange-500 rounded-3xl py-1">
                    {employee.isPaid ? "Paid" : "UnPaid"}
                  </div>
                </td>
                <td className="px-2 py-2 text-center border">
                  <button
                    onClick={() => {
                      if (employee.payslip) {
                        navigate(`/pdf`, {
                          state: {
                            id: employee.employee_id,
                            month: month,
                            year: year,
                          },
                        });
                      }
                    }}
                    className={`px-2 py-1 rounded ${
                      employee.payslip
                        ? "text-red-500 hover:text-red-700"
                        : "text-gray-200 cursor-not-allowed"
                    }`}
                    aria-label={
                      employee.payslip
                        ? "View or download payslip"
                        : "Payslip not available"
                    }
                    title={
                      employee.payslip
                        ? "Click to view or download the payslip"
                        : "Payslip is not available for this employee"
                    }
                    disabled={!employee.payslip} 
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="24"
                      height="24"
                    >
                      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5zm4-3H19v1h1.5V11H19v2h-1.5V7h3zM9 9.5h1v-1H9zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm10 5.5h1v-3h-1z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))):(
              <tr>
                <td colSpan={10} className="text-center text-sm py-3" >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isOpen && (
          <PaySlipForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            id={selectedEmployeeId}
            onSuccess={handlePayslipSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateSalarySlip;
