import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="bg-white p-6 md:p-12">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <div className="flex flex-col md:flex-row md:items-center">
        <img src={assets.contact_image} alt="Contact Us" className="md:w-1/2 h-auto shadow-lg mb-4 md:mb-0"/>
        <div className="space-y-4 md:ml-12">
          <div>
            <h2 className="text-2xl text-gray-700">Our Office</h2>
            <p className="text-gray-600">Sec-6, CDA, Cuttack-753014</p>
          </div>
          <div>
            <p className="text-gray-600">Tel: +91 7008939577</p>
            <p className="text-gray-600">Email: gohanmohapatra@gmail.com</p>
          </div>
          <div>
            <h2 className="text-xl text-gray-700">Careers At Medscription</h2>
            <p className="text-gray-600">Learn more about our teams and job openings</p>
          </div>
          <div>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
