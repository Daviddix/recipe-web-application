const express = require("express")
const cloudinary = require('cloudinary').v2
const jwt = require("jsonwebtoken")
const { noBodyDataError, unknownError, imageUploadError, notAuthorizedToEdit, notAuthorizedToDelete, noJwtToken, jwtTokenError } = require("../actions/errorMessages")
const recipeModel = require("../models/recipe")
const { recipeCreated, recipeUpdated, recipeDeletedSuccessfully } = require("../actions/successMessages")
const mongoose = require("mongoose")
const userModel = require("../models/user")
const JWT_SECRET = process.env.JWT_SECRET

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
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
                  recipeImage: result.secure_url,
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

recipeRouter.patch("/edit/:recipeID", useAuth, async (req, res)=>{
  const recipeId = req.params.recipeID
  const userId = req.user.userId
  const r = await recipeModel.findById(recipeId).populate("recipeAuthor", ["username"])
  const recipeAuthorId = r.recipeAuthor._id
  
  if(userId != recipeAuthorId){
    return res.status(400).json(notAuthorizedToEdit)
  }
  try{
      if(!req.body.newRecipeName){
          return res.status(404).json(noBodyDataError)
      }
      let {newRecipeName, newRecipeImage ,newRecipeIngredients,newRecipePreparationProcess, newRecipeTime, newRecipeCalories} = req.body

      newRecipeTime = parseInt(newRecipeTime)
      newRecipeCalories = parseInt(newRecipeCalories)

      if(newRecipeImage.toLowerCase().startsWith("http:") || newRecipeImage.toLowerCase().startsWith("https:")){
        const updatedRecipe = {
          recipeName: newRecipeName,
          recipeIngredients: newRecipeIngredients,
          recipePreparationProcess: newRecipePreparationProcess, 
          recipeTime: newRecipeTime, 
          recipeCalories: newRecipeCalories
         }
          await recipeModel.findByIdAndUpdate(recipeId, updatedRecipe)

         return res.status(201).json(recipeUpdated);
      }

      const imageBuffer = Buffer.from(newRecipeImage, "base64") 

          cloudinary.uploader.upload_stream(
              { resource_type: 'auto' },
            async function (error, result) {
              if (error) {
                console.log(error)
                return res.status(400).json(imageUploadError)
              }
              const updatedRecipe = {
               recipeName: newRecipeName, 
               recipeImage: result.secure_url ,
               recipeIngredients: newRecipeIngredients,
               recipePreparationProcess: newRecipePreparationProcess, 
               recipeTime: newRecipeTime, 
               recipeCalories: newRecipeCalories
              }
               await recipeModel.findByIdAndUpdate(recipeId, updatedRecipe)

              res.status(201).json(recipeUpdated);
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

    res.status(200).json(recipes)
  }
  catch(err){
    console.log(err)
    res.status(400).json(unknownError)
  }
})

recipeRouter.get("/edit/:recipeID", useAuth, async (req, res)=>{
  try{
    const id = req.params.recipeID 
    const individualRecipe = await recipeModel.findById(id).populate("recipeAuthor", ["username"])
    res.json(individualRecipe)
  }catch(err){
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

recipeRouter.delete("/:recipeID", useAuth, async (req, res)=>{
  const recipeId = req.params.recipeID
  const userId = req.user.userId
  const r = await recipeModel.findById(recipeId).populate("recipeAuthor", ["username"])
  const recipeAuthorId = r.recipeAuthor._id
  
  if(userId != recipeAuthorId){
    return res.status(400).json(notAuthorizedToDelete)
  }

  try{
    await recipeModel.findByIdAndDelete(recipeId)
    res.status(200).json(recipeDeletedSuccessfully)
  }
  catch (err){
    res.status(400).json(unknownError)
  }
})

module.exports = recipeRouter
