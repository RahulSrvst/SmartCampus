import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { useFormik } from "formik";
import axios from "axios";
import { TiPencil } from "react-icons/ti";

const StudentDocument = () => {

  const [document, setDocument] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    documentname: "",
  };

  const fetchDocument = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.AddDocument, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Documents:", response.data);

        const userTypesData = response.data.data || [];

        if (Array.isArray(userTypesData)) {
          setDocument(userTypesData);
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
    fetchDocument();
  }, []);

  const handleEdit = (document) => {
    console.log(document);
    setEditId(document.id);
    setValues({ documentname: document.documentname });
  };

  const {
    values,
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
            baseURL+API_URLS.AddDocument,
            { documentname: values.documentname, document_id: editId },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success("Document updated successfully");
            setEditId(null);
          }
        } else {
          response = await axios.post(
            baseURL+API_URLS.AddDocument,
            values,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success("Document added successfully");
          }
        }

        resetForm();
        fetchDocument();
      } catch (error) {
        toast.error("Error submitting form:", error);
      } finally {
        setSubmittingLoader(false);
      }
    },
  });

  console.log(document);

  const handleDelete = async (document_id) => {
    console.log("Deleting Category with ID:", document_id);
    const token = localStorage.getItem("token");

    // Create FormData and append document_id
    const formData = new FormData();
    formData.append("document_id", document_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(
        baseURL+API_URLS.AddDocument,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData, 
        }
      );

      if (response.status === 200) {
        toast.success("Document deleted successfully");
        fetchDocument();
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
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[7%] md:mt-[15%] mt-[34%]  ">
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-6 ">
      <span className="text-base">Students</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Student Document</span>
    </div>

    <div className="flex flex-wrap gap-4">
      {/* Add Course Form */}
      <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
        <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
          <h2>{editId?"Update":"Add"} New Document</h2>
          <BsThreeDotsVertical />
        </div>
        <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-700">
          <label className="block mb-2">Add Document Name<span className="text-red-500">*</span></label>
          <input type="text" className="w-full mb-4 p-2 border border-gray-300 rounded" placeholder="" onChange={handleChange} value={values.documentname} name="documentname" />

          
          <button type="submit" className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
            {editId?"Update":"Save"}
          </button>
        </form>
      </div>

      {/* Course List Section */}
      <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[97%] xl:w-[56%] md:w-[96%] h-[15%] overflow-auto">
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
            <input type="text" className="p-1 border border-gray-300 rounded" placeholder="Search..." />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-[16px] border-b border-black" >
              <th className="px-4 py-2"><div className="flex justify-between items-center whitespace-nowrap text-sm" >Sr. No.<HiOutlineArrowsUpDown className="text-sm" /></div></th>
              <th className="px-4 py-2"><div className="flex justify-between items-center whitespace-nowrap text-sm" >Document Name<HiOutlineArrowsUpDown className="text-sm " /></div></th>
              <th className="px-4 py-2"><div className="flex justify-between items-center whitespace-nowrap text-sm" >Option <HiOutlineArrowsUpDown className="text-sm " /></div></th>
            </tr>
          </thead>
          <tbody>
          { document.length > 0 ? (document?.map((items,index)=>(
            <tr className="text-sm  space-y-2 border-b border-slate-300 last:border-black  odd:bg-gray-100" >
              <td className="border-r-2 border-white px-4 ">{index+1}</td>
              <td className="border-r-2 border-white px-4 py-4 ">{items.documentname}</td>
              <td className="border-r-2 border-white px-4 py-4 text-start">
                      <button
                        className="text-blue-900 mx-2"
                        aria-label="Edit department type"
                        onClick={() => handleEdit(items)}
                      >
                        <TiPencil className="h-[16px] w-[16px] pt-0.5" />
                      </button>
                      <button
                        className="text-blue-900"
                        aria-label="Delete items type"
                      >
                        <FaTrashAlt
                          onClick={() => handleDelete(items.id)}
                          className="h-3 w-3"
                        />
                      </button>
                    </td>
            </tr>
          ))
          ):(
            <tr>
              <td className="text-sm text-center py-3 text-gray-500 " colSpan={4} >No Document Added</td>
            </tr>
          )}

          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <p className="text-[14px] text-slate-500 ">Showing 1 to 1 of 1 entries</p>
          <div className="flex">
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

export default StudentDocument;
