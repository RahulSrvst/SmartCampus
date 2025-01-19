import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import "./Footer.css";
import b1 from "../../Assests/profile1.png"



const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="container  flex flex-col lg:flex-row items-center justify-start gap-5  lg:ml-5 ">
        {/* Logo and Tagline */}
        <div className="">
          <div className='flex justify-center' ><img src={b1} alt='error' className='lg:h-48 h-36 w-56 ' /></div>
          <p className="">
         
          <TypeAnimation className=' lg:flex hidden text-gray-700 lg:text-2xl xl:text-5xl'
      sequence={[
        // Same substring at the start will only be typed out once, initially
        ' Streamline Your Business ',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        ' Streamline Your Business ',
        1000,
        ' Streamline Your Business ',
        1000,
        ' Streamline Your Business ',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{display: 'inline-block' }}
      
      repeat={Infinity}
    />
          
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Products */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-800 font-semibold mb-2">PRODUCTS</h3>
           <div className='grid grid-cols-2' >
           <ul className="text-gray-600 space-y-1">
              <li>SmartCampus POS</li>
              <li>SmartCampus CRM</li>
              <li>SmartCampus ERP</li>
              <li>SmartCampus HRM</li>
            </ul>
            <ul className='text-gray-600 space-y-1' >
            <li>Delivery Partner</li>
              <li>Support</li>
              <li>Multi Vendor</li>
              <li>Multi Store</li>
            </ul>
           </div>
          </div>

          {/* Useful Links */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-800 font-semibold mb-2">USEFUL LINKS</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Blog</li>
              <li>News</li>
              <li>Store</li>
              <li>Reseller</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left pb-20 ">
            <h3 className="text-gray-800 font-semibold mb-2">CONTACT</h3>
            <ul className="text-gray-600 space-y-1">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span><MdEmail/></span>
                <span>info@smartcampus.org</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span><FaPhoneAlt/></span>
                <span>+91 9569317491</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
              <span><FaPhoneAlt/></span>
                <span>+91 9569317491</span>
              </li>
              <li>Become a partner</li>
            </ul>
          </div>
        </div>
      </div>

      <div className=' md:relative  hidden' >
        <img src='https://pub-dd92b94041b245f2b574511ea9df9444.r2.dev/ezyzip-images/roadandstores.webp' alt='Error ' className='h-full w-full object-contain' />
        <div>
          <img src='https://bhaaraterp.s3.ap-south-1.amazonaws.com/anim2.png' className='h-20 absolute bottom-5 left-5 anim-left-to-right ' />
        </div>
        <div>
          <img src='https://bhaaraterp.s3.ap-south-1.amazonaws.com/anim1.png' className='h-20 absolute bottom-0 right-5 anim-right-to-left ' />
        </div>
      </div>

      <div className='flex text-sm md:text-base justify-center md:items-center md:h-10' >
        <span>©2024 Copyright : SmartCampus ERP- All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
