import React from 'react';
import { FaUserMd, FaCalendarCheck, FaChartLine, FaLock } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const AdminLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
          VitalsOn Panel
        </h1>
        <p className="text-xl mb-8 max-w-2xl animate-fade-in-up">
          Welcome to VitalsOn Panel, your ultimate admin dashboard for managing healthcare services. Easily add doctors, organize appointments, and monitor real-time analytics—all in one place.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 flex items-center gap-2">
          Get Started <FiArrowRight />
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card: Add Doctors */}
            <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaUserMd className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Add Doctors</h3>
              <p>Easily create comprehensive profiles to expand your team of healthcare professionals.</p>
            </div>
            {/* Feature Card: Manage Appointments */}
            <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaCalendarCheck className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Manage Appointments</h3>
              <p>Schedule and organize appointments with an intuitive and user-friendly interface.</p>
            </div>
            {/* Feature Card: Real-time Analytics */}
            <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaChartLine className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
              <p>Gain instant insights with live data to monitor system performance and outcomes.</p>
            </div>
            {/* Feature Card: Secure Admin Access */}
            <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaLock className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Secure Access</h3>
              <p>Protect your admin panel with robust security measures ensuring safe operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Scroll Cue */}
      <section className="text-center py-10">
        <HiOutlineChevronDoubleDown className="mx-auto text-3xl animate-bounce" />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-indigo-700">
        <p>&copy; {new Date().getFullYear()} VitalsOn Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLandingPage;
