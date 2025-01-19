import React from 'react';


const events = [
  {
    img: 'https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-22.svg',
    text1: '2nd floor Bathroom had a broken door ',
    text: '2nd floor Bathroom had a broken door 2nd floor Bathroom had a broken door',
    time: '10 minutes',
  },
  {
    img: 'https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-29.svg',
    text1: 'A teacher has been picking on your child.',
    text: 'A teacher has been picking on your child 2nd floor Bathroom had a broken door.',
    time: '15 minutes',
  },
  {
    img: 'https://crm-admin-dashboard-template.multipurposethemes.com/images/svg-icon/color-svg/custom-28.svg',
    text1: '9A Class room Fan Not working',
    text: '9A Class room Fan Not working 2nd floor Bathroom had a broken door',
    time: '20 minutes',
  },
];

const ComplaintReport = () => {
  return (
    <div>
    <div className=" bg-white rounded-lg">
      <h2 className="text-lg font-normal mb-4 border-b p-5">Complaints Report</h2>
      <div>
        {events.map((event, index) => (
          <div key={index} className="flex items-center  p-3  rounded-lg w-[100%]">
            <div className='border flex items-center rounded-lg p-2'>
                <img
                    src={event.img}
                    alt="Network Error"
                    className='xl:w-[20%] w-20'
                />
                <div className='pl-4'>
                    <div className=' xl:flex hidden text-base text-slate-800  '>{event.text1}</div>
                    <div className='xl:hidden  text-base text-slate-800 '>{event.text}</div>
                    <div className='text-base font-normal text-slate-400'>{event.time}</div>
                </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    

      </div>
  );
};

export default ComplaintReport;
