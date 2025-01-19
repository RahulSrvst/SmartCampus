import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome, FaRegClock, FaTrashAlt } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { ColorRing } from "react-loader-spinner";
import { TiPencil } from "react-icons/ti";

const AddDestination = () => {
  const [route, setRoute] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fetchingLoader, setFetchingLoader] = useState(false);
  const [submittingLoader, setSubmittingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [no, setNo] = useState();
  const [see, setSee] = useState("Add");

  const initialValues = {
    root: "",
    pickanddrop: "",
    stop_time: "",
    amount: "",
    feestype: "",
  };

  const fetchVehicle_no = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.addRoute, {
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
      const response = await axios.get(baseURL + API_URLS.AddDestination, {
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

  const handleEdit = (Destination) => {
    console.log(Destination);
    setEditId(Destination.id);
    setValues({
      root: Destination.root,
      pickanddrop: Destination.pickanddrop,
      stop_time: Destination.stop_time,
      amount: Destination.amount,
      feetype: Destination.feetype,
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
            baseURL + API_URLS.AddDestination,
            {
              destination_id: editId,
              root: values.root,
              pickanddrop: values.pickanddrop,
              stop_time: values.stop_time,
              amount: values.amount,
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
          response = await axios.post(
            baseURL + API_URLS.AddDestination,
            values,
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

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

  const handleDelete = async (destination_id) => {
    console.log("Deleting User Type with ID:", destination_id);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("destination_id", destination_id);

    try {
      setDeletingLoader(true);
      const response = await axios.delete(baseURL + API_URLS.AddDestination, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Destination Deleted successfully");
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

  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[15%] mt-[34%]">
      <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8">
        <span className="text-[20px]">Transport</span>
        <span className="text-blue-900 flex items-center text-[14px] mt-0.5">
          <FaHome className="text-blue-900 w-4 h-4 mr-2" /> - Add Destination
        </span>
      </div>

      <div className="flex space-x-4 mb-6  bg-white p-4 w-[96%]  lg:w-[97%] rounded-lg ">
        <button
          onClick={() => setSee("Add")}
          className={`${see === "Add" && "bg-[#7074ee] text-white"  } px-6 py-2 rounded-lg focus:outline-none`}
        >
          Add Destination & Fees
        </button>
        <button
          onClick={() => setSee("List")}
          className={`${see === "List" && "bg-[#7074ee] text-white"  } px-6 py-2 rounded-lg focus:outline-none`}
        >
          List
        </button>
      </div>

      {see === "Add" && (
        <div className="bg-white  rounded-lg shadow-md w-[96%]  lg:w-[97%]">
          <h2 className="text-lg border-b p-5 font-normal mb-4">
            Add Destination & Fees
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
            <div className="flex flex-col">
              <label className="block mb-2">
                Route Code<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
                value={values.root}
                name="root"
              >
                <option value="">Please Select</option>
                {no?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.root}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mt-1">
              <label className="text-gray-700 mb-1" htmlFor="pickupDrop">
                Pickup & Drop <span className="text-red-500">*</span>
              </label>
              <input
              value={values.pickanddrop}
              onChange={handleChange}
                name="pickanddrop"
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                placeholder=""
              />
            </div>

            {/* Stop Time */}
            <div className="flex flex-col relative">
              <label className="text-gray-700 mb-1" htmlFor="stopTime">
                Stop Time <span className="text-red-500">*</span>
              </label>
              <input
                value={values.stop_time}
              onChange={handleChange}
                name="stop_time"
                type="time"
                className="border border-gray-300 rounded-lg p-2"
                placeholder=""
              />
              <FaRegClock className="absolute right-3 top-10 text-gray-500" />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1" htmlFor="amount">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                value={values.amount}
              onChange={handleChange}
                name="amount"
                type="number"
                className="border border-gray-300 rounded-lg p-2"
                placeholder=""
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {see === "List" && (
        <div className="bg-white h-full pb-4 shadow-md rounded-lg w-[96%] lg:w-[96%] mb-4">
          <h2 className="text-xl font-normal mb-4 border-b p-6">
            Destination List
          </h2>

          <div className="flex items-center justify-between mb-4 px-6">
            {/* <div>
              <label className="mr-2">Search:</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded p-1"
              />
            </div> */}
          </div>

          <div id="printTableDiv" className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-separate rounded-lg">
              <thead>
                <tr>
                  <th className="py-4 px-4 border text-sm">Sl No.</th>
                  <th className="py-4 px-4 border text-sm">Route Code</th>
                  <th className="py-4 px-4 border text-sm">Pick & Drop</th>
                  <th className="py-4 px-4 border text-sm">Stop Time</th>
                  <th className="py-4 px-4 border text-sm">Amount</th>
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
                {route.length > 0 ? (
                  route.map((vehicle, index) => (
                    <tr key={vehicle.id} className="border text-sm">
                      <td className="py-4 px-4 border">{index + 1}</td>
                      <td className="py-4 px-4 border">{vehicle.root_name}</td>
                      <td className="py-4 px-4 border">{vehicle.pickanddrop}</td>
                      <td className="py-4 px-4 border">{vehicle.stop_time}</td>
                      <td className="py-4 px-4 border">₹{" "}{vehicle.amount}</td>
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
                    <td
                      colSpan={6}
                      className="text-sm  text-center text-gray-700 py-3 "
                    >
                      No Destination Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDestination;
