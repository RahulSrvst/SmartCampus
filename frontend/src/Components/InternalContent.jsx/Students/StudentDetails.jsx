import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import toast from "react-hot-toast";
import { RxUpdate } from "react-icons/rx";

const StudentProfile = () => {
  const [data, setData] = useState([]);
  const [content, setContent] = useState("Uploaded Father Image");
  const [content1, setContent1] = useState("Uploaded Mother Image");
  const [content2, setContent2] = useState("Uploaded Student Image");

  const { id } = useParams();

  console.log(id);
  console.log(data);

  const fetchStudentAdmission = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(baseURL + API_URLS.studentAdmission, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          admission_id: id,
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
    fetchStudentAdmission();
  }, []);

  const navigate = useNavigate();

  console.log(data?.[0]?.student_firstname);

  const initialValues = {
    student_id: { id },
    student_firstname: "",
    student_middlename: "",
    Student_lastname: "",
    dob: "",
    gender: "",
    bloodgroup: "",
    birthplace: "",
    nationality: "",
    mothertongue: "",
    category: "",
    religion: "",
    caste: "",
    student_aadhar_no: "",
    permanent_address: "",
    alternate_address: "",
    city: "",
    pin: "",
    student_mobile: "",
    student_alternate_mobile: "",
    country: "",
    state: "",
    email: "",
    student_image: null,
    father_fullname: "",
    father_mobile: "",
    father_aadhar: "",
    father_image: null,
    mother_fullname: "",
    father_job: "",
    mother_job: "",
    mother_mobile: "",
    mother_aadhar: "",
    mother_image: null,
    complexion: "",
    weight: "",
    hieght: "",
    markforidentity: "",
    clinical_history: "",
    allergic_history: "",
    emergency_contact_name: "",
    emergency_mobile: "",
    prevous_schoolname: "",
    qualification: "",
    school_address: "",
    birthcertificate: false,
    castecertificate: false,
    marklist: false,
    birtlist: false,
    transfercertificate: false,
    migrationcertificate: false,
    affidavit: false,
    transport: false,
    hostel: false,
  };

  useEffect(() => {
    if (data) {
      setValues({
        student_id: data?.[0]?.id || "",
        student_firstname: data?.[0]?.student_firstname || "",
        student_middlename: data?.[0]?.student_middlename || "",
        Student_lastname: data?.[0]?.Student_lastname || "",
        dob: data?.[0]?.dob || "",
        gender: data?.[0]?.gender || "",
        bloodgroup: data?.[0]?.bloodgroup || "",
        birthplace: data?.[0]?.birthplace || "",
        nationality: data?.[0]?.nationality || "",
        mothertongue: data?.[0]?.mothertongue || "",
        category: data?.[0]?.category || "",
        religion: data?.[0]?.religion || "",
        caste: data?.[0]?.caste || "",
        student_aadhar_no: data?.[0]?.student_aadhar_no || "",
        permanent_address: data?.[0]?.permanent_address || "",
        alternate_address: data?.[0]?.alternate_address || "",
        permanentaddress: data?.[0]?.permanentaddress || "",
        alternateaddress: data?.[0]?.alternateaddress || "",
        city: data?.[0]?.city || "",
        pin: data?.[0]?.pin || "",
        student_mobile: data?.[0]?.student_mobile || "",
        student_alternate_mobile: data?.[0]?.student_alternate_mobile || "",
        country: data?.[0]?.country || "",
        state: data?.[0]?.state || "",
        // student_image:data?.[0]?.student_image || null,
        email: data?.[0]?.email || "",
        father_fullname: data?.[0]?.father_fullname || "",
        father_mobile: data?.[0]?.father_mobile || "",
        father_aadhar: data?.[0]?.father_aadhar || "",
        // father_image: data?.[0]?.father_image || null,
        mother_fullname: data?.[0]?.mother_fullname || "",
        father_job: data?.[0]?.father_job || "",
        mother_job: data?.[0]?.mother_job || "",
        mother_mobile: data?.[0]?.mother_mobile || "",
        mother_aadhar: data?.[0]?.mother_aadhar || "",
        // mother_image: data?.[0]?.mother_image || null,
        complexion: data?.[0]?.complexion || "",
        weight: data?.[0]?.weight || "",
        hieght: data?.[0]?.hieght || "",
        markforidentity: data?.[0]?.markforidentity || "",
        clinical_history: data?.[0]?.clinical_history || "",
        allergic_history: data?.[0]?.allergic_history || "",
        emergency_contact_name: data?.[0]?.emergency_contact_name || "",
        emergency_mobile: data?.[0]?.emergency_mobile || "",
        prevous_schoolname: data?.[0]?.prevous_schoolname || "",
        qualification: data?.[0]?.qualification || "",
        school_address: data?.[0]?.school_address || "",
        birthcertificate: data?.[0]?.birthcertificate || "",
        castecertificate: data?.[0]?.castecertificate || "",
        marklist: data?.[0]?.marklist || "",
        birtlist: data?.[0]?.birtlist || "",
        transfercertificate: data?.[0]?.transfercertificate || "",
        migrationcertificate: data?.[0]?.migrationcertificate,
        affidavit: data?.[0]?.affidavit,
        transport: data?.[0]?.transport,
        hostel: data?.[0]?.hostel,
      });
    }
  }, [data]);

  const {
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    setFieldValue,
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
          baseURL + API_URLS.studentAdmission,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // Display only relevant parts of response.data
          const message =
            response.data?.[0]?.message ||
            "Employee registration was successful!";
          console.log(response.data.message);
          toast.success(response.data.message);
          navigate("/Students List");
          resetForm();
        } else {
          toast.error("Failed to Update Student:", response);
        }
      } catch (error) {
        toast.error("Error Upadtng form:", error);
      }
    },
  });

  const [show, setShow] = useState("personal");

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFieldValue(name, selectedFile);
    }
  };

  return (
    <div className="ml-[1%] md:ml-[43%] lg:ml-[32.5%] xl:ml-[22.5%] xl:mt-[7%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20">
      <div className="flex items-center gap-2 md:gap-2 lg:text-base text-sm mb-3 md:mb-8 xl:ml-5">
        Students <FaHome className="text-blue-900 w-4 h-4" /> - Student Profile
      </div>
      <div className="  mb-2 bg-white p-4 mx-5 rounded-t-lg">
        <div className="flex border-b space-x-4">
          <button className="text-white px-3 py-1.5 bg-[#7047ee] pb-1">
            Profile
          </button>
          <button className="text-gray-600">Detail</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row p-4 gap-4">
        {/* Left Section */}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="w-full lg:w-[100%] bg-white shadow-md rounded-lg p-6">
            <div>
              <div className="flex space-x-4 text-sm text-gray-700  border-b">
                <button
                  type="button"
                  onClick={() => setShow("personal")}
                  className={`${
                    show === "personal"
                      ? " bg-[#7047ee] text-white px-3 py-1.5"
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
                      ? " bg-[#7047ee] text-white px-3 py-1.5"
                      : "text-gray-600"
                  }`}
                >
                  Contact
                </button>

                <button
                  type="button"
                  onClick={() => setShow("parent")}
                  className={`${
                    show === "parent"
                      ? " bg-[#7047ee] text-white px-3 py-1.5"
                      : "text-gray-600"
                  }`}
                >
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setShow("health")}
                  className={`${
                    show === "health"
                      ? " bg-[#7047ee] text-white px-3 py-1.5"
                      : "text-gray-600"
                  }`}
                >
                  Health
                </button>
                <button
                  type="button"
                  onClick={() => setShow("qualification")}
                  className={`${
                    show === "qualification"
                      ? " bg-[#7047ee] text-white px-3 py-1.5"
                      : "text-gray-600"
                  }`}
                >
                  Prev. Qualification
                </button>
              </div>
            </div>

            {show === "personal" && (
              <div className="mt-4">
                <div className="font-bold text-red-500 mb-6">
                  PERSONAL DETAILS :
                </div>
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
                      value={values.student_firstname}
                      name="student_firstname"
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
                      value={values.student_middlename}
                      name="student_middlename"
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
                      value={values.Student_lastname}
                      name="Student_lastname"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dob}
                      name="dob"
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
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Aadhar Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.student_aadhar_no}
                      name="student_aadhar_no"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-red-600 font-bold mb-4">
                    DOCUMENT TO BE SUBMITTED:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 text-sm text-gray-600 gap-y-4 gap-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.marklist}
                        name="marklist"
                      />
                      <span>Mark List</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.birthcertificate}
                        name="birthcertificate"
                      />
                      <span>Birth Certificate</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.transfercertificate}
                        name="transfercertificate"
                      />
                      <span>Transfer Certificate</span>
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

                <div className="p-4">
                  <h3 className="text-red-600 font-bold mb-4">
                    DOCUMENT TO BE SUBMITTED:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 text-sm text-gray-600 gap-y-4 gap-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.transport}
                        name="transport"
                      />
                      <span>Transport</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.hostel}
                        name="hostel"
                      />
                      <span>Hostel</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {show === "contact" && (
              <div className="mt-5">
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
                      value={values.permanent_address}
                      name="permanent_address"
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
                      value={values.alternate_address}
                      name="alternate_address"
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
                      value={values.student_mobile}
                      name="student_mobile"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Alternate Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.student_alternate_mobile}
                      name="student_alternate_mobile"
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
                    />
                  </div>
                </div>
              </div>
            )}

            {show === "guardian" && <div></div>}

            {show === "parent" && (
              <div>
                <div className="font-bold text-red-500 my-5">
                  FATHER DETAILS :
                </div>
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 ">
                  <div>
                    <label className="block mb-2">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.father_fullname}
                      name="father_fullname"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      father_job<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.father_job}
                      name="father_job"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.father_mobile}
                      name="father_mobile"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Aadhar Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.father_aadhar}
                      name="father_aadhar"
                    />
                  </div>
                </div>

                {content === "Uploaded Father Image" && (
                  <div className="border flex flex-col justify-center w-[25%] mx-auto relative">
                    <img
                      className="w-36 h-36 p-2 mx-auto"
                      src={`${baseURL}${data?.[0]?.father_image}`}
                    />
                    <label className="text-sm text-gray-700 flex justify-center -mt-2 ">
                      Father Image
                    </label>
                    <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500 ">
                      <RxUpdate
                        onClick={() => setContent("Update Father Image")}
                      />
                    </div>
                  </div>
                )}
                {content === "Update Father Image" && (
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
                    <label
                      htmlFor="father_image"
                      className="flex relative flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
                    >
                      {values.father_image ? (
                        <p className="text-sm">{values.father_image.name}</p>
                      ) : (
                        <span>
                          Update Father Photo
                          <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500">
                            <RxUpdate
                              onClick={() =>
                                setContent("Uploaded Father Image")
                              }
                            />
                          </div>
                        </span>
                      )}
                    </label>
                    <input
                      id="father_image"
                      name="father_image"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                <div className="font-bold text-red-500 mb-4 mt-4">
                  MOTHER DETAILS :
                </div>
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 ">
                  <div>
                    <label className="block mb-2">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mother_fullname}
                      name="mother_fullname"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Job<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mother_job}
                      name="mother_job"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mother_mobile}
                      name="mother_mobile"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Aadhar Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mother_aadhar}
                      name="mother_aadhar"
                    />
                  </div>
                </div>
                {content1 === "Uploaded Mother Image" && (
                  <div className="border flex flex-col justify-center w-[25%] mx-auto relative">
                    <img
                      className="w-36 h-36 p-2 mx-auto"
                      src={`${baseURL}${data?.[0]?.mother_image}`}
                    />
                    <label className="text-sm text-gray-700 flex justify-center -mt-2 ">
                      Mother Image
                    </label>
                    <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500 ">
                      <RxUpdate
                        onClick={() => setContent1("Update Mother Image")}
                      />
                    </div>
                  </div>
                )}
                {content1 === "Update Mother Image" && (
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
                    <label
                      htmlFor="mother_image"
                      className="flex relative flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
                    >
                      {values.mother_image ? (
                        <p className="text-sm">{values.mother_image.name}</p>
                      ) : (
                        <span>
                          Update Mother Photo
                          <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500">
                            <RxUpdate
                              onClick={() =>
                                setContent1("Uploaded Mother Image")
                              }
                            />
                          </div>
                        </span>
                      )}
                    </label>
                    <input
                      id="mother_image"
                      name="mother_image"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            )}

            {show === "health" && (
              <div>
                <div className="font-bold text-red-500 mb-6">
                  EMMERGENCY CONATCT :
                </div>
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 ">
                  <div>
                    <label className="block mb-2">
                      Complexion<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.complexion}
                      name="complexion"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Weight (in Kg)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.weight}
                      name="weight"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Height (in cm)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.hieght}
                      name="hieght"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Mark of Identity<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.markforidentity}
                      name="markforidentity"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Clinical History<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.clinical_history}
                      name="clinical_history"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Allergic History<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.allergic_history}
                      name="allergic_history"
                    />
                  </div>
                </div>
              </div>
            )}

            {show === "qualification" && (
              <div>
                <div className="font-bold text-red-500 mb-6">
                  PREVIOUS QUALIFICATION DETAILS :
                </div>
                <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 ">
                  <div>
                    <label className="block mb-2">
                      School Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.prevous_schoolname}
                      name="prevous_schoolname"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      Qualification<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.qualification}
                      name="qualification"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      School Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.school_address}
                      name="school_address"
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
        <div className="w-full lg:w-[30%] mt-4 ">
          <div className="bg-white  flex flex-col items-center w-full shadow-md rounded-lg p-6">
            {content2 === "Uploaded Student Image" && (
              <div className=" flex flex-col justify-center w-full mx-auto relative">
                <img
                  className="w-48 rounded-full h-48 p-2 mx-auto"
                  src={`${data?.student_image}`}
                />

                <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500 ">
                  <RxUpdate
                    onClick={() => setContent2("Update Student Image")}
                  />
                </div>
              </div>
            )}
            {content2 === "Update Student Image" && (
              <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
                <label
                  htmlFor="student_image"
                  className="flex relative flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
                >
                  {values.student_image ? (
                    <p className="text-sm">{values.student_image.name}</p>
                  ) : (
                    <span>
                      Update Student Photo
                      <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500">
                        <RxUpdate
                          onClick={() => setContent2("Uploaded Student Image")}
                        />
                      </div>
                    </span>
                  )}
                </label>
                <input
                  id="student_image"
                  name="student_image"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
            <h3 className="mt-4 text-base font-medium">
              {data?.[0]?.student_firstname} {data?.[0]?.middlename}{" "}
              {data?.[0]?.Student_lastname}
            </h3>
            <span className="text-sm text-white bg-[#192b4c] rounded-sm px-3 py-1">
              {data?.[0]?.course?.course_name}
              {" , "}
              {data?.[0]?.batch?.batch_name}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 w-full bg-white  flex flex-col  shadow-md rounded-lg ">
            <h4 className="text-base font-normal text-gray-700 mb-2 border-b p-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li className="text-sm font-thin text-blue-700 cursor-pointer px-3">
                Salary detail
              </li>
              <li className="text-sm font-thin text-blue-700 cursor-pointer px-3">
                Leave Approval
              </li>
              <li className="text-sm font-thin text-blue-700 cursor-pointer px-3 pb-4">
                Time Table
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
