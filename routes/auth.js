require('dotenv').config();
const bcrypt = require('bcrypt');
const limit = require('express-rate-limit');
const jwt =require('jsonwebtoken');
const z= require('zod');
const express  =require('express');
const router = express.Router();

const user ={
    Username:'Smartkid',
    Password:bcrypt.hashSync('11962',12),
};
console.log(user);


const limitor = limit({
    windowMs:30*60*1000,
    max:30,
    message:{message:'Too many attempts try again later'},
});

const loginschemas =z.object({
    username:z.string().min(1,'please this field is required'),
    password:z.string().min(1,'please fill this field bruh'),
})

const loginmiddleware = (req,res,next)=>{
    try {
        const results = loginschemas.safeParse(req.body);
        if(!results.success){
            return res.status(401).json({message:'fill this fields honourable'});
        }
        next();

    } catch (error) {
        
        if(error instanceof z.ZodError){
            return res.status(401).json({message:error.errors[0].message});
        }
        res.status(401).json({message:'incorrect details try again'});
    }
}
router.post('/login',loginmiddleware,limitor,async(req,res)=>{
    const {username,password} = req.body;

    if(username!==user.Username){
        return res.status(422).json({message:'user not found'});
    }
    const match = await bcrypt.compare(password,user.Password);
    if(!match){
        return res.status(401).json({message:'incorrect details try again'});
    }
    const token = jwt.sign({username},process.env.SECRET_KEY,{expiresIn:'1h'});

    return res.status(200).json({message:`${username} welcome honourable`,token:token})
})
module.exports =router;