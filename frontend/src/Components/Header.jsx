import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

function Header() {
  const MyIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#fff"
        className="font-extrabold"
      >
        <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"></path>
      </svg>
    );
  };

  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false); // Set to false when scrolling down
    } else {
      // Scrolling up
      setIsVisible(true); // Set to true when scrolling up
    }
    lastScrollY = window.scrollY; // Update the last scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='fixed z-50 top-0 right-0 left-0'>
      <div className="bg-gradient-to-b from-orange-500 to-orange-500 py-1 flex items-center xl:pl-24 md:pl-3 pl-2">
        <img
          src="https://img.poorvika.com/common/Poorvika-english-logo.svg"
          alt="Logo"
          className="xl:h-[12%] lg:h-[12%] lg:w-[17%] md:h-[14%] md:w-[24%] xl:w-[12%] w-[42%]"
        />

        <div className="flex-grow w-full flex text-white">
          <input
            type="text"
            placeholder="Search for Product, Brands, Offers"
            aria-label="Search"
            className="relative lg:pl-5 pl-1 placeholder:text-slate-400 lg:placeholder:text-[14px] placeholder:text-sm outline-none xl:py-1.5 md:py-1 xl:my-0 my-1 rounded-full xl:w-[40%] lg:w-[44%] w-[62%] lg:ml-0 ml-6 md:flex hidden"
          />
          <IoSearch className="absolute top-3.5 xl:left-[48%] lg:left-[51%] left-[70%] text-black w-5 h-5 md:flex hidden" />

          <div className="flex xl:space-x-20 lg:space-x-10 space-x-5">
            <div className="lg:flex hidden flex-col xl:ml-20 lg:ml-10 md:ml-5 leading-none transform">
              <span className="lg:flex hidden">Delivery to</span>
              <p className="font-medium pt-0.5 lg:flex block lg:text-sm text-xs -mt-0.5">LUCKNOW <IoLocationSharp className="h-6 w-6 -mt-0.5 lg:ml-0 ml-4" /></p>
            </div>

            <div className="flex lg:hidden flex-col xl:ml-20 lg:ml-10 md:ml-5 leading-none transform md:pt-1 -mt-1 ">
              <IoLocationSharp className="md:h-7 md:w-7 w-6 h-7 p-1 md:-mt-0.5 -mt-1 lg:ml-0 md:ml-4 ml-[65%] leading-none" />
              <p className="font-medium pt-0.5 lg:flex block text-[10px] md:-mt-1 -mt-2 truncate sm:w-full w-12 md:ml-0 ml-14">LUCKNOW</p>
            </div>

            <div className="lg:flex hidden flex-col leading-none">
              <span className="flex">Locate</span>
              <p className="font-medium pt-0.5 flex">Stores <IoIosArrowDown className="h-6 w-6 md:-mt-0.5 " /></p>
            </div>

            <div className="flex leading-none items-center ">
              <div className="-mt-1 lg:flex flex-col hidden">
                <span className="flex">0 Items</span>
                <p className="font-medium pt-0.5">₹ 0</p>
              </div>
              <div>
                <MyIcon className="md:h-7 md:w-7 w-6 h-6 transform -scale-x-100 -mt-1.5" />
              </div>
            </div>

            <div className="flex leading-none items-center ">
              <div className="-mt-1 -ml-7 lg:flex flex-col hidden">
                <span className="flex">My Account</span>
                <p className="font-medium pt-0.5 ml-8">Sign In</p>
              </div>
              <div>
                <MdAccountCircle className="md:h-8 md:w-8 w-7 h-7 lg:-mt-2 md:-mt-0 -mt-1" />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-orange-500 to-orange-500 pt-2 pb-1.5 md:hidden flex relative">
        <div className={`input-field ${isVisible ? "block" : "hidden"} w-full`}>
          <input
            type="text"
            placeholder="Search for Product, Brands, Offers"
            aria-label="Mobile Search"
            className="w-[95%] ml-2 py-1 rounded-full pl-5 placeholder:text-[13px] outline-none"
          />
          <IoSearch className="absolute top-3.5 right-8 w-5 h-5" />
        </div>
        {/* Other header elements */}
      </div>
    </div>
  );
}

export default Header;
