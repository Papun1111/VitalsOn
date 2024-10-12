import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { AdminContext } from './Context/AdminContext';

const App = () => {
  const {atoken}=useContext(AdminContext)

  return atoken? (
    <div className='bg-slate-500'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
    </div>
  ):(
    <>
    <Navbar></Navbar>
    <Login></Login>
    <ToastContainer></ToastContainer>
    </>
  )
}

export default App
