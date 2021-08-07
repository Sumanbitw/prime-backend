const express = require("express")
const watchlaterModels = require("../models/watchlater.model")
const mongoose = require("mongoose")
const router = express.Router()

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userVideo = await watchlaterModels.find({ user : { _id : userId } }).populate('Video').exec();
        res.json({ watchlaterVideo : userVideo, success : true, message : "Video found" })
    } catch ( err ) {
        res.json({ message : err, success : false, message : "Video not found" })
    }  
})

router.post("/:userId/:videoId", async (req,res) => {
    const { videoId } = req.params
  try {
    const video = await Video.findOne({ _id: videoId });
    const isVideoPresent = video.includes(req.body);

    isVideoPresent 
    ? video.pull(req.body) 
    : video.push(req.body);

    await video.save();
    res.json({
      success: true,
      updatedVideo: video,
      message: 'Watch later videos updated'
    })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Unable to update Watch later videos' })
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