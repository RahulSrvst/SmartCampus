import React, { useEffect, useState } from "react";
import bg from "../../Assests/gradient_2.jpg";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import axios from "axios";

const ProfileCard = ({ selectedEmployee }) => {
  return (
    <div
      className=" p-4 rounded-xl shadow-lg  "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="">
        <div className="flex justify-between items-center  gap-4">
          <div className="flex items-center space-x-10" >
            <div>
              <img
                src={`${selectedEmployee?.[0]?.image}`}
                alt={`${selectedEmployee?.[0]?.firstname}'s Profile`}
                className="w-24 h-24 rounded-sm border-2 border-white mx-auto mb-4"
              />
            </div>
            <div className="-ml-2 -mt-7">
              <span className="text-xs text-blue-800 font-medium bg-blue-100 rounded-sm px-5">
                # {selectedEmployee?.[0]?.employeecode}
              </span>
              <h3 className="text-lg font-bold whitespace-nowrap text-white">
                {selectedEmployee?.[0]?.firstname} {selectedEmployee?.[0]?.lastname}
              </h3>
              <p className="text-gray-200   ">
                Role: {selectedEmployee?.[0]?.designation?.designation_name}
              </p>
            </div>
          </div>

          <div>
            <button className="bg-blue-600 text-white px-6 rounded-lg py-2">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
