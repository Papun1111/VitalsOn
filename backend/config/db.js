import mongoose from "mongoose";
const URI=process.env.MONGO_URL
 const dbcall=async()=>{
    try{
  await mongoose.connect(URI)
  console.log("db connected")
    }
    catch(e){
        console.log("db not connected change your internet or check for url link",e);
    }
}

export default dbcall;

