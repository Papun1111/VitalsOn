import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../Context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const location = useLocation();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const slotTimeFormat = (slotTime) => {
    const [hours, minutes] = slotTime.split(":");
    return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        getDoctorsData();
      } else {
        toast.error("Failed to fetch appointments.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred.");
    }
  };

  const appointRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        window.location.replace(data.session.url);
      } else {
        console.log("Error initiating payment");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      toast.warn("Please log in to view your appointments.");
    }
  }, [token]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');
    const appointmentId = query.get('appointmentId'); // Extract appointmentId

    const verifyPayment = async () => {
      try {
        if (sessionId && appointmentId) {
          const response = await axios.post('/api/user/verify', { id: sessionId, appointmentId }); // Send both IDs
          if (response.data.success) {
            toast.success("Payment verified successfully!");
            getUserAppointments();
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || "An unexpected error occurred.");
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [location]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div key={item._id} className="flex p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="flex-shrink-0">
                <img className="h-24 w-24 rounded-full object-cover" src={item.doctorData?.image} alt={item.doctorData?.name || "Doctor"} />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-bold">{item.doctorData?.name || "Unknown Doctor"}</h3>
                <p className="text-gray-600">{item.doctorData?.speciality || "Speciality not provided"}</p>
                <p className="text-gray-500">{item.doctorData?.address?.line1 || "Address not provided"}</p>
                {item.doctorData?.address?.line2 && <p className="text-gray-500">{item.doctorData.address.line2}</p>}
                <p className="text-gray-500">
                  <span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} at {slotTimeFormat(item.slotTime)}
                </p>
              </div>
              <div className="ml-4 flex flex-col justify-between">
                {!item.cancelled && !item.payment && (
                  <button onClick={() => appointRazorpay(item._id)} className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button onClick={() => cancelAppointment(item._id)} className="mt-2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200">
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className='sm:min-w-48 py-2 border-b-black rounded text-red-500'>Appointment cancelled</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
