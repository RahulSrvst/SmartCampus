import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineZoomOutMap, MdDashboard, MdWarning } from "react-icons/md";
import { FaBell, FaUser } from "react-icons/fa";
import { BiSolidNotification } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./Navbar.css";
import Side from "./Side";
import Quick from "./Quick";
import AuditPage from "./AuditPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RxCross2 } from "react-icons/rx";
import { MdGroups } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

function Navbar() {
  const [notifications, setNotifications] = useState([]); // To store notifications

  useEffect(() => {
    const socket = io("http://localhost:8020"); // Replace with your backend server URL
  
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });
  
    socket.on("newNotification", (notification) => {
      console.log("Received new notification:", notification); // Debug log
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      toast.info(`${notification.title}: ${notification.message}`);
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);
  

  console.log(notifications)
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  console.log("This is Notification :",notifications);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const [isQuickDrawerOpen, setIsQuickDrawerOpen] = useState(false);

  const toggleQuickDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsQuickDrawerOpen(open);
  };

  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);

  const toggleAuditDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsAuditDrawerOpen(open);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    const elem = document.documentElement;

    if (!isFullscreen) {
      // Request fullscreen
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen(); // Firefox
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen(); // IE/Edge
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      }
      setIsFullscreen(false);
    }
  };

  // Update state on fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const [isNoti, setIsNoti] = useState(false);

  const toggleNoti = (e) => {
    e.preventDefault();
    setIsNoti((prev) => !prev);
  };

  return (
    <div className="flex  ">
      <div className="flex w-full justify-between md:pl-3 md:pr-10 pr-5 lg:ml-24 xl:ml-5 md:ml-8 bg-white md:rounded-xl xl:h-[85px] lg:h-[81px] h-[85px] items-center animate__animated animate__bounceInDown">
        <div className="flex w-full">
          <GiHamburgerMenu
            className=" don h-12 w-12 lg:mt-2 mt-0.5 mx-4 p-2 px-3 icon-purple bg-hover rounded-lg  hover:text-white"
            onClick={() => setIsDrawerOpen(true)}
          />
          <div className="w-full">
            <div className="relative lg:flex hidden">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 my-2 h-12 rounded-xl lg:w-[48%] xl:w-[30%] pr-10 placeholder:pl-4 outline-none placeholder:text-slate-600 placeholder:text-base "
              />
              {/* Update onClick to set drawer state directly */}

              <IoMdSearch className="absolute top-6 right-2 mr-[60%] lg:mr-[52%] xl:mr-[70%] text-slate-700" />
            </div>
          </div>
        </div>

        <div className="flex md:space-x-1">
          <div className="relative flex items-center">
            <FaBell
              className="text-5xl lg:mt-0 mt-0.5 p-2 px-4 icon-purple rounded-lg bg-hover  hover:text-white cursor-pointer"
              onClick={toggleNoti}
            />
            <div className="!bg-hover absolute rounded-full pulse-wave stop-animate"></div>
          </div>

          {isNoti && (
            <div className="absolute top-[85px] right-5 xl:left-auto md:left-auto lg:left-auto z-50 w-[80%] xl:w-[20vw] lg:w-[46%] md:w-[73%] bg-white rounded-lg border shadow-lg">
              <div className="flex items-center py-4 justify-between border-b px-4">
                <span className="text-lg">Notifications</span>
                <span className="text-[14px] text-red-500 font-normal cursor-pointer">
                  Clear All
                </span>
              </div>
              {/* <div className="text-[14px] font-medium text-slate-500">
                <div className="flex items-center p-3 border-b">
                  <MdGroups className="mt-0.5 h-5 w-6 text-blue-500" />
                  <div className="pl-3">Curabitur id eros quis nunc Suc...</div>
                </div>
                <div className="flex items-center p-3 border-b">
                  <MdWarning className="mt-0.5 h-5 w-6 text-yellow-500" />
                  <div className="pl-3">Duis malesuada justo eu sapinm...</div>
                </div>
                <div className="flex items-center p-3 border-b">
                  <MdGroups className="mt-0.5 h-5 w-6 text-red-500" />
                  <div className="pl-3">Curabitur id eros quis nunc Suc...</div>
                </div>
                <div className="flex items-center p-3 border-b">
                  <MdShoppingCart className="mt-0.5 h-5 w-6 text-green-500" />
                  <div className="pl-3">Curabitur id eros quis nunc Suc...</div>
                </div>
                <div className="flex items-center p-3 border-b">
                  <FaUser className="mt-0.5 h-4 mx-1 w-4 text-red-500" />
                  <div className="pl-3">Curabitur id eros quis nunc Suc...</div>
                </div>
                <div className="flex items-center p-3 border-b pb-3">
                  <FaUser className="mt-0.5 h-4 mx-1 w-4 icon-purple" />
                  <div className="pl-3">Curabitur id eros quis nunc Suc...</div>
                </div>
              </div> */}

              <ul>
                {notifications.map((notif, index) => (
                  <li key={index}>
                    <strong>{notif.title}:</strong> {notif.message}
                  </li>
                ))}
              </ul>
              <div className="flex items-center py-3 border-t justify-center px-4">
                <span className="text-md font-medium text-slate-500 cursor-pointer">
                  View All
                </span>
              </div>
            </div>
          )}
          <MdDashboard
            className="text-5xl lg:mt-0 mt-0.5 p-2 px-3 icon-purple bg-hover rounded-lg hover:text-white"
            onClick={() => setIsQuickDrawerOpen(true)}
            aria-label="Open notifications"
          />

          <BiSolidNotification
            className="text-5xl lg:mt-0 mt-0.5  p-2 px-3 icon-purple bg-hover rounded-lg  hover:text-white xl:flex hidden"
            onClick={() => setIsAuditDrawerOpen(true)}
            aria-label="Open Audit"
          />
          <MdOutlineZoomOutMap
            className="text-5xl lg:mt-0 mt-0.5  p-2 px-3 icon-purple bg-hover rounded-lg bg-gray-100  hover:text-white xl:flex hidden"
            onClick={handleFullscreenToggle}
          />
        </div>
      </div>

      {/* Drawer Component */}
      {isSmallScreen && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <div className="w-64 h-full bg-white" role="presentation">
            <Side />
          </div>
        </Drawer>
      )}

      <Drawer
        anchor="right"
        open={isQuickDrawerOpen}
        onClose={toggleQuickDrawer(false)}
      >
        <div
          className="w-[22vw] h-full bg-white specific-scrollable-div relative"
          role="presentation"
        >
          <Quick />
          <div className="absolute top-4 right-4">
            <RxCross2
              className="font-bold text-red-700 bg-red-200 text-2xl p-1 rounded-lg hover:text-white hover:bg-red-700"
              onClick={toggleQuickDrawer(false)}
            />
          </div>
        </div>
      </Drawer>

      <Drawer
        anchor="right"
        open={isAuditDrawerOpen}
        onClose={toggleAuditDrawer(false)}
      >
        <div
          className="w-[22vw] h-full bg-white specific-scrollable-div relative"
          role="presentation"
        >
          <AuditPage />
          <div className="absolute top-2 right-5">
            <RxCross2
              className="font-bold text-red-700 bg-red-200 text-2xl p-1 rounded-lg hover:text-white hover:bg-red-700"
              onClick={toggleAuditDrawer(false)}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
