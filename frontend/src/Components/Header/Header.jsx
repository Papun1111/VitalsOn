import React from "react";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-[#FFEDFA] rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl gap-8">
      {/* Left Side */}
      <div className="flex-1 animate-fadeIn">
        <p className="text-2xl md:text-3xl font-bold text-[#DE3163] mb-6 transition-all duration-300 hover:translate-x-2">
          Book Appointment with Trusted Doctors
        </p>
        
        <div className="flex items-start space-x-6 mb-8 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-[#E195AB] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          
          </div>
          
          <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-900">
            Welcome to our doctor appointment booking website,
            <br /> where managing your healthcare is quick and easy. Find and
            book appointments with trusted professionals in your area, browse
            available times, and read doctor profiles—all in one place. With
            convenient reminders and a user-friendly interface, prioritizing
            your health has never been simpler. Schedule your visit today!
          </p>
        </div>

        <a
          href="#speciality"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-[#CCDF92] text-white font-semibold 
          transition-all duration-300 transform hover:bg-[#DE3163] hover:scale-105 hover:shadow-lg group"
        >
          <span>Book Appointments</span>
          <img
            src={assets.arrow_icon}
            alt="Arrow"
            className="ml-2 w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-2"
          />
        </a>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center animate-slideIn">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#DE3163] to-[#E195AB] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative">
            <img
              src={assets.header_img}
              alt="Healthcare"
              className="rounded-lg mix-blend-multiply transition-all duration-500 transform 
              group-hover:scale-105 hover:rotate-1"
              style={{
                filter: 'contrast(1.1) brightness(1.1)'
              }}
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#CCDF92] rounded-full opacity-50 animate-float"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#DE3163] rounded-full opacity-50 animate-float delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these animations to your global CSS or tailwind.config.js
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-slideIn {
  animation: slideIn 1s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

export default Header;