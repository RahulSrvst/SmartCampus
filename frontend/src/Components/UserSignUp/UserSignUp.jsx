
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Vortex } from "react-loader-spinner";
import { baseURL } from "../Configs/axios";
import { API_URLS } from "../Configs/urls";
import  image from "../../Assests/bg-1.jpeg"
import { CiLock, CiUnlock, CiUser } from "react-icons/ci";
import { IoLockClosed } from "react-icons/io5";
import b1 from "../../Assests/profile1.png"

function UserSignUp() {
  const navigate = useNavigate();
  const [erpId, setErpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lock, setLock] = useState(true);
  const [loader, setLoader] = useState(false);

  const lockchangeHandler = () => {
    setLock(!lock);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch(baseURL + API_URLS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 6d1e22f7f6f570e556706fd9afffded39846b5cf",
        },
        body: JSON.stringify({
          email: erpId,
          password,
        }),
      });

      const result = await response.json();
      console.log("The Account Data is", result);
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user_type", result.user_type);
        localStorage.setItem("id", result.id);
        if(result.user_type === "employee"){
          localStorage.setItem("employee_id",result.employee_id)
        }
        if(result.user_type === "student"){
          localStorage.setItem("student_id",result.student_id)
        }
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(result.message || "Invalid ERP ID or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div
       style={{
        backgroundImage: `url(${image})`, 
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex justify-center items-center px-4 relative"
    >
      {/* Loader */}
      {loader && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      )}

      {/* Login Form */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-md bg-white border rounded-lg flex flex-col items-center py-5 px-6 md:px-3 custom-shadow z-10 relative">
     
        <div className="flex justify-center mb-2">
          <img
            src={b1}
            alt=" Logo"
            className="h-40 w-80 object-contain"
          />
        </div>

        
        
        <h1 className="-mt-10 text-base mb-6 text-[#7047ee] text-center">
          Sign in to continue to CRMi
        </h1>

        <form
          className="  sm:w-[110%] px-4 sm:px-6 md:px-8 lg:px-10"
          onSubmit={handleLogin}
        >
          <div className="flex border border-gray-500 w-full   rounded-md outline-none " >

            <div><CiUser className="text-2xl w-[40px] flex justify-center items-center   mt-1.5" /></div>
            <div>
            <input
                type="text"
                placeholder="Username"
                className="py-1.5 border-l pl-3 border-gray-500 rounded-r-md !outline-none placeholder:text-[15px] placeholder:text-gray-500"
                value={erpId}
                onChange={(e) => setErpId(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6">

            <div className="flex border border-gray-500 w-full  md:pr-10 rounded-md outline-none" >{lock ? (
              <CiLock
                  className="text-2xl w-[40px] flex justify-center items-center   mt-1.5"
                  onClick={lockchangeHandler}
                />
              ) : (
                <CiUnlock
                  className="text-2xl w-[40px] flex justify-center items-center   mt-1.5"
                  onClick={lockchangeHandler}
                />)}
            
            <input
                type={`${lock ? "password" : "text"}`}
                placeholder="Password"
                className="py-1.5 border-l pl-3 border-gray-500 rounded-r-md  !outline-none placeholder:text-[15px] placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className=" flex justify-end items-center text-base  mt-2 mr-1">
          <IoLockClosed className="text-base text-[#0b1b38] mr-1 text-end  hover:text-yellow-500"/> 
            <span className="text-[#192b4c] mt-0.5 font-normal hover:text-yellow-500 text-sm cursor-pointer hover:underline">
            Forgot pwd?
            </span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-700 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-600 rounded-xl text-[15px]"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm pt-5 text-gray-600">
          Don't have an account?{" "}
          <button className="text-sm text-yellow-500" onClick={()=>navigate("/signup")} >Sign Up</button>
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;
