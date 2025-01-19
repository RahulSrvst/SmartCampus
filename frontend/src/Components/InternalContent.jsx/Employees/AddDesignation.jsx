
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
 
 const initialValues = {
  designation_name:"",
 }

const AddDesignation = () => {
  const [designations, setDesignations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false); 
  const [deletingLoader, setDeletingLoader] = useState(false);

  const fetchDepartmentTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL+API_URLS.designation, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        console.log("Fetched Designation types:", response.data);

        const designationTypeData = response.data.data || [];  
  
        if (Array.isArray(designationTypeData)) {
          setDesignations(designationTypeData);
        } else {
          console.error("The response data is not an array", response.data);
        }
      } else {
        console.error("Failed to fetch user types:", response);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setFetchingLoader(false);
    }
  };
  

  useEffect(() => {
    fetchDepartmentTypes();
  }, []);

  const handleEdit = (designation) => {
    console.log(designation);
    setEditId(designation.id); 
    setValues({ designation_name: designation.designation_name }); 

  };


  
  const { values, handleBlur, handleChange, resetForm, handleSubmit, setValues } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        setSubmittingLoader(true);
        const token = localStorage.getItem("token");
        
        let response;
        if (editId) {
          response = await axios.patch(
            baseURL+API_URLS.designation,
            { designation_name: values.designation_name,
              designation_id:editId,
             },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          
          if (response.status === 200) {
            resetForm();
            toast.success("Designation updated successfully");
            setEditId(null);
          }
        } else {
         
          response = await axios.post(
            baseURL+API_URLS.designation,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.status === 200) {
            toast.success("Designation added successfully");
          }
        }
        
        resetForm();
        
        fetchDepartmentTypes(); 
      } catch (error) {
        toast.error("Error submitting form:", error);
      }finally{
        setSubmittingLoader(false);
      }
    },
  });
  

  const handleDelete = async (designation_id) => {
    console.log("Deleting User Type with ID:", designation_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("designation_id", designation_id);
  
    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL+API_URLS.designation, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", 
        },
        data: formData 
      });
  
      if (response.status === 200) {
        toast.success("User type deleted successfully");
        fetchDepartmentTypes(); 
      } else {
        console.error("Failed to delete user type:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user type:", error);
    }finally{
      setDeletingLoader(false);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[7%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
    {deletingLoader && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-6 ">
        <span className="text-base">Employee Management</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaTrashAlt className="text-blue-900 w-4 h-4 mr-2" /> - Add Designation
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4">
        {/* Add Designation Form */}
        <div className="bg-white shadow-md rounded-lg h-full w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-xl font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>{editId ? "Edit Designation" : "Add Designation"}</h2>
            <BsThreeDotsVertical />
          </div>

          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-600">
            <label className="block mb-2">
              Add Designation Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation_name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.designation_name}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              {editId ? "Update" : "Save"}
            </button>
          </form>
          {submittingLoader && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>

        {/* Designation List Section */}
        <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%] overflow-auto">
          <div className="flex flex-wrap text-sm text-gray-600 md:flex-nowrap justify-between items-center mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <label>Show</label>
              <select className="mx-2 p-1 border border-gray-300 rounded">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <label>entries</label>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Search:</label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search Designations"
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-sm border-b border-black">
                <th className="pr-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap">
                    Sr. No. <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap">
                    Designation <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="pl-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap">
                    Options <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
            {fetchingLoader && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="flex justify-center items-center">
                      <ColorRing
                        visible={true}
                        height="60"
                        width="60"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#e15b64",
                          "#f47e60",
                          "#f8b26a",
                          "#abbd81",
                          "#849b87",
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              )}
              { designations.length > 0 ? ( designations.map((designation, index) => (
                <tr key={designation.id} className="text-[16px] space-y-2 border-b border-slate-300 last:border-black odd:bg-gray-100">
                  <td className="border-r-2 border-white px-4">{index + 1}</td>
                  <td className="border-r-2 border-white px-4 py-4">{designation.designation_name}</td>
                  <td className="border-r-2 border-white px-4 py-4 ">
                    <button
                      className="text-blue-900 mx-2"
                      aria-label="Edit designation"
                      
                    >
                      <TiPencil onClick={() => handleEdit(designation)} className="h-[16px] w-[16px] pt-0.5" />
                    </button>
                    <button
                      className="text-blue-900"
                      aria-label="Delete designation"
                      
                    >
                      <FaTrashAlt onClick={() => handleDelete(designation.id)} className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))
              ):(
                <tr>
                  <td colSpan={4} className="text-center text-sm text-gray-700 py-3" >
                    No Designation Available
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-[14px] text-slate-500">
              Showing 1 to {designations.length} of {designations.length} entries
            </p>
            <div className="flex text-sm">
              <button className="text-slate-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">1</button>
              <button className="text-slate-500 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDesignation;
