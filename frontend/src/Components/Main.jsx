import React from "react";
import "./Navbar.css";
import RevenueChart from "./RevenueChart";
import ProfessorsList from "./ProfessorsList";
import UpcomingEvents from "./UpCommingEvents";
import ComplaintReport from "./ComplaintReport";
import NewAdmissionReport from "./NewAdmissionReport";
import FeesCollection from "./FeesCollectionReport";
import EmployeeDashboard from "./EmployeeDashboard/EmployeeDashboard";
import StudentDashboard from "./StudentDashboard/StundentDashboard";



const Main = () => {
  const currentSatisfaction = 35;
  const don = 61;
  const In = 87;
  const Ex = 42;
  return (
    <div>
    {localStorage.getItem("user_type") === "Admin" &&  <div>
      <div className="flex  bg-gray md:px-4 ">
        <div className="md:flex flex-col hidden lg:w-[30%] xl:w-[20%] w-[37%]  mt-3 rounded-lg   ">
          {/* <Side /> */}
        </div>

        <div className="lg:w-[77%] xl:w-[79.5%] md:w-[47.5%] w-[50%] xl:pl-2  lg:ml-0 md:ml-3  relative ">
        {/* <div className="lg:w-[788px]  xl:w-[1185px] md:w-[360px] w-[37%] xl:pl-2 lg:ml-0 md:ml-3 relative" > */}
          {/* <div className="fixed lg:w-[74.5%] xl:w-[77.5%] md:w-[58.5%] w-full  lg:ml-0     top-0 z-[999]  ">
            <div className="md:h-3 h-14 bg-gray z-50 ">
              <div className="text-3xl flex md:hidden justify-center items-center pt-3  ">
                <div className="flex items-center justify-center">
                  <img
                    src="https://eduerp.bharaterp.org/college-erp/assets/images/logo-letter.png"
                    alt="Error"
                    className="h-10 w-14"
                  />
                  <div className="text-3xl font-bold ">
                    <span className="custom-gray">CRM</span>
                    <span className="icon-purple">i</span>
                  </div>
                </div>
              </div>
            </div>
            <Navbar />
          </div> */}

          <div className=" rounded-b-lg ">
            <div className=" grid  grid-cols-1 md:grid-cols-2  xl:flex md:mt-32  mt-40 w-[101.5%]">
              <div className=" flex items-center justify-between xl:mr-2 xl:ml-6 lg:ml-24 md:ml-8 ml-6    bg-white xl:w-[30%] lg:w-[85%] md:w-[114%] w-[175%] rounded-xl xl:h-32 h-36 lg:py-7 pl-4 shadow-md">
                <div className="xl:-mt-2">
                  <span className="block text-lg text-slate-500">
                    Total Students
                  </span>
                  <span className="block text-lg font-medium text-slate-800 mb-2">
                    1,542
                  </span>
                  <span className=" text-sm text-green-700 ">12% </span>
                  <span className="text-sm">Increase</span>
                </div>
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-24.svg"
                    alt="Network Issue"
                    className="w-28 h-28 ml-3 md:pr-5 pr-3"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between   bg-white xl:w-[30%] lg:w-[85%] md:w-[110%] w-[177%] xl:ml-3 lg:ml-12 md:ml-20 md:mt-0 mt-5  rounded-xl xl:h-32 h-36 py-7 pl-4 ml-5 shadow-md">
                <div className="xl:-mt-2">
                  <span className="block text-lg text-slate-500">
                    New Students
                  </span>
                  <span className="block text-lg font-medium text-slate-800 mb-2">
                    742
                  </span>
                  <span className=" text-sm text-green-700 ">09% </span>
                  <span className="text-sm">Increase</span>
                </div>
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-25.svg"
                    alt="Network Issue"
                    className="w-28 h-28 ml-3 md:pr-5 pr-3"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mx-0 bg-white xl:w-[30%] lg:w-[85%] md:w-[115%] w-[177%] xl:mx-0 xl:ml-5 lg:ml-24 lg:mt-3 md:ml-8 ml-5 xl:mt-0 mt-5  rounded-xl  h-[136px] py-7 md:px-4 px-3 shadow-md">
                <div className="">
                  <span className="block text-lg text-slate-500">
                    Fees Collection
                  </span>
                  <span className="block text-lg font-medium text-slate-800 mb-2">
                    $ 542
                  </span>
                  <span className=" text-sm text-green-700 ">49% </span>
                  <span className="text-sm">Total</span>
                </div>
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-26.svg"
                    alt="Network Issue"
                    className="w-28 h-28 md:ml-3 md:pl-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mx-5 bg-white xl:w-[30%] lg:w-[85%] md:w-[110%] w-[177%] xl:ml-4 lg:ml-12 lg:mt-3 md:ml-20 ml-5 xl:mt-0 mt-5 rounded-xl xl:h-32 h-36  py-7 pl-4 md:pr-0 pr-3 shadow-md">
                <div className="xl:-mt-2">
                  <span className="block text-lg text-slate-500">
                    Fees Pending
                  </span>
                  <span className="block text-lg font-medium text-slate-800 mb-2">
                    $785
                  </span>
                  <span className=" text-sm text-red-600 ">-51% </span>
                  <span className="text-sm">Total</span>
                </div>
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-27.svg"
                    alt="Network Issue"
                    className="w-28 h-28 mx-3  md:pr-3 lg:pr-0"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 xl:ml-5 lg:ml-24 md:ml-8 ml-5  xl:flex ">
              <div className="xl:w-[65%] lg:w-[100%] md:w-[130.5%] w-[198%]   rounded-xl ">
                {/* <div className="border-b py-5 bg-white rounded-t-lg">
                  {/* <span className="text-lg font-normal text-slate-800  pl-5 ">
                    Revenue Report
                  </span> */}
                {/* </div>  */}
                <div className="w-full bg-white ">
                  <RevenueChart />
                </div>
                {/* <div className="flex p-5 border-t gap-5 bg-white rounded-b-lg shadow-md mb-5">
                  <div className="">
                    <div className="xl:flex grid grid-cols-1 lg:grid-cols-2 xl:gap-0 gap-4 xl:w-[48vw] lg:w-[60vw] md:w-[48vw]  w-[77vw] ">
                      <div className="w-full mx-2">
                        <div className="text-md font-normal">
                          <div className="flex justify-between">
                            <span>Fees</span> <span>35%</span>
                          </div>
                        </div>
                        <div className="relative pt-2 w-full ">
                          <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                            <div
                              style={{ width: `${currentSatisfaction}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-purple"
                            />
                          </div>
                          <span className="text-xs">COMPARED TO LAST YEAR</span>
                        </div>
                      </div>

                      <div className="w-full mx-2">
                        <div className="text-md font-normal">
                          <div className="flex justify-between">
                            <span>Donation</span> <span>61%</span>
                          </div>
                        </div>
                        <div className="relative pt-2 w-full">
                          <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                            <div
                              style={{ width: `${don}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-yellow-500"
                            />
                          </div>
                          <span className="text-xs">COMPARED TO LAST YEAR</span>
                        </div>
                      </div>

                      <div className="w-full mx-2">
                        <div className="text-md font-normal ">
                          <div className="flex justify-between">
                            <span>Income</span> <span>87%</span>
                          </div>
                        </div>
                        <div className="relative pt-2 w-full">
                          <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                            <div
                              style={{ width: `${In}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-green-700"
                            />
                          </div>
                          <span className="text-xs">COMPARED TO LAST YEAR</span>
                        </div>
                      </div>

                      <div className="w-full mx-2">
                        <div className="text-md font-normal">
                          <div className="flex justify-between">
                            <span>Expense</span> <span>42%</span>
                          </div>
                        </div>
                        <div className="relative pt-2 w-full">
                          <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                            <div
                              style={{ width: `${Ex}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-red-500"
                            />
                          </div>
                          <span className="text-xs">COMPARED TO LAST YEAR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                
                <div className="bg-white rounded-md shadow-md">
                  <ProfessorsList />
                </div>
              </div>
              <div className="xl:w-[33.5%] lg:w-[100%] md:w-[130.5%] w-[198%] xl:mt-0 mt-5 h-[170px]  rounded-xl xl:ml-4">
                <div className="bg-white rounded-md shadow-md mb-6">
                  <UpcomingEvents />
                </div>

                <div className="xl:h-[325px] lg:h-[300px] specific-scrollable-div overflow-y-scroll bg-white rounded-md shadow-md mb-6">
                  <ComplaintReport />
                </div>

                <div className="xl:h-[190px] lg:h-[29vh] h-auto bg-white rounded-md shadow-md mb-6 ">
                  <NewAdmissionReport />
                </div>

                <div className="xl:h-[190px] lg:h-[29vh] h-auto bg-white rounded-md shadow-md mb-6">
                  <FeesCollection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:pl-[23%] lg:pl-[48%] md:pl-[45%] pl-8 py-10 bg-gray-100">
        <span>
          © 2024{" "}
          <span className="text-blue-500">Aara Technologies Pvt. Ltd..</span>{" "}
          All Rights Reserved.
        </span>
      </div>
    </div>}

    {
      localStorage.getItem("user_type") === "employee" &&
      <div  className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[21.5%] xl:mt-[7%] md:mt-[15%] mt-[34%]" >
        <EmployeeDashboard/>
      </div>
    }
    
    {
      localStorage.getItem("user_type") === "student" &&
      <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[22.5%] xl:mt-[7%] md:mt-[15%] mt-[34%]" >
        <StudentDashboard/>
      </div>
    }
    </div>
  );
};

export default Main;


