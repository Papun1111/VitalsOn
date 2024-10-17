import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    console.log(doctors);
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {doctors.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
            <div className="p-4 bg-white">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <div className="flex items-center mt-2">
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} className="mr-2" />
                <p className={`text-sm font-medium ${item.available ? 'text-green-500' : 'text-red-500'}`}>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;
