import React, { useState } from "react";
import { VscProject } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { BiSolidMessageSquare } from "react-icons/bi";
import { LiaConnectdevelop } from "react-icons/lia";
import { IoShieldSharp } from "react-icons/io5";
import "./Navbar.css";

function AuditPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    caseTracking: false,
    supportPortal: true,
    generateReports: true,
    reportExport: true,
    dataCollection: true,
    memberSignup: true,
    userFeedback: true,
    customerPortal: false,
  });

  const toggleSetting = (settingKey) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingKey]: !prevSettings[settingKey],
    }));
  };
  const [activeTab, setActiveTab] = useState("audits");

  return (
    <div className="relative ">
      <div className="border-t-4 border-gray-200 absolute top-8  right-1  w-full"></div>

      <div  >
        <div >
          <div className="flex gap-3 my-8  pl-6 pb-2 ">
            <span
              onClick={() => setActiveTab("audits")}
              className={`hover:cursor-pointer hover-text purple-border-hover pb-2 text-md z-50 font-normal specific-scrollable-div ${
                activeTab === "audits" ? "icon-purple purple-border pb-2 " : ""
              }`}
            >
              Audits Logs
            </span>
            <span
              onClick={() => setActiveTab("notifications")}
              className={`hover:cursor-pointer hover-text purple-border-hover pb-2 text-md z-50 font-normal ${
                activeTab === "notifications"
                  ? "icon-purple purple-border pb-2 "
                  : ""
              }`}
            >
              Notifications
            </span>
            <span
              onClick={() => setActiveTab("settings")}
              className={`hover:cursor-pointer hover-text purple-border-hover pb-2 text-md z-50 px-3 font-normal ${
                activeTab === "settings"
                  ? "icon-purple purple-border pb-2 "
                  : ""
              }`}
            >
              Settings
            </span>
          </div>
        </div>

        {activeTab === "audits" && (
          <div className="ml-6 style3 text-[14px] ">
            <div className="space-y-6 ">
              <span className="text-base font-normal">System Messages</span>

              <div className="flex justify-between mr-8 items-center ">
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/001-glass.svg"
                    alt="bjxs"
                    className="w-12 bg-gray-100 rounded-lg p-1"
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Duis faucibus lorem
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Pharetra, Nulla
                  </span>
                </div>
                <div className="bg-gray-200 my-2 px-2 pt-2 rounded-sm ml-3 font-medium">
                  +125$
                </div>
              </div>
              <div className="flex justify-between mr-8 items-center">
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/002-google.svg"
                    alt="bjxs"
                    className="w-12 bg-gray-100 rounded-lg p-1"
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Morus Vagus augue
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Pharetra, Nulla
                  </span>
                </div>
                <div className="bg-gray-200 my-2 px-2 pt-2 rounded-sm ml-3 font-medium">
                  +125$
                </div>
              </div>

              <div className="flex justify-between mr-8 items-center">
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/003-settings.svg"
                    alt="bjxs"
                    className="w-12 bg-gray-100 rounded-lg p-1"
                  />
                </div>
                <div className="">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Aliquam in magna
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Pharetra, Nulla
                  </span>
                </div>
                <div className="bg-gray-200 my-2 px-2 pt-2 rounded-sm ml-3 font-medium">
                  +125$
                </div>
              </div>

              <div className="flex justify-between mr-8 items-center">
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/004-dad.svg"
                    alt="bjxs"
                    className="w-12 bg-gray-100 rounded-lg p-1 "
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-base  font-normal ">
                    Phasellus venenatis
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Pharetra, Nulla
                  </span>
                </div>
                <div className="bg-gray-200  px-2 pt-2 rounded-sm ml-3 my-1.5  font-medium">
                  +125$
                </div>
              </div>

              <div className="flex justify-between mr-8 items-center">
                <div>
                  <img
                    src="https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/005-paint-palette.svg"
                    alt="bjxs"
                    className="w-12 bg-gray-100 rounded-lg p-1"
                  />
                </div>
                <div className="-ml-4">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Vivamus consec
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Pharetra, Nulla
                  </span>
                </div>
                <div className="bg-gray-200 my-2 px-2 pt-2 rounded-sm ml-3 font-medium">
                  +125$
                </div>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <span className="text-base font-normal">Task Overview</span>

              <div className="flex justify-start mr-8">
                <div>
                  <VscProject className="text-5xl bg-gray-100 rounded-lg p-3 text-purple-600" />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Project Briefing
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Project Manager
                  </span>
                </div>
              </div>
              <div className="flex justify-start mr-8">
                <div>
                  <FaRegEdit className="text-5xl bg-gray-100 rounded-lg p-3 text-red-500" />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Concept Design
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Art Director
                  </span>
                </div>
              </div>

              <div className="flex justify-start mr-8">
                <div>
                  <BiSolidMessageSquare className="text-5xl bg-gray-100 rounded-lg p-3 text-green-500" />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Fundamental logics
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    Lead Developer
                  </span>
                </div>
              </div>

              <div className="flex justify-start mr-8">
                <div>
                  <LiaConnectdevelop className="text-5xl bg-gray-100 rounded-lg p-2 text-blue-500" />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Development
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    DevOps
                  </span>
                </div>
              </div>

              <div className="flex justify-start mr-8 pb-10">
                <div>
                  <IoShieldSharp className="text-5xl bg-gray-100 rounded-lg p-3 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <span className="block text-base whitespace-nowrap font-normal ">
                    Testing
                  </span>
                  <span className="text-[14px] font-normal text-slate-500">
                    QA Manager
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
  <div className="space-y-6">
    {[
      { time: "10:10", borderColor: "border-purple-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "08:40", borderColor: "border-green-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "07:10", borderColor: "border-blue-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "01:15", borderColor: "border-red-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "23:12", borderColor: "border-yellow-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "10:10", borderColor: "border-purple-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "08:40", borderColor: "border-green-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "07:10", borderColor: "border-blue-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "01:15", borderColor: "border-red-600", text: "Morbi quis ex eu arcu auctor sagittis." },
      { time: "23:12", borderColor: "border-yellow-600", text: "Morbi quis ex eu arcu auctor sagittis." },
    ].map((item, index) => (
      <div
        key={index}
        className="flex justify-start items-center mx-7 font-normal text-slate-500 space-x-4"
      >
        <div className="text-lg text-slate-600 w-16 text-right">{item.time}</div>
        <div
          className={`border-l-4 ${item.borderColor} pl-4 rounded-l text-sm w-full`}
        >
          <p>{item.text}</p>
          <p>by Johne.</p>
        </div>
      </div>
    ))}
  </div>
)}


        {activeTab === "settings" && (
          <div>
            <div className="p-4 max-w-md mx-auto bg-white ">
              {/* Customer Care Section */}
              <div className="mb-6">
                <h2 className="text-base font-medium mb-2">Customer Care</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" >Enable Notifications:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.notifications ? "bg-purple-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("notifications")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.notifications ? "" : "mr-5"
                      }`}
                    >
                      {settings.notifications ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.notifications
                          ? "translate-x-5"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.notifications ? "ml-3" : ""
                      }`}
                    >
                      {!settings.notifications ? "OFF" : ""}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" >Enable Case Tracking:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.caseTracking ? "bg-purple-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("caseTracking")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.caseTracking ? "" : "mr-5"
                      }`}
                    >
                      {settings.caseTracking ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-100 ${
                        settings.caseTracking
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.caseTracking ? "ml-3" : ""
                      }`}
                    >
                      {!settings.caseTracking ? "OFF" : ""}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Support Portal:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.supportPortal ? "bg-purple-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("supportPortal")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.supportPortal ? "" : "mr-5"
                      }`}
                    >
                      {settings.supportPortal ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.supportPortal
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.supportPortal ? "ml-3" : ""
                      }`}
                    >
                      {!settings.supportPortal ? "OFF" : ""}
                    </span>
                  </button>
                </div>
              </div>

              {/* Reports Section */}
              <div className="mb-6 border-t pt-4">
                <h2 className="text-base font-medium mb-2">Reports</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Generate Reports:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.generateReports ? "bg-red-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("generateReports")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.generateReports ? "" : "mr-5"
                      }`}
                    >
                      {settings.generateReports ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.generateReports
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.generateReports ? "ml-3" : ""
                      }`}
                    >
                      {!settings.generateReports ? "OFF" : ""}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Enable Report Export:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.reportExport ? "bg-red-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("reportExport")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.reportExport ? "" : "mr-5"
                      }`}
                    >
                      {settings.reportExport ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.reportExport
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.reportExport ? "ml-3" : ""
                      }`}
                    >
                      {!settings.reportExport ? "OFF" : ""}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Allow Data Collection:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.dataCollection ? "bg-red-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("dataCollection")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.dataCollection ? "" : "mr-5"
                      }`}
                    >
                      {settings.dataCollection ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.dataCollection
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.dataCollection ? "ml-3" : ""
                      }`}
                    >
                      {!settings.dataCollection ? "OFF" : ""}
                    </span>
                  </button>
                </div>
              </div>

              {/* Members Section */}
              <div className="mb-6 border-t pt-4">
                <h2 className="text-base font-medium mb-2">Members</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Enable Member Signup:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.memberSignup ? "bg-orange-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("memberSignup")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.memberSignup ? "" : "mr-5"
                      }`}
                    >
                      {settings.memberSignup ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.memberSignup
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.memberSignup ? "ml-3" : ""
                      }`}
                    >
                      {!settings.memberSignup ? "OFF" : ""}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Allow User Feedback:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.userFeedback ? "bg-orange-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("userFeedback")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.userFeedback ? "" : "mr-5"
                      }`}
                    >
                      {settings.userFeedback ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.userFeedback
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.userFeedback ? "ml-3" : ""
                      }`}
                    >
                      {!settings.userFeedback ? "OFF" : ""}
                    </span>
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Enable Customer Portal:</span>
                  <button
                    className={`w-14 h-6 flex text-white text-sm font-bold items-center relative ${
                      settings.customerPortal ? "bg-orange-600" : "bg-gray-300"
                    } p-1`}
                    onClick={() => toggleSetting("customerPortal")}
                    aria-label="Toggle Notifications"
                  >
                    <span
                      className={`text-center ${
                        settings.customerPortal ? "" : "mr-5"
                      }`}
                    >
                      {settings.customerPortal ? "ON" : ""}
                    </span>
                    <div
                      className={`bg-white w-4 h-4 shadow-md absolute top-1 left-3 transform transition-transform duration-300 ${
                        settings.customerPortal
                          ? "translate-x-6"
                          : "-translate-x-2"
                      }`}
                    />
                    <span
                      className={`text-center ${
                        settings.customerPortal ? "ml-3" : ""
                      }`}
                    >
                      {!settings.customerPortal ? "OFF" : ""}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuditPage;
