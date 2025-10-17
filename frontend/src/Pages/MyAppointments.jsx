import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, Link } from "react-router-dom";
// Assuming you have motion for animations, though it's not used in the original file, adding for consistency.
import { motion, AnimatePresence } from "framer-motion";

const MyAppointments = () => {
  // All your original state and logic are preserved
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
    return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
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
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
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
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment`,
        { appointmentId },
        { headers: { token } }
      );
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
    const sessionId = query.get("session_id");
    const appointmentId = query.get("appointmentId");
    const verifyPayment = async () => {
      try {
        if (sessionId && appointmentId) {
          const response = await axios.post("/api/user/verify", {
            id: sessionId,
            appointmentId,
          });
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
    // Inspired Styling: Clean off-white background with proper spacing.
    <div className="bg-[#FBF9F6] min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inspired Styling: Elegant serif font for the main heading. */}
        <h2 className="text-4xl font-serif font-medium text-gray-900 mb-8 text-center">
          My Appointments
        </h2>
        <div className="space-y-6">
          <AnimatePresence>
            {appointments.length > 0 ? (
              appointments.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  // Inspired Styling: A clean card with subtle border and shadow.
                  className="flex flex-col md:flex-row items-start p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm gap-6"
                >
                  <img
                    // Inspired Styling: A slightly larger, rounded-xl image.
                    className="h-28 w-28 rounded-xl object-cover flex-shrink-0"
                    src={item.doctorData?.image}
                    alt={item.doctorData?.name || "Doctor"}
                  />

                  <div className="flex-grow">
                    {/* Inspired Styling: Clear typographic hierarchy. */}
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.doctorData?.name || "Unknown Doctor"}
                    </h3>
                    <p className="text-gray-600">
                      {item.doctorData?.speciality || "Speciality not provided"}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 font-medium">
                        <span className="font-semibold text-gray-700">Date & Time:</span>{" "}
                        {slotDateFormat(item.slotDate)} at{" "}
                        {slotTimeFormat(item.slotTime)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col items-stretch md:items-end space-y-2 flex-shrink-0">
                    {/* Inspired Styling: Refined buttons and status tags. */}
                    {!item.cancelled && !item.isCompleted && !item.payment && (
                      <button
                        onClick={() => appointRazorpay(item._id)}
                        className="w-full text-center bg-gray-800 text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-900 transition duration-200"
                      >
                        Pay Online
                      </button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="w-full text-center bg-red-50 text-red-600 font-semibold py-2 px-5 rounded-lg hover:bg-red-100 transition duration-200"
                      >
                        Cancel
                      </button>
                    )}
                    {item.cancelled && (
                      <div className="py-2 px-5 rounded-lg bg-red-50 text-red-500 font-medium text-sm text-center">
                        Cancelled
                      </div>
                    )}
                    {item.isCompleted && (
                      <div className="py-2 px-5 rounded-lg bg-green-50 text-green-600 font-medium text-sm text-center">
                        Completed
                      </div>
                    )}
                    {!item.cancelled && (
                      <Link to={`/video-call/${item._id}`} className="w-full">
                        <button className="w-full text-center bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition duration-200">
                          Join Video Call
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              // Inspired Styling: A cleaner "empty state" message.
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border-2 border-dashed rounded-lg"
              >
                <p className="text-gray-500">You have no appointments scheduled.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;