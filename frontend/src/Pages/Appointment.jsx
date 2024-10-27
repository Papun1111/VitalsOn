import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        setUserBookedSlots(data.bookedSlots); // Assuming bookedSlots is an array of { date, time }
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

      // Filter out the booked slots for the current user
      const filteredSlots = slotsForWeek.map(daySlots => 
        daySlots.filter(slot => 
          !userBookedSlots.some(booked => 
            booked.time === slot.time && booked.date === daySlots[0]?.datetime.toISOString().split('T')[0] // Compare date
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-start justify-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl">
        <div className="flex-shrink-0">
          <img
            src={docInfo?.image}
            alt={docInfo?.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-green-500 shadow-lg"
          />
        </div>
        <div className="p-4 flex-1">
          <p className="text-lg font-semibold flex items-center">
            {docInfo?.name}
            <img src={assets.verified_icon} alt="" className="ml-2 w-5 h-5" />
          </p>
          <div className="text-sm">
            <p className="my-1 text-gray-700">
              {docInfo?.degree} - {docInfo?.speciality}
            </p>
            <button className="my-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition duration-300 ease-in-out">
              {docInfo?.experience} Years
            </button>
          </div>
          <div className="text-sm my-2">
            <p className="flex items-center">
              <img style={{ display: "inline", margin: "0.25rem" }} src={assets.info_icon} alt="" />
              About
            </p>
            <p className="text-gray-600">{docInfo?.about}</p>
          </div>
          <p className="text-gray-500 mt-4 font-medium">
            Appointment Fee: <span className="text-gray-600">{currencySymbol}{docInfo?.fee}</span>
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner mt-4 md:mt-0 w-full md:w-1/3">
          <p className="text-lg font-semibold mb-2">Booking Slots</p>
          <div className="space-y-2">
            {docSlots.length !== 0 && docSlots.map((item, index) => (
              <div 
                onClick={() => setSlotIndex(index)} 
                key={index} 
                className="hover:bg-green-100 transition-colors duration-300 rounded-lg p-2 cursor-pointer"
              >
                <p className="font-semibold">{item[0]?.datetime && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-gray-600">{item[0]?.datetime.getDate()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <div 
                key={index} 
                className={`p-2 hover:bg-green-200 transition-colors duration-300 rounded-md ${slotTime === item.time ? "bg-green-200" : ""}`} 
                onClick={() => setSlotTime(item.time)}
              >
                <p className="text-gray-600">
                  {item.time.toLowerCase()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No available slots for this date.</p>
          )}
          <button 
            onClick={bookAppointment} 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
            disabled={!slotTime}
          >
            Book an Appointment
          </button>
        </div>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality}></RelatedDoctors>
    </div>
  );
};

export default Appointment;
