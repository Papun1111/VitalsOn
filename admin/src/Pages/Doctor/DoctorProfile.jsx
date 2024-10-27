import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

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
        backendUrl + "/api/doctor/update-profile",
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
    getProfileData();
  }, [dtoken]);

  return (
    profileData && (
      <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <img
            src={profileData.image}
            alt=""
            className="w-24 h-24 rounded-full border-2 border-gray-200"
          />
          <div className="ml-4">
            <p className="text-xl font-bold">{profileData.name}</p>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600">
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                {profileData.experience} years
              </button>
            </div>
            <div className="mt-2">
              <p className="font-semibold">About:</p>
              <p className="text-gray-700">{profileData.about}</p>
            </div>
            <p className="mt-2">
              Appointment Fee:{" "}
              <span className="font-bold">
                $
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                    value={profileData.fee}
                    type="number"
                  ></input>
                ) : (
                  profileData.fee
                )}
              </span>
            </p>
            <div className="mt-2">
              <p className="font-semibold">Address:</p>
              <p>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  ></input>
                ) : (
                  profileData.address.line1
                )}
              </p>
              <p>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  ></input>
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="mt-4 flex items-center">
              <input
                onChange={(e) =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                className="mr-2"
              />
              <label className="text-gray-700">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
