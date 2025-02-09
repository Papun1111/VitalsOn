import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Make sure you have the correct path to your assets

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-blue-50 p-8 rounded-md shadow-md overflow-hidden">
      {/* Left Section */}
      <div className="max-w-lg mb-6 md:mb-0 md:mr-8">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4 transition-transform duration-300 hover:scale-105">
          Book Your Appointment
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-4">
          Get access to over <strong>100+ trusted doctors</strong> across multiple specialties. 
          Schedule your appointment effortlessly and manage your health from the comfort of your home.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
                     transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
        >
          Create Account
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center">
        {/* Replace this with the appropriate image from your assets */}
        <img
          src={assets.appointment_img}
          alt="Doctor Illustration"
          className="max-w-full h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Banner;
