//imports
require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.port || 3000
const userRouter = require("./routes/user")
const recipeRouter = require("./routes/recipe")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI

//routes
app.use("/user", userRouter)
app.use("/recipe", recipeRouter)


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())


//MongoDB connection
mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT, () => {
    console.log('App listening on port 3000!');
}) 
})
.catch((err)=>{ 
    console.log("an error ocurred", err)
})