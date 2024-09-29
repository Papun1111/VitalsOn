import React from "react";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
      {/* Left Side */}
      <div className="flex-1">
        <p className="text-2xl font-bold text-blue-600 mb-4">Book Appointment with Trusted Doctors</p>
        <div className="flex items-start space-x-4 mb-6">
          <img 
            src={assets.group_profiles} 
            alt="Profiles" 
            className="w-16 h-16 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" 
          />
          <p className="text-gray-700 leading-relaxed">
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
          className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
        >
          <span>Book Appointments</span>
          <img 
            src={assets.arrow_icon} 
            alt="Arrow" 
            className="ml-2 w-4 h-4 transition-transform duration-300 transform hover:translate-x-1"
          />
        </a>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center">
        <img 
          src={assets.header_img} 
          alt="Healthcare" 
          className="rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Header;
