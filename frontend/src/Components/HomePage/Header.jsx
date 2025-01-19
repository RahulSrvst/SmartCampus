import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Drawer from "./Drawer"; 
import "./Footer.css"; 
import { Button } from "@mui/material";
import b1 from "../../Assests/profile1.png"

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between h-24 items-center px-6 bg-white backdrop-blur-md fixed w-full top-0 z-50 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div>
        <img
          onClick={() => navigate("/")}
          src={b1}
          alt="Bharat ERP LOGO"
          className=" xl:h-32 xl:w-40 h-28 hover:cursor-pointer "
        />
      </div>
      <div className="xl:space-x-12 lg:space-x-5 font-medium text-[15px] lg:flex hidden">
        <span>SOLUTIONS</span>
        <span>RETAILS TYPE</span>
        <span>OUR CUSTOMERS</span>
        <span>APP SOLUTIONS</span>
      </div>
      <div className=" md:flex hidden md:space-x-2 xl:space-x-3">
        <button
          className="xl:text-base text-sm font-normal bg-gradient-to-r from-purple-500 to-blue-500 text-white md:px-8 xl:px-10 py-2 rounded-3xl hover:shadow-lg transition-shadow duration-300 "
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="xl:text-base text-sm font-normal bg-gradient-to-r from-purple-500 to-blue-500 text-white md:px-3 xl:px-4 py-2 rounded-3xl hover:shadow-lg transition-shadow duration-300 ease-in-out"
          onClick={() => navigate("/Plan")}
        >
          Get Started
        </button>
      </div>
      <div className="lg:hidden flex text-3xl" onClick={toggleDrawer}>
        <IoMenu aria-label="Open menu" />
      </div>
      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default Header;
