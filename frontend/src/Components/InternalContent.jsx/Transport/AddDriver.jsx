import React, { useEffect, useState } from "react";
import { FaHome, FaTrashAlt } from "react-icons/fa";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { Circles, ColorRing, RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [driver, setDriver] = useState([]);
  const [no, setNo] = useState();
  const [vehicleID, setVehicleID] = useState();
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    name: "",
    present_address: "",
    permanent_address: "",
    birthdate: "",
    phone: "",
    license_no: "",
    vehicle: vehicleID,
    vehicle_n0: "",
  };

  const fetchVehicle_no = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.AddVehciles, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(response.data.data);
        setNo(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRoomData = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.AddDriver, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Driver  Data:", response.data);

        const RoomData = response.data.data || [];

        if (Array.isArray(RoomData)) {
          setDriver(RoomData);
        } else {
          console.error("The response data is not an array", response.data);
        }
      } else {
        console.error("Failed to fetch Room Data:", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingLoader(false);
    }
  };

  useEffect(() => {
    fetchRoomData();
    fetchVehicle_no();
  }, []);

  const handleEdit = (driver) => {
    console.log(driver);
    setEditId(driver.id);
    setValues({
      vehicle: driver.vehicleN0,
      name: driver.name,
      present_address: driver.present_address,
      permanent_address: driver.permanent_address,
      birthdate: driver.birthdate,
      phone: driver.phone,
      license_no: driver.license_no,
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
            baseURL + API_URLS.AddDriver,
            {
              driver_id: editId,
              vehicle: values.vehicle,
              name: values.name,
              present_address: values.present_address,
              permanent_address: values.permanent_address,
              birthdate: values.birthdate,
              phone: values.phone,
              license_no: values.license_no,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            console.log(response);
            toast.success("Data Updated Successfully"||response.data.message);
            setEditId(null);
          }
        } else {
          response = await axios.post(baseURL + API_URLS.AddDriver, values, {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            console.log(response);
            toast.success("Driver Data Add Successfully"||response.data.message);
          }
        }

        resetForm();
        fetchRoomData();
      } catch (error) {
        toast.error("Error submitting form:", error);
      } finally {
        setSubmittingLoader(false);
      }
    },
  });

  const handleDelete = async (driver_id) => {
    console.log("Deleting Driver with ID:", driver_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("driver_id", driver_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.AddDriver, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Driver Data deleted successfully");
        fetchRoomData();
      } else {
        console.error("Failed to delete Room Data:", response.status);
      }
    } catch (error) {
      console.error("Error deleting Room Data:", error);
    } finally {
      setDeletingLoader(false);
    }
  };

  function handleVehicle_id(id) {
    setVehicleID(id);
  }

  const csvData = driver.map(({ id, ...rest }) => rest);

  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicles");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Vehicle Data", 10, 10);
    doc.autoTable({
      head: [["Sl No.","Vehicle No.", "Name",  "Contact"]],
      body: data.map(({  vehicle_n0, name, phone }) => [
        vehicle_n0,
        name,
        phone,
      ]),
    });
    doc.save("vehicle_data.pdf");
  };

  const printTable = () => {
    const printContent = document.getElementById("printTableDiv").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(driver.length / itemsPerPage);

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[15%] mt-[34%]">
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
        <span className="text-[20px]">Transport</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Add Driver
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white shadow-md rounded-lg h-full w-[96%] lg:w-[40%] mb-4">
          <div className="flex justify-between items-center text-lg bg-[#192b4c] font-semibold mb-4 p-4 text-white rounded-t-lg">
            <h2>{editId?"Update":"Add"} Driver</h2>
            <BsThreeDotsVertical />
          </div>
          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-600">
            {/* Form Inputs */}
            <label className="block mb-2">
              Vehicle No.<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                handleVehicle_id(e.target.value);
              }}
              value={values.vehicle}
              name="vehicle"
            >
             <option value="" >Please Select</option>
              {no?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.vehicle_no}
                </option>
              ))}
            </select>

            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.name}
              name="name"
            />

            <label className="block mb-2">Present Address</label>
            <input
              type="text"
              className="w-full mb-4 p-2 py-4 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.present_address}
              name="present_address"
            />

            <label className="block mb-2">Permanent Address</label>
            <input
              type="text"
              className="w-full mb-4 p-2 py-4 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.permanent_address}
              name="permanent_address"
            />

            <label className="block mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.birthdate}
              name="birthdate"
            />

            <label className="block mb-2">Phone</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.phone}
              name="phone"
            />
            <label className="block mb-2">License Number</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.license_no}
              name="license_no"
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              {editId?"Update":"Save"}
            </button>
          </form>
        </div>

        <div className="bg-white h-full pb-4 shadow-md rounded-lg w-[96%] lg:w-[55%] mb-4">
          <h2 className="text-xl font-normal mb-4 border-b p-6">Driver Detail List</h2>

          <div className="flex items-center justify-between mb-4 px-6">
            <div className="space-x-0.5">
              <button className="btn bg-gray-200 rounded-l-lg p-1 px-3">Copy</button>
              <CSVLink
                data={csvData}
                filename="vehicle_data.csv"
                className="btn bg-gray-200 p-1 px-3"
              >
                CSV
              </CSVLink>
              <button
                className="btn bg-gray-200 p-1 px-3"
                onClick={() => exportToExcel(driver, "vehicle_data.xlsx")}
              >
                Excel
              </button>
              <button
                className="btn bg-gray-200 p-1 px-3"
                onClick={() => exportToPDF(driver)}
              >
                PDF
              </button>
              <button
                className="btn bg-gray-200 rounded-r-lg p-1 px-3"
                onClick={printTable}
              >
                Print
              </button>
            </div>

            <div>
              <label className="mr-2">Search:</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded p-1"
              />
            </div>
          </div>

          <div id="printTableDiv" className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-separate rounded-lg">
              <thead>
                <tr>
                  <th className="py-4 px-4 border text-sm">Sl No.</th>
                  <th className="py-4 px-4 border text-sm">Vehicle No.</th>
                  <th className="py-4 px-4 border text-sm">Name</th>
                  <th className="py-4 px-4 border text-sm">Contact</th>
                  <th className="py-4 px-4 border text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
              {fetchingLoader && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
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
                {driver.length > 0 ? ( driver
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((vehicle, index) => (
                    <tr key={vehicle.id} className="border text-sm">
                      <td className="py-4 px-4 border">{index + 1}</td>
                      <td className="py-4 px-4 border">{vehicle.vehicle_no}</td>
                      <td className="py-4 px-4 border">{vehicle.name}</td>
                      <td className="py-4 px-4 border">{vehicle.phone}</td>
                      <td className="py-4 px-4 border space-x-1 text-xs whitespace-nowrap ">
                        <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                          <TiPencil onClick={() => handleEdit(vehicle)} />
                        </button>
                        
                        <button
                          className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600"
                          onClick={() => navigate(`/DriverDetails/${vehicle.id}`)}
                        >
                          <BsEye />
                        </button>
                        <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                          <FaTrashAlt onClick={()=>handleDelete(vehicle.id)}  />
                        </button>
                      </td>
                    </tr>
                  ))
                  ):(
                    <tr>
                      <td colSpan={6} className="text-sm  text-center text-gray-700 py-3 " >
                        No Driver Details Available
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex text-gray-700 text-sm justify-between items-center px-4">
            <span>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, driver.length)} of {driver.length}{" "}
              entries
            </span>
            <div className="flex gap-2">
              <button
                className="btn bg-gray-200 px-3 py-1"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <button
                className="btn bg-gray-200 px-3 py-1"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
