const express = require("express")
const cloudinary = require('cloudinary').v2


userRouter = express.Router()

userRouter.get("/signup", async (req, res)=>{
    res.send("hit user endpoint")
})

module.exports = userRouter