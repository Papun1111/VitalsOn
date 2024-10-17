import doctorModel from "../models/doctorModel.js";

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

export {changeAvailability,doctorList};