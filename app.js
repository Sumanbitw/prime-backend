const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv/config")

const port = process.env.PORT || 3020
const videoRoute = require('./api/routes/router.video')
const playlistRoute = require("./api/routes/router.playlist")
const signupRoute = require("./api/routes/router.signup")
const loginRoute = require("./api/routes/router.login")
const bookmarkRoute  = require("./api/routes/router.bookmark")
const watchlaterRoute = require("./api/routes/router.watchlater")
const historyRoute = require("./api/routes/router.history")


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true, useUnifiedTopology: true },
    () => console.log("connected to db")
)
app.use(express.urlencoded({extended :true}))
app.use(express.json())
app.use(cors())

app.use('/videos', videoRoute)
app.use('/playlists', playlistRoute)
app.use("/signup", signupRoute)
app.use("/login", loginRoute)
app.use("/bookmark", bookmarkRoute)
app.use("/watchlater", watchlaterRoute)
app.use("/history", historyRoute)

app.get('/', (req,res) => {
    res.status(200).json({ message : "Prime backend" })
})

app.listen(port)