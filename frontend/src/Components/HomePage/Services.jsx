import React, { useEffect, useState } from "react";
import { IoCheckboxOutline, IoShareSocial } from "react-icons/io5";
import Header from "./Header";
import { CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { API_URLS } from "../Configs/urls";
import { baseURL } from "../Configs/axios";
import b1 from "../../Assests/profile1.png"
import toast from "react-hot-toast";

function PricingPlan() {
  const [loader, setloader] = useState(false);
  const [plans, setplans] = useState();


  const [activeButton, setActiveButton] = useState("Monthly");

  const FetchData = async () => {
    try {
      setloader(true);
      const res = await axios.get(baseURL + API_URLS.planApi, {
        headers: {
          Authorization: "Token e58ee614dc5e54128aa14c5263f2bf3fe70952a4",
        },
      });
      setplans(res.data.data);
      console.log(res)
    } catch (e) {
      console.log(e);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
  

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);

  const handlePayment = async (id,amount,name) => {
    try {
      setLoading(true);
  
      // Make API call to create the order
      const response = await fetch("http://localhost:8020/auth/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id:id,
          amount:amount,
        }),
      });
  
      const data = await response.json();
      console.log(data); // Log the response for debugging
  
      // Check if the order creation was successful
      if (data && data.id && data.status === "created") {
        const options = {
          key: "rzp_test_BBCrEaYWinD5Uu",  // Your Razorpay Key ID
          amount: data.amount,  // Order amount in paise
          currency: data.currency,
          order_id: data.id,  // Use the correct order ID
          handler: function (response) {
            // Send payment verification to backend
            fetch("http://localhost:8020/auth/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: data.id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })
              .then((verifyResponse) => verifyResponse.json())
              .then((verifyData) => {
                if (verifyData.success) {
                  toast.success("Payment Successful Completed!");
                  navigate("/signup",{state:{
                    id:id,
                    plan_name:name,
                  }})
                } else {
                  toast.error("Payment verification failed!");
                }
              })
              .catch((verifyError) => {
                console.error("Payment verification failed:", verifyError);
                alert("Payment verification failed due to an error.");
              });
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Order creation failed!");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-hidden">
      {loader && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[999] flex justify-center items-center  bg-opacity-50 ">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      )}

      <Header />

      <div className="pt-28"></div>

      <div className="flex justify-center mt-3">
        <span className="text-[rgb(147,28,159)] text-2xl font-medium">
          Choose Your Plan
        </span>
      </div>

      <div className="flex justify-center text-xs py-3">
        <div className="p-0.5 bg-gray-300 rounded-l-lg ">
          <button
            className={`px-10 py-2 rounded-lg ${
              activeButton === "Monthly"
                ? "bg-white text-gray-600"
                : "bg-gray-300 text-white"
            }
          `}
            onClick={() => setActiveButton("Monthly")}
          >
            Monthly
          </button>
        </div>
        <div className="p-0.5 bg-gray-300 rounded-r-lg ">
          <button
            className={`px-10 py-2 rounded-lg ${
              activeButton === "Yearly"
                ? "bg-white text-gray-600"
                : "bg-gray-300 text-white"
            }
          `}
            onClick={() => setActiveButton("Yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-gray-100 flex justify-center p-4">
        <div className="grid grid-cols-1 h-full sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg h-full shadow-md p-6 w-[350px]"
            >
              <div className="text-center">
                <div className="flex justify-end text-2xl text-gray-600">
                  <IoShareSocial />
                </div>
                <img
                  src={b1}
                  alt="Bharat ERP Logo"
                  className="mx-auto h-32 w-36"
                />
                <h3 className="text-xl font-medium mt-2 text-[rgb(147,28,159)]">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold mt-2">₹{activeButton === "Monthly" ? plan?.price : plan?.price*12}</p>
                <p className="text-gray-600 text-sm">User/{activeButton === "Monthly" ? "Monthly" :"Yearly"}</p>

                <div>
                  <ul className="mt-4 mb-6 space-y-1 text-gray-700 ">
                    {plan?.feature?.map((features, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between  space-y-2"
                      >
                        <span className="text-[15px] text-start" >{features}</span>
                        
                          <div>
                          <IoCheckboxOutline className="text-clip text-[20px] -mt-2  text-white  bg-gradient-to-r from-[rgb(147,28,159)] to-blue-400" />
                          </div>
                          
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-[#cea0f9] via-[#6c6cdf] to-[#4810d3]  text-[15px]   text-white py-2 px-4 rounded-3xl hover:bg-[rgb(147,28,159)]">
                  See More
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-[#FF5733] via-[#FF1493] to-[#C71585]  text-white px-3 py-1 rounded-3xl text-[15px] hover:opacity-80 transition whitespace-nowrap "
                  onClick={()=>handlePayment(plan?._id,(activeButton === "Monthly" ? plan.price :plan.price*12),plan?.name)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="pt-20">
        <img
          src="https://aaraerp.s3.ap-south-1.amazonaws.com/1713432389409/SubFooter.webp"
          alt="Not Loaded"
        />
      </div>

      {/* Social Media Links */}
      <div className="flex justify-between h-20 bg-green-50 items-center px-6">
        <div>Join our social media pages to stay in touch:</div>
        <div className="flex text-2xl space-x-2">
          <CiFacebook />
          <FaGooglePlusG />
          <CiInstagram />
          <CiLinkedin />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PricingPlan;
