import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import assets from "../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashData, atoken, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    dashData && (
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-5 p-5">
        {/* Stats Cards */}
        <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:shadow-xl">
          <img src={assets.doctor_icon} alt="Doctors" className="mb-3 w-16 h-16" />
          <p className="text-gray-800 text-2xl font-bold">{dashData.doctors}</p>
          <p className="text-gray-800">Doctors</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-xl">
          <img src={assets.appointment_icon} alt="Appointments" className="mb-3 w-16 h-16" />
          <p className="text-gray-800 text-2xl font-bold">{dashData.appointments}</p>
          <p className="text-gray-800">Appointments</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-500 hover:shadow-xl">
          <img src={assets.patients_icon} alt="Patients" className="mb-3 w-16 h-16" />
          <p className="text-gray-800 text-2xl font-bold">{dashData.patients}</p>
          <p className="text-gray-800">Patients</p>
        </div>
        
        {/* Latest Bookings Section */}
        <div className="col-span-1 sm:col-span-3">
          <div className="p-5 bg-gray-200 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img src={assets.list_icon} alt="Latest Bookings" className="mr-2" />
              <p className="text-xl font-semibold">Latest Bookings</p>
            </div>
            <div className="space-y-4">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow transition-shadow duration-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 hover:shadow-md"
                >
                  <img src={item.doctorData.image} alt={item.doctorData.name} className="w-12 h-12 rounded-full mr-3" />
                  <div className="flex-grow">
                    <p className="text-gray-800 font-medium">{item.doctorData.name}</p>
                    <p className="text-gray-600">{item.slotDate}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-600 text-xs font-medium">Cancelled</p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer hover:opacity-75 transition-opacity"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
