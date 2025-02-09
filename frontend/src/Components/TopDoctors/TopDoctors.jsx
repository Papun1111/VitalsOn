import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent 
          font-serif transition-all duration-300 hover:scale-105 cursor-default">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600 text-lg font-light tracking-wide hover:text-gray-800 transition-colors duration-300">
          Simply browse through our extensive list of trusted doctors
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((item, index) => (
          <div 
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 
              hover:shadow-2xl hover:scale-105 cursor-pointer relative"
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 
              group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10 blur-sm"></div>
            
            <div className="p-1">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain transition-transform duration-500 
                    group-hover:scale-105"
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <p className={`text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300
                    ${item.available ? 
                      'text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100' : 
                      'text-rose-700 bg-rose-50 group-hover:bg-rose-100'
                    }`}>
                    {item.available ? 'Available' : "Not Available"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 
                    transition-colors duration-300 font-serif">
                    {item.name}
                  </p>
                  <p className="text-gray-600 font-medium tracking-wide group-hover:text-purple-600 
                    transition-colors duration-300">
                    {item.speciality}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button 
          onClick={() => { navigate("/doctors"); scrollTo(0,0); }}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl 
            font-medium tracking-wide transition-all duration-300 transform hover:scale-105 
            hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 relative group"
        >
          <span className="relative z-10">More</span>
          {/* Button hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 
            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>
    </div>
  );
}

export default TopDoctors;