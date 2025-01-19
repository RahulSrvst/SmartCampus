import React, { useEffect, useState } from "react";
import "./Course.css";
import { FaHome, FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import { useFormik } from "formik";
import validationSchema from "../validationSchema";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    course_id: editingCourseId || null,
    course_name: "",
    description: "",
    code: "",
    min_attendance: "",
    attendance_type: "",
    totalworking: "",
    syllabus_name: "",
  };

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.course, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Courses:", response.data);

        const designationTypeData = response.data.data || [];

        if (Array.isArray(designationTypeData)) {
          setCourses(designationTypeData);
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
    fetchCourses();
  }, []);

  const handleEdit = (courses) => {
    console.log(courses);
    setEditingCourseId(courses._id);
    setValues({
      course_name: courses.course_name,
      description: courses.description,
      code: courses.code,
      min_attendance: courses.min_attendance,
      attendance_type: courses.attendance_type,
      totalworking: courses.totalworking,
      syllabus_name: courses.syllabus_name,
    });
  };

  const { values, handleChange, resetForm, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        try {
          setSubmittingLoader(true);
          const token = localStorage.getItem("token");

          let response;
          if (editingCourseId) {
            response = await axios.patch(
              baseURL + API_URLS.course,
              {
                id: editingCourseId,
                course_name: values.course_name,
                description: values.description,
                code: values.code,
                min_attendance: values.min_attendance,
                attendance_type: values.attendance_type,
                totalworking: values.totalworking,
                syllabus_name: values.syllabus_name,
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
              toast.success(response.data.message);
              setEditingCourseId(null);
            }
          } else {
            response = await axios.post(baseURL + API_URLS.course, values, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (response.status === 200) {
              toast.success(response.message);
            }
          }

          resetForm();

          fetchCourses();
        } catch (error) {
          toast.error("Error submitting form:", error);
        } finally {
          setSubmittingLoader(false);
        }
      },
    });

  const handleDelete = async (id) => {
    console.log("Attempting to delete course with ID in body:", id);
    setDeletingLoader(true);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(baseURL + API_URLS.course, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id },
      });

      if (response.status === 200) {
        toast.success("Course deleted successfully");
        fetchCourses();
      } else {
        console.error("Failed to delete course. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setDeletingLoader(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Derived calculations
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[7%] md:mt-[15%] mt-[34%]">
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
      <div className="flex items-center gap-2   text-sm mb-3 md:mb-8 xl:-ml-7">
        <span className="text-base ">Academic</span>
        <span className="text-blue-900 flex items-center text-sm">
          <FaHome className="text-blue-900 mr-2" />
          Course & Batch
        </span>
        <span className="text-sm">- Course</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Add Course Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add Course</h2>
            <BsThreeDotsVertical />
          </div>
          <form className="p-4 text-sm text-gray-700" onSubmit={handleSubmit}>
            <label className="block mb-2">
              Add Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={values.course_name}
              name="course_name"
              onChange={handleChange}
            />
            <label className="block mb-2">Description</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={values.description}
              name="description"
              onChange={handleChange}
            />
            <label className="block mb-2">Code</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={values.code}
              name="code"
              onChange={handleChange}
            />
            <label className="block mb-2">Minimum Attendance %</label>
            <input
              type="number"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={values.min_attendance}
              name="min_attendance"
              onChange={handleChange}
            />
            <label className="block mb-2">Attendance Type</label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={values.attendance_type}
              name="attendance_type"
              onChange={handleChange}
            >
              <option>Please Select</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
            <label className="block mb-2">Total Working Days</label>
            <input
              type="number"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={values.totalworking}
              name="totalworking"
              onChange={handleChange}
            />

            <label className="block mb-2">Syllabus Name</label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={values.syllabus_name}
              name="syllabus_name"
              onChange={handleChange}
            >
              <option>Please Select</option>
              <option>Hindi</option>
              <option>English</option>
            </select>
            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              {editingCourseId ? "Update" : "Save"}
            </button>
          </form>
          {submittingLoader && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
              <RotatingLines
                visible={true}
                height="80"
                width="80"
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

        <div className="bg-white rounded-xl p-4 py-6 w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%]">
          <div className="bg-white    overflow-auto ">
            <div className="flex flex-wrap md:flex-nowrap text-sm text-gray-700 justify-between items-center mb-4 ">
              <div className="flex items-center mb-2 md:mb-0">
                <label>Show</label>
                <select
              className="mx-2 p-1 border border-gray-300 rounded"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
                <label>entries</label>
              </div>
              <div className="flex items-center">
                <label className="mr-2">Search:</label>
                <input
                  type="text"
                  className="p-1 border border-gray-300 rounded"
                  placeholder="Search..."
                />
              </div>
            </div>

            <table className="w-full text-sm ">
              <thead>
                <tr className="text-sm border-b border-black">
                  <th className="px-2 py-2">
                    <div className="flex items-center gap-2 justify-between whitespace-nowrap">
                      Course <HiOutlineArrowsUpDown className="text-sm " />
                    </div>
                  </th>
                  <th className="px-2 py-2">
                    <div className="flex items-center gap-2 justify-between whitespace-nowrap">
                      <div>
                        <p className="block text-start">Course</p>
                        <p className="block text-start">Code</p>
                      </div>
                      <HiOutlineArrowsUpDown className="text-sm " />
                    </div>
                  </th>
                  <th className="px-2 py-2">
                    <div className="flex items-center gap-2 justify-between whitespace-nowrap">
                      <div>
                        <p className="block text-start">Minimum</p>
                        <p className="block text-start">Attendance</p>
                      </div>
                      <HiOutlineArrowsUpDown className="text-sm  " />
                    </div>
                  </th>
                  <th className="px-2 py-2">
                    <div className="flex items-center gap-2 justify-between whitespace-nowrap">
                      <div>
                        <p className="block text-start">Total</p>
                        <p className="block text-start">Working</p>
                        <p className="block text-start">Days</p>
                      </div>
                      <HiOutlineArrowsUpDown className="text-sm  " />
                    </div>
                  </th>
                  <th className="px-2 py-2">
                    <div className="flex items-center gap-2 justify-between whitespace-nowrap">
                      Option <HiOutlineArrowsUpDown className="text-sm " />
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
                {currentCourses.length > 0 ? (
                  currentCourses.map((course, index) => (
                    <tr
                      key={index}
                      className="text-sm border-b border-gray-300 last:border-black odd:bg-gray-100 even:bg-white"
                    >
                      <td className="border-r-2 border-white px-2">
                        {course.course_name}
                      </td>
                      <td className="border-r-2 border-white px-2 py-4">
                        {course.code}
                      </td>
                      <td className="border-r-2 border-white px-2 py-4">
                        {course.min_attendance}
                      </td>
                      <td className="border-r-2 border-white px-2 py-4">
                        {course.totalworking}
                      </td>
                      <td className="border-r-2 flex items-center border-white px-2 py-4 text-center">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-900 mx-2"
                        >
                          <TiPencil className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-blue-900"
                        >
                          <FaTrashAlt className="text-[12px]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-4">
                      No courses available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
          <p className="text-[14px] text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, courses.length)} of {courses.length}{" "}
            entries
          </p>
          <div className="flex text-sm">
            <button
              className="text-gray-500 mx-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                className={`px-3 py-2 rounded-sm ${
                  currentPage === page + 1
                    ? "bg-purple text-white"
                    : "text-gray-500"
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="text-gray-500 mx-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
