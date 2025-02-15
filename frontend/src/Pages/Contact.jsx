import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="bg-blue-50 max-w-7xl mx-auto p-6 md:p-12">
      {/* Heading */}
      <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">
        Contact Us
      </h1>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Image */}
        <img
          src={assets.contact_image}
          alt="Contact Us"
          className="md:w-1/2 h-auto shadow-lg mb-4 md:mb-0 rounded-lg 
                     hover:scale-105 transition-transform duration-300"
        />

        {/* Contact Details */}
        <div className="space-y-4 md:ml-12">
          {/* Office Info */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-600">
              Our Office
            </h2>
            <p className="text-gray-700">Sec-6, CDA, Cuttack-753014</p>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-gray-700">Tel: +91 7008939577</p>
            <p className="text-gray-700">Email: gohanmohapatra@gmail.com</p>
          </div>

          {/* Careers */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600">
              Careers At VitalsOn
            </h2>
            <p className="text-gray-700">
              Learn more about our teams and job openings
            </p>
          </div>

          {/* Button */}
          <div>
            <button
              className="bg-blue-300 text-white font-bold py-2 px-4 rounded 
                         hover:bg-blue-400 transition-colors duration-300 ease-in-out"
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
