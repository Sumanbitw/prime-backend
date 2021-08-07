const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
require("dotenv/config")
const User = require("../models/user.model")

router.post('/',async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email })
    !user && res.json({ message : "Auth login failed" })
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    !validatePassword && res.json({ message : "Wrong Password" })
    
    try{
        let token = jwt.sign({ userId : user._id, email : user.email,
        }, process.env.JWT_KEY, {expiresIn : "1d"})
        token=`Bearer ${token}`;
        res.json({ message : "Succesfully login", user : user, token : token, success : true })
        }catch(error) {
            res.json({ success : false, message : "Unable to login ", error : error })
    }
})
    
module.exports = router