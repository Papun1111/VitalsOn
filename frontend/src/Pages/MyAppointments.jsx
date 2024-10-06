import React, { useContext } from 'react';
import { AppContext } from "../Context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
      <div className="space-y-4">
        {doctors.slice(0, 2).map((item, index) => (
          <div key={index} className="flex p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="flex-shrink-0">
              <img className="h-24 w-24 rounded-full object-cover" src={item.image} alt={item.name} />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.speciality}</p>
              <p className="text-gray-500">{item.address.line1}</p>
              {item.address.line2 && <p className="text-gray-500">{item.address.line2}</p>}
              <p className="text-gray-500">
                <span className="font-semibold">Date & Time:</span> {new Date().toLocaleString()}
              </p>
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <button className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                Pay Online
              </button>
              <button className="mt-2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
