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
const App = () => {
  const {atoken}=useContext(AdminContext)

  return atoken? (
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
