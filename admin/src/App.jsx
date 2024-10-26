import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { AdminContext } from './Context/AdminContext';
import Sidebar from './Components/Sidebar';
import {Routes,Route} from "react-router-dom"
import Dashboard from './Pages/Admin/Dashboard';
import AllAppointments from './Pages/Admin/AllAppointments';
import AddDoctor from './Pages/Admin/AddDoctor';
import DoctorsList from './Pages/Admin/DoctorsList';
import { DoctorContext } from './Context/DoctorContext';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import DoctorAppointment from './Pages/Doctor/DoctorAppointment';
import DoctorProfile from './Pages/Doctor/DoctorProfile';
const App = () => {
  const {atoken}=useContext(AdminContext)
const {dtoken}=useContext(DoctorContext)
  return atoken || dtoken? (
    <div className='bg-slate-500'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
<Sidebar></Sidebar>
<Routes>
  <Route path='/' element={<></>}></Route>
  <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
  <Route path='/all-appointments' element={<AllAppointments/>}></Route>
  <Route path='/add-doctor' element={<AddDoctor/>}></Route>
  <Route path='/doctor-list' element={<DoctorsList/>}></Route>
  {/*Doctor Route*/}
  <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
  <Route path='/doctor-appointments' element={<DoctorAppointment/>}></Route>
  <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
</Routes>
      </div>
    </div>
  ):(
    <>
    <Login></Login>
    <ToastContainer></ToastContainer>
    </>
  )
}

export default App
