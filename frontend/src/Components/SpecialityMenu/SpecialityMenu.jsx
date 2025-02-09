import React from 'react';
import { specialityData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="p-8 bg-[#F0F7FF] rounded-2xl shadow-lg max-w-6xl mx-auto">
      <div className="space-y-6 mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#7C65B2] mb-4 text-center transform transition-all duration-300 hover:scale-105">
          Find by Specialty
        </h1>
        
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center transition-all duration-300 hover:text-gray-900">
          Finding the right doctor is crucial for effective healthcare. Our platform allows you to easily search for doctors by specialty, ensuring you connect with professionals who meet your specific needs. Whether you're looking for a cardiologist, dermatologist, or pediatrician, our comprehensive listings provide detailed profiles, including qualifications and patient reviews. Browse through available specialists, compare their expertise, and book appointments with confidence. Your health deserves the best care, and we're here to help you find it!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {specialityData.map((item, index) => (
          <Link 
            onClick={() => scrollTo(0,0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="group relative"
          >
            {/* Animated background gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C65B2] to-[#89CFF0] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            
            {/* Card content */}
            <div className="relative flex flex-col items-center bg-white rounded-xl p-6 transition-all duration-500 
              transform hover:scale-105 hover:shadow-xl group-hover:bg-gradient-to-b from-white to-[#F0F7FF]">
              {/* Image container */}
              <div className="relative mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-[#FFB2E6] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full transition-transform duration-500 
                    group-hover:scale-110 ring-2 ring-[#7C65B2] ring-opacity-20"
                />
                
                {/* Decorative circles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#89CFF0] rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 delay-100"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#7C65B2] rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 delay-200"></div>
              </div>
              
              {/* Specialty name */}
              <p className="text-center text-md sm:text-lg font-medium text-gray-800 transition-all duration-300 
                group-hover:text-[#7C65B2] relative">
                {item.speciality}
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7C65B2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;