require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const verifymiddleware = (req,res,next)=>{

    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({message:'Token not found'})
    }
    const authheaders = token.split(' ')[1];

    try {
        const decoded = jwt.verify(authheaders,process.env.SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({message:'No token found try again later'})
        
    }

}
module.exports=verifymiddleware;