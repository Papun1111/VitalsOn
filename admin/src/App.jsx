import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { AdminContext } from './Context/AdminContext';
import { Routes, Route } from "react-router-dom"
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
  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)

  return (
    <div className="min-h-screen w-full">
      {atoken || dtoken ? (
        <div className='min-h-screen w-full bg-slate-500 flex flex-col'>
          <ToastContainer 
            position="top-right"
            className="z-50"
            toastClassName="text-sm"
          />
          
          {/* Navbar */}
          <Navbar />
          
          {/* Main Content Area - Full Screen */}
          <div className='flex-1 overflow-auto'>
            <div className='w-full h-full p-4 sm:p-6 lg:p-8'>
              <Routes>
                {atoken && <Route path='/' element={<AdminLandingPage />} />}
                {dtoken && <Route path='/' element={<DoctorLandingPage />} />}
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllAppointments />} />
                <Route path='/add-doctor' element={<AddDoctor />} />
                <Route path='/doctor-list' element={<DoctorsList />} />
                <Route path="/admin/video-call/:appointmentId" element={<VideoCallAdmin />} />
                
                {/* Doctor Routes */}
                <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                <Route path='/doctor-appointments' element={<DoctorAppointment />} />
                <Route path='/doctor-profile' element={<DoctorProfile />} />
                <Route path="/video-call/:roomId" element={<VideoCallAdmin />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md mx-auto p-4">
            <Login />
          </div>
          <ToastContainer 
            position="top-right"
            className="z-50"
            toastClassName="text-sm"
          />
        </div>
      )}
    </div>
  )
}

export default App