import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
const changeAvailability=async (req,res) => {
    try {
const {docId}=req.body;
const docData=await doctorModel.findById(docId);
await doctorModel.findByIdAndUpdate(docId,{
    available:!docData.available
})
res.json({success:true,message:"availability changed"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching doctors" });
    }
}
const doctorList=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select(['-password,-email']);
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching doctors" });
    }
}
const loginDoctor=async (req,res) => {
    try {
        const {email,password}=req.body;
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
return res.json({success:false,message:"Invalid credentials"})

        }
        const isMatch=await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }
        return res.json({success:false,message:"invalid credentials"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching doctors" });
    }
}
const appointmentsDoctor=async (req,res) => {
    try {
        const {docId}=req.body;
        const appointments=await appointmentModel.find({docId});
        res.json({success:true,appointments});

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching doctors" });
    }
}
//API FOR DOCTOR
const appointmentComplete=async (req,res) => {
    try {
        const{docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId==docId){
await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
return res.json({success:true,message:"appointment completed"})

        }
        return res.json({success:false,message:"appointment completed"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching doctors" });
    }
}
//cancel appointment from doc side
const appointmentCancel=async (req,res) => {
    try {
        const{docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId==docId){
await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
return res.json({success:true,message:"appointment cancelled"})

        }
        return res.json({success:false,message:"ERRR"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching doctors" });
    }
}
export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel};