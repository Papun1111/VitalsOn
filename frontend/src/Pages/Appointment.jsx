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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const slotVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const timeSlotVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-neutral-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <motion.div 
          className="bg-white shadow-lg rounded-2xl overflow-hidden border border-neutral-200"
          variants={cardVariants}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Doctor Information Section */}
            <motion.div 
              className="flex-1 p-6 lg:p-10"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <motion.img
                      src={docInfo?.image}
                      alt={docInfo?.name}
                      className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-xl shadow-md"
                    />
                    <motion.div
                      className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      <img src={assets.verified_icon} alt="" className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="flex-1 space-y-6">
                  <motion.div variants={itemVariants}>
                    <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900 mb-3">
                      {docInfo?.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <motion.span 
                        className="bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full text-sm font-medium border border-neutral-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        {docInfo?.degree}
                      </motion.span>
                      <motion.span 
                        className="bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full text-sm font-medium border border-neutral-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        {docInfo?.speciality}
                      </motion.span>
                      <motion.span 
                        className="bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full text-sm font-medium border border-neutral-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        {docInfo?.experience} Years Experience
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-neutral-50 p-5 rounded-xl border border-neutral-200"
                    variants={itemVariants}
                  >
                    <div className="flex items-center mb-3">
                      <img src={assets.info_icon} alt="" className="w-5 h-5 mr-2 opacity-60" />
                      <h3 className="text-base font-semibold text-neutral-900">About Doctor</h3>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{docInfo?.about}</p>
                  </motion.div>

                  <motion.div 
                    className="bg-neutral-900 p-5 rounded-xl text-white"
                    variants={itemVariants}
                  >
                    <h3 className="text-sm font-medium mb-1 text-neutral-300">Consultation Fee</h3>
                    <p className="text-2xl font-semibold">
                      {currencySymbol}{docInfo?.fee}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Booking Section */}
            <motion.div 
              className="lg:w-96 bg-neutral-50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-neutral-200"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Book Your Appointment
              </h2>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">Select Date</h3>
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence>
                    {docSlots.length !== 0 && docSlots.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={slotVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setSlotIndex(index)}
                        className={`p-3 rounded-lg cursor-pointer text-center border transition-all duration-200 ${
                          slotIndex === index 
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                        }`}
                      >
                        <p className="font-semibold text-sm">
                          {item[0]?.datetime && daysOfWeek[item[0].datetime.getDay()]}
                        </p>
                        <p className="text-xs mt-1 opacity-80">
                          {item[0]?.datetime.getDate()}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">Select Time</h3>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {docSlots[slotIndex].map((item, index) => (
                          <motion.div
                            key={index}
                            variants={timeSlotVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setSlotTime(item.time)}
                            className={`p-3 rounded-lg cursor-pointer text-center border transition-all duration-200 ${
                              slotTime === item.time 
                                ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
                                : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                            }`}
                          >
                            <p className="text-xs font-medium">
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
                        <p className="text-sm text-neutral-500">No available slots for this date.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Book Button */}
              <motion.button
                onClick={bookAppointment}
                disabled={!slotTime}
                className={`w-full py-3.5 px-6 rounded-full font-medium text-base transition-all duration-200 ${
                  slotTime 
                    ? 'bg-emerald-400 hover:bg-emerald-500 text-neutral-900 shadow-sm hover:shadow-md' 
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
                whileHover={slotTime ? { scale: 1.02 } : {}}
                whileTap={slotTime ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slotTime ? 'Book Appointment' : 'Select Time Slot'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Doctors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
          background: #f5f5f5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a3a3a3;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #737373;
        }
      `}</style>
    </motion.div>
  );
};

export default Appointment;