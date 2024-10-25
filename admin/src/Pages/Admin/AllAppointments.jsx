import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { AppContext } from "../../Context/AppContext";
import assets from "../../assets/assets";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
      console.log(appointments);
    }
  }, [atoken]);

  return (
    <div className="p-4 w-full max-w-6xl mx-auto my-5">
      <p className="text-lg font-semibold mb-4">All Appointments</p>
      <div className="grid grid-cols-7 gap-4 bg-gray-200 p-2 rounded-md">
        <div className="font-semibold">#</div>
        <div className="font-semibold">Patient</div>
        <div className="font-semibold">Age</div>
        <div className="font-semibold">Date & Time</div>
        <div className="font-semibold">Doctor</div>
        <div className="font-semibold">Fee</div>
        <div className="font-semibold">Action</div>
      </div>
      {appointments.map((item, index) => (
        <div 
          key={index}
          className="grid grid-cols-7 gap-4 p-2 border-b transition-transform transform hover:scale-105 hover:bg-gray-100"
        >
          <div className="flex items-center">{index + 1}</div>
          <div className="flex items-center">
            <img src={item.userData.image} alt="" className="w-10 h-10 rounded-full mr-2" />
            <p>{item.userData.name}</p>
          </div>
          <p>{calculateAge(item.userData.dob)}</p>
          <p>{item.slotDate}, {item.slotTime}</p>
          <div className="flex items-center">
            <img src={item.doctorData.image} alt="" className="w-10 h-10 rounded-full mr-2" />
            <p>{item.doctorData.name}</p>
          </div>
          <p>{currency}{item.amount}</p>
          {item.cancelled?<p className="text-red-600 text-xs font-medium">Cancelled</p>:
          <img onClick={()=>cancelAppointment(item._id)}
          className="w-10 cursor-pointer hover:opacity-75 transition-opacity" 
          src={assets.cancel_icon} 
          alt="Cancel" 
        />
          }
          
        </div>
      ))}
    </div>
  );
};

export default AllAppointments;
