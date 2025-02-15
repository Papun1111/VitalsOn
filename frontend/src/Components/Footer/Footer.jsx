import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-200 p-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-10">
        
        {/* Left Section */}
        <div className="space-y-4 lg:max-w-lg">
          <h1 className="text-3xl font-bold text-white hover:text-gray-300 transition-colors duration-300">
            VitalsOn
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            VitalsOn is a dedicated healthcare platform that simplifies the process of booking
            appointments with a wide range of healthcare providers. With a user-friendly interface
            and transparent doctor profiles, we aim to make healthcare more accessible, efficient,
            and convenient for everyone.
          </p>
        </div>

        {/* Middle Section: Company */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-white">Company</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300">About</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300">Contact Us</li>
            <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300">Privacy</li>
          </ul>
        </div>

        {/* Right Section: Get in Touch */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-white">GET IN TOUCH</h2>
          <div className="space-y-1">
            <p className="cursor-pointer hover:text-gray-300 transition-colors duration-300">
              +91 7008939577
            </p>
            <p className="cursor-pointer hover:text-gray-300 transition-colors duration-300">
              gohanmohapatra@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-700" />

      {/* Footer Bottom */}
      <div className="text-center text-gray-400">
        <p>© 2025 All Rights Reserved to Papun Mohapatra.</p>
      </div>
    </div>
  );
};

export default Footer;
