import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
const [docSlots,setDocSlots]=useState([]);
const [slotIndex,setSlotIndex]=useState(0);
const[slotTime,setSlotTime]=useState('');
  const fetchDocInfo = async () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  };

  const getAvailableSlot=async()=>{
  setDocSlots([]);
  //getting curr date
  let today=new Date();
  for(let i=0;i<7;i++){
    //getting date with index
    let currentDate=new Date(today);
    currentDate.setDate(today.getDate()+i);
    //settings
    let endTime=new Date();
    endTime.setDate(today.getDate()+1);
    endTime.setHours(21,0,0,0);
    //setting hours
    if(today.getDate===currentDate.getDate())
  {
    currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
  currentDate.setMinutes(currentDate.getMinutes()>30?30:0);
}else{
currentDate.setHours(10);
currentDate.setMinutes(0);  
}
let timeSlots=[]
while(currentDate<endTime){
  let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digits',minutes:'2-digits'});
timeSlots.push({
  datetime:new Date(currentDate),
  time:formattedTime
})
currentDate.setMinutes(currentDate.getMinutes()+30)
}
setDocSlots(prev=>([...prev,timeSlots]));
    }
  }
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(()=>{
getAvailableSlot();
  },[docInfo])

  return (
    <div className="container mx-auto px-4 py-6">
      {docInfo ? (
        <div className="flex flex-row items-start justify-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex-shrink-0">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-48 h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-lg font-semibold">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="ml-2 w-5 h-5" />
            </p>
            <div className="text-sm">
              <p className="my-1">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="my-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition duration-300 ease-in-out">
                {docInfo.experience} Years
              </button>
            </div>
            <div className="text-sm my-2">
              <p>
                <img
                  style={{ display: "inline", margin: "0.25rem" }}
                  src={assets.info_icon}
                  alt=""
                />
                About
              </p>
              <p className="text-gray-600">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 mt-4 font-medium">
              Appointment Fee:<span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Loading doctor information...
        </p>
      )}
    </div>
  );
};

export default Appointment;
