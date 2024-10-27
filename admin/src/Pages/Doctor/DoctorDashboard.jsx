import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import assets from "../../assets/assets";

const DoctorDashboard = () => {
  const { setDashData, getDashData, dashData, dtoken,cancelAppointment,completeAppointment } = useContext(DoctorContext);
  
  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);

  return (
    dashData && (
      <div className="m-5 space-y-6 w-full max-w-6xl">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:shadow-xl">
            <img src={assets.earning_icon} alt="Earnings" className="mb-3 w-16 h-16" />
            <p className="text-gray-800 text-3xl font-bold">${dashData.earnings}</p>
            <p className="text-gray-800 text-lg">Earnings</p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-xl">
            <img src={assets.appointment_icon} alt="Appointments" className="mb-3 w-16 h-16" />
            <p className="text-gray-800 text-3xl font-bold">{dashData.appointments}</p>
            <p className="text-gray-800 text-lg">Appointments</p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-500 hover:shadow-xl">
            <img src={assets.patients_icon} alt="Patients" className="mb-3 w-16 h-16" />
            <p className="text-gray-800 text-3xl font-bold">{dashData.patients}</p>
            <p className="text-gray-800 text-lg">Patients</p>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-gray-200 rounded-lg shadow-lg p-5">
          <div className="flex items-center mb-4">
            <img src={assets.list_icon} alt="Latest Bookings" className="mr-2" />
            <p className="text-2xl font-semibold">Latest Bookings</p>
          </div>
          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow transition-shadow duration-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 hover:shadow-md"
              >
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <p className="text-gray-800 font-medium text-lg">{item.userData.name}</p>
                  <p className="text-gray-600 text-sm">{item.slotDate}</p>
                </div>
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
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
