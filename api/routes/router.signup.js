const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
require("dotenv/config")
const User = require("../models/user.model")

router.post("/", async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const userExists = await User.findOne({ email : req.body.email })
    if (userExists){
        return res.json({ message : "User already exists" })
    }else {
        const user = new User({ name : req.body.name, email : req.body.email, password : hashedPassword })
        try {    
            const savedUser = await user.save()
            const token = jwt.sign({ userId : savedUser._id, email : savedUser.email
            }, process.env.JWT_KEY, {expiresIn : "1d"})
            console.log(savedUser)
            res.json({ success : true, message : "Account created ", token : token, user : savedUser })
        }catch(error) {
            console.log(error)
            res.json({
                success : false,
                message : "Unable to create account",
                error : error
        }) 
    }  
   }      
})

module.exports = router
