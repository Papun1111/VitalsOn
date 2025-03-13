import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { AppContext } from "../../Context/AppContext";
import assets from "../../assets/assets";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  // Helper function to format date and time nicely
  const formatDateTime = (date, time) => {
    // Combine date and time into an ISO string
    const dt = new Date(`${date}T${time}`);
    if (isNaN(dt)) return `${date}, ${time}`;
    return dt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <div className="p-6 w-full max-w-6xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Appointments</h1>

      {/* Grid/table view for medium and larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-7 gap-4 bg-gray-100 p-4 rounded-t-lg">
            <div className="font-semibold">#</div>
            <div className="font-semibold">Patient</div>
            <div className="font-semibold">Age</div>
            <div className="font-semibold">Date &amp; Time</div>
            <div className="font-semibold">Doctor</div>
            <div className="font-semibold">Fee</div>
            <div className="font-semibold">Action</div>
          </div>
          {appointments.map((item, index) => (
            <div 
              key={index}
              className="grid grid-cols-7 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              {/* Index */}
              <div className="flex items-center">{index + 1}</div>
              
              {/* Patient */}
              <div className="flex items-center">
                <img 
                  src={item.userData.image} 
                  alt="patient" 
                  className="w-10 h-10 rounded-full mr-2 object-cover" 
                />
                <span>{item.userData.name}</span>
              </div>
              
              {/* Age */}
              <div className="flex items-center">
                <span>{calculateAge(item.userData.dob)}</span>
              </div>
              
              {/* Date & Time */}
              <div className="flex items-center">
                <span>{formatDateTime(item.slotDate, item.slotTime)}</span>
              </div>
              
              {/* Doctor */}
              <div className="flex items-center">
                <img 
                  src={item.doctorData.image} 
                  alt="doctor" 
                  className="w-10 h-10 rounded-full mr-2 object-cover" 
                />
                <span>{item.doctorData.name}</span>
              </div>
              
              {/* Fee */}
              <div className="flex items-center">
                <span>{currency}{item.amount}</span>
              </div>
              
              {/* Action */}
              <div className="flex items-center">
                {item.cancelled ? (
                  <span className="text-red-600 text-sm font-medium">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 text-sm font-medium">Completed</span>
                ) : (
                  <img 
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 h-10 cursor-pointer hover:opacity-75 transition-opacity"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden space-y-4">
        {appointments.map((item, index) => (
          <div 
            key={index} 
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img 
                  src={item.userData.image} 
                  alt="patient" 
                  className="w-10 h-10 rounded-full mr-2 object-cover" 
                />
                <div>
                  <p className="font-semibold">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>
              <span className="font-bold text-lg">{index + 1}.</span>
            </div>
            <div className="mb-2">
              <p className="font-medium text-gray-600">Date & Time:</p>
              <p className="text-sm">{formatDateTime(item.slotDate, item.slotTime)}</p>
            </div>
            <div className="mb-2 flex items-center">
              <img 
                src={item.doctorData.image} 
                alt="doctor" 
                className="w-10 h-10 rounded-full mr-2 object-cover" 
              />
              <div>
                <p className="font-semibold">{item.doctorData.name}</p>
                <p className="text-sm text-gray-500">Fee: {currency}{item.amount}</p>
              </div>
            </div>
            <div>
              {item.cancelled ? (
                <span className="text-red-600 text-sm font-medium">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 text-sm font-medium">Completed</span>
              ) : (
                <img 
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 h-8 cursor-pointer hover:opacity-75 transition-opacity"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
