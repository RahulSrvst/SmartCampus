import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "../../Configs/urls";
import { baseURL } from "../../Configs/axios";
import { useFormik } from "formik";
import { IoBanOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import toast from "react-hot-toast";
import validationSchema from "../../validationSchema";

const ActiveTimeTable = () => {
  const [CourseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [timeTableData, setTimeTableData] = useState([]);
  const [id, setId] = useState();

  const [data, setData] = useState();

  const [Course_id, setCourse_id] = useState();
  const [Batch_id, setBatch_id] = useState();

  const [selectedBatchName, setSelectedBatchName] = useState("");

  const initialValues ={
    course_name:"",
  }





  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL+API_URLS.getTimeTable, {
        headers: { Authorization: `Token ${token}` },
      });
      setCourseData(response.data.course);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        baseURL+API_URLS.getTimeTable,
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

  const fetchTimeTables = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.activetimetable, {
        headers: { Authorization: `Token ${token}` },
        params: {
          course_id: Course_id,
          batch_id: Batch_id,
        },
      });
      console.log("Time Table Data", response.data.data);
      setTimeTableData(response.data.data);
      setSelectedBatchName("Please Select");
      resetForm();
    } catch (error) {
      console.error("Error fetching time tables:", error);
    }
  };
  

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (id) {
      console.log(id)
      fetchBatchDatas(id);
    }
  }, [id]);

  const { values, handleBlur, handleChange, resetForm, handleSubmit, setValues } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
     fetchTimeTables();
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

  const handleActivate = async (status) => {
    console.log("Activated timetable with ID:", status.id);
    const token = localStorage.getItem("token");

    try{
      const response = await axios.patch(
        baseURL+API_URLS.activetimetable,
        { settimetable_id:status.id , status:!status.status},
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
        fetchTimeTables();
      }
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[25%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
    <div className="flex items-center space-x-1 mb-3" >
    <span className="text-[20px] mr-2">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Time Table</span><span className="text-[14px]  mt-0.5" > - Active Time Table</span>
    </div>
        <div className="flex flex-wrap gap-6" >
      <div  className="w-full lg:w-[45%] h-full bg-white shadow-md rounded-lg p-6" >
        {/* Left Form Section */}
        
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Select Course and Batch</h2>
          <label className="block mb-2">Select Course</label>
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
              {CourseData?.map((item) => (
                <option
                  key={item.id}
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


          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>
     
        </div>

        {/* Right Table Section */}
        <div className="w-full lg:w-1/2 h-full bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <label>Show</label>
              <select className="mx-2 p-1 border rounded">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <label>entries</label>
            </div>
            <div>
              <label className="mr-2">Search:</label>
              <input
                type="text"
                className="p-1 border rounded"
                placeholder="Search..."
              />
            </div>
          </div>
          <table className="w-full border text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Time Table Name</th>
                <th className="py-2 px-4">Operation</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {timeTableData?.map((table) => (
                <tr key={table.id} className="border-b">
                  <td className="py-2 px-4">{table.timetablename}</td>
                  <td className="py-2 px-4">
                    <button
                      className={`${table.status?"bg-green-500":"bg-red-500"} text-white px-3 py-1 rounded`}
                      onClick={() => handleActivate(table)}
                    >
                      {table.status?"Activated":"Deactivated"}
                    </button>
                  </td>
                  <td><IoBanOutline/></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <p>Showing 1 to 1 of 1 entries</p>
            <div>
              <button className="text-blue-600 mr-2">Previous</button>
              <button className="bg-purple-500 text-white px-2 rounded">
                1
              </button>
              <button className="text-blue-600 ml-2">Next</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ActiveTimeTable;
