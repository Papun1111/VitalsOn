import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Doctor from "./Pages/Doctor";
import Login from "./Pages/Login";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile";
import MyAppointments from "./Pages/MyAppointments";
import Appointment from "./Pages/Appointment";
import Contact from "./Pages/Contact";
const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/doctors" element={<Doctor></Doctor>}></Route>
        <Route path="/doctos:speciality" element={<Doctor></Doctor>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
        <Route
          path="/my-appointments"
          element={<MyAppointments></MyAppointments>}
        ></Route>
        <Route
          path="/appointment/:docId"
          element={<Appointment></Appointment>}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
