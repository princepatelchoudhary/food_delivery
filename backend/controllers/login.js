const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt =require('jsonwebtoken')

require("dotenv").config();
const jwtSecret=process.env.jwtSecret;

exports.login=async(req,res)=>{
    
    const {email, password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({
            success:false,
            message:"fill all column"
        })
    }
    try{
        let user=await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "invalid email id" });
        }
        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ success:false, error: "incorrect password" });
        }
        const data = {
            email:email,
            password:user.password
        }
        const authToken = jwt.sign(data, jwtSecret);
        res.status(200).json({  
            success:true,
            authToken })
    }
    catch(err)
    {
        res.status(400).json({
            success:false,
            err});
    }
}