import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react"
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [userBookedSlots, setUserBookedSlots] = useState([]);

  const fetchUserBookedSlots = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-booked-slots`, {
        headers: { token }
      });
      if (data.success) {
        setUserBookedSlots(data.bookedSlots);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const selectedSlot = docSlots[slotIndex][0].datetime;
      const day = selectedSlot.getDate();
      const month = selectedSlot.getMonth() + 1;
      const year = selectedSlot.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, {
        docId,
        slotDate,
        slotTime
      }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchDocInfo = async () => {
      const foundDoc = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoc);
    };

    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    const getAvailableSlot = async () => {
      const slotsForWeek = [];
      let today = new Date();

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (i === 0 && today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const slotCount = isWeekend ? 4 : 8;

        for (let j = 0; j < slotCount; j++) {
          if (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime
            });
            currentDate.setMinutes(currentDate.getMinutes() + 30);
          }
        }
        slotsForWeek.push(timeSlots);
      }

      const filteredSlots = slotsForWeek.map(daySlots => 
        daySlots.filter(slot => 
          !userBookedSlots.some(booked => 
            booked.time === slot.time && booked.date === daySlots[0]?.datetime.toISOString().split('T')[0]
          )
        )
      );

      setDocSlots(filteredSlots);
    };

    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo, userBookedSlots]);

  useEffect(() => {
    fetchUserBookedSlots();
  }, [token]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    }
  };

  const slotVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#dcfce7",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const timeSlotVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#bbf7d0",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Doctor Information Section */}
            <motion.div 
              className="flex-1 p-8 lg:p-12"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <motion.img
                      src={docInfo?.image}
                      alt={docInfo?.name}
                      className="w-48 h-48 object-cover rounded-3xl shadow-xl border-4 border-gradient-to-r from-blue-500 to-green-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <img src={assets.verified_icon} alt="" className="w-6 h-6" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="flex-1 space-y-6">
                  <motion.div variants={itemVariants}>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                      {docInfo?.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <motion.span 
                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {docInfo?.degree}
                      </motion.span>
                      <motion.span 
                        className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {docInfo?.speciality}
                      </motion.span>
                      <motion.span 
                        className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {docInfo?.experience} Years Experience
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-gray-50 p-6 rounded-2xl"
                    variants={itemVariants}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                  >
                    <div className="flex items-center mb-3">
                      <img src={assets.info_icon} alt="" className="w-5 h-5 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">About Doctor</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{docInfo?.about}</p>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-2xl text-white"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">Consultation Fee</h3>
                    <p className="text-3xl font-bold">
                      {currencySymbol}{docInfo?.fee}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Booking Section */}
            <motion.div 
              className="lg:w-96 bg-gradient-to-br from-gray-50 to-blue-50 p-8 border-l border-gray-200"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Book Your Appointment
              </h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Date</h3>
                <div className="grid grid-cols-2 gap-3">
                  <AnimatePresence>
                    {docSlots.length !== 0 && docSlots.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={slotVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setSlotIndex(index)}
                        className={`p-4 rounded-xl cursor-pointer text-center border-2 transition-all duration-300 ${
                          slotIndex === index 
                            ? 'border-green-500 bg-green-100 shadow-lg' 
                            : 'border-gray-200 bg-white hover:border-green-300'
                        }`}
                      >
                        <p className="font-bold text-gray-800">
                          {item[0]?.datetime && daysOfWeek[item[0].datetime.getDay()]}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {item[0]?.datetime.getDate()}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Time</h3>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {docSlots[slotIndex].map((item, index) => (
                          <motion.div
                            key={index}
                            variants={timeSlotVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setSlotTime(item.time)}
                            className={`p-3 rounded-xl cursor-pointer text-center border-2 transition-all duration-300 ${
                              slotTime === item.time 
                                ? 'border-green-500 bg-green-100 shadow-lg' 
                                : 'border-gray-200 bg-white hover:border-green-300'
                            }`}
                          >
                            <p className="text-sm font-medium text-gray-700">
                              {item.time.toLowerCase()}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                      >
                        <p className="text-gray-500">No available slots for this date.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Book Button */}
              <motion.button
                onClick={bookAppointment}
                disabled={!slotTime}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  slotTime 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl hover:shadow-2xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={slotTime ? { scale: 1.02 } : {}}
                whileTap={slotTime ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {slotTime ? 'Book Appointment' : 'Select Time Slot'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Doctors Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12"
        >
          <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </motion.div>
  );
};

export default Appointment;