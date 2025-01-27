import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const StudentAdmission = () => {
  const [courseData, setCourseData] = useState();
  const [BatchData, setBatchData] = useState();
  const [selectedBatchName, setSelectedBatchName] = useState();
  const [id, setId] = useState();
  const [Course_id, setCourse_id] = useState();
  const [Batch_id, setBatch_id] = useState();

  const [submittingLoader, setSubmittingLoader] = useState(false);


  const initialValues = {
    Academicyear: "",
    st_id: "",
    admission_number: "",
    joindate: "",
    rollnumber: "",
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
    user_type: 19,
    course: "",
    batch: Batch_id,
  };

  const fetchDatas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(baseURL + API_URLS.course, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setCourseData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBatchDatas = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        baseURL+API_URLS.batch,
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
      setBatchData(response.data.data);
    } catch (e) {
      console.error("Error fetching batch data: ", e);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

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

  function handleId(id) {
    setId(id);
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
      console.log(values);
      const formData = new FormData();

      // Append all form values to FormData
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }

      try {
        setSubmittingLoader(true);
        const token = localStorage.getItem("token");
        const response = await axios.post(
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
            response.data.message || "Student registration was successful!";
          toast.success(message);
          resetForm();
          // console.log(response);
        } else {
          toast.error("Failed to add employee:", response);
        }
      } catch (error) {
        toast.error("Error submitting form:", error);
      } finally {
        setSubmittingLoader(false);
      }
    },
  });

  // const handleFileChange = (event) => {
  //   const { name, files } = event.target;
  //   if (files.length > 0) {
  //     const selectedFile = files[0];
  //     setFieldValue(name, selectedFile);
  //   }
  // };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFieldValue(name, selectedFile);
    }
  };

  return (
    <div className="xl:ml-[21.5%] lg:ml-[31.5%] md:ml-[41%] xl:mt-[5%] lg:mt-[7%] sm:mt-[12%] mt-[33%]  p-5  sm:p-5">
      <div className="flex items-center lg:gap-3 gap-1 lg:text-base text-sm md:mb-4 mb-3">
        Students
        <FaHome className="text-blue-900 w-4 h-4" />- Student Admission
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white shadow-md rounded-lg w-full lg:w-[100%] xl:h-[25%]">
          <div className="flex justify-between text-lg font-bold mb-4 dark-color text-white p-5 rounded-t-lg">
            <h2>Students Admission</h2>
            <BsThreeDotsVertical />
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <div className="font-bold text-red-500 mb-6">OFFICIAL DETAILS:</div>

            <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {/* Official Detail Fields */}
              <div>
                <label className="block mb-2">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Academicyear}
                  name="Academicyear"
                  placeholder=""
                />
              </div>
              {/* <div>
                <label className="block mb-2">
                  Unique Id<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.st_id}
                  name="st_id"
                  placeholder=""
                  
                />
              </div> */}
              <div>
                <label className="block mb-2">
                  Admission No.<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.admission_number}
                  name="admission_number"
                  placeholder=""
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
                  value={values.joindate}
                  name="joindate"
                  placeholder=""
                />
              </div>

              <div></div>
            </div>

            {/* Official Detail 2nd Row */}
            <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 border-b pb-6">
              <div>
                <label className="block mb-2">
                  Course<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mb-4 py-2 pr-2 border border-gray-300 rounded"
                  name="course"
                  onChange={(e) => {
                    const selectedCourseId =
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "data-id"
                      );
                    handleId(selectedCourseId); // Set ID in your state
                    handleCourseId(selectedCourseId); // Update course ID
                    setFieldValue("course", selectedCourseId); // Update Formik value
                  }}
                >
                  <option value="">Please Select</option>
                  {courseData?.map((item) => (
                    <option
                      key={item._id}
                      value={item.course_name}
                      data-id={item._id}
                    >
                      {item.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  Batch<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  name="batch"
                  onChange={(e) => {
                    const selectedBatchId =
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "data-id"
                      );
                    setFieldValue("batch",selectedBatchId);
                    handleBatchId(selectedBatchId); 
                  }}
                >
                  <option value="">Please Select</option>
                  {Array.isArray(BatchData) && BatchData.length > 0 ? (
                    BatchData.map((item) => (
                      <option
                        key={item._id}
                        value={item.batch_name}
                        data-id={item._id}
                      >
                        {item.batch_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Batches Available</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block mb-2">
                  Roll No.
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rollnumber}
                  name="rollnumber"
                />
              </div>
            </div>

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

            <div className="font-bold text-red-500 mb-6">CONTACT DETAILS :</div>
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

            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
              <label
                htmlFor="student_image"
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
              >
                {values.student_image ? (
                  <p className="text-sm">{values.student_image.name}</p>
                ) : (
                  <span>Upload Student Photo</span>
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

            <div className="font-bold text-red-500 my-5">FATHER DETAILS :</div>
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
            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
              <label
                htmlFor="father_image"
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
              >
                {values.father_image ? (
                  <p className="text-sm">{values.father_image.name}</p>
                ) : (
                  <span>Upload Father Photo</span>
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
            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
              <label
                htmlFor="mother_image"
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
              >
                {values.mother_image ? (
                  <p className="text-sm">{values.mother_image.name}</p>
                ) : (
                  <span>Upload Mother Photo</span>
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

            <div className="font-bold text-red-500 my-5">
              STUDENT HEALTH RECORD:
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

            <div className="font-bold text-red-500 mb-6">
              EMMERGENCY CONATCT :
            </div>
            <div className="grid grid-cols-1 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 ">
              <div>
                <label className="block mb-2">
                  Contact Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emergency_contact_name}
                  name="emergency_contact_name"
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
                  value={values.emergency_mobile}
                  name="emergency_mobile"
                />
              </div>
            </div>

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

            <div className="p-4">
              <h3 className="text-red-600 font-bold mb-4">
                DOCUMENT TO BE SUBMITTED:
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 text-sm text-gray-600 gap-y-4 gap-x-6">
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
              <div className="grid grid-cols-2 lg:grid-cols-5 text-sm text-gray-600 gap-y-4 gap-x-6">
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
                    checked={values.hostel} // Use checked instead of value
                    name="hostel"
                  />
                  <span>Hostel</span>
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
                hieght="96"
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

export default StudentAdmission;
