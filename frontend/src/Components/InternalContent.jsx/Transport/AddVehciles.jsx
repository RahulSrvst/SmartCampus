import React, { useEffect, useState } from "react";
import { FaHome, FaTrashAlt } from "react-icons/fa";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
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
import { PiArrowsDownUpThin } from "react-icons/pi";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const AddVehicles = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [vehcileData, setRoom] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);

  const initialValues = {
    vehicle_id: editId || "",
    vehicle_n0: "",
    license_no: "",
    no_of_seats: "",
    maximum_allowed: "",
    vehicle_type: "",
    mobile: "",
    renewal_date: "",
    trac_id: "",
    registration_certificate: null,
    pollution_certificate: null,
    insurance_certificate: null,
  };

  const fetchRoomData = async () => {
    const token = localStorage.getItem("token");
    try {
      setFetchingLoader(true);
      const response = await axios.get(baseURL + API_URLS.AddVehciles, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Room Data:", response.data);

        const RoomData = response.data.data || [];

        if (Array.isArray(RoomData)) {
          setRoom(RoomData);
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
  }, []);

  const handleEdit = (vehcileData) => {
    console.log(vehcileData);
    setEditId(vehcileData.id);
    setValues({
      vehicle_n0: vehcileData.vehicle_n0,
      license_no: vehcileData.license_no,
      no_of_seats: vehcileData.no_of_seats,
      maximum_allowed: vehcileData.maximum_allowed,
      vehicle_type: vehcileData.vehicle_type,
      mobile: vehcileData.mobile,
      renewal_date: vehcileData.renewal_date,
      trac_id: vehcileData.trac_id,
    });
    setFieldValue(
      "registration_certificate",
      vehcileData.registration_certificate
    );
    setFieldValue("pollution_certificate", vehcileData.pollution_certificate);
    setFieldValue("insurance_certificate", vehcileData.insurance_certificate);
  };

  const {
    values,
    handleChange,
    resetForm,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append all form values to FormData
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }

      try {
        setSubmittingLoader(true);
        const token = localStorage.getItem("token");

        let response;
        if (editId) {
          // Include the `vehicle_id` for PATCH
          formData.append("vehicle_id", editId);

          response = await axios.patch(
            baseURL + API_URLS.AddVehciles,
            formData,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.post(
            baseURL + API_URLS.AddVehciles,
            formData,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        // Handle Response
        if (response.status === 200) {
          console.log(response);
          toast.success(response.data.message);
          resetForm({ values: initialValues });
          setEditId(null);
          setValues(initialValues);

          // Reset file inputs explicitly
          setFieldValue("registration_certificate", null);
          setFieldValue("pollution_certificate", null);
          setFieldValue("insurance_certificate", null);

          // Refresh Data
          fetchRoomData();
        }
      } catch (error) {
        toast.error("Error submitting form:", error.message || error);
      } finally {
        setSubmittingLoader(false);
      }
    },
  });
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFieldValue(name, selectedFile);
    }
  };

  const handleDelete = async (vehicle_id) => {
    console.log("Deleting User Type with ID:", vehicle_id);
    const token = localStorage.getItem("token");

    // Create FormData and append vehicle_id
    const formData = new FormData();
    formData.append("vehicle_id", vehicle_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.AddVehciles, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Room Data deleted successfully");
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

  const csvData = vehcileData?.map(({ id, ...rest }) => rest); // Exclude `id` from CSV

  // Function to export to Excel
  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicles");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  // Function to export to PDF
  const exportToPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Vehicle Data", 10, 10);
    doc.autoTable({
      head: [["Vehicle No.", "No. of Seats", "Max Allowed", "Contact"]],
      body: data.map(({ vehicleNo, seats, maxAllowed, contact }) => [
        vehicleNo,
        seats,
        maxAllowed,
        contact,
      ]),
    });
    doc.save("vehicle_data.pdf");
  };

  // Function to print table
  const printTable = () => {
    const printContent = document.getElementById("printTableDiv").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

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
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Add Vehicles
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white shadow-md rounded-lg w-[96%] lg:w-[40%] mb-4">
          <div className="flex justify-between text-xl font-bold mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Vehicle Details</h2>
            <BsThreeDotsVertical />
          </div>
          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-600">
            <label className="block mb-2">
              Vehicle No.<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.vehicle_n0}
              name="vehicle_n0"
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

            <label className="block mb-2">No. of Seats</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.no_of_seats}
              name="no_of_seats"
            />

            <label className="block mb-2">Maximum Allowed</label>
            <input
              type="number"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.maximum_allowed}
              name="maximum_allowed"
            />

            <label className="block mb-2">Vehicle Type</label>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={handleChange}
              value={values.vehicle_type}
              name="vehicle_type"
            >
              <option>Please Select</option>
              <option>Contract</option>
              <option>Ownership</option>
            </select>

            <label className="block mb-2">Contact Person</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.mobile}
              name="mobile"
            />

            <label className="block mb-2">Insurance Renewal Date</label>
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.renewal_date}
              name="renewal_date"
            />

            <label className="block mb-2">Track ID</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded "
              onChange={handleChange}
              value={values.trac_id}
              name="trac_id"
            />

            <label htmlFor="registration_certificate" className="block mb-2">
              Registration Certificate
            </label>
            <input
              type="file"
              className="w-full mb-4 p-2 border border-gray-300 rounded file:border-none  bg-gray-300"
              onChange={handleFileChange}
              name="registration_certificate"
              id="registration_certificate"
            />
            <label htmlFor="pollution_certificate" className="block mb-2">
              Pollution Certificate
            </label>
            <input
              type="file"
              className="w-full mb-4 p-2 border border-gray-300 rounded file:border-none  bg-gray-300 "
              onChange={handleFileChange}
              name="pollution_certificate"
              id="pollution_certificate"
            />
            <label htmlFor="insurance_certificate" className="block mb-2">
              Insurance Certificate
            </label>
            <input
              type="file"
              className="w-full mb-4 p-2 border border-gray-300 rounded file:border-none  bg-gray-300"
              onChange={handleFileChange}
              name="insurance_certificate"
              id="insurance_certificate"
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
            >
              {editId ? "Update" : "Save"}
            </button>
          </form>
        </div>

        {/* Vehicle List Section */}

        <div className="bg-white shadow-md rounded-lg w-[89%] lg:w-[102.5%] xl:w-[56%] h-full p-4">
          <h2 className="text-lg font-normal text-gray-800 mb-4 border-b pb-3">
            Vehicle List
          </h2>
          <div className=" overflow-x-scroll">
            <div className="flex items-center justify-between mb-4 ">
              {/* Export buttons */}
              <div className="space-x-0.5">
                <button className="btn bg-gray-300 rounded-l-lg p-1 px-3">
                  Copy
                </button>
                <button className="btn bg-gray-300 p-1 px-3">
                  <CSVLink data={csvData} filename="vehicle_data.csv">
                    CSV
                  </CSVLink>
                </button>
                <button
                  className="btn bg-gray-300 p-1 px-3"
                  onClick={() =>
                    exportToExcel(vehcileData, "vehicle_data.xlsx")
                  }
                >
                  Excel
                </button>
                <button
                  className="btn bg-gray-300 p-1 px-3"
                  onClick={() => exportToPDF(vehcileData)}
                >
                  PDF
                </button>
                <button
                  className="btn bg-gray-300 rounded-r-lg p-1 px-3"
                  onClick={printTable}
                >
                  Print
                </button>
              </div>

              {/* Search */}
              <div>
                <label className="mr-2">Search:</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded p-1 px-3"
                />
              </div>
            </div>

            {/* Table */}
            <div id="printTableDiv">
              <table className="min-w-[92%] bg-white border rounded-lg border-separate mx-6">
                <thead>
                  <tr className="text-left">
                    <th className="py-4 px-4 border flex whitespace-nowrap text-sm items-center">
                      Sl No.
                      <PiArrowsDownUpThin />
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Vehicle No.
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      No. of Seats
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Max Allowed
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Contact Person
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Action
                    </th>
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
                  {vehcileData?.map((vehicle, index) => (
                    <tr key={vehicle.id} className="border text-sm">
                      <td className="py-4 px-4 border">{index + 1}</td>
                      <td className="py-4 px-4 border">{vehicle.vehicle_no}</td>
                      <td className="py-4 px-4 border">
                        {vehicle.no_of_seats}
                      </td>
                      <td className="py-4 px-4 border">
                        {vehicle.maximum_allowed}
                      </td>
                      <td className="py-4 px-4 border">{vehicle.mobile}</td>
                      <td className="py-4 px-4 border space-x-1 text-xs flex ">
                        <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                          <TiPencil onClick={() => handleEdit(vehicle)} />
                        </button>
                        <button
                          className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600"
                          onClick={() =>
                            navigate(`/VehicleDetails/${vehicle.id}`)
                          }
                        >
                          <BsEye />
                        </button>
                        <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                          <FaTrashAlt
                            onClick={() => handleDelete(vehicle.id)}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicles;
