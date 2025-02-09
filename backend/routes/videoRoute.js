// videoRouter.js (Optional)
import express from "express";
import appointmentModel from "../models/appointmentModel.js";
import authUser from "../middlewares/authUser.js";    // or authDoctor
import authDoctor from "../middlewares/authDoctor.js";

const videoRouter = express.Router();

videoRouter.get("/join/:appointmentId", authUser, async (req, res) => {
  try {
    // Check if the user is associated with the appointment
    const appointmentId = req.params.appointmentId;
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    
    // userId is set by authUser from the JWT
    if (appointment.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // If authorized, return some success response
    return res.json({ success: true, roomId: appointmentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default videoRouter;
