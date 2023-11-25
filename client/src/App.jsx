import "./App.css"
import {Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage/Homepage"
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe"
import Login from "./pages/Login/Login"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recipe/:recipeID" element={<SingleRecipe />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
