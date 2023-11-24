import "./App.css"
import {Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage/Homepage"
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recipe/:recipeID" element={<SingleRecipe />} />
    </Routes>
  )
}

export default App
