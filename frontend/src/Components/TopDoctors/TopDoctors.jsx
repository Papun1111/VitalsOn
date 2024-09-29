import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const TopDoctors = () => {
const {doctors}=useContext(AppContext);    
    const navigate=useNavigate();
  return (
    <div className="bg-blue-50 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Top Doctors to Book</h1>
      <p className="text-gray-600 mb-6">Simply browse through our extensive list of trusted doctors</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={()=>(navigate(`/appointment/${item._id}`))}
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-contain" // Use object-contain for full visibility
            />
            <div className="mt-4 p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500"></p>
                <p className="text-sm text-green-500 font-semibold">Available</p>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={()=>{navigate("/doctors");scrollTo(0,0 )}} className="px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600">
          More
        </button>
      </div>
    </div>
  );
}

export default TopDoctors;
