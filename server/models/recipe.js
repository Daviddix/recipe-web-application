const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userModel = require("./user")

const recipeSchema = new mongoose.Schema({
    recipeName : {
        type : String, 
        required : true
    },

    recipeImage : {
        type : String, 
        required : true
    },

    recipeIngredients : {
        type : [String], 
        required : true
    },

    recipePreparationProcess : {
        type : String,
         required : true
        },

        recipeTime : {
        type : Number,
         required : true
        },

        recipeCalories : {
        type : Number,
         required : true
        },

    recipeAuthor : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Users"
    },

    madeByUser : {
        type: Boolean,
        required : true,
        default : false
    }
})

const recipeModel = mongoose.model("Recipes", recipeSchema)

module.exports = recipeModel