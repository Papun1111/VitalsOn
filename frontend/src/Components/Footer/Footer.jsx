import React from 'react';
import './Footer.css'; // Ensure any additional custom styles are in this file if needed.

const Footer = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-10">
        <div className="space-y-4 lg:max-w-lg">
          <h1 className="text-3xl text-blue-600 font-bold">Medscription</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut deserunt laudantium pariatur? Rem tenetur adipisci accusamus ipsa assumenda aliquid, eum iste possimus magnam quidem ex vel consequatur aut animi iure.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Company</h2>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">About</li>
            <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">Contact us</li>
            <li className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">Privacy</li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">GET IN TOUCH</h2>
          <div className="space-y-1">
            <p className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">+91 7008939577</p>
            <p className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">gohanmohapatra@gmail.com</p>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="text-center">
        <p>© 2024 All Rights Reserved to Papun Mohapatra.</p>
      </div>
    </div>
  );
}

export default Footer;
