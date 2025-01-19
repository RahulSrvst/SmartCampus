import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";
const VehicleDetails = () => {


  const [data , setData] = useState();


  const {id} = useParams();

  console.log(id);


   const fetchDriverDetails= async()=>{

    const token = localStorage.getItem("token");


    try{
      const response = await axios.get(baseURL + API_URLS.AddVehciles,  {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        params:{
          vehicle_id:id,
        }
      });
      if (response.status === 200) {
       
        setData(response.data.data);
      }

    }catch(e){
      console.log(e);
    }
   }

   useEffect(()=>{
    fetchDriverDetails();
   },[])





  return (
    <div className="ml-[5%] md:ml-[43%] lg:ml-[35%] xl:ml-[23%] xl:mt-[7%] md:mt-[15%] mt-[34%]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Transport</span>
        <span className="text-blue-900">/</span>
        <span className="font-medium">Vehicle Details</span>
      </div>

      {/* Driver Details Card */}
      <div className="bg-white shadow-md rounded-lg pb-6 w-[98%] ">
        <h2 className="text-lg font-normal border-b p-4 pb-5 text-gray-800 mb-4">Vehicle Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 text-sm text-gray-700">
          <div className="flex items-center">
            <span className="font-bold w-1/3">Vehicle No:</span>
            <span>{data?.[0]?.vehicle_no}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Licience No:</span>
            <span>{data?.[0]?.license_no}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-1/3">Vehicle Type:</span>
            <span>{data?.[0]?.vehicle_type}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">No of Seat:</span>
            <span>{data?.[0]?.no_of_seats}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Contact Person:</span>
            <span>{data?.[0]?.mobile}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Maximum Allowed:</span>
            <span>{data?.[0]?.maximum_allowed}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-1/3">Track Id:</span>
            <span>{data?.[0]?.trac_id}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-10 whitespace-nowrap">Insurance Renewal Date:</span>
            <span>{data?.[0]?.renewal_date}</span>
          </div>
          
        </div>
      </div>

      {/* Floating Action Buttons */}
      

      <div className="bg-white mt-5 shadow-md rounded-lg  w-[98%] ">
        <h2 className="text-lg font-normal border-b p-4 pb-5 text-gray-800 mb-4">Insurance Certificate</h2>
        <img src={`${baseURL}${data?.[0]?.insurance_certificate}`} className="w-[800px] h-[800px]  mx-auto"  />
      </div>
      
      
      <div className="bg-white mt-5 shadow-md rounded-lg  w-[98%] ">
        <h2 className="text-lg font-normal border-b p-4 pb-5 text-gray-800 mb-4">Pollution Certificate</h2>
        <img src={`${baseURL}${data?.[0]?.pollution_certificate}`} className="w-[800px] h-[800px] mx-auto"  />
      </div>
      
      
      <div className="bg-white mt-5 shadow-md rounded-lg  w-[98%] ">
        <h2 className="text-lg font-normal border-b p-4 pb-5 text-gray-800 mb-4">Registration Certificate</h2>
        <img src={`${baseURL}${data?.[0]?.registration_certificate}`} className="w-[800px] h-[800px] mx-auto "    />
      </div>
      
    </div>
  );
};

export default VehicleDetails;
