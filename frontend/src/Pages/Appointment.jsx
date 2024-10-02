import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors,currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const foundDoc = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    <div className="container mx-auto px-4 py-6">
      {docInfo ? (
        <div className="flex flex-row items-start justify-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex-shrink-0">
            <img src={docInfo.image} alt={docInfo.name} className="w-48 h-48 object-cover" />
          </div>
          <div className="p-4">
            <p className="text-lg font-semibold">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="ml-2 w-5 h-5" />
            </p>
            <div className="text-sm">
              <p className="my-1">{docInfo.degree} - {docInfo.speciality}</p>
              <button className="my-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition duration-300 ease-in-out">
                {docInfo.experience} Years
              </button>
            </div>
            <div className="text-sm my-2">
              <p><img style={{display:"inline",margin:"0.25rem"}} src={assets.info_icon} alt="" />About</p>
              <p className="text-gray-600">{docInfo.about}</p>
            </div>
            <p>Appointment Fee:{currencySymbol} <span>{docInfo.fees}</span></p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading doctor information...</p>
      )}
    </div>
  );
};

export default Appointment;
