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

const AddRoute = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [route, setRoute] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [no, setNo] = useState();

  const initialValues = {
    vehicle: "",
    root: "",
    startplace: "",
    endplace: "",
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
      const response = await axios.get(baseURL + API_URLS.addRoute, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Fetched Room Data:", response.data);

        const RoomData = response.data.data || [];

        if (Array.isArray(RoomData)) {
          setRoute(RoomData);
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

  const handleEdit = (Route) => {
    console.log(Route);
    setEditId(Route.id);
    setValues({
      vehicle: Route.vehicle,
      root: Route.root,
      startplace: Route.startplace,
      endplace: Route.endplace,
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
            baseURL + API_URLS.addRoute,
            {
              vehicle: values.vehicle,
              root: values.root,
              root_id: editId,
              startplace: values.startplace,
              endplace: values.endplace,
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
            toast.success(response.data.message);
            setEditId(null);
          }
        } else {
          response = await axios.post(baseURL + API_URLS.addRoute, values, {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            console.log(response);
            toast.success(response.data.messsage);
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

  const handleDelete = async (root_id) => {
    console.log("Deleting User Type with ID:", root_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("root_id", root_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.addRoute, {
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

  useEffect(() => {
    fetchVehicle_no();
  }, []);

  const csvData = route.map(({ id, ...rest }) => rest);

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

  const printTable = () => {
    const printContent = document.getElementById("printTableDiv").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(route.length / itemsPerPage);

  const vehicleData = [
    {
      id: 1,
      vehicleNo: "DL4536",
      name: "Abisheh",
      seats: 40,
      contact: "Naveen",
    },
    { id: 2, vehicleNo: "DL1234", name: "John", seats: 50, contact: "Rahul" },
    { id: 3, vehicleNo: "DL9876", name: "Smith", seats: 60, contact: "Ajay" },
    { id: 4, vehicleNo: "DL4321", name: "David", seats: 70, contact: "Vikram" },
    { id: 5, vehicleNo: "DL8765", name: "Chris", seats: 80, contact: "Nitin" },
  ];

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[15%] mt-[34%]">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        <span className="text-[20px]">Transport</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Add Route
        </span>
      </div>

      <div className="flex xl:flex-row flex-col gap-4">
        {/* Add Route Form */}
        <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[70%] mb-4 h-full ">
          <div className="flex justify-between text-xl font-medium mb-4 p-4 md:p-6 dark-color text-white rounded-t-lg">
            <h2>Add Route</h2>
            <BsThreeDotsVertical />
          </div>
          <form onSubmit={handleSubmit} className="p-4 text-sm text-gray-600 ">
            <label className="block mb-2">
              Vehicle No.<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
              }}
              value={values.vehicle}
              name="vehicle"
            >
              <option value="">Please Select</option>
              {no?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.vehicle_no}
                </option>
              ))}
            </select>

            <label className="block mb-2">Route Code</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.root}
              name="root"
            />

            <label className="block mb-2">Route Start Place</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.startplace}
              name="startplace"
            />

            <label className="block mb-2">Route Stop Place</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder=""
              onChange={handleChange}
              value={values.endplace}
              name="endplace"
            />

            <button
              type="submit"
              className="w-full lg:w-[25%] bg-[#192b4c] text-white py-2 rounded-lg hover:bg-green-800"
            >
              Save
            </button>
          </form>
        </div>

        {/* Route List Section */}
        <div className="w-full">
          <div className="bg-white shadow-md rounded-lg w-[96%] md:w-[96%] lg:w-[95%] xl:w-[96%] pb-5 mb-4 overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 border-b p-6">
              Route Detail List
            </h2>

            {/* Export buttons */}
            <div className="flex items-center justify-between mb-4 px-6">
              <div className="space-x-0.5 flex">
                <button className="btn bg-gray-300 rounded-l-lg p-1 px-3">
                  Copy
                </button>
                <CSVLink
                  data={csvData}
                  filename="vehicle_data.csv"
                  className="btn bg-gray-300 p-1 px-3"
                >
                  CSV
                </CSVLink>
                <button
                  className="btn bg-gray-300 p-1 px-3"
                  onClick={() =>
                    exportToExcel(vehicleData, "vehicle_data.xlsx")
                  }
                >
                  Excel
                </button>
                <button
                  className="btn bg-gray-300 p-1 px-3"
                  onClick={() => exportToPDF(vehicleData)}
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
                  placeholder="Search By Vehcile No./Name"
                  className="border border-gray-300 rounded p-1 placeholder:text-sm"
                />
              </div>
            </div>

            {/* Table Wrapper with horizontal scrolling on small screens */}
            <div className="min-w-full bg-white border rounded-lg border-separate pb-5 mx-6">
              <table className=" overflow-x-auto text-sm   ">
                <thead>
                  <tr className="text-left text-base">
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Sl No.
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Vehicle No.
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Route Code
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Route Start Place
                    </th>
                    <th className="py-4 px-4 border whitespace-nowrap text-sm">
                      Route Stop Place
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {route.length > 0 ? (
                    route
                      ?.map((vehicle, index) => (
                        <tr key={vehicle.id} className="border">
                          <td className="py-4 px-4 border">{index + 1}</td>
                          <td className="py-4 px-4 border">
                            {vehicle.vehicle_no}
                          </td>
                          <td className="py-4 px-4 border">{vehicle.root}</td>
                          <td className="py-4 px-4 border">
                            {vehicle.startplace}
                          </td>
                          <td className="py-4 px-4 border">
                            {vehicle.endplace}
                          </td>
                          <td className="py-4 px-4 border space-x-1 text-xs whitespace-nowrap ">
                            <button className="bg-purple-200 rounded-full p-3 text-purple-600 hover:text-white hover:bg-purple-600">
                              <TiPencil onClick={() => handleEdit(vehicle)} />
                            </button>
                            <button className="bg-red-200 rounded-full p-3 text-red-400 hover:text-white hover:bg-red-500">
                              <FaTrashAlt
                                onClick={() => handleDelete(vehicle.id)}
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No Record Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoute;
