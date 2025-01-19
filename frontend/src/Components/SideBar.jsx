import React, { useEffect, useRef, useState } from "react";
import { AiFillApi } from "react-icons/ai";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaUsers,
  FaMoneyCheckAlt,
  FaFileInvoice,
  FaBuilding,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiArrowRightThick } from "react-icons/ti";
import { GiThreeLeaves } from "react-icons/gi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuButtonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="h-screen w-64 bg-white  rounded-r-full p-4">
      {/* Logo */}
      <div className="flex  justify-center pt-7 pb-7 hover:cursor-pointer">
        <img
          src="https://eduerp.bharaterp.org/college-erp/assets/images/logo-letter.png"
          alt="Error"
          className="h-10 w-16 "
        />
        <div className="text-4xl font-extrabold">
          <span className="text-slate-600">CRM</span>
          <span className="icon-purple">i</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex justify-between border rounded-lg mx-3 relative">
        <div className="flex items-center py-2 ref={menuRef}">
          <img
            src="https://eduerp.bharaterp.org/college-erp/assets/images/avatar/avatar-13.png"
            alt="Error"
            className="h-14 w-14 ml-2 "
          />
          <div className="ml-4">
            <span className="block text-slate-700 text-lg font-bold ">
              Amritesh
            </span>
            <span className="text-slate-700 whitespace-nowrap">
              Super Admin
            </span>
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className=" items-center hidden"
          ref={menuButtonRef}
        >
          <IoMdArrowDropdown />
        </button>
        {isOpen && (
          <div
            className="absolute top-14 right-6 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            ref={dropdownRef}
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="#home">Profile</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="#about">Inbox</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 mb-2">
                <a href="#contact">Conversation</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 border-t">
                <a href="#contact">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="space-y-6 ml-3 whitespace-nowrap mt-5 h-[70%] overflow-y-scroll">
        <div className="text-gray-600">
          <p className="mb-2 text-gray-500 text-2xl font-medium">Main Menu</p>

          <ul className="space-y-3 text-lg">
            <li className="flex items-center space-x-2 text-purple-500">
              <FaTachometerAlt className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Dashboard
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaUserGraduate className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Academic
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaUsers className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Students
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaUsers className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700 ">
                Management
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaMoneyCheckAlt className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Payroll
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaFileInvoice className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Account
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaBook className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Library
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaBuilding className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Department
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <GiThreeLeaves className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Leave Management
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <AiFillApi className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Connectivity
              </a>
            </li>
            <li className="flex items-center space-x-2 pb-16">
              <FaSignOutAlt className="h-5 w-5" />
              <a href="#" className="hover:text-purple-700">
                Leave Management
              </a>
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="flex flex-col items-center justify-center bg-slate-100 mx-2 rounded-lg h-28">
            <span className="block text-center mt-5 text-xl font-semibold icon-purple">
              View Full Report
            </span>
            <span className="flex items-center icon-purple">
              Best CRM App here <TiArrowRightThick className="ml-2 h-5 w-5" />
            </span>
          </div>
          <div className="absolute -top-20">
            <img
              src="https://eduerp.bharaterp.org/college-erp/assets/images/custom-17.svg"
              alt="Not Found"
              className="w-[80%] h-auto mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-slate-800">CRMi Dashboard</span>
          <span className="text-slate-700">© 2024 All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
