const jwt = require('jsonwebtoken');
const User=require('../models/User');

require("dotenv").config();
const jwtSecret = process.env.jwtSecret;

exports.auth = async (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');

    if (!token) {
        return res.status(402).send({ error: "Invalid Auth Token" })

    }
    try {
        const data = jwt.verify(token, jwtSecret);
        const {email, password}=data;
        console.log(email,password);
        if(!email || !password)
        {
            return res.status(402).send({message:'token is not right'})
        }
        const existingUser = await User.findOne({ email });
        if(existingUser && existingUser.password == password)
        {
            next()
        }
        else {
            return res.status(402).send({err:"not authorize"});
        }

    } catch (error) {
        res.status(401).send({ error: "Invalid Auth Token" })
    }

}