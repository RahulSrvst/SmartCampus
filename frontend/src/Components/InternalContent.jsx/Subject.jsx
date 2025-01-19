import React, { useEffect, useState } from "react";
import "./Course.css"; // Ensure your CSS styles are properly linked
import { FaEdit, FaHome, FaHouseDamage, FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import axios from "axios";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";

const Subject = () => {
  const [SubjectData, setSubjectData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    subject_name: "",
    subject_code: "",
    discription: "",
  };

  const fetchUserTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.addSubject, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Subject's:", response.data);

        const subjectData = response.data.data || [];

        if (Array.isArray(subjectData)) {
          setSubjectData(subjectData);
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

  const handleEdit = (subject) => {
    console.log(subject);
    setEditId(subject.id);
    setValues({
      subject_name: subject.subject_name,
      subject_code: subject.subject_code,
      discription: subject.discription,
    });
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
            baseURL + API_URLS.addSubject,
            {
              subject_name: values.subject_name,
              subject_code: values.subject_code,
              discription: values.discription,
              subject_id: editId,
            },
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
          response = await axios.post(baseURL + API_URLS.addSubject, values, {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            toast.success("Subject Added successfully");
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

  const handleDelete = async (subject_id) => {
    console.log("Deleting Subject with ID:", subject_id);
    const token = localStorage.getItem("token");

    // Create FormData and append id
    const formData = new FormData();
    formData.append("subject_id", subject_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.addSubject, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Subject deleted successfully");
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
      <div className="flex items-center gap-2 md:gap-2 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-6 ">
        <span className="text-[20px]">Academic</span>{" "}
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Subjects
        </span>
        <span className="text-[14px]  mt-0.5"> - Subjects</span>
      </div>

      <div className="flex flex-wrap gap-x-4">
        {/* Add Subject Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-xl font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add Subject</h2>
            <BsThreeDotsVertical />
          </div>

          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-700">
            <label className="block mb-2">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              name="subject_name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.subject_name}
              placeholder=""
            />

            <label className="block mb-2">Subject Code</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              name="subject_code"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.subject_code}
              placeholder=""
            />

            <label className="block mb-2">Description</label>
            <textarea
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              name="discription"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.discription}
              placeholder=""
              rows="3"
            ></textarea>

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

        {/* Subject List Section */}
        <div className="bg-white rounded-xl p-4 py-6 w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%]" >
        <div className="bg-white overflow-auto">
          <div className="flex flex-wrap text-sm  text-gray-600 md:flex-nowrap justify-between items-center mb-4">
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
                placeholder=""
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-sm border-b border-black">
                <th className="pr-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Subject Name
                    <HiOutlineArrowsUpDown className=" text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Subject Code
                    <HiOutlineArrowsUpDown className=" text-sm " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Description
                    <HiOutlineArrowsUpDown className=" text-sm " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Option <HiOutlineArrowsUpDown className=" text-sm " />
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
              
              {SubjectData.length >0 ?(SubjectData?.map((items) => (
                <tr className="text-[16px] space-y-2 border-b border-slate-300  bg-gray-100">
                  <td className="border-r-2 border-white px-4 ">
                    {items.subject_name}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 ">
                    {items.subject_code}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 ">
                    {items.discription}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4  text-center">
                    <button
                      className="text-blue-900 mx-2"
                      aria-label="Edit course"
                    >
                      <TiPencil
                        onClick={() => handleEdit(items)}
                        className="h-[16px] w-[16px] pt-0.5"
                      />
                    </button>
                    <button
                      className="text-blue-900"
                      aria-label="Delete course"
                    >
                      <FaTrashAlt
                        onClick={() => handleDelete(items.id)}
                        className="h-3 w-3"
                      />
                    </button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 ">
                    No Subject's available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-[14px] text-slate-500 ">
              Showing 1 to 1 of 1 entries
            </p>
            <div className="flex">
              <button className="text-slate-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">
                1
              </button>
              <button className="text-slate-500 mx-2">Next</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
