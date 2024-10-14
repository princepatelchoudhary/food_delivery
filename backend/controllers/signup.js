const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwtSecret=process.env.jwtSecret;

exports.signup = async (req, res) => {
    const{name, email, password}=req.body;
    console.log(name,email,password);
    if(!name || !email || !password)
    {
        return res.status(400).json({
            success:false,
            message:"fill all column"
        })
    }
    let user= await User.findOne({email});
    if(user)
    {
        return res.status(500).json({
            success:false,
            message:'user already exit'
        })
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    catch (err) {
        return res.status(501).json({
            success: false,
            message: "Error in hashing password"
        })
    }
    try{
        await User.create({
            name,
            email,
            password:hashedPassword
        }).then(user => {
            const data = {
                email:email,
                password:hashedPassword
            }
            const authToken = jwt.sign(data, jwtSecret);
            
            res.status(200).json({ 
                success: true, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    }
    catch(err)
    {
        res.status(400).json({
            success: false,
            err})
    }
}