const express = require("express")

recipeRouter = express.Router()

recipeRouter.get("/", (req, res)=>{
    res.send("hit recipe endpoint")
})

module.exports = recipeRouter