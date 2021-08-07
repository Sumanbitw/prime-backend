const express = require("express")
const watchlaterVideos = require("../models/watchlater.model")
const mongoose = require("mongoose")
const router = express.Router()
const Video = require("../models/video.model")

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userVideo = await watchlaterVideos.find({ user : { _id : userId } }).populate('video').exec();
        res.json({ watchlaterVideo : userVideo, success : true, message : "Video found" })
    } catch ( err ) {
        res.json({ message : err, success : false, message : "Video not found" })
    }  
})

router.post("/", async (req,res) => {
    try {
        const video = new watchlaterVideos(req.body)
        const newVideo = await video.save()
        res.json({ success : true, message : "watchlater videos created", watchlater : newVideo })
    }catch(error){
        res.json({ success : false, message : "watchlater videos cannot be created", error : error})
    }

})

router.delete("/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params
    try {
        const removedWatchlaterVideos = await watchlaterVideos.remove({ user : userId, video : videoId })
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