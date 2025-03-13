import React, { useContext, useState } from "react";
import assets from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendUrl, atoken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("fee", fee);
      formData.append("about", about);
      formData.append("address1", address1);
      formData.append("address2", address2);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Error adding doctor:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred while adding the doctor.");
    }
  };

  const resetForm = () => {
    setDocImg(null);
    setName("");
    setEmail("");
    setPassword("");
    setExperience("1 Year");
    setFee("");
    setAbout("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full  mx-auto px-4 py-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Add Doctor
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload */}
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="doc-img"
            className="block w-full mx-auto cursor-pointer"
          >
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors">
              <div className="text-center">
                <img
                  src={
                    docImg ? URL.createObjectURL(docImg) : assets.upload_area
                  }
                  alt="Upload"
                  className="w-24 h-24 mx-auto mb-2"
                />
                <p className="text-sm text-gray-500">
                  Upload doctor picture
                </p>
              </div>
            </div>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
        </div>

        {/* Left Column Inputs */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              value={name}
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor Password
            </label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              name="experience"
              id="experience"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {`${i + 1} Year`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="fee"
              className="block text-sm font-medium text-gray-700"
            >
              Fee
            </label>
            <input
              value={fee}
              type="number"
              id="fee"
              name="fee"
              onChange={(e) => setFee(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Fee"
            />
          </div>
        </div>

        {/* Right Column Inputs */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="speciality"
              className="block text-sm font-medium text-gray-700"
            >
              Speciality
            </label>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              name="speciality"
              id="speciality"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-gray-700"
            >
              Education
            </label>
            <input
              value={degree}
              type="text"
              id="education"
              name="education"
              onChange={(e) => setDegree(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Education"
            />
          </div>
          <div>
            <label
              htmlFor="address1"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              value={address1}
              type="text"
              id="address1"
              name="address1"
              required
              onChange={(e) => setAddress1(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Address 1"
            />
          </div>
          <div>
            <input
              value={address2}
              type="text"
              id="address2"
              name="address2"
              onChange={(e) => setAddress2(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Address 2"
            />
          </div>
        </div>

        {/* About Doctor Textarea */}
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            About Doctor
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            name="about"
            id="about"
            rows={5}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Write about doctor"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
