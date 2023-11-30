const express = require("express")
const userModel = require("../models/user")
const { noBodyDataError, unknownError, userNotFoundInDataBase, wrongPassword, logoutError } = require("../actions/errorMessages")
const cloudinary = require('cloudinary').v2
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userCreated, loginSuccessful, logoutSuccessful } = require("../actions/successMessages")
const JWT_SECRET = process.env.JWT_SECRET
const timeBeforeItExpires = 500000

function generateJwtToken(userId){
    return jwt.sign({userId}, JWT_SECRET, {expiresIn : timeBeforeItExpires})
}


userRouter = express.Router()

userRouter.post("/signup", async (req, res)=>{
    try{
        if(req.body.username){ 
            const {profilePicture, username,email,password} = req.body
            
            const userMade = await userModel.create({profilePicture, username,email,password})

            const userToken = await generateJwtToken(userMade._id)

            res.cookie("jwt", userToken, {httpOnly : true, maxAge : timeBeforeItExpires})

            res.status(201).json(userCreated) 
        }
        else{
            res.status(401).json(noBodyDataError)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(unknownError)
    }
})

userRouter.post("/login", async (req, res)=>{
    try{
        if(req.body){
            const {email, password} = req.body
            const userInDb = await userModel.findOne({email})
            if(!userInDb){
              return res.status(404).json(userNotFoundInDataBase)
            }
            
            const passwordIsCorrect = await bcrypt.compare(password, userInDb.password) 
            
            if(!passwordIsCorrect){
                return res.status(401).json(wrongPassword)
            }

            const userToken = await generateJwtToken(userInDb._id)
            res.cookie("jwt", userToken)
            res.status(201).json(loginSuccessful)
        }
        else{
            res.status(400).json(noBodyDataError)
        }
    }
    catch(e){
        console.log(e)
        res.status(400).json(unknownError)
    }
}) 

userRouter.get("/profile/logout", async(req,res)=>{
    try{
        res.cookie("jwt", "").json(logoutSuccessful)
    }
    catch(err){
        res.status(400).json(logoutError)
    }
})

module.exports = userRouter