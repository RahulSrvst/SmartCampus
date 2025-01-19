import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";

const DriverDetails = () => {

  const [data , setData] = useState();


  const {id} = useParams();

  console.log(id);


   const fetchDriverDetails= async()=>{

    const token = localStorage.getItem("token");


    try{
      const response = await axios.get(baseURL + API_URLS.AddDriver, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        params:{
          driver_id:id,
        }
      });
      if (response.status === 200) {
        // console.log(`Fetched Driver Data of id ${id}:`, response.data.data);
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
        <span className="font-medium">Driver Details</span>
      </div>

      {/* Driver Details Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-[98%] ">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Driver Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <span className="font-bold w-1/3">Name:</span>
            <span>{data?.[0].name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Date of Birth:</span>
            <span>{data?.[0].birthdate}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Present Address:</span>
            <span>{data?.[0].present_address}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Vehicle Number:</span>
            <span>{data?.[0].vehicle_no}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Permanent Address:</span>
            <span>{data?.[0].permanent_address}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">License No.:</span>
            <span>{data?.[0].license_no}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold w-1/3">Phone:</span>
            <span>{data?.[0].phone}</span>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      
      
    </div>
  );
};

export default DriverDetails;
