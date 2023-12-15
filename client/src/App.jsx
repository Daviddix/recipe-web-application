import "./App.css"
import {Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage/Homepage"
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import AddRecipe from "./pages/AddRecipe/AddRecipe"
import Profile from "./pages/Profile/Profile"
import EditProfile from "./pages/EditProfile/EditProfile"
import EditRecipe from "./pages/EditRecipe/EditRecipe"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recipe/:recipeID" element={<SingleRecipe />} />
      <Route path="/profile/:profileID" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/edit-recipe/:recipeID" element={<EditRecipe />} />
    </Routes>
  )
}

export default App
