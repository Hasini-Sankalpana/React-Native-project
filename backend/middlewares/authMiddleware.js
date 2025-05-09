import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const auth = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(400).json({success:false,message:"Token is missing!"})
    }

    try{

    const decodeToken = jwt.verify(token,process.env.JWT_SECRET)

    const userId = decodeToken.id || decodeToken._id;

    if(!userId){
        return res.status(403).json({success:false,message:"Token missing user identification"})
    }
    
    req.user = { 
        _id: new mongoose.Types.ObjectId(userId) 
      };

    next()
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error!"})
    }
}