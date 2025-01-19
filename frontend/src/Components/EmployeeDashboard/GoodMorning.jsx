import React, { useEffect, useState } from 'react'
import bg from "../../Assests/5559852.jpg"

const GoodMorning = ({selectedEmployee}) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
      const getGreeting = () => {
        const currentHour = new Date().getHours();
  
        if (currentHour < 12) {
          return 'Good Morning';
        } else if (currentHour < 18) {
          return 'Good Afternoon';
        } else {
          return 'Good Evening';
        }
      };
  
      setGreeting(getGreeting());
    }, []); 
  
  return (
    <div style={{
        backgroundImage:`url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}  className='text-white p-6 rounded-lg' >
        <h1 className='text-2xl font-bold' > {greeting} {selectedEmployee.firstname} {selectedEmployee.lastname}</h1>
        <p className='text-sm text-medium mt-1' >Have a Good Day at Work</p>

        <div className='mt-3' >
        <span className='text-sm ' >Notice: There is a staff meeting at 9 AM today,Don't forget to Attend !!!</span>
        </div>
    </div>
  )
}

export default GoodMorning