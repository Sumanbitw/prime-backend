const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Video = require("../models/video.model")

router.get('/', async (req, res, next) => {
    try {
        const newVideo = await Video.find({})
        res.status(200).json(newVideo)
    }catch(error) {
        res.status(404).json({
            message : error
        })
    }
})

router.post('/', async (req, res, next) => {
    const video = new Video ({
        videoId : req.body.videoId,
        categories : req.body.categories,
        channelName :req.body.channelName,
        imageURL :req.body.imageURL,
        title : req.body.title,
        description :req.body.description,
        publishedDate :req.body.publishedDate,
        subscribers : req.body.subscribers,
        views : req.body.views,
        thumbnailImageURL :req.body.thumbnailImageURL,
    })
    try {
        const savedVideo = await video.save();
        res.status(200).json(savedVideo)
    }catch(error) {
        res.status(404).json({
            message : error
        })
    }
})

router.get('/:videoId', async (req, res, next) => {
    const { videoId } = req.params
    try {
        const video = await Video.findOne({ _id : videoId })
        res.status(200).json(video)
    }catch(error) {
        res.status(404).json({
            message : error
        })
    }
})

module.exports = router