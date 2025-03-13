import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dtoken, profileData, getProfileData, setProfileData, backendUrl } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  if (!profileData) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src={profileData.image}
          alt="Doctor Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg"
        />
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {profileData.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
            <p className="text-md text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>
            <div className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
              {profileData.experience} years
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-700">About:</p>
            <p className="text-gray-600">{profileData.about}</p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center">
            <p className="text-gray-700 font-semibold mr-2">
              Appointment Fee:
            </p>
            {isEdit ? (
              <input
                type="number"
                value={profileData.fee}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fee: e.target.value }))
                }
                className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <span className="text-lg font-bold text-gray-800">
                ${profileData.fee}
              </span>
            )}
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-700">Address:</p>
            {isEdit ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  placeholder="Line 1"
                  className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  placeholder="Line 2"
                  className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ) : (
              <div>
                <p className="text-gray-600">{profileData.address.line1}</p>
                <p className="text-gray-600">{profileData.address.line2}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>
          <div className="mt-6">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
