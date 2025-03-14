import React from 'react';
import { FaUserEdit, FaVideo, FaCalendarCheck, FaTachometerAlt, FaUserFriends } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DoctorLandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
          Doctor's Portal
        </h1>
        <p className="text-xl mb-8 max-w-2xl animate-fade-in-up">
          Welcome to your personal dashboard. Here you can update your profile, video call with patients, manage appointments, view your dashboard, and access your patient list—all in one place.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 flex items-center gap-2">
          Get Started <FiArrowRight />
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Your Key Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card: Update & Check Profile */}
            <div onClick={() => navigate("/doctor-profile")} className="cursor-pointer bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaUserEdit className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Update Profile</h3>
              <p>Keep your profile current with the latest details and credentials.</p>
            </div>
            {/* Feature Card: Video Call with Patients */}
            <div onClick={() => navigate("/doctor-appointments")} className="cursor-pointer bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaVideo className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Video Calls</h3>
              <p>Connect with your patients via seamless, high-quality video consultations.</p>
            </div>
            {/* Feature Card: Settle Appointments */}
            <div onClick={() => navigate("/doctor-appointments")} className="cursor-pointer bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaCalendarCheck className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Appointments</h3>
              <p>Effortlessly schedule and manage your appointments in one intuitive interface.</p>
            </div>
            {/* Feature Card: Check Dashboard */}
            <div onClick={() => navigate("/doctor-dashboard")} className="cursor-pointer bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaTachometerAlt className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Dashboard</h3>
              <p>Access real-time insights and analytics to monitor your performance.</p>
            </div>
            {/* Feature Card: Patient List */}
            <div onClick={() => navigate("/doctor-appointments")} className="cursor-pointer bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-md transform hover:scale-105 transition duration-500 shadow-xl">
              <FaUserFriends className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">Patient List</h3>
              <p>Review and manage your patients’ records and appointment history effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Scroll Cue */}
      <section className="text-center py-10">
        <HiOutlineChevronDoubleDown className="mx-auto text-3xl animate-bounce" />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-blue-600">
        <p>&copy; {new Date().getFullYear()} Doctor's Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DoctorLandingPage;
