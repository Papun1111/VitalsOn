import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-xl font-semibold mb-1">{item.name}</p>
              <p className="text-sm text-gray-600 mb-3">{item.speciality}</p>
              <div className="flex items-center">
                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available} 
                  className="mr-2"
                />
                <p className={`text-sm font-medium ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
