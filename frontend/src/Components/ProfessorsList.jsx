import React from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { baseURL } from "./Configs/axios";
import Avatar1 from "../Assests/avatar-1.png";
import Avatar2 from "../Assests/avatar-2.png";
import Avatar3 from "../Assests/avatar-3.png";
import Avatar4 from "../Assests/avatar-4.png";
import Avatar5 from "../Assests/avatar-5.png";
import Avatar6 from "../Assests/avatar-6.png";
import Avatar7 from "../Assests/avatar-7.png";

const professors = [
  {
    img: Avatar1,
    name: "Jens Brincker",
    department: "Computer",
    gender: "Male",
    degree: "M.Sc., PHD",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-01-01",
  },
  {
    img:Avatar2,
    name: "Mark Hay",
    department: "Mechanical",
    gender: "Female",
    degree: "M.Sc.",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-02-15",
  },
  {
    img:Avatar3,
    name: "Airi Satou",
    department: "Mathematics",
    gender: "Female",
    degree: "M.Sc., PHD",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-03-10",
  },
  {
    img:Avatar4,
    name: "Ashton Cox",
    department: "Music",
    gender: "Male",
    degree: "B.A.",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-04-20",
  },
  {
    img:Avatar5,
    name: "Cara Stevens",
    department: "Civil",
    gender: "Female",
    degree: "B.E., M.E.",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-05-25",
  },
  {
    img:Avatar6,
    name: "Angelica Ramos",
    department: "Sport",
    gender: "Male",
    degree: "CP.Ed.",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-06-30",
  },
  {
    img:Avatar7,
    name: "Sarah Smith",
    department: "Agriculture",
    gender: "Female",
    degree: "B.E. Agree",
    email: "demo@example.com",
    mobile: "123456789",
    joinDate: "2022-07-15",
  },
];

const ProfessorsList = () => {
  return (
    <div className="container mx-auto py-4 overflow-x-auto  bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-lg font-normal px-4 py-1">Professors List</h1>
        <div className="relative">
          <input
            type="text"
            placeholder=""
            className="rounded-full border bg-slate-100 border-gray-100 focus:outline-none w-20 mr-5"
          />
          <FaSearch className="absolute top-1 right-6 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse border-b border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 font-semibold">Img</th>
              <th className="px-4 py-2 font-semibold">Prof. Name</th>
              <th className="px-4 py-2 font-semibold">Dep.</th>
              <th className="px-4 py-2 font-semibold">Gender</th>
              <th className="px-4 py-2 font-semibold">Degree</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Mobile</th>
              <th className="px-4 py-2 font-semibold">Join Date</th>
              <th className="px-4 py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {professors.map((prof, index) => (
              <tr
                key={index}
                className="border-b text-sm text-gary-900 hover:bg-slate-100"
              >
                <td className="lg:py-3 py-2 ">
                  <img
                    src={prof.img}
                    alt={prof.name}
                    className="lg:w-12  w-12  bg-purple-100 rounded-lg ml-3"
                  />
                </td>
                <td className=" py-2 pl-6 whitespace-nowrap">{prof.name}</td>

                <td className="px-4 py-2 text-sm text-center">
                  <span className="px-2 py-1 rounded-lg bg-pink-200 text-pink-500">
                    {prof.department}
                  </span>
                </td>
                <td className="px-4 py-2">{prof.gender}</td>
                <td className="px-4 py-2 whitespace-nowrap">{prof.degree}</td>
                <td className="px-4 py-2">{prof.email}</td>
                <td className="px-4 py-2">{prof.mobile}</td>
                <td className="px-4 py-2 whitespace-nowrap">{prof.joinDate}</td>
                <td className="px-4 py-2">
                  <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-3 bg-hover hover:text-white text-4xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorsList;
