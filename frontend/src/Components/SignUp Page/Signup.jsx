import React from "react";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import { CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";

function Signup() {
  const { state } = useLocation();

  console.log(state)

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    selected_plan: state?.id || "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    college: "",
    logo: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const fd = new FormData();
        for (const [key, value] of Object.entries(values)) {
          fd.append(key, value);
        }
        const token = "Token 6d1e22f7f6f570e556706fd9afffded39846b5cf";

        const response = await fetch(baseURL + API_URLS.createCollge, {
          method: "POST",
          body: fd,
          headers: {
            Authorization: token,
          },
        });

        const result = await response.json();
        console.log("The result is", result);

        if (result.success) {
          toast.success(result?.message);
          navigate("/login");

          // Reset the form only after a successful submission
          resetForm();
        } else {
          toast.error(result.message || "Registration failed.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
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
    <div>
      <div>
        <Header />
      </div>

      <div className="mt-20"></div>
      <div className="lg:flex justify-center md:p-10">
        <div className="w-full p-1  h-full bg-white rounded-r-md shadow-md lg:hidden flex flex-col space-y-6">
          <div className="py-10 bg-slate-600">
            <h3 className="text-lg font-medium text-white text-center">
              Your gateway to accelerated growth
            </h3>
          </div>
          <div className="text-center border-b pb-8">
            <img
              src="https://alignbooks.com/assets/images/svg/free_t-1.svg"
              alt="Training"
              className=" h-20 mx-auto pl-5 "
            />
            <p className="font-medium text-blue-600">
              Free Training and Support
            </p>
          </div>
          <div className="text-center  border-b pb-8">
            <img
              src="https://alignbooks.com/assets/images/svg/free_t-2.svg"
              alt="Access Anywhere"
              className="mx-auto h-20"
            />
            <p className="font-medium text-blue-600">
              Access From Anywhere Anytime
            </p>
          </div>
          <div className="text-center  border-b pb-8">
            <img
              src="https://alignbooks.com/assets/images/svg/free_t-3.svg"
              alt="Mobile App"
              className="mx-auto h-20"
            />
            <p className="font-medium text-blue-600">Free Mobile App</p>
          </div>
        </div>

        <div className="w-full max-w-7xl flex">
          <div className=" w-full lg:w-2/3 bg-white p-8 rounded-l-md shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder=""
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder=""
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    placeholder=""
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selected Plan
                  </label>
                  <div
                    className={`mt-1 w-full h-11 p-2 rounded-md text-center flex items-center justify-center
      ${
        state?.plan_name
          ? "bg-gradient-to-r from-purple-200 to-sky-200 text-black font-medium shadow-lg"
          : "bg-gray-200 text-gray-500 border border-gray-300"
      }`}
                  >
                    {state?.plan_name || "Not Selected Any Plan"}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    College
                  </label>
                  <input
                    type="text"
                    name="college"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.college}
                    placeholder=""
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      placeholder=""
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  >
                    <option>Select Country</option>
                    <option>India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <select
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  >
                    <option>Select State</option>
                    <option>UP</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <select
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  >
                    <option>Select City</option>
                    <option>Lucknow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pincode}
                    placeholder=""
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md pb-2">
                <label
                  htmlFor="logo"
                  className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
                >
                  {values.logo ? (
                    <p className="text-sm">{values.logo.name}</p>
                  ) : (
                    <span>Upload College Logo</span>
                  )}
                </label>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-700 to-blue-900 hover:bg-purple-700 text-white font-semibold py-2 rounded-md mt-4"
              >
                Register
              </button>

              <p className="text-center text-sm text-gray-600 pt-5">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 font-semibold">
                  Login here
                </a>
              </p>
            </form>
          </div>

          <div className="w-1/3 p-1  h-full bg-white rounded-r-md shadow-md hidden lg:flex flex-col space-y-6">
            <div className="py-10 bg-slate-600">
              <h3 className="text-lg font-medium text-white text-center">
                Your gateway to accelerated growth
              </h3>
            </div>
            <div className="text-center border-b pb-8">
              <img
                src="https://alignbooks.com/assets/images/svg/free_t-1.svg"
                alt="Training"
                className=" h-20 mx-auto pl-5 "
              />
              <p className="font-medium text-blue-600">
                Free Training and Support
              </p>
            </div>
            <div className="text-center  border-b pb-8">
              <img
                src="https://alignbooks.com/assets/images/svg/free_t-2.svg"
                alt="Access Anywhere"
                className="mx-auto h-20"
              />
              <p className="font-medium text-blue-600">
                Access From Anywhere Anytime
              </p>
            </div>
            <div className="text-center  border-b pb-8">
              <img
                src="https://alignbooks.com/assets/images/svg/free_t-3.svg"
                alt="Mobile App"
                className="mx-auto h-20"
              />
              <p className="font-medium text-blue-600">Free Mobile App</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <img
          src="https://aaraerp.s3.ap-south-1.amazonaws.com/1713432389409/SubFooter.webp"
          alt="Not Loaded"
        />
      </div>

      <div className="flex justify-between h-10 items-center mx-6">
        <div>Join our social media pages to stay in touch:</div>
        <div className="flex text-2xl space-x-2">
          <CiFacebook />
          <FaGooglePlusG />
          <CiInstagram />
          <CiLinkedin />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
