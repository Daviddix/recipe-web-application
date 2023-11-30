const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userModel = require("./user")

const recipeSchema = new mongoose.Schema({
    recipeName : {
        type : String, 
        required : true
    },

    displayImage : {
        type : String, 
        required : true
    },

    ingredients : {
        type : [String], 
        required : true
    },

    preparationProcess : {
        type : String,
         required : true
        },

    time : {
        type : Number,
         required : true
        },

    calories : {
        type : Number,
         required : true
        },

    recipeAuthor : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : userModel
    }]
})

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                return next(err)
            }else{
                user.password = hash
                next()
            }
        })
    })    
})

const recipeModel = mongoose.model("Recipes", recipeSchema)

module.exports = recipeModel