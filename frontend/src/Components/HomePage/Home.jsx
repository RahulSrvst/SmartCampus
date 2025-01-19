import React from 'react'
import Header from './Header'
import Plan from './Plans';
import PricingPlan from './Services';
import Footer from './Footer';

const Home = () => {
    const services = [
        {
          title: "Smart-POS",
          description: "Quick and easy billing with Smart-POS! Scan, and generate bills with ease!",
          img: "https://pub-dd92b94041b245f2b574511ea9df9444.r2.dev/ezyzip-images/account.webp",
        },
        {
          title: "Reliable CRM",
          description: "Effortlessly manage your customer data and drive sales growth with our reliable CRM platform!",
          img: "https://pub-dd92b94041b245f2b574511ea9df9444.r2.dev/ezyzip-images/crm.webp",
        },
        {
          title: "Reliable HR",
          description: "Effortlessly manage your customer data and drive sales growth with our reliable HR platform!",
          img: "https://pub-dd92b94041b245f2b574511ea9df9444.r2.dev/ezyzip-images/hrm.webp",
        },
        {
          title: "All-In-One-ERP",
          description: "Use a single ERP to manage all aspects of retail and e-commerce flawlessly.",
          img: "https://pub-dd92b94041b245f2b574511ea9df9444.r2.dev/ezyzip-images/erp.webp",
        },
      ];
    
  return (
    <div>
        <div>
        <Header/>
        </div>

        <div className=' lg:mt-24 mt-20' ></div>
        

        <div>
            <img className='h-[85vh]  lg:flex hidden ' src='https://aaraerp.s3.ap-south-1.amazonaws.com/1713432389409/Slider1.webp' alt='pic' />
        </div>

        <div className=" bg-white flex items-center justify-center p-4  ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative lg:h-[80%] rounded-md overflow-hidden shadow-lg group"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full opacity-60  object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 text-white">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-sm mt-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div>
    <div className="flex flex-col items-center bg-gray-50 p-6">
      {/* Title and Subtitle */}
      <h1 className="text-3xl font-bold text-center mt-6">Cloud based POS billing software</h1>
      <p className="text-lg text-center mt-2">
        Super-fast POS Billing, Acquire New Customers, Sell More & Save More
      </p>

      <div className=" grid grid-cols-1 lg:grid-cols-2 mt-10 gap-8">
        {/* Left Section with Feature Cards */}
        <div className="flex flex-col gap-4 my-auto ">
          {/* M-POS System Card */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-md flex items-start space-x-4">
            <span className="text-2xl">📟</span>
            <div>
              <h2 className="font-semibold text-xl">M-POS System</h2>
              <p className="text-sm mt-1">
                Upgrade your sales process with our MPOS system - modern, intelligent, and real-time insights to boost your business with Cloud based pos billing software.
              </p>
            </div>
          </div>

          {/* Omnichannel E-Commerce Solution Card */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-md flex items-start space-x-4">
            <span className="text-2xl">🛍️</span>
            <div>
              <h2 className="font-semibold text-xl">Omnichannel E-Commerce Solution</h2>
              <p className="text-sm mt-1">
                Manage offline and online orders, inventory, and customer data all in one place, streamlining your e-commerce operations with accuracy.
              </p>
            </div>
          </div>

          {/* Smart Retail Solution Card */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-md flex items-start space-x-4">
            <span className="text-2xl">🏬</span>
            <div>
              <h2 className="font-semibold text-xl">Smart Retail Solution</h2>
              <p className="text-sm mt-1">
                Enhance your retail experience with bharaterp's smart retail solution. Make your store contactless kiosk and smart cart features make shopping easy and convenient with Cloud based pos billing software.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section with CRM Image */}
        <div >
          <img
            src="https://bharaterp.org/static/media/banner2.1fa0f339c5e69c7dd59d.webp"
            alt="CRM Illustration"
            className="w-full h-[70vh] rounded-lg shadow-lg"
          />
          {/* Add text labels as absolute positioned elements if needed */}
         
        </div>
      </div>
    </div>
    </div>

    <div>
    <Footer/>
    </div>
   

    </div>
  )
}

export default Home