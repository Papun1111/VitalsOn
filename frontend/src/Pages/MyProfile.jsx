import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false); // Initialize isEdit to false
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false); // Reset to view mode after saving
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col items-center transition-all duration-300 ease-in-out">
        {isEdit ? (
          <label htmlFor="image">
            <div>
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="h-32 w-32 rounded-full mb-4 transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}

        <div className="text-center space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          {isEdit ? (
            <input
              id="name"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <h1 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-all duration-300 ease-in-out">
              {userData.name}
            </h1>
          )}

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <p className="text-gray-600">{userData.email}</p>

          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <p className="text-gray-600">{userData.phone}</p>

          <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
            Address Line 1:
          </label>
          {isEdit ? (
            <>
              <input
                id="address1"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
                Address Line 2:
              </label>
              <input
                id="address2"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </>
          ) : (
            <p className="text-gray-600">
              {`${userData.address.line1}, ${userData.address.line2}`}
            </p>
          )}

          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          {isEdit ? (
            <select
              id="gender"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}

          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          {isEdit ? (
            <input
              id="dob"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              type="date"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
        <button
          onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))} // Toggle edit state
          className="mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow-lg transition duration-300 ease-in-out focus:outline-none"
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>
    )
  );
};

export default MyProfile;
