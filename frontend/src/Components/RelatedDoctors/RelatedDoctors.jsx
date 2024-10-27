import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext);
    const [relatedDocs, setRelatedDocs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const filteredDoctors = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelatedDocs(filteredDoctors);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="bg-blue-50 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Recommended Doctors</h1>
            <p className="text-gray-600 mb-6">Explore our trusted list of recommended doctors</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDocs.slice(0, 5).map((doctor, index) => (
                    <div key={index} 
                         className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                         onClick={() => navigate(`/appointment/${doctor._id}`)}>
                        <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="w-full h-48 object-cover" // Changed from object-contain to object-cover for a better image display
                        />
                        <div className="p-4">
                            <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
                            <p className="text-gray-600">{doctor.speciality}</p>
                            <p className="text-sm text-green-500 font-semibold mt-1">{doctor.available?"Available":"Not Available"}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600"
                        onClick={() => {
                            navigate("/doctors");
                            window.scrollTo(0, 0);
                        }}>
                    See More Doctors
                </button>
            </div>
        </div>
    );
}

export default RelatedDoctors;
