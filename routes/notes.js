const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const verifyjsonwebtoken = require('../midddleware');


router.post('/addnote',verifyjsonwebtoken,(req,res)=>{
    const {notesel} = req.body;

    return res.status(200).json({message:notesel})
})
module.exports = router;





