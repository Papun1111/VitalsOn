import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { NavLink } from 'react-router-dom';
import assets from "../assets/assets";

const Sidebar = () => {
    const { atoken } = useContext(AdminContext);
    return (
        <div className="bg-gray-800 text-white h-full w-64 shadow-lg">
            {atoken && (
                <ul className="flex flex-col p-4 space-y-4">
                    <li>
                        <NavLink to="/admin-dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition">
                            <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6 mr-2" />
                            <p className="font-semibold">DashBoard</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-appointments" className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition">
                            <img src={assets.appointment_icon} alt="Appointments" className="w-6 h-6 mr-2" />
                            <p className="font-semibold">Appointments</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-doctor" className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition">
                            <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6 mr-2" />
                            <p className="font-semibold">Add Doctor</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/doctor-list" className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition">
                            <img src={assets.people_icon} alt="Doctors List" className="w-6 h-6 mr-2" />
                            <p className="font-semibold">Doctors List</p>
                        </NavLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
