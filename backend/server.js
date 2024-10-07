import express from "express"
import cors from "cors"
import "dotenv/config"
import bodyParser from "body-parser"
import connectCloudinary from "./config/cloudinary.js"
//app config
import dbcall from "./config/db.js"
const app=express();
const port=process.env.PORT||4000;

//middlewares
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
app.use(cors());


app.get("/",(req,res)=>{
    res.send("lauda");
})





app.listen(port,()=>{
console.log("server running of port",port);
dbcall();
connectCloudinary();
});
