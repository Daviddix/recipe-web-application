import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import plusIcon from "../../assets/icons/plus-2.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import "./AddRecipe.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import IngredientInput from "../../components/IngredientInput/IngredientInput";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function AddRecipe() {
  const inputRef = useRef(null)

  const [recipeInfo, setRecipeInfo] = useState({
    recipeName: "",
    recipeImage: "",
    recipeIngredients: [],
    recipePreparationProcess: "",
    recipeTime : 0,
    recipeCalories : 0
  })
  const [noOfIngredientsInput, setNoOfIngredientsInput] = useState([1])

  const mappedIngredientsInputs = noOfIngredientsInput.map((i,num)=>{
    return <IngredientInput num={num} recipeInfo={recipeInfo} i={i} setRecipeInfo={setRecipeInfo} />
  })

  const [displayImageUrl, setDisplayImageUrl] = useState("")

  const [addingRecipe, setAddingRecipe] = useState(false)

  const navigate = useNavigate()

  
  function handleInput(e) {
    setRecipeInfo((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  function triggerFileInput() {
    inputRef.current.click();
  }

  function goBack() {
    navigate(-1)
  }

  async function handleSubmit(e, data) {
    e.preventDefault()
    if (displayImageUrl == "") {
      return alert("please add a profile picture")
    }

    if (recipeInfo.recipePreparationProcess == "" ) {
      return alert("please add a recipe description")
    }
    try {
      setAddingRecipe(true)
      const creatingRecipeResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/recipe/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const jsonResponse = await creatingRecipeResponse.json()
      if (!creatingRecipeResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setAddingRecipe(false)
      navigate("/")
    }
    catch (err) {
      setAddingRecipe(false)
      console.log(err, err.cause)
      const reasonForError = err.cause.reason
      if (reasonForError == "image upload") {
        alert(reasonForError)
      }else{
        alert("an error ocurred, please try again")
      }
    }
  }

  return (
    <>
      <header className="add-recipe-header">
        <button 
        onClick={goBack}
        className="back-button">
          <img src={leftArrowIcon} alt="go back to previous page" />
        </button>

        <h1>Add a Recipe</h1>
      </header>

      <main className="add-recipe-main">
      {
        addingRecipe && <Loader messageToDisplay={"Adding Recipe"} />
      }
        <p>Fill in the details for your recipe</p>

        <form 
        onSubmit={(e)=>{
          handleSubmit(e, recipeInfo)
        }}
        className="add-recipe-form">
          <div className="recipe-name-container">
            <label htmlFor="recipe-name">Recipe Name</label>
            <input 
            required
            onChange={handleInput}
            type="text" 
            name="recipeName" 
            id="recipe-name" />
          </div>

          <div className="display-image-container">
            <label htmlFor="recipe-image">Display Image</label>
            <div 
            onClick={()=>{
              triggerFileInput()
            }}
            style={{ backgroundImage: `url(${displayImageUrl})` }}
            className="image-container">
              {
                displayImageUrl == "" && 
                <>
                <img src={pictureIcon} alt="picture icon" />
                <p>Tap to add image</p>
                </>
              }
              
            </div>
          </div>

          <div className="recipe-ingredients-container">
            <label htmlFor="recipe-ingredients">Ingredients</label>
            {mappedIngredientsInputs}
            <button 
            onClick={()=>{
              setNoOfIngredientsInput((prev)=> [...prev, 1])
            }}
            type="button">
              <img src={plusIcon} alt="add recipe" />
              Add Ingredient
            </button>
          </div>

          <div className="recipe-process-container">
            <label>Preparation Process</label>
            <ReactQuill 
            onChange={(e)=> {
              setRecipeInfo((prevData) => {
                return {
                  ...prevData,
                  recipePreparationProcess: e
                }
              })
            }}
            theme="snow" />
          </div>

          <div className="calories-and-time-container">
            <div className="time-container">
              <label htmlFor="recipe-time">Time(in minutes)</label>
              <input 
              required
              type="number" 
              name="recipeTime" 
              onChange={(e)=>{
                handleInput(e)
              }}
              id="recipe-time" 
              />
            </div>

            <div className="calories-container">
              <label htmlFor="recipe-calories">Calories</label>
              <input
                required
                onChange={handleInput}
                type="number"
                name="recipeCalories"
                id="recipe-calories"
              />
            </div>
          </div>

          <button className="primary-button">Add Recipe</button>
        </form>
      </main>

      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const fileInput = e.target;
          const file = fileInput.files[0];
      
          if (file) {
            const reader = new FileReader();
      
            reader.onload = function (e) {
              const imageUrl = e.target.result
              const base64Image = e.target.result.split(",")[1]
              setDisplayImageUrl(imageUrl)
              setRecipeInfo((prevData) => {
                return {
                  ...prevData,
                  recipeImage: base64Image
                }
              })
            };
      
            reader.readAsDataURL(file);
          }
        }}
        accept="image/*"
      />
    </>
  );
}

export default AddRecipe;
