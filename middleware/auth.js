import jwt from "jsonwebtoken";

export function authmiddleware(req,res,next){
    const token = req.header("Authorization")?.replace("Bearer","");

    if(!token) return res.status(400).json({error:"No token, auth denied"});
   
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({error:"Token is not valid"});
    }
}