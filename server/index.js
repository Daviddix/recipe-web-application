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

const whitelist = ["http://localhost:5173", "https://deliciouso.netlify.app/", "https://deliciouso.netlify.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials : true
}

app.use(cors(corsOptions))


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