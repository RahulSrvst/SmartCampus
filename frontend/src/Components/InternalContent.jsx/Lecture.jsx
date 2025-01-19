import React, { useEffect, useState } from "react";
import { FaEdit, FaHome, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API_URLS } from "../Configs/urls";
import { baseURL } from "../Configs/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";


function Lecture() {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [SubjectData, setSubjectData] = useState();
  const [EmployeeData,setEmployeeData] = useState();
  const [DepartmentData,setDepartmentData] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState();

  const [Course_id, setCourse_id] = useState();
  const [Batch_id, setBatch_id] = useState();
  const [subject_id, setSubject_id] = useState();
  const [department_id, setDepartment_id] = useState();
  const [employeeName_id, setEmployeename_id] = useState();
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [fetchingLoader, setFetchingLoader] = useState(false); 
  const [submittingLoader, setSubmittingLoader] = useState(false); 
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [editId,setEditId] = useState(null);

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.getSubjectAllocation, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log(response.data)

      setCourseData(response.data.course);
      setSubjectData(response.data.subject);
      setEmployeeData(response.data.employee_name);
      setDepartmentData(response.data.department);
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
  useEffect(()=>{
    fetchDatas();

  },[])

  useEffect(() => {
    if (id) {
      fetchBatchDatas(id);
    }
  }, [id]);


  
  function handleCourseId(id) {
    setCourse_id(id);
  }

  function handleBatchId(id) {
    setBatch_id(id);
  }

  function handleSubjectId(id){
    setSubject_id(id);
  }

  function handleId(id) {
    setId(id);
  }

  const handleDelete = async (allocation_id) => {
    console.log("Deleting User Type with ID:", allocation_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("allocation_id", allocation_id);
  
    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL+API_URLS.SubjectAllocation, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", 
        },
        data: formData 
      });
  
      if (response.status === 200) {
        toast.success("Subject Allocation Deleted successfully");
        // fetchSubjectAllocation(); 
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
    <div className="ml-5 md:ml-[43%] lg:ml-[32.5%] xl:ml-[22.5%] mt-[35%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%] pb-20 w-[90%] md:w-[54.5%] lg:w-[65.5%] xl:w-[76%] ">
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
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Lecture Plan
        </span>
        <span className="text-[14px] mt-0.5 -ml-2">- Lecture</span>
      </div>
      <div className=" bg-white rounded-xl shadow-lg mb-20 pb-12">
        <div className="p-4 rounded-t-lg border-b ">
          <h1 className="text-xl font-semibold">Add Lecture Plan</h1>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="">
          <label className="block mb-2 font-medium">
            Department <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>

          <div className="w-[100%]">
          <label className="block mb-2 font-medium">
            Stream <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>

          <div className="w-[100%]">
          <label className="block mb-2 font-medium">
            Subject Group <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>

          <div className="w-[100%]">
          <label className="block mb-2 font-medium">
            Subject <span className="text-red-500">*</span>
          </label>
          <select className=" mb-4 p-1 border border-gray-300 rounded w-full">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>
          
        </div>

        <div className="w-[100%] ml-4">
          <label className="block mb-2 font-medium">
            Subject <span className="text-red-500">*</span>
          </label>
          <select className="  p-1 border border-gray-300 rounded w-[35%]">
            <option>Select</option>
            <option>Teacher 1</option>
            <option>Teacher 2</option>
            <option>Teacher 3</option>
            <option>Teacher 4</option>
            <option>Teacher 5</option>
            <option>Teacher 6</option>
          </select>
          </div>
          <button className="bg-blue-500 text-xs my-2 text-white rounded ml-5 px-1 py-0.5 block">
            Add More
          </button>


        <button className="dark-color text-white rounded ml-5  mt-4 px-10 py-2">
            Search
          </button>


          
      </div>

<div className=" bg-white rounded-xl shadow-lg mb-20 ">
<div className="ml-5 text-xl font-semibold  flex justify-center py-10">
                <span>Lecture List</span>
          </div>


          <div className="mx-5 flex justify-between">
            <div className="lg:flex hidden">
                
            <button className="px-6 text-lg py-1.5 rounded-l-lg bg-slate-200 mr-0.5">Copy</button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">CSV</button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">Excel</button>
            <button className="px-6 text-lg py-1.5  bg-slate-200 mr-0.5">PDF</button>
            <button className="px-6 text-lg py-1.5 rounded-r-lg bg-slate-200">Print</button>
            </div>

            <div>
                <label>Search: </label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg py-1"
                />
            </div>
          </div>

          <div className="overflow-x-auto mt-10 p-5">
  <table className="w-full table-double-border">
    <thead>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <th className="w-[10%]">Department</th>
        <th className="w-[18%]">Stream</th>
        <th>Subject Group</th>
        <th>Subject</th>
        <th>Lecture</th>
        <th className="w-[15%]">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <td className="p-4">
        <button className="bg-blue-500 px-3 py-0.5 rounded-md text-white font-semibold">M.Com</button>
        </td>
        <td className="p-4">Civil</td>
        <td className="p-4">Subject Group 1</td>
        <td className="pl-5 p-4">
          Accounting
        </td>
        <td className="pl-16 p-4">lecture 1</td>
        <td className="pl-16 p-4 flex">
        <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        <RiDeleteBin6Line className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        </td>
      </tr>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <td className="p-4">
        <button className="bg-purple-500 px-3 py-0.5 rounded-md text-white font-semibold">MAC</button>
        </td>
        <td className="p-4">CS</td>
        <td className="p-4">Subject Group 2</td>
        <td className="pl-5 p-4">
          Economics
        </td>
        <td className="pl-16 p-4">lecture 2</td>
        <td className="pl-16 p-4 flex">
        <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        <RiDeleteBin6Line className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        </td>
      </tr>
      <tr className="hover:bg-slate-100 hover:cursor-pointer">
        <td className="p-4">
        <button className="bg-yellow-500 px-3 py-0.5 rounded-md text-white font-semibold">Medical</button>
        </td>
        <td className="p-4">Mechnical</td>
        <td className="p-4">Subject Group 3</td>
        <td className="pl-5 p-4">
          English
        </td>
        <td className="pl-16 p-4">lecture 3</td>
        <td className="pl-16 p-4 flex">
        <FaEdit className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        <RiDeleteBin6Line className="text-blue-700 mx-3 rounded-full bg-slate-200 p-4 bg-hover hover:text-white" size={40} />
        </td>
      </tr>
      
    </tbody>
  </table>
</div>

        
      </div>

      



    </div>
  );
}

export default Lecture;
