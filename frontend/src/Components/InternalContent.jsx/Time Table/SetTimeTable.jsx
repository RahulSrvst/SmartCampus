import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { ColorRing } from "react-loader-spinner";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import axios from "axios";

const SetTimeTable = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [teacherAllocation, setTeacherAllocationData] = useState();
  const [id, setId] = useState();

  const [data, setData] = useState();

  const [Course_id, setCourse_id] = useState();
  const [Batch_id, setBatch_id] = useState();
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [fetchingLoader, setFetchingLoader] = useState(false); // Fetch loader state
  const [submittingLoader, setSubmittingLoader] = useState(false); // Submit loader state
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [editId,setEditId] = useState(null);

  const initialValues = {
    course_name: Course_id || "",
    batch_name: Batch_id || "",
    timetablename:"",
    workingdays:"",
  };

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.getTimeTable, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setTeacherAllocationData(response.data.class_teacher);
      setCourseData(response.data.course);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        baseURL + API_URLS.getTimeTable,
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

  const fetchTeacherAllocation = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(
        baseURL + API_URLS.setTimeTable,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Fetched Time Table Data's:", response.data);

        const timetabledata = response.data.data || [];

        if (Array.isArray(timetabledata)) {
          setData(timetabledata);
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

    fetchDatas();
    fetchTeacherAllocation();
  }, []);

  useEffect(() => {
    if (id) {
      fetchBatchDatas(id);
    }
  }, [id]);

  
  const { values, handleChange, handleSubmit, resetForm ,setValues } = useFormik({
    initialValues: initialValues,
    
    onSubmit: async (values) => {
      try {
        setSubmittingLoader(true);
        const token = localStorage.getItem("token");
        let response;
        
          response = await axios.post(
            `${baseURL}${API_URLS.setTimeTable}`,
            { batch: Batch_id,  course: Course_id,timetablename:values.timetablename , workingdays:values.workingdays },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.status === 200) {
            toast.success("Teacher added successfully");
            resetForm();
            setSelectedBatchName("Please Select");
            fetchTeacherAllocation();
          }

        
      } catch (error) {
        console.error("Error submitting form:", error);
      }finally{
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


  function handleId(id) {
    setId(id);
  }





  return (
    <div className="gap-x-4 ml-[5%] md:ml-[43%] lg:ml-[34%] xl:ml-[23%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex flex-wrap gap-5 ">
        {/* Add Course Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[45%] xl:w-[45%] mb-4">
          <h2 className="text-xl font-bold mb-4 dark-color p-6 text-white  rounded-t-lg">
            Set Time Table
          </h2>

          <form onSubmit={handleSubmit} className="p-4">
            <label className="block mb-2">
              Select Course<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
              name="course_name"
              value={values.course_name}
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
            <label className="block mb-2">Select Batch</label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              name="batch_name"
              value={selectedBatchName}
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
            <label className="block mb-2">Time Table Name</label>
            <input className=" w-full mb-4 p-2 border border-gray-300 rounded" type="text" onChange={handleChange} name="timetablename" value={values.timetablename} />

            <label className="block mb-2">Select Working Days</label>
            <select onChange={handleChange}  className="w-full mb-4 p-2 border border-gray-300 rounded" name="workingdays" value={values.workingdays} >
              <option>Please Select</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednessday</option>
              <option>Thrusday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>

            <button
              type="submit"
              className=" w-[15%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              Save
            </button>
          </form>
        </div>

        {/* Course List Section */}
        <div className="bg-white  shadow-md rounded-xl w-[96%] lg:w-[45%] p-6 xl:w-[45%] md:w-[96%] h-[15%] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <label>Show</label>
              <select className="mx-2 p-1 border border-gray-300 rounded">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <label>entries</label>
            </div>
            <div className="flex items-center">
              <label className=" flex ">Search :</label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="w-[100%]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[16px] border-b border-black">
                  <th className="px-4 py-2">
                    <div className="flex justify-between">
                      Week Days
                      <HiOutlineArrowsUpDown className="mt-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-between">
                      Assignments
                      <HiOutlineArrowsUpDown className="mt-1 w-4 h-5 " />
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
                {data?.map((items) => (
                  <tr className="text-[16px] space-y-2 border-b border-slate-300  bg-gray-100">
                    <td className="border-r-2 border-white px-4 ">
                      {items.workingdays}
                    </td>
                    <td className="border-r-2 text-start text-blue-500 border-white px-4 py-4 ">
                      Assign
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p>Showing 1 to 1 of 1 entries</p>
            <div>
              <button className="text-blue-600 mx-2">Previous</button>
              <button className="bg-purple-500 text-white px-2 rounded">
                1
              </button>
              <button className="text-blue-600 mx-2">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTimeTable;
