import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from "../Context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
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
  }, [speciality, doctors]); // Added doctors as a dependency

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-10">Browse through the doctor specialists</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          className={`py-1 px-3 border rounded text-sm transition-all ${showFilter ? 'bg-primary text-white' : ''}`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>
        
        {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
          <p 
            key={spec}
            style={speciality === spec ? { backgroundColor: "black" } : {}} 
            onClick={() => navigate(`/doctors/${spec}`)} 
            className={`bg-${spec === 'Gynecologist' ? 'pink' : spec === 'Dermatologist' ? 'green' : spec === 'Pediatricians' ? 'yellow' : spec === 'Neurologist' ? 'purple' : 'red'}-100 text-${spec === 'Gynecologist' ? 'pink' : spec === 'Dermatologist' ? 'green' : spec === 'Pediatricians' ? 'yellow' : spec === 'Neurologist' ? 'purple' : 'red'}-800 px-4 py-2 rounded shadow cursor-pointer hover:bg-${spec === 'Gynecologist' ? 'pink' : spec === 'Dermatologist' ? 'green' : spec === 'Pediatricians' ? 'yellow' : spec === 'Neurologist' ? 'purple' : 'red'}-200 transition-colors`}
          >
            {spec}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterDoc.map((item) => (
          <div 
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={item._id}
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
