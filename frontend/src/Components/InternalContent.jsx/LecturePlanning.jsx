import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import toast from "react-hot-toast";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";

const LecturePlanning = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [SubjectData, setSubjectData] = useState();
  const [EmployeeData, setEmployeeData] = useState();
  const [DepartmentData, setDepartmentData] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const [Course_id, setCourse_id] = useState();
  const [Batch_id, setBatch_id] = useState();
  const [subject_id, setSubject_id] = useState();
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [editId, setEditId] = useState(null);

  const initialValues = {
    course:"",
    subject:"",
    lecture_code: "",
    lesson_topic: "",
    discription: "",
    videoURL: "",
  };

  const fetchLecturePlan = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.lectureApi, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Subject's:", response.data);

        const lectureplanData = response.data.data || [];

        if (Array.isArray(lectureplanData)) {
          setData(lectureplanData);
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

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        baseURL + API_URLS.getSubjectAllocation,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(response.data);

      setCourseData(response.data.course);
      setSubjectData(response.data.subject);
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
      console.error("Error fetching batch data: ", e);
    }
  };
  useEffect(() => {
    fetchDatas();
    fetchLecturePlan();
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
        department:item.department,
        lecture_code:item.lecture_code,
        lesson_topic:item.lesson_topic,
        discription:item.discription,
        videoURL:item.videoURL,
        
        

    });
    setSelectedBatchName(item.batch_name)
    fetchBatchDatas();
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
              `${baseURL}${API_URLS.lectureApi}`,
              {
                lecture_id: editId,
                batch: Batch_id,
                subject: subject_id,
                course: Course_id,
                lecture_code: values.lecture_code,
                lesson_topic: values.lesson_topic,
                discription: values.discription,
                videoURL: values.videoURL,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {
              toast.success("Teacher updated successfully");
              setEditId(null);
              resetForm();
              setValues(initialValues);
              setSelectedBatchName("Please Select");
              fetchLecturePlan();
            }
          } else {
            response = await axios.post(
              `${baseURL}${API_URLS.lectureApi}`,
              {
                batch: Batch_id,
                subject: subject_id,
                course: Course_id,
                lecture_code: values.lecture_code,
                lesson_topic: values.lesson_topic,
                discription: values.discription,
                videoURL: values.videoURL,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {
              toast.success("Subject Allocation added successfully");
              resetForm();
              setValues(initialValues);
              setSelectedBatchName("Please Select");
              fetchLecturePlan();
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

  function handleId(id) {
    setId(id);
  }

  const handleDelete = async (lecture_id) => {
    console.log("Deleting User Type with ID:", lecture_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("lecture_id", lecture_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.lectureApi, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Subject Allocation Deleted successfully");
        fetchLecturePlan();
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
    <div className=" p-4  ml-[5%] md:ml-[43%] lg:ml-[32.5%] xl:ml-[22%] xl:mt-[7%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20 w-[95%] md:w-[56%] lg:w-[66.5%] xl:w-[77%]">
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

      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        <span className="text-[20px]">Academic</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Lecture Planning
        </span>
        <span className="text-[14px] mt-0.5 -ml-2">- Lecture Planning</span>
      </div>
      {/* Header */}
      <div className="flex justify-between text-lg font-semibold  p-3 md:p-4 dark-color text-white rounded-t-lg">
        <h2>Lesson Planning</h2>
        <BsThreeDotsVertical className="!h-5  !w-5" />
      </div>

      {/* Form */}
      <div className="p-6 bg-white shadow-lg rounded-b-lg">
        <form onSubmit={handleSubmit} className="text-sm text-gray-700" >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Course</label>
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
              <label className="block text-gray-600 mb-1">Batch</label>
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
              <label className="block text-gray-600 mb-1">Subject</label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Lecture Code</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                value={values.lecture_code}
                name="lecture_code"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Lesson Topic</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                value={values.lesson_topic}
                name="lesson_topic"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                value={values.discription}
                name="discription"
              />
            </div>
          </div>

          <div className=" gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Video URL</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                value={values.videoURL}
                name="videoURL"
              />
            </div>
            <button type="submit" className="bg-green-700 text-white my-3 rounded-md hover:bg-green-700 w-[15%] mt-5 block py-2 ">
              {editId?"Update":"Save"}
            </button>
          </div>
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

        <div className="overflow-x-auto mt-6 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-sm border-b border-black">
                <th className="px-4 py-2">
                  <div className="flex justify-between">
                    Course <HiOutlineArrowsUpDown className="mt-1" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">
                    Batch <HiOutlineArrowsUpDown className="mt-1 " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">
                    Subject
                    <HiOutlineArrowsUpDown className="lg:mt-1 lg:w-auto lg:h-auto md:mt-2.5 md:w-6 md:h-6 h-6 w-6 mt-2.5 " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between">
                    Option <HiOutlineArrowsUpDown className="mt-1 " />
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
              {data.length > 0 ? (data?.map((items) => (
                <tr className="text-[16px] space-y-2 border-b border-slate-300  bg-gray-100">
                  <td className="border-r-2 border-white px-4 text-center ">
                    {items.course}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 text-center ">
                    {items.batch}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4 text-center">
                    {items.subject_name}
                  </td>
                  <td className="border-r-2 border-white px-4 py-4  text-center">
                  <button className="text-blue-900 mx-2" aria-label="Edit course"><TiPencil onClick={()=>handleEdit(items)}  className="h-[16px] w-[16px] pt-0.5" /></button>
                  <button className="text-blue-900" aria-label="Delete course"><FaTrashAlt onClick={()=>handleDelete(items.id)} className="h-3 w-3" /></button>
                </td>
                </tr>
              ))):(
                <tr>
                  <td colSpan={10} className="text-sm text-center py-4" >No Data Available</td>
                </tr>
              )
              }
            </tbody>
          </table>

          {/* Pagination */}
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

      <div>
        <div className="flex justify-between text-lg font-bold  p-3 md:p-4 dark-color text-white rounded-t-lg mt-5">
          <h2>Lesson Planning List</h2>
          <BsThreeDotsVertical className="!h-5  !w-5" />
        </div>

        <div className="overflow-x-auto m bg-white shadow-lg rounded-lg mb-20 p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className=" text-left">
                <th className="py-2 px-4 border-b">Lecture Code</th>
                <th className="py-2 px-4 border-b">Topic</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b col-span-2 ">URL</th>
              </tr>
            </thead>
            <tbody>
              {/* Map your data here */}
              {data.length > 0 ? (data?.map((items) => (
                <tr className="bg-gray-200">
                  <td className="py-2 px-4 border-b">{items.lecture_code}</td>
                  <td className="py-2 px-4 border-b">{items.lesson_topic}</td>
                  <td className="py-2 px-4 border-b">{items.discription}</td>
                  <td className="py-2 px-4 border-b w-[5vw] ">{items.videoURL}</td>
                </tr>
              ))):(
                <tr>
                  <td colSpan={10} className="text-sm text-center py-4" >No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturePlanning;
