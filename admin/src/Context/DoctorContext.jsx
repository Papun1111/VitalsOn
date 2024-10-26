import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext=createContext();

const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL
const [dtoken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):"")
const [appointments,setAppointments]=useState([]);
const getAppointments=async () => {
    try {
        const {data}=await axios.get(backendUrl+"/api/doctor/appointments",{headers:{dtoken}})
        if(data.success){
            setAppointments(data.appointments.reverse())
            console.log(appointments)

        }else{
            toast.error(data.message)
        }
    } catch (error) {
        
    }
}
const completeAppointment=async (appointmentId) => {
    try {
        const {data}=await axios.post(backendUrl+"/api/doctor/complete-appointment",{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments();
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        
    }
}
const cancelAppointment=async (appointmentId) => {
    try {
        const {data}=await axios.post(backendUrl+"/api/doctor/cancel-appointment",{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments();
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        
    }
}
const value={
dtoken,setDToken,backendUrl,getAppointments,appointments,completeAppointment,cancelAppointment
}

return (
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
)
}
export default DoctorContextProvider;