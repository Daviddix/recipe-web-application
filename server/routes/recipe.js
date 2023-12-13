const express = require("express")
const cloudinary = require('cloudinary').v2
const jwt = require("jsonwebtoken")
const { noBodyDataError, unknownError, imageUploadError } = require("../actions/errorMessages")
const recipeModel = require("../models/recipe")
const { recipeCreated } = require("../actions/successMessages")
const mongoose = require("mongoose")
const userModel = require("../models/user")
const JWT_SECRET = process.env.JWT_SECRET

cloudinary.config({
    cloud_name: "dqdzhocgi",
    api_key : "153191799636678",
    api_secret : "DAxDO2_oqJk5asFH7yFg0D7mysE"
})

recipeRouter = express.Router()

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

recipeRouter.post("/", useAuth, async (req, res)=>{
    try{
        if(!req.body.recipeName){
            res.status(404).json(noBodyDataError)
        }
        let {recipeName, recipeImage ,recipeIngredients,recipePreparationProcess, recipeTime, recipeCalories} = req.body

        recipeTime = parseInt(recipeTime)
        recipeCalories = parseInt(recipeCalories)

        const imageBuffer = Buffer.from(recipeImage, "base64") 

            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
              async function (error, result) {
                if (error) {
                  console.log(error)
                  return res.status(400).json(imageUploadError)
                }

                const recipeMade = await recipeModel.create({
                  recipeImage: result.url,
                  recipeName,
                  recipeIngredients,
                  recipePreparationProcess, 
                  recipeTime, 
                  recipeCalories,
                  recipeAuthor : req.user.userId
                })

                await userModel.findByIdAndUpdate(
                  req.user.userId,
                  { $push: { recipesPosted: recipeMade._id } },
                  { new: true }
              );

                res.status(201).json(recipeCreated);
              }
            ).end(imageBuffer)

    }
    catch(err){
      res.status(400).json(unknownError);
    }
})

recipeRouter.get("/", async (req, res)=>{
  try{
    const recipes = await recipeModel.find({}).populate("recipeAuthor", ["username", "profilePicture", "_id"])
    res.json(recipes)
  }
  catch(err){
    console.log(err)
    res.status(400).json(unknownError)
  }
})

recipeRouter.get("/:recipeID", async (req, res)=>{
  try{
    const id = req.params.recipeID 
    const individualRecipe = await recipeModel.findById(id).populate("recipeAuthor", ["username"])
    res.json(individualRecipe)
  }catch(err){
    res.status(400).json(unknownError)
  }
    
})

module.exports = recipeRouter