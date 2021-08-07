const express = require("express")
const history = require("../models/history.model")
const mongoose = require("mongoose")
const router = express.Router()
const Video = require("../models/video.model")

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userVideos = await history.find({ user : {_id : userId } }).populate('Video').exec();
        res.json({ video : userVideos, success : true, message : "Videos fetched" })
    } catch ( err ) {
        res.json({ message : err, success : false, message : " Failed to fetch videos" })
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
      message: 'History updated'
    })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Unable to update history' })
  }
})

router.delete("/:userId/:videoId", async (req, res) => {
    const { userId, videoId } = req.params
    try {
        const removedBookmarkVideos = await bookmarkVideos.remove({ user : userId, videoId : videoId })
        console.log(removedBookmarkVideos)
        res.json({ success : true, message : "Videos removed", removedBookmarkVideos : removedBookmarkVideos })
    }catch(error){
        res.json({
            success : false,
            message : "Error while removing videos"
        })
    }
})

module.exports = router