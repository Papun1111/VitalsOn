import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import assets from '../../assets/assets';

const DoctorAppointment = () => {
  const { getAppointments, dtoken, appointments,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="p-4 w-full max-w-6xl bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">All Appointments</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-200 text-gray-700 font-semibold p-4">
          <p className="p-2">#</p>
          <p className="p-2">Patient</p>
          <p className="p-2">Payment Status</p>
          <p className="p-2">Patient Age</p>
          <p className="p-2">Date and Time</p>
          <p className="p-2">Fee</p>
          <p className="p-2">Action</p>
        </div>
        {appointments.map((item, index) => (
          <div 
            key={index} 
            className="grid grid-cols-7 border-b hover:bg-gray-200 transition-colors duration-300 p-4 transform hover:scale-105"
          >
            <p className="p-2">{index + 1}</p>
            <div className="p-2 flex items-center">
              <img src={item.userData.image} alt="" className="w-10 h-10 rounded-full mr-2" />
              <p>{item.userData.name}</p>
            </div>
            <div className="p-2">
              <p>{item.payment ? "Online" : "Cash"}</p>
            </div>
            <p className="p-2">{calculateAge(item.userData.dob)}</p>
            <p className="p-2">{item.slotDate}, {item.slotTime}</p>
            <p className="p-2">${item.amount}</p>
            <div className="p-2 flex space-x-2">
             {!item.cancelled? <img 
              onClick={()=>cancelAppointment(item._id)}
                src={assets.cancel_icon} 
                alt="Cancel" 
                className="w-5 h-5 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-600" 
              />:<p className='text-red-500 text-sm'>
Cancelled
              </p>
             }
             {!item.isCompleted?
              <img 
            
              onClick={()=>completeAppointment(item._id)}
                src={assets.tick_icon} 
                alt="Confirm" 
                className="w-5 h-5 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-green-600" 
              />
              :<p className='text-red-400 text-sm' >Completed</p>
             }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
