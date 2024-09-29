import React from 'react';
import { specialityData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Find by Specialty</h1>
      <p className="text-gray-700 leading-relaxed mb-6 text-center">
        Finding the right doctor is crucial for effective healthcare. Our platform allows you to easily search for doctors by specialty, ensuring you connect with professionals who meet your specific needs. Whether you're looking for a cardiologist, dermatologist, or pediatrician, our comprehensive listings provide detailed profiles, including qualifications and patient reviews. Browse through available specialists, compare their expertise, and book appointments with confidence. Your health deserves the best care, and we’re here to help you find it!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-20 h-20 sm:w-24 sm:h-24 mb-2 object-cover rounded-full"
            />
            <p className="text-center text-md sm:text-lg font-medium text-gray-800">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;
