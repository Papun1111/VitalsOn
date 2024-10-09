import express from "express"
import cors from "cors"
import "dotenv/config"
import bodyParser from "body-parser"
import connectCloudinary from "./config/cloudinary.js"
//app config
import dbcall from "./config/db.js"
import adminRouter from "./routes/adminRoute.js"
const app=express();
const port=process.env.PORT||4000;

//middlewares
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
app.use(cors());

app.use("/api/admin",adminRouter);
app.get("/",(req,res)=>{
    res.send("");
})





app.listen(port,()=>{
console.log("server running of port",port);
dbcall();
connectCloudinary();
});
