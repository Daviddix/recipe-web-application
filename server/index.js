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

//middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser())
app.use(cors(
    {
        credentials : true,
        origin : "http://localhost:5173"
    }
))


//routes
app.use("/user", userRouter)
app.use("/recipe", recipeRouter)




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