import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// signup
router.post("/signup", async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();

        res.json({message:"User created successfully"});

    }catch(err){
        res.status(500).json({error :"signup failed"});
    }
});


//login

router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
    
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({error:"Invalid credentials"});
  
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"1h",
    });
    res.json({token,user:{id:user._id, name:user.name, email:user.email}});
    
}catch(err){
    res.status(500).json({error :"login failed"});
}
})

export default router;