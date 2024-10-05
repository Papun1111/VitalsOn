import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "PAPUN MOHAPATRA",
    image: assets.profile_pic,
    email: "gohanmohapatra@gmail.com",
    phone: "+91 7008939577",
    address: {
      line1: "123 Example Street",
      line2: "City, State, 12345"
    },
    gender: "Male",
    dob: "11-11-2003"
  });
const [isEdit,setIsEdit]=useState(false);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col items-center">
      <img src={userData.image} alt="Profile" className="h-32 w-32 rounded-full mb-4"/>
      <div className="text-center space-y-2">
        {isEdit?<input type='text' value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))} />:<h1 className="text-xl font-semibold text-gray-900">{userData.name}</h1>}
        
        <p className="text-gray-600">{userData.email}</p>
        <p className="text-gray-600">{userData.phone}</p>
        <p className="text-gray-600">{`${userData.address.line1}, ${userData.address.line2}`}</p>
        <p className="text-gray-600">{userData.gender} - {userData.dob}</p>
      </div>
    </div>
  );
}

export default MyProfile;
