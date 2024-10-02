import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from "../Context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (!doctors) return; // Guard clause if doctors is undefined or null
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality]); // Optimized to only re-run on speciality change

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-10">Browse through the doctor specialists</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <p style={speciality==="General physician"?{backgroundColor:"black"}:{}}  onClick={()=>speciality==="General physician"?navigate("/doctors"):navigate("/doctors/General physician")} className="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-blue-200 transition-colors">General Physician</p>
        <p style={speciality==="Gynecologist"?{backgroundColor:"black"}:{}} onClick={()=>speciality==="Gynecologist"?navigate("/doctors"):navigate("/doctors/Gynecologist")} className="bg-pink-100 text-pink-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-pink-200 transition-colors">Gynecologist</p>
        <p style={speciality==="Dermatologist"?{backgroundColor:"black"}:{}}  onClick={()=>speciality==="Dermatologist"?navigate("/doctors"):navigate("/doctors/Dermatologist")} className="bg-green-100 text-green-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-green-200 transition-colors">Dermatologist</p>
        <p style={speciality==="Pediatricians"?{backgroundColor:"black"}:{}}  onClick={()=>speciality==="Pediatricians"?navigate("/doctors"):navigate("/doctors/Pediatricians")} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-yellow-200 transition-colors">Pediatricians</p>
        <p style={speciality==="Neurologist"?{backgroundColor:"black"}:{}}  onClick={()=>speciality==="Neurologist"?navigate("/doctors"):navigate("/doctors/Neurologist")} className="bg-purple-100 text-purple-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-purple-200 transition-colors">Neurologist</p>
        <p style={speciality==="Gastroenterologist"?{backgroundColor:"black"}:{}} onClick={()=>speciality==="Gastroenterologist"?navigate("/doctors"):navigate("/doctors/Gastroenterologist")} className="bg-red-100 text-red-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-red-200 transition-colors">Gastroenterologist</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterDoc.map((item, index) => (
          <div 
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover" // Ensures image fits without stretching
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.speciality}</p>
              <p className="text-sm text-green-500 font-semibold">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;
