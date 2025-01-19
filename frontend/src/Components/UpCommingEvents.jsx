import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import "./Navbar.css";


const events = [
  {
    date: '23',
    month: 'MAR',
    title: 'Sport Events',
    description: 'Vivamus pulvinar mauris eu placerat Vivamus pulvinar mauris eu placerat.',
    location: '123 6th St. Melbourne, FL 32904',
  },
  {
    date: '16',
    month: 'JAN',
    title: 'Conference',
    description: 'Curabitur vel malesuada tortor Vivamus pulvinar mauris eu placerat.',
    location: '123 6th St. Melbourne, FL 32904',
  },
  {
    date: '8',
    month: 'DEC',
    title: 'Annual Celebration',
    description: 'Sed convallis dignissim magna Vivamus pulvinar mauris eu placerat.',
    location: '123 6th St. Melbourne, FL 32904',
  },
];

const UpcomingEvents = () => {
  return (
    <div>
    <div className=" bg-white rounded-lg shadow ">
      <h2 className="text-lg font-normal mb-3 border-b p-5">Upcoming Events</h2>
      <div>
        {events.map((event, index) => (
          <div key={index} className="flex items-center mb-2 pb-2 p-5   rounded-lg">
            <div className="mr-4 border border-purple rounded-sm  text-center w-16">
              <div className="text-lg font-bold bg-purple text-white px-2">{event.month}</div>
              <div className="text-lg font-bold icon-purple">{event.date}</div>
              
            </div>
            <div className="flex-1 ml-3">
            <div className="text-base font-normal ">{event.title}</div>
              <p className="text-gray-600 text-sm truncate md:w-[40vw] lg:w-[52vw] w-[60vw] xl:w-[18vw] ">{event.description}</p>
              <p className="text-gray-500 text-sm flex"><CiLocationOn className='mt-1 icon-purple'/>
              {event.location}</p>
            </div>
          </div>
        ))}
      </div>
      <button className=" px-4 py-3 bg-slate-200 icon-purple rounded-md hover:bg-purple-700 hover:text-white w-full -z-0 ">
        More Events &raquo;
      </button>
      
    </div>
    

      </div>
  );
};

export default UpcomingEvents;
