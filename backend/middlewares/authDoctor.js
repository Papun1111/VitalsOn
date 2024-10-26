import jwt from "jsonwebtoken"
//auth admin middleware
const authDoctor=async (req,res,next) => {
    try {
        const {dtoken}=req.headers;
        if(!dtoken){
            return res.json({success:false,message:"not authorized"});

        }
        const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET);
        req.body.docId=token_decode.id;
        next();
        }
      catch (error) {
        console.log("Error hai bhai")
        res.json({success:false,message:error.message})
    }
}

export default authDoctor