import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import toast from "react-hot-toast";

const EmployeeProfile = () => {
  const [data, setData] = useState();

  const { id } = useParams();

  console.log(id);

  const FetchEmployeeProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(baseURL + API_URLS.addEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          id: id,
        },
      });
      if (response.status === 200) {
        console.log(response.data.data);
        setData(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchEmployeeProfile();
  }, []);

  const navigate = useNavigate();

  // console.log(data?.lastname)

  const initialValues = {
    employee_id: { id },
    firstname: "",
    middlename: "",
    lastname: "",
    birthdate: "",
    gender: "",
    bloodgroup: "",
    birthplace: "",
    nationality: "",
    mothertongue: "",
    category: "",
    religion: "",
    caste: "",
    adharnumber: "",
    EPFnumber: "",
    ESInumber: "",
    permanentaddress: "",
    alternateaddress: "",
    city: "",
    pin: "",
    mobile: "",
    alternativemobile: "",
    country: "",
    state: "",
    email: "",
    account_holder_name: "",
    account_number: "",
    bank_name: "",
    IFSC_code: "",
    experienceletter: false,
    bankStatement: false,
    relievingletter: false,
    castecertificate: false,
    migrationcertificate: false,
    affidavit: false,
  };

  // Update Formik values when `data` is set
  useEffect(() => {
    if (data) {
      setValues({
        id: data._id || "",
        firstname: data.firstname || "",
        middlename: data.middlename || "",
        lastname: data.lastname || "",
        birthdate: data.birthdate || "",
        gender: data.gender || "",
        bloodgroup: data.bloodgroup || "",
        birthplace: data.birthplace || "",
        nationality: data.nationality || "",
        mothertongue: data.mothertongue || "",
        category: data.category || "",
        religion: data.religion || "",
        caste: data.caste || "",
        adharnumber: data.adharnumber || "",
        EPFnumber: data.EPFnumber || "",
        ESInumber: data.ESInumber || "",
        permanentaddress: data.permanentaddress || "",
        alternateaddress: data.alternateaddress || "",
        city: data.city || "",
        pin: data.pin || "",
        mobile: data.mobile || "",
        alternativemobile: data.alternativemobile || "",
        country: data.country || "",
        state: data.state || "",
        email: data.email || "",
        experienceletter: data.experienceletter,
        bankStatement: data.bankStatement,
        relievingletter: data.relievingletter,
        castecertificate: data.castecertificate,
        migrationcertificate: data.migrationcertificate,
        affidavit: data.affidavit,
        account_holder_name:data.account_holder_name,
        account_number: data.account_number,
        bank_name:data.bank_name,
        IFSC_code:data.IFSC_code,
      });
    }
  }, [data]);

  const {
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    setValues,
    values,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values);
      // Append all form values to FormData
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          baseURL + API_URLS.addEmployee,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // Display only relevant parts of response.data
          const message =
            response.data.message || "Employee registration was successful!";
          console.log(response.data.message);
          toast.success(response.data.message);
          navigate("/Employee List");
          resetForm();
          // console.log(response);
        } else {
          toast.error("Failed to add employee:", response);
        }
      } catch (error) {
        toast.error("Error submitting form:", error);
      }
    },
  });

  const [show, setShow] = useState("personal");

  return (
    <div className="ml-[1%] md:ml-[43%] lg:ml-[32.5%] xl:ml-[22.5%] xl:mt-[7%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:ml-5">
        Employee Management <FaHome className="text-blue-900 w-4 h-4" /> -
        Employee Profile
      </div>
      <div className=" mb-2 bg-white p-4 mx-5 rounded-t-lg">
        <div className="flex space-x-4 border-b">
          <button className="text-white bg-[#7047ee] px-3 py-1 ">
            Profile
          </button>
          <button className="text-gray-600">Detail</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row p-4 gap-4">
        {/* Left Section */}

        <form onSubmit={handleSubmit} className=" mt-4">
          <div className="w-full lg:w-[100%] bg-white shadow-md rounded-lg p-4">
            <div>
              <div className="flex space-x-4 border-b">
                <button
                  type="button"
                  onClick={() => setShow("personal")}
                  className={`${
                    show === "personal"
                      ? "text-white bg-[#7047ee] px-3 py-1"
                      : "text-gray-600"
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setShow("contact")}
                  className={`${
                    show === "contact"
                      ? "text-white bg-[#7047ee] px-3 py-1"
                      : "text-gray-600"
                  }`}
                >
                  Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShow("bank")}
                  className={`${
                    show === "bank"
                      ? "text-white bg-[#7047ee] px-3 py-1"
                      : "text-gray-600"
                  }`}
                >
                  Bank Details
                </button>
              </div>
            </div>

            {show === "personal" && (
              <div className="mt-4">
                <h2 className="text-base font-semibold text-red-500 pb-4">
                  PERSONAL INFROMATION :
                </h2>

                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {/* Personal Detail Fields */}
                  <div>
                    <label className="block mb-2">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      name="firstname"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Middle Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.middlename}
                      name="middlename"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      name="lastname"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.birthdate}
                      name="birthdate"
                    />
                  </div>
                </div>

                {/* Personal Detail 2nd Row */}
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 border-b pb-6">
                  <div>
                    <label className="block mb-2">
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.gender}
                      name="gender"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Blood Group<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bloodgroup}
                      name="bloodgroup"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Birth Place<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.birthplace}
                      name="birthplace"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Nationality<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nationality}
                      name="nationality"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Mother Tongue<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mothertongue}
                      name="mothertongue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                      name="category"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Religion<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.religion}
                      name="religion"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Caste<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.caste}
                      name="caste"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Aadhar Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.adharnumber}
                      name="adharnumber"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      EPF Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.EPFnumber}
                      name="EPFnumber"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      ESI Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.ESInumber}
                      name="ESInumber"
                      required
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-slate-600 mb-4">DOCUMENT SUBMITTED:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 text-sm gap-y-4 gap-x-6 mb-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.experienceletter} // Bind checked state here
                        name="experienceletter"
                      />
                      <span>Experience Letter</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.bankStatement} // Bind checked state here
                        name="bankStatement"
                      />
                      <span className="whitespace-nowrap">
                        3 Months Bank Statement
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.relievingletter} // Bind checked state here
                        name="relievingletter"
                      />
                      <span>Relieving Letter</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.castecertificate} // Bind checked state here
                        name="castecertificate"
                      />
                      <span>Caste Certificate</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.migrationcertificate} // Bind checked state here
                        name="migrationcertificate"
                      />
                      <span>Migration Certificate</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.affidavit} // Bind checked state here
                        name="affidavit"
                      />
                      <span>Affidavit</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {show === "contact" && (
              <div>
                <div className="font-bold text-red-500 mb-4 mt-4">
                  CONTACT :
                </div>
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6 ">
                  <div>
                    <label className="block mb-2">
                      Permanent Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full h-14 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.permanentaddress}
                      name="permanentaddress"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Alternate Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full h-14 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.alternateaddress}
                      name="alternateaddress"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {/* Personal Detail Fields */}
                  <div>
                    <label className="block mb-2">
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Pin<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pin}
                      name="pin"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile}
                      name="mobile"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Alternate Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.alternativemobile}
                      name="alternativemobile"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {/* Personal Detail Fields */}
                  <div>
                    <label className="block mb-2">
                      Country<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.country}
                      name="country"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      State<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state}
                      name="state"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {show === "bank" && (
              <div className="min-w-[50vw]" >
                <div className="font-bold text-red-500 my-5 ">
                  BANK DETAILS :
                </div>
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6 ">
                  <div>
                    <label className="block mb-2">
                      Account Holder Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full  px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.account_holder_name}
                      name="account_holder_name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Bank Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full  px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bank_name}
                      name="bank_name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Account Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full  px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.account_number}
                      name="account_number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Bank IFSC Code<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full  px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.IFSC_code}
                      name="IFSC_code"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="px-4 mx-auto w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
        </form>

        {/* Right Section */}
        <div className="w-full lg:w-[30%] mt-4">
          <div className="bg-white  flex flex-col items-center w-full shadow-md rounded-lg p-6">
            <img
              className="w-56 h-56  bg-gray-200 rounded-full"
              src={data?.image}
              alt="Error"
            />
            <h3 className="mt-4 text-base font-medium">
              {data?.firstname} {data?.middlename} {data?.lastname}
            </h3>
            <span className="text-sm text-white bg-[#192b4c] rounded-sm px-3 py-1">
              {data?.designation}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 w-full bg-white  flex flex-col  shadow-md rounded-lg p-6">
            <h4 className="text-sm font-semibold mb-2">Navigation</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                Salary detail
              </li>
              <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                Leave Approval
              </li>
              <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                Time Table
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
