import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Banner = () => {
    const navigate = useNavigate();
  
    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-blue-50 p-4 md:p-6 rounded-lg shadow-lg">
            {/* Left Section */}
            <div className="flex-1 mb-3 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Book Appointment</h1>
                <h2 className="text-lg text-gray-600 mb-2">With 100+ Trusted Doctors</h2>
                <div>
                    <button 
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600 hover:scale-105"
                    >
                        Create Account
                    </button>
                </div>
            </div>
            {/* Right Section */}
            <div className="flex-1">
                <img 
                    src={assets.appointment_img} 
                    alt="Appointment" 
                    className="w-3/4 h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105" // Added hover scale effect
                />
            </div>
        </div>
    );
};

export default Banner;
