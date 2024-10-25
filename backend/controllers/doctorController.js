import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
export {changeAvailability,doctorList,loginDoctor};