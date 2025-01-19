import React, { useEffect, useState } from "react";
import "./Course.css";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { API_URLS } from "../Configs/urls";
import { baseURL } from "../Configs/axios";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";

const ElectiveSubject = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [SubjectData, setSubjectData] = useState();
  const [StudentData, setStudentData] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const [Course_id, setCourse_id] = useState();
  const [Batch_id, setBatch_id] = useState();
  const [subject_id, setSubject_id] = useState();
  const [student_id, setStudent_id] = useState();
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [editId, setEditId] = useState(null);

  const initialValues = {
    course: "",
    batch: "",
    subject: "",
    student: "",
  };

  const fetchElectiveSubject = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.addElectiveSubject, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Subject's:", response.data);

        const subjectAllocationData = response.data.data || [];

        if (Array.isArray(subjectAllocationData)) {
          setData(subjectAllocationData);
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

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.getElectiveSubject, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log(response.data);

      setCourseData(response.data.course);
      setSubjectData(response.data.subject);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchStudentDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log(response.data);
      setStudentData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        baseURL + API_URLS.getSubjectAllocation,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            course_id: id,
          },
        }
      );

      console.log(response.data);
      setBatchData(response.data.batch);
    } catch (e) {
      console.error("Error fetching batch data:", e);
    }
  };
  useEffect(() => {
    fetchDatas();
    fetchStudentDatas();
    fetchElectiveSubject();
  }, []);

  useEffect(() => {
    if (id) {
      fetchBatchDatas(id);
    }
  }, [id]);

  const handleEdit = (item) => {
    setEditId(item.id);

    setValues({
      subject: item.subject_name,
      student: item.student_name,
    });
    setSelectedBatchName(item.batch_name);
  };

  const { values, handleChange, handleSubmit, resetForm, setValues } =
    useFormik({
      initialValues: initialValues,

      onSubmit: async (values) => {
        try {
          setSubmittingLoader(true);
          const token = localStorage.getItem("token");
          let response;
          if (editId) {
            response = await axios.patch(
              `${baseURL}${API_URLS.addElectiveSubject}`,
              {
                elective_id: editId,
                batch: Batch_id,
                subject: subject_id,
                course: Course_id,
                student: student_id,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {
              toast.success("Elective Subject updated successfully");
              setEditId(null);
              resetForm();
              setValues(initialValues);
              setSelectedBatchName("Please Select");
              fetchElectiveSubject();
            }
          } else {
            response = await axios.post(
              `${baseURL}${API_URLS.addElectiveSubject}`,
              {
                batch: Batch_id,
                subject: subject_id,
                course: Course_id,
                student: student_id,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {

              console.log(response)
              toast.success(response.data.message);
              resetForm();
              setValues(initialValues);
              setSelectedBatchName("Please Select");
              fetchElectiveSubject();
            }
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        } finally {
          setSubmittingLoader(false);
        }
      },
    });

  function handleCourseId(id) {
    setCourse_id(id);
  }

  function handleBatchId(id) {
    setBatch_id(id);
  }

  function handleSubjectId(id) {
    setSubject_id(id);
  }
  function handleStudentId(id) {
    setStudent_id(id);
  }

  function handleId(id) {
    setId(id);
  }

  const handleDelete = async (elective_id) => {
    console.log("Deleting User Type with ID:", elective_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("elective_id", elective_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(
        baseURL + API_URLS.addElectiveSubject,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }
      );

      if (response.status === 200) {
        toast.success("Elective Subject Deleted successfully");
        fetchElectiveSubject();
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
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
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
        <span className="text-[20px]">Academic</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Subjects
        </span>
        <span className="text-[14px] mt-0.5 -ml-2">- Elective Subject</span>
      </div>

      {/* Add Course Form */}
      <div className="flex flex-wrap gap-x-4">
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add Elective Subject</h2>
            <BsThreeDotsVertical />
          </div>

          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-700">
            <div>
              <label className="block mb-2">Course</label>
              <select
                className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                name="course"
                value={values.course}
                required
                onChange={(e) => {
                  handleChange(e);
                  const selectedCourseId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );
                  handleId(selectedCourseId);
                  handleCourseId(selectedCourseId);
                }}
              >
                <option>Please Select</option>
                {courseData?.map((item) => (
                  <option
                    key={item.id}
                    value={item.course_name}
                    data-id={item.id}
                  >
                    {item.course_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Batch</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                name="batch_name"
                value={selectedBatchName}
                required
                onChange={(e) => {
                  const selectedBatchName = e.target.value;
                  const selectedBatchId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );

                  setSelectedBatchName(selectedBatchName);
                  handleBatchId(selectedBatchId);
                }}
              >
                <option>Please Select</option>
                {Array.isArray(BatchData) && BatchData.length > 0 ? (
                  BatchData.map((item) => (
                    <option
                      key={item.id}
                      value={item.batch_name}
                      data-id={item.id}
                    >
                      {item.batch_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Batches Available</option>
                )}
              </select>
            </div>

            <div>
              <label className="block mb-2">Subject</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                name="subject"
                value={values.subject}
                required
                onChange={(e) => {
                  handleChange(e);
                  const SelectedTeacgerId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );
                  handleSubjectId(SelectedTeacgerId);
                }}
              >
                <option>Please Select</option>
                {SubjectData?.map((subject) => (
                  <option
                    key={subject.id}
                    value={subject.subject_name}
                    data-id={subject.id}
                  >
                    {subject.subject_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Student</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                name="student"
                value={values.student}
                required
                onChange={(e) => {
                  handleChange(e);
                  const SelectedTeacgerId =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    );
                  handleStudentId(SelectedTeacgerId);
                }}
              >
                <option>Please Select</option>
                {StudentData?.map((student) => (
                  <option
                    key={student.id}
                    value={student.firstname}
                    data-id={student.id}
                  >
                    {student.firstname}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-[20%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
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

        {/* Course List Section */}
        <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-[96%] lg:w-[95.5%] xl:w-[56%] md:w-[96%] h-[15%] overflow-auto">
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
                placeholder=""
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-sm border-b border-black">
                <th className="pr-4 py-2">
                  <div className="flex justify-between items-center gap-2 whitespace-nowrap">
                    Course
                    <HiOutlineArrowsUpDown className=" text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center gap-2 whitespace-nowrap">
                    <span>Batch</span>
                    <HiOutlineArrowsUpDown className=" text-sm " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center gap-2 whitespace-nowrap">
                    Student
                    <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center gap-2 whitespace-nowrap">
                    Subject <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="pl-4 py-2">
                  <div className="flex justify-between items-center gap-2 whitespace-nowrap">
                    Option <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchingLoader && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
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
              {data.length > 0 ? (data?.map((items) => (
                <tr className="text-[16px] space-y-2 border-b border-slate-300  bg-gray-100">
                  <td className="border-r-2 border-white px-4 ">
                    {items.course}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 ">
                    {items.batch}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 ">
                    {items.student_name}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 ">
                    {items.subject_name}
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
                    No Elective Subject available
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
  );
};

export default ElectiveSubject;
