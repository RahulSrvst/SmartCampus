import React, { useEffect, useState } from "react";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import { Margin, usePDF } from "react-to-pdf";
import { Button } from "@mui/material";
import { FiDownload } from "react-icons/fi";

const Pdf = () => {
  const { state } = useLocation();
  const [Data, setData] = useState([]);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [PaySlipM,setPaySlipM] = useState("");


  const fetchEmployeeData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        baseURL + API_URLS.EmployeePaySlipGenerationApi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            employee_id: state.id,
            month: state.month,
            year: state.year,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setData(response.data.data);
        fetchSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      fetchSuccess(false);
    }
  };

  console.log(Data?.[0]?.employee)

  useEffect(() => {
    if (state.month) {
      const monthMap = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December",
      };
      setPaySlipM(monthMap[state.month] || "Unknown Month");
    }
  }, [state.month]);
  useEffect(() => {
    if (state?.id && state?.month && state?.year) {
      fetchEmployeeData();
    }
  }, [state?.id, state?.month, state?.year]);

  console.log(Data);

  const { toPDF, targetRef } = usePDF({
    filename: `Payslip.pdf`,
    page: { margin: Margin.MEDIUM },
  });

  const TotalEarning =
    (parseFloat(Data?.[0]?.Houserentallowance) || 0) +
    (parseFloat(Data?.[0]?.basicpay) || 0);

  console.log(TotalEarning);

  const NetSalary = TotalEarning - Data?.Totaldeduction;

  console.log(NetSalary);

  return (
    <div className="xl:ml-[35%]   xl:mt-[10%] pb-20 ">
      {Data && Data.length > 0 ? (
        <div>
          <Button
            className="!capitalize !absolute xl:w-[15%]  xl:!top-28 xl:!right-20 top-1/2 left-1/2  !bg-red-500 !text-white "
            onClick={() => toPDF()}
            startIcon={<FiDownload />}
          >
            Download PDF
          </Button>

          <div
            ref={targetRef}
            className="xl:block hidden  max-w-[700px] min-h-[800px] p-6 bg-white text-sm"
          >
            <div className="flex flex-col items-center">
              <div>
                <img
                  src={localStorage.getItem("logo")}
                  alt="College Logo"
                  className="w-36 h-36 rounded-full "
                />
              </div>

              <div className="text-center mb-2 space-y-6 mt-3">
                <h1 className="text-3xl font-bold text-blue-900">
                  {localStorage.getItem("college_name")}
                </h1>
              </div>
            </div>

            <h2 className="text-sm text-gray-800 text-center pb-5 ">
            Pay slip for the month of {PaySlipM}  {state.year}
            </h2>

            <div className="mb-6 border border-black p-3">
              <div className="grid grid-cols-2 gap-x-4 gap-2 text-xs">

                <div className="flex items-center">
                  <div className="font-medium w-32">Department</div>
                  <div className="ml-4">{Data?.[0]?.employee?.department?.department_name || "--"}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Designation</div>
                  <div className="ml-4">{Data?.[0]?.employee?.designation?.designation_name}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">Employee Name</div>
                  <div className="ml-4">
                    {Data?.[0]?.employee?.firstname} {Data?.[0]?.employee?.lastname}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Employee Code</div>
                  <div className="ml-4">{Data?.[0]?.employee?.employeecode}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">Bank Name</div>
                  <div className="ml-4">{Data?.[0]?.employee?.bank_name}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Bank Account Number</div>
                  <div className="ml-4">{Data?.[0]?.employee?.account_number}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">IFSC Code</div>
                  <div className="ml-4">{Data?.[0]?.employee?.IFSC_code}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">PaySlip Date</div>
                  <div className="ml-4 flex space-x-reverse">
                    {Data?.[0]?.Payslipdate}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">Date of Birth</div>
                  <div className="ml-4">{Data?.[0]?.employee?.birthdate}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Working Days</div>
                  <div className="ml-4">27</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">Paid Days</div>
                  <div className="ml-4">{Data?.[0]?.Paid_days}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Total Leaves</div>
                  <div className="ml-4">{Data?.[0]?.total_leaves || 0}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">Total Holidays</div>
                  <div className="ml-4">{Data?.[0]?.total_holidays || 0}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Casual Leave</div>
                  <div className="ml-4">{Data?.[0]?.casual_leave || 0}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">Arrears Day</div>
                  <div className="ml-4">{Data?.[0]?.Arrears_days || 0}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Privilege Leave</div>
                  <div className="ml-4">{Data?.[0]?.Privilegeleave || 0}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-32">PH Leave</div>
                  <div className="ml-4">{Data?.[0]?.ph_leave || 0}</div>
                </div>
                <div className="flex items-center">
                  <div className="font-medium w-40">Medical Leave</div>
                  <div className="ml-4">{Data?.[0]?.medical_leave || 0}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2  border border-b-2 border-black ">

              <div className="mb-6 pr-2  border-r border-black">
                <h3 className="text-base font-medium mb-3 text-center text-blue-900">
                  Earnings
                </h3>
                <div className=" border-b-2 border-black py-2 text-xs">
                  <div className="flex justify-between text-base py-1">
                    <div className="font-semibold pl-1">Particulars</div>
                    <div className="font-semibold">Amount (Rs)</div>
                  </div>
                  <div className="flex justify-between  py-1 border-b border-black">
                    <div className="pl-1">Basic Salary</div>
                    <div>{Data?.[0]?.basicpay || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div className="pl-1">VDA</div>
                    <div>{Data?.[0]?.vda || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div className="pl-1">House Rent Allowance</div>
                    <div>{Data?.[0]?.Houserentallowance || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div className="pl-1">Medical Allowance</div>
                    <div>{Data?.[0]?.medical_allowance || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div className="pl-1">Transport Allowance</div>
                    <div>{Data?.[0]?.Transport_allowance || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div className="pl-1">Education Allowance</div>
                    <div>{Data?.[0]?.education_allowance || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div className="pl-1">Other Earning (NPF)</div>
                    <div>{Data?.[0]?.otherEarning || 0.0}</div>
                  </div>
                  <div className="flex justify-between py-1  border-b-2 border-black">
                    <div className="pl-1">Leave Encashment</div>
                    <div>0.00</div>
                  </div>
                  <div className="flex justify-between py-1  font-bold border-t">
                    <div className="pl-1">Total Earnings</div>
                    <div>{TotalEarning + ".00"}</div>
                  </div>
                </div>
              </div>


              <div className="mb-6 pl-2">
                <h3 className="text-base font-medium mb-3 text-center text-blue-900">
                  Deductions
                </h3>
                <div className=" py-2 text-xs">
                  <div className="flex justify-between py-1 text-base">
                    <div className="font-bold">Particulars</div>
                    <div className="font-bold pr-1">Amount (Rs)</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>Provident Fund</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>PF</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>ESI</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>House Rent Deduction</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>Water Charges</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>Electricity</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black">
                    <div>Other Deduction</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b-2 border-black">
                    <div>LIC</div>
                    <div className="pr-1">0.00</div>
                  </div>
                  <div className="flex justify-between py-1 border-b-2 pb-3 border-black font-bold ">
                    <div>Total Deductions</div>
                    <div className="pr-1">
                      {Data?.[0]?.Totaldeduction + ".00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="  text-sm mt-4">
              <div className="font-semibold">
                Net Salary:{Data?.[0]?.netsalary}
              </div>
              <p className="mt-0.5 text-xs text-gray-500">
                This Pay slip is computer generated hence signature is not
                required.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto   text-red-500 font-bold mt-4">
          <div className="ml-48" >There is no PaySlip Generated for this month.</div>
        </div>
      )}
    </div>
  );
};

export default Pdf;
