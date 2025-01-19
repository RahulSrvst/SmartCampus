import React from 'react';
import { PiChatsFill } from "react-icons/pi";
import { TiCamera } from "react-icons/ti";
import { FaPhotoFilm } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';



function StickyContent() {
  
  return (
    <div className='z-[999]'>
      <div className='fixed bottom-10 right-6 bg-yellow-500 p-2 rounded-lg'>
        <Tooltip title="Chat" arrow >
          <PiChatsFill className='text-2xl text-white' />
        </Tooltip>
      </div>

      <div className='fixed top-[42%] bg-white right-0'>
        <div className='space-y-2  rounded-l-md p-2 shadow-lg'>
          {/* Tooltip for Camera Icon */}
          <Tooltip title="Buy Now" placement="left" arrow className='!bg-white'  >
            <div>
              <TiCamera className='text-3xl bg-gray-200 p-1 px-1.5 rounded-md text-green-700' />
            </div>
          </Tooltip>
          
          {/* Tooltip for Gallery Icon */}
          <Tooltip title="Portfolio" placement="left" arrow>
            <div>
              <FaPhotoFilm className='text-3xl bg-gray-200 p-1 px-1.5 rounded-md text-red-500' />
            </div>
          </Tooltip>
          
          {/* Tooltip for Chat Icon */}
          <Tooltip title="Live Chat" placement="left" arrow >
            <div>
              <PiChatsFill className='text-3xl bg-gray-200 p-1 px-1.5 rounded-md text-yellow-400' />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default StickyContent;
