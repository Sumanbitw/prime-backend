const express = require("express")
const watchlaterModels = require("../models/watchlater.model")
const mongoose = require("mongoose")
const router = express.Router()

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userVideo = await watchlaterModels.find({ user : { _id : userId } }).populate('video').exec();
        res.json({ watchlaterVideo : userVideo, success : true, message : "Video found" })
    } catch ( err ) {
        res.json({ message : err, success : false, message : "Video not found" })
    }  
})

router.post("/", async (req,res) => {
    try {
        const newVideo = new watchlaterModels(req.body)
        const savedVideo = await newVideo.save()
        res.status(201).json({ video : savedVideo, success:true, message : "Added video" })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Failed to add cart items",
            error : error
        })
    }
})

router.delete("/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params
    try {
        const removedWatchlaterVideos = await watchlaterModels.remove({ user : userId, video : videoId })
        console.log(removedWatchlaterVideos)
        res.json({ success : true, message : "Video removed", removedWatchlaterVideos : removedWatchlaterVideos })
    }catch(error){
        res.json({
            success : false,
            message : "Error while removing video "
        })
    }
})

module.exports = router