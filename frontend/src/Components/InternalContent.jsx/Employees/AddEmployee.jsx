import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const AddEmployee = () => {
  const [departmentData, setDepartmentData] = useState();
  const [designationData, setDesignationData] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [designationId, setDesignationId] = useState();

  const [submittingLoader, setSubmittingLoader] = useState(false);

  const initialValues = {
 
    department: departmentId || "",
    designation: designationId || "",
    employeecode: "",
    joiningdate: "",
    qualification: "",
    experience: "",
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
    account_holder_name:"",
    account_number:"",
    bank_name:"",
    IFSC_code:"",
    image: null,
    experienceletter: false,
    bankStatement: false,
    relievingletter: false,
    castecertificate: false,
    migrationcertificate: false,
    affidavit: false,
  };

  const fetchDepartmentTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.department, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setDepartmentData(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDesignationTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.designation, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setDesignationData(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDepartmentTypes();
    fetchDesignationTypes();
  }, []);

  function handleDepartmentID(id) {
    setDepartmentId(id);
  }

  function handleDesignationID(id) {
    setDesignationId(id);
  }

  const {
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    handleReset,
    setFieldValue,
    values,
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
        const response = await axios.post(
          baseURL + API_URLS.addEmployee,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          // Display only relevant parts of response.data
          const message =
            response.data.message ;
            console.log(response);
          toast.success(response?.data?.message);
          resetForm();
          // console.log(response);
        } else {
          toast.error("Failed to add employee:", response.message);
        }
      } catch (error) {
        toast.error("Error submitting form:", error);
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

  return (
    <div className="xl:ml-[22%] lg:ml-[32.5%] md:ml-[41%] xl:mt-[4%] lg:mt-[10%] sm:mt-[12%] mt-[38%] pb-80 p-4 xl:p-8 sm:p-5">
      <div className="flex items-center lg:gap-2 gap-2 lg:text-base text-sm md:mb-6 mb-3">
        Employee Management <FaHome className="text-blue-900 w-4 h-4" />- Add
        Employee
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white shadow-md rounded-lg w-full lg:w-[102%] ">
          <div className="flex justify-between text-lg font-bold mb-4 dark-color text-white p-5 rounded-t-lg">
            <h2>Employee Registration</h2>
            <BsThreeDotsVertical />
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <div className="font-bold text-red-500 mb-6">EMPLOYEE Detail :</div>

            <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {/* Official Detail Fields */}
              <div>
                <label className="block mb-2">
                  Employee Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.employeecode}
                  name="employeecode"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label className="block mb-2">
                  Joining Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.joiningdate}
                  name="joiningdate"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label className="block mb-2">
                  Department<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleDepartmentID(e.target.value);
                  }}
                  value={values.department}
                  name="department"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {departmentData?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div></div>
            </div>

            {/* Official Detail 2nd Row */}
            <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 border-b pb-6">
              <div>
                <label className="block mb-2">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleDesignationID(e.target.value);
                  }}
                  value={values.designation}
                  name="designation"
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  {designationData?.map((items) => (
                    <option key={items._id} value={items._id}>
                      {items.designation_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">
                  Higher Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.qualification}
                  name="qualification"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">
                  Total Experiernce in Years{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.experience}
                  name="experience"
                  required
                />
              </div>
              {/* <div>
                <label className="block mb-2">
                  User Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e); // Handles Formik change if using it
                    handleUserTypeID(e.target.value); // Call handleUserTypeID with selected ID
                  }}
                  value={values.user_type}
                  name="user_type"
                >
                  <option value="" disabled>
                    Select UserType
                  </option>
                  {/* Exclude "student" from the options */}
                  {/* {userData
                    ?.filter(
                      (item) => item.usertype.toLowerCase() !== "student"
                    )
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.usertype}
                      </option>
                    ))} */}
                {/* </select>
              </div>  */}
            </div>

            <div className="font-bold text-red-500 mb-6">PERSONAL Detail :</div>
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

            <div className="font-bold text-red-500 mb-6">CONTACT :</div>
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

            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
            <label
                htmlFor="image"
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
              >
                {values.image ? (
                  <p className="text-sm">{values.image.name}</p>
                ) : (
                  <span>Upload Employee Photo</span>
                )}
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Banks Details */}

            <div className="font-bold text-red-500 my-5">BANK DETAILS  :</div>
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
              </div><div>
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
              </div><div>
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

            <div className="p-4">
              <h3 className="text-red-600 font-bold mb-4">
                DOCUMENT TO BE SUBMITTED:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 text-sm text-gray-600 gap-x-12">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    checked={values.experienceletter}
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
                    checked={values.bankStatement}
                    name="bankStatement"
                  />
                  <span>3 Months Bank Statement</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    checked={values.relievingletter}
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
                    checked={values.castecertificate}
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
                    checked={values.migrationcertificate}
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
                    checked={values.affidavit}
                    name="affidavit"
                  />
                  <span>Affidavit</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-5">
              <button
                type="submit"
                className="w-[40%] sm:w-[30%] lg:w-[15%] bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                type="reset"
                className="w-[40%] sm:w-[30%] lg:w-[15%] bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Reset
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
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
