import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {AppContext} from "../Context/AppContext"
const Doctor = () => {
  const {speciality}=useParams();
  const {doctors}=useContext(AppContext);  
  const [filterDoc,setFilterDoc]=useState([]);
  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
applyFilter()
  },[doctors,speciality]);
  return (
    <div>
      <p>
        Browser through the doctors specialist.
      </p>
      <div>
      <div>
        <p>General physician</p>
        <p>Gynecologist</p>
        <p>Dermatologist</p>
        <p>Pediatricians</p>
        <p>Neurologist</p>
        <p>Gastroenterologist</p>
      </div>
      <div>
        {filterDoc.map((item, index) => (
          <div onClick={()=>(navigate(`/appointment/${item._id}`))}
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-contain" // Use object-contain for full visibility
            />
            <div className="mt-4 p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500"></p>
                <p className="text-sm text-green-500 font-semibold">Available</p>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Doctor
