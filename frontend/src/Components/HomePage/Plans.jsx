import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import Header from './Header';
import { CiFacebook } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function Plan() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <div className="flex items-center  p-4 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="relative w-100 h-100">
              <img
                src="https://bharaterp.org/support-service.webp"
                alt="Services"
                className="w-full h-full object-cover rounded-lg"
                onClick={() => navigate("/Services")}
              />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <SettingsIcon fontSize="medium" />
              <h3 className="text-lg font-semibold text-center">Services</h3>
            </div>
          </div>

          {/* Service 2 */}
          <div className="relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="relative w-100 h-100">
              <img
                src="https://bharaterp.org/inventory-product-1.webp"
                alt="Inventory"
                className="w-full h-full object-cover rounded-lg"
                onClick={() => navigate("/Inventory")}
              />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <ListIcon fontSize="large" />
              <h3 className="text-lg font-semibold text-center">Inventory</h3>
            </div>
          </div>

          {/* Service 3 */}
          <div className="relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="relative w-100 h-100">
              <img
                src="https://bharaterp.org/product-Grocery.webp"
                alt="Service + Inventory"
                className="w-full h-full object-cover rounded-lg"
                onClick={() => navigate("/Service+Inventory")}
              />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-center">Service + Inventory</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer Image */}
      <div className="pt-20">
        <img
          src="https://aaraerp.s3.ap-south-1.amazonaws.com/1713432389409/SubFooter.webp"
          alt="Not Loaded"
          className="w-full h-auto"
        />
      </div>

      {/* Social Media Links */}
      <div className="flex justify-between h-10 items-center mx-6">
        <div>Join our social media pages to stay in touch:</div>
        <div className="flex text-2xl space-x-2">
          <CiFacebook />
          <FaGooglePlusG />
          <CiInstagram />
          <CiLinkedin />
        </div>
      </div>
    </div>
  );
}

export default Plan;
