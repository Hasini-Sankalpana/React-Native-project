import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../models/userModel.js";

dotenv.config();


export const register = async (req,res)=> {
   const{username,email,password} = req.body;

   if(!username || !email || !password){
    return res.status(400).json({success:false,message:"All fields are required!"})
   }
   
   try {
    const  user = await User.findOne({email})
    if(user){
        res.status(400).json({success:false,message:"User already exist!"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User ({
        username,
        email,
        password:hashedPassword
    })

    const savedUser = await newUser.save()

    const token = JWT.sign({id:savedUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})

    return res.status(201).json({
        success:true,
        message:"User Created Successfully",
        token,
        body:{
            username,
            email
        }
    })


   } catch (error) {
      console.error(error)
      return res.status(500).json({success:false,message:"Internal server error"})
   }
}


export const login = async(req,res) => {
    const{email,password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"User has not registered!"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false,message:"Incorrect Password"})
        }

        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})

        return res.status(200).json({
            success:true,
            message:"Logged in successfully",
            token,
            body:{
              email,
              username:user.username
            }
        })
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}