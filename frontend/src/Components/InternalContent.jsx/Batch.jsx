import React, { useEffect, useState } from "react";
import "./Course.css";
import { FaEdit, FaHome, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TiPencil } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";

const Batch = () => {
  const [batch, setBatch] = useState([]);
  const [courseName, setCourseName] = useState("Please Select");
  const [batchName, setBatchName] = useState("");
  const [AddBatch, setAddBatch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxStudent, setMaxStudent] = useState("");
  const [editing_batch_id, setEditing_batch_id] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false); 
  const [deletingLoader, setDeletingLoader] = useState(false);

  const [id, setId] = useState();

  const [course,setCourses] = useState();

  const fetchCourses = async () => {
    setFetchingLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(baseURL+API_URLS.course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      console.log("Fetched courses:", data);
      setCourses(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setFetchingLoader(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchBatch = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await fetch(baseURL+API_URLS.batch, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      console.log("Fetched Batches:", data);
      setBatch(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setBatch([]);
    } finally {
      setFetchingLoader(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, []);

  const handleId = (course_id) => {
    setId(course_id);
  };


  const handleEdit = (batches) => {
    console.log(batches);
    setEditing_batch_id(batches?._id);
    setCourseName(batches.cource_name);
    setBatchName(batches.batch_name);
    setEndDate(batches.ennDate);
    setStartDate(batches.startDate);
    setAddBatch(batches.add_batch);
    setMaxStudent(batches.max_student);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const BatchData = {
      id: editing_batch_id,
      batch_name: batchName,
      course: id,
      add_batch: AddBatch,
      start_date: startDate,
      endDate: endDate,
      max_student: maxStudent,
    };

    try {
      setSubmittingLoader(true);
      if (editing_batch_id) {
        const response = await axios.patch(
          baseURL+API_URLS.batch,
          BatchData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Batch updated successfully");
          fetchBatch();
          setCourseName("");
          setBatchName("");
          setAddBatch("");
          setStartDate("");
          setMaxStudent("");
          setEndDate("");
          setId("");
          setEditing_batch_id(null);
        }
      } else {
        const response = await fetch(baseURL+API_URLS.batch, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(BatchData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit the Batch data");
        }

        const result = await response.json();
        console.log("Batch added successfully:", result);
        fetchBatch();
        setCourseName("");
        setBatchName("");
        setAddBatch("");
        setStartDate("");
        setMaxStudent("");
        setEndDate("");
        setId("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmittingLoader(false);
    }
  };

  const delete_batch = async (id) => {
    console.log("Ye Id delete Ho gi :", id);

    const token = localStorage.getItem("token");

    try {
      setDeletingLoader(true);
      const response = await axios.delete(
        baseURL+API_URLS.batch,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { id },
        }
      );

      if (response.status === 200) {
        toast.success("Batch Deleted Successfully");
        fetchBatch();
      } else {
        console.log("There is a Error", response.status);
      }
    } catch (error) {
      console.log("Chala hi nhi Bhai", error);
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
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 xl:-ml-10 ">
        <span className="text-[20px]">Academic</span>{" "}
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Course & Batch
        </span>
        <span className="text-[14px]  mt-0.5"> - Batch</span>
      </div>
      <div className="flex flex-wrap gap-x-4 ">
        {/* Add Batch Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[40%] mb-4">
          <div className="flex justify-between text-lg font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add Batch</h2>
            <BsThreeDotsVertical />
          </div>

          <form className="p-4 text-sm text-gray-700" onSubmit={handleSubmit}>
            <label className="block mb-2">
              Add Batch <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={AddBatch}
              onChange={(e) => setAddBatch(e.target.value)}
            />

            <label className="block mb-2">Course</label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                handleId(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-id"
                  )
                );
              }}
            >
              <option>Please Select</option>
              {course?.map((item) => (
                <option
                  key={item?._id}
                  value={item?.course_name}
                  data-id={item?._id}
                >
                  {item.course_name}
                </option>
              ))}
            </select>

            <label className="block mb-2">Batch Name</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />

            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="block mb-2">End Date</label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <label className="block mb-2">Max. no. of Students</label>
            <input
              type="number"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              value={maxStudent}
              onChange={(e) => setMaxStudent(e.target.value)}
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              {editing_batch_id ? "Update" : "Save"}
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

        {/* Batch List Section */}
        <div className="bg-white rounded-xl p-4 py-6 w-[96%] lg:w-[97%] xl:w-[54%] md:w-[96%] h-[15%]" >
        <div className="bg-white  overflow-auto">
          <div className="flex flex-wrap text-sm text-gary-600 md:flex-nowrap justify-between items-center mb-4">
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
                placeholder="Search..."
              />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-sm border-b border-black">
                <th className="pr-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Course <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Batch <HiOutlineArrowsUpDown className="text-sm " />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                  <div>
                      <p className="block text-start" >Max.</p>
                      <p className="block text-start" >Student</p>
                      </div>
                    <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    Start Date{" "}
                    <HiOutlineArrowsUpDown className="text-sm" />
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    End Date <HiOutlineArrowsUpDown className="text-sm " />
                  </div>
                </th>
                <th className="pl-4 py-2">
                  <div className="flex justify-between items-center whitespace-nowrap gap-2">
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
              {batch.length > 0 ? (
                batch.map((batches, index) => (
                  <tr
                    key={index}
                    className="text-sm space-y-2 border-b border-gray-300 last:border-black odd:bg-gray-100"
                  >
                    <td className="border-r-2 border-white px-2">
                      {batches?.course?.course_name}
                    </td>
                    <td className="border-r-2 border-white px-2 py-4">
                      {batches.batch_name}
                    </td>
                    <td className="border-r-2 border-white px-2 py-4">
                      {batches.max_student}
                    </td>
                    <td className="border-r-2 border-white px-2 py-4">
                      {batches.start_date}
                    </td>
                    <td className="border-r-2 border-white px-2 py-4">
                      {batches.endDate}
                    </td>
                    <td className="border-r-2 border-white px-2 py-4 text-center">
                      <button
                        className="text-blue-900 mx-2"
                        aria-label="Edit course"
                      >
                        <TiPencil
                          onClick={() => handleEdit(batches)}
                          className="h-[16px] w-[16px] pt-0.5"
                        />
                      </button>
                      <button
                        className="text-blue-900"
                        aria-label="Delete course"
                      >
                        <FaTrashAlt
                          onClick={() =>
                            delete_batch(batches._id, batches.course_name)
                          }
                          className="h-3 w-3"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Batch available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center my-4">
            <p className="text-[14px] text-gray-500 ">
              Showing 1 to 1 of 1 entries
            </p>
            <div className="flex text-sm">
              <button className="text-gray-500 mx-2">Previous</button>
              <button className="bg-purple text-white px-3 py-2 rounded-sm">
                1
              </button>
              <button className="text-gray-500 mx-2">Next</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;
