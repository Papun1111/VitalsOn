import React, { useContext } from 'react';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { AdminContext } from './Context/AdminContext';
import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Admin/Dashboard';
import AllAppointments from './Pages/Admin/AllAppointments';
import AddDoctor from './Pages/Admin/AddDoctor';
import DoctorsList from './Pages/Admin/DoctorsList';
import { DoctorContext } from './Context/DoctorContext';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import DoctorAppointment from './Pages/Doctor/DoctorAppointment';
import DoctorProfile from './Pages/Doctor/DoctorProfile';
import VideoCallAdmin from './Components/VideoCallAdmin';
import AdminLandingPage from './Pages/Admin/AdminLanding';
import DoctorLandingPage from './Pages/Doctor/DoctorLandingPage';

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-zinc-100">
      <ToastContainer 
        position="top-right"
        theme="dark"
        toastClassName="bg-zinc-800 text-sm border border-zinc-700"
      />
      {atoken || dtoken ? (
        <div className='min-h-screen w-full flex flex-col'>
          <Navbar />
          
          {/* Main content area takes the remaining height and allows scrolling */}
          <main className='flex-1 overflow-y-auto'>
            <Routes>
              {/* Admin Routes */}
              {atoken && <Route path='/' element={<AdminLandingPage />} />}
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctor-list' element={<DoctorsList />} />
              <Route path="/admin/video-call/:appointmentId" element={<VideoCallAdmin />} />
              
              {/* Doctor Routes */}
              {dtoken && <Route path='/' element={<DoctorLandingPage />} />}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor-appointments' element={<DoctorAppointment />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
              
              {/* Shared Video Call Route */}
              <Route path="/video-call/:roomId" element={<VideoCallAdmin />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="w-full max-w-md mx-auto p-4">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;