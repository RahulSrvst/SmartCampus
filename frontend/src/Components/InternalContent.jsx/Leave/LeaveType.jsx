import React, { useEffect, useState } from "react";
import { FaEdit, FaHome, FaHouseDamage, FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { Formik, useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";


function LeaveType() {
  const [entries] = useState(["fest", "Half", "medicaL", "visit"]); // Sample data
  const [menuVisible, setMenuVisible] = useState(null);
  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };


  const initialValues = {
    leave_type: "",
  };
    const [leavetype, setLeavetype] = useState([]);
    const [editId, setEditId] = useState(null);
    const [fetchingLoader, setFetchingLoader] = useState(false);
    const [submittingLoader, setSubmittingLoader] = useState(false);
    const [deletingLoader, setDeletingLoader] = useState(false);
    const fetchUserTypes = async () => {
      const token = localStorage.getItem("token");
      try {
        setFetchingLoader(true);
        const response = await axios.get(
          baseURL+API_URLS.leavetypeapi,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Fetched Leave Type:", response.data);
  
          const LeaveTypeData = response.data.data || [];
  
          if (Array.isArray(LeaveTypeData)) {
            setLeavetype(LeaveTypeData);
          } else {
            console.error("The response data is not an array", response.data);
          }
        } else {
          console.error("Failed to fetch user types:", response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingLoader(false);
      }
    };
  
    useEffect(() => {
      fetchUserTypes();
    }, []);
  
    const handleEdit = (leavetype) => {
      console.log(leavetype);
      setEditId(leavetype.id);
      setValues({ leave_type: leavetype.leave_type });
    };
  
   
    const {
      values,
      handleBlur,
      handleChange,
      resetForm,
      handleSubmit,
      setValues,
    } = useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        try {
          setSubmittingLoader(true);
          const token = localStorage.getItem("token");
  
          let response;
          if (editId) {
            response = await axios.patch(
              baseURL+API_URLS.leavetypeapi,
              { leave_type: values.leave_type, leavetype_id: editId },
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
  
            if (response.status === 200) {
              toast.success("User Type updated successfully");
              setEditId(null);
            }
          } else {
            response = await axios.post(
              baseURL+API_URLS.leavetypeapi,
              values,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
  
            if (response.status === 200) {
              toast.success("User Type added successfully");
            }
          }
  
          resetForm();
          fetchUserTypes();
        } catch (error) {
          toast.error("Error submitting form:", error);
        } finally {
          setSubmittingLoader(false);
        }
      },
    });
  
    const handleDelete = async (leavetype_id) => {
      console.log("Deleting User Type with ID:", leavetype_id);
      const token = localStorage.getItem("token");
  

      const formData = new FormData();
      formData.append("leavetype_id", leavetype_id);
  
      try {
        setDeletingLoader(true);
        const response = await axios.delete(
          baseURL+API_URLS.leavetypeapi,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data", 
            },
            data: formData, 
          }
        );
  
        if (response.status === 200) {
          toast.success("Leave type deleted successfully");
          fetchUserTypes();
        } else {
          console.error("Failed to delete user type:", response.status);
        }
      } catch (error) {
        console.error("Error deleting user type:", error);
      } finally {
        setDeletingLoader(false);
      }
    };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[8%] md:mt-[10%] mt-[35%] pb-20" >

    <div className="">
      <div className="w-[98%] mx-auto bg-white shadow-md rounded-lg ">
        {/* Page Title */}
        <h1 className="text-lg font-normal border-b p-6 mb-6">Leave Type</h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className=" mb-6 text-sm text-gray-700 px-6 " >
        <div className="grid grid-cols-2" >
          <div className="flex flex-col mb-4">
            <label className="font-medium text-sm">
             Leave Type Name
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-gray-300 rounded-md p-2 mt-1 "
              onChange={handleChange}
              value={values.leave_type}
              name="leave_type"
            />
          </div>
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            {editId?"Update":"Save"}
          </button>
        </form>

        {/* Table Section */}
        <div className="px-6">
          {/* Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Show</label>
              <select className="border border-gray-300 rounded p-1 text-sm">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Search:</label>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded p-1 text-sm"
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-separate border border-gray-300 text-sm">
            <thead>
              <tr className="">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              { leavetype.length > 0 ? ( leavetype?.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-gray-700"
                >
                  <td className="border border-gray-300 px-4 py-4">{entry.leave_type}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center relative">
                    <div className="relative">
                      <BsThreeDotsVertical
                        className="text-gray-500 cursor-pointer"
                        onClick={() => toggleMenu(index)}
                      />
                    {menuVisible === index && (
                        <div className="absolute -left-28 z-50 top-3 bg-white border border-gray-300 rounded shadow-lg w-28">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() =>handleEdit(entry)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() =>handleDelete(entry.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      </div>
                  </td>
                </tr>
              ))):(
                <tr>
                  <td className="text-center"  colSpan={10} >
                    No Leave Type Added
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between pb-4 items-center my-4">
            <p className="text-sm text-gray-600">Showing 1 to 4 of 4 entries</p>
            <div className="flex gap-2">
              <button className="text-blue-600 text-sm">Previous</button>
              <button className="bg-blue-900 text-white px-3 py-1 rounded">
                1
              </button>
              <button className="text-blue-600 text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LeaveType;
