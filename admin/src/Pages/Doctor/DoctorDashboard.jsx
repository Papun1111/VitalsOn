import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import assets from "../../assets/assets";

const DoctorDashboard = () => {
  const { getDashData, dashData, dtoken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  
  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken, getDashData]);

  return (
    dashData && (
      <div className="px-4 py-6 w-full max-w-6xl mx-auto space-y-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-400 hover:shadow-xl">
            <img src={assets.earning_icon} alt="Earnings" className="mb-3 w-16 h-16" />
            <p className="text-gray-800 text-3xl font-bold">${dashData.earnings}</p>
            <p className="text-gray-800 text-lg">Earnings</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:shadow-xl">
            <img src={assets.appointment_icon} alt="Appointments" className="mb-3 w-16 h-16" />
            <p className="text-gray-800 text-3xl font-bold">{dashData.appointments}</p>
            <p className="text-gray-800 text-lg">Appointments</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-400 hover:shadow-xl">
            <img src={assets.patients_icon} alt="Patients" className="mb-3 w-16 h-16" />
            <p className="text-gray-800 text-3xl font-bold">{dashData.patients}</p>
            <p className="text-gray-800 text-lg">Patients</p>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img src={assets.list_icon} alt="Latest Bookings" className="mr-3 w-8 h-8" />
            <p className="text-2xl font-semibold text-gray-800">Latest Bookings</p>
          </div>
          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg shadow transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 hover:shadow-md"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-medium text-lg">{item.userData.name}</p>
                    <p className="text-gray-600 text-sm">{item.slotDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                  {!item.cancelled ? (
                    <img 
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                      className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <p className="text-red-500 text-sm font-medium">Cancelled</p>
                  )}
                  {!item.isCompleted ? (
                    <img 
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon} 
                      alt="Confirm" 
                      className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <p className="text-green-500 text-sm font-medium">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
