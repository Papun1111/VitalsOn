import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe"
import razorpay from "razorpay"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const registerUser = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Missing details" });
    }
    //validationg strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPass,
      phone
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    //_id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
//api to get iser profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
//api to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
////API TO BOOK APOINTMENT'
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const doctorData = await doctorModel.findById(docId).select("-password");
    if (!doctorData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    
    let slots_booked = doctorData.slots_booked;
    
    // Checking for slot availability
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }
    
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    } else {
      slots_booked[slotDate].push(slotTime);
    }
    
    const userData = await userModel.findById(userId).select("-password");
    
    // Create appointment data, ensuring correct field names
    const appointmentData = {
      userId,
      docId,
      userData,
      doctorData, // Ensure this matches the schema
      amount: doctorData.fee,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    
    // Save updated slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    
    res.json({ success: true, message: "Appointment Booked" });
    
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
//api to get user appointments for frontend my-appointment page
const listAppointment=async (req,res) => {
  try {
    const{userId}=req.body;
    const appointments=await appointmentModel.find({userId});
     res.json({success:true,appointments});
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}
//API to cancel appointment
const cancelAppointment=async (req,res) => {
  
  try {
  const {userId,appointmentId}=req.body;
  const appointmentData=await appointmentModel.findById(appointmentId);
  if(appointmentData.userId!=userId){
return res.json({success:false,message:"Unauthorized action"});
  }  
  await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
  //releasing doctors slot
  const {docId,slotDate,slotTime}=appointmentData;
  const doctorData=await doctorModel.findById(docId);
  let slots_booked=doctorData.slots_booked;
  slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
  await doctorModel.findByIdAndUpdate(docId,{slots_booked});
  res.json({success:true,message:"Appointment Cancelled"});
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}
//api for payment gateway

const paymentStripe = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Fetch the appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment is cancelled or Not Found" });
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
   // Specify payment method types
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY,
            product_data: {
              name: `Appointment #${appointmentId}`, // Customize as needed
            },
            unit_amount: appointmentData.amount * 153, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://vitalson.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`, // Redirect after successful payment
      cancel_url: "https://vitalson.onrender.com/", // Redirect if payment is cancelled
    });

    res.json({ success: true, session });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
 
const verify = async (req, res) => {
  try {
    const { id,appointmentId } = req.body; // Get the session ID from the request body


    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(id);
    console.log(session);

    // Check if the session exists and is successful
    if (!session) {
      return res.json({ success: false, message: "Session not found" });
    }

    // Check payment status
    if (session.payment_status == 'paid') {
      // Update your database to mark the appointment as paid
      await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true }); // Example update

      return res.json({ success: true, session });
    } else {
      return res.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment,listAppointment,cancelAppointment,paymentStripe,verify};
