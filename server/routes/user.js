const express = require("express")
const userModel = require("../models/user")
const { noBodyDataError, unknownError, userNotFoundInDataBase, wrongPassword, logoutError, duplicateUsername, duplicateEmail, noJwtToken, jwtTokenError } = require("../actions/errorMessages")
const cloudinary = require('cloudinary').v2
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userCreated, loginSuccessful, logoutSuccessful } = require("../actions/successMessages")
const JWT_SECRET = process.env.JWT_SECRET
const timeBeforeItExpires = 500000

cloudinary.config({
    cloud_name: "dqdzhocgi",
    api_key : "153191799636678",
    api_secret : "DAxDO2_oqJk5asFH7yFg0D7mysE"
})

userRouter = express.Router()



// functions / middlewares 

function generateJwtToken(userId){
    return jwt.sign({userId}, JWT_SECRET, {expiresIn : timeBeforeItExpires})
}

async function checkForDuplicateUsername(username){
    const existingUser = await userModel.findOne({ username });
    return !!existingUser;
}

async function checkForDuplicateEmail(email){
    const existingAddress = await userModel.findOne({ email });
    return !!existingAddress;
}

async function useAuth(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(400).json(noJwtToken)
  }

  jwt.verify(token, JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res.status(400).json(jwtTokenError)
    }
    req.user = decoded;
    next()
  })
}


userRouter.post("/signup", async (req, res)=>{
    try{
        if(req.body.username){ 
            const {profilePicture, username,email,password} = req.body

            const isDuplicateUsername = await checkForDuplicateUsername(username)

            if (isDuplicateUsername) {
                return res.status(400).json(duplicateUsername)
            }

            // Check for duplicate email
            const isDuplicateEmail = await checkForDuplicateEmail(email)
            if (isDuplicateEmail) {
                return res.status(400).json(duplicateEmail);
            }

            const imageBuffer = Buffer.from(profilePicture, "base64") 

            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
              async function (error, result) {
                if (error) {
                  res.status(400).json(unknownError);
                }

                const userMade = await userModel.create({
                  profilePicture: result.url,
                  username,
                  email,
                  password,
                });

                const userToken = await generateJwtToken(userMade._id)

                res.cookie("jwt", userToken, {
                  httpOnly: true,
                  maxAge: timeBeforeItExpires,
                })

                res.status(201).json(userCreated);
              }
            ).end(imageBuffer)
                        
        }
        else{
            res.status(401).json(noBodyDataError)
        }
    }
    catch(err){
        console.log(err.message)
        res.status(400).json(unknownError)
    }
})

userRouter.post("/login", async (req, res)=>{
    try{
        if(req.body.email && req.body.password){
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

userRouter.get("/profile/:profileID", useAuth, async (req, res)=>{
    try{
        const id = req.params.profileID
        const user = await userModel.findById(id, ["username", "recipesPosted", "profilePicture"]).populate(
              {
             path :"recipesPosted",
             populate: { path: 'recipeAuthor', select : ["username", "profilePicture"] }
            })
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
})

userRouter.get("/profile/", useAuth, async (req, res)=>{
    try{
        const id = req.user.userId
        const user = await userModel.findById(id, ["_id", "profilePicture"])
        res.status(200).json(user) 
    }
    catch(err){
        res.status(500).json(unknownError)
    }
})

userRouter.get("/logout", async(req,res)=>{
    try{
        res.cookie("jwt", "").json(logoutSuccessful)
    }
    catch(err){
        res.status(400).json(logoutError)
    }
})

module.exports = userRouter