const express = require('express')
const mongoose = require('mongoose')
const app = require('../app')
const router = express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
require("dotenv/config")
const User = require("../models/user-model")

router.post('/',async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email })
    !user && res.status(401).json({ message : "Auth login failed" })
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    !validatePassword && res.status(401).json({ message : "Wrong Password" })
    
    try{
        let token = jwt.sign({ userId : user._id, email : user.email,
        }, process.env.JWT_KEY, {expiresIn : "1d"})
        token=`Bearer ${token}`;
        res.status(200).json({ message : "Succesfully login", user : user, token : token})
        }catch(error) {
            res.status(500).json({ message : error })
    }
})
    
module.exports = router