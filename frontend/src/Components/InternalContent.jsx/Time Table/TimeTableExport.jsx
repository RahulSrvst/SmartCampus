// Import React
import React from 'react';
import { FaHome } from 'react-icons/fa';

function ProfileCard({ name, role, address, phone, imgSrc }) {
  return (
    <div className='' >
      <div className=' p-4 rounded-lg shadow-lg flex flex-col items-center text-center bg-white'>
      <img src={imgSrc} alt={name} className="w-24 h-24 rounded-full mb-4" />
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-blue-600 font-semibold">{role}</p>
      <p className="text-sm text-gray-600">{address}</p>
      <p className="text-sm text-gray-600 flex items-center justify-center mt-2">
        <span className="mr-1">📞</span>{phone}
      </p>
    </div>
    </div>
  );
}

function TimeTableExport() {
  const profiles = [
    {
      name: 'Johnathan Doe',
      role: 'HOD',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/1.jpg',
    },
    {
      name: 'Jane Doe',
      role: 'Professor',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/2.jpg',
    },
    {
      name: 'Jim Smith',
      role: 'Asst. Professor',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/3.jpg',
    },{
      name: 'Johnathan Doe',
      role: 'HOD',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/1.jpg',
    },
    {
      name: 'Jane Doe',
      role: 'Professor',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/2.jpg',
    },
    {
      name: 'Jim Smith',
      role: 'Asst. Professor',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/3.jpg',
    },{
      name: 'Johnathan Doe',
      role: 'HOD',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/1.jpg',
    },
    {
      name: 'Jane Doe',
      role: 'Professor',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/2.jpg',
    },
    {
      name: 'Jim Smith',
      role: 'Asst. Professor',
      address: 'Po Box 453, Seaboard, NC, 27876',
      phone: '(021) 123-4215',
      imgSrc: 'https://eduerp.bharaterp.org/college-erp/assets/images/avatar/3.jpg',
    },
    // Add more profiles here as needed
  ];

  return (
    <div className='ml-[1%] md:ml-[41%] lg:ml-[31%] xl:ml-[21%] xl:mt-[8%] lg:mt-[10%] md:mt-[15%] mt-[35%] pb-20' >
    <div className="flex items-center gap-2 md:gap-5 lg:text-lg text-sm mb-3 md:mb-8 ml-5  ">
        <span className="text-[20px]">Academic</span> <span className="text-blue-900 flex items-center text-[14px] mt-0.5" ><FaHome className="text-blue-900 w-4 h-4 mr-2" /> -  Time Table</span><span className="text-[14px]  mt-0.5" > - Time Table Export </span>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6  ">
    
      {profiles.map((profile, index) => (
        <ProfileCard 
          key={index}
          name={profile.name}
          role={profile.role}
          address={profile.address}
          phone={profile.phone}
          imgSrc={profile.imgSrc}
        />
      ))}
    </div>
    </div>
  );
}

export default TimeTableExport;
