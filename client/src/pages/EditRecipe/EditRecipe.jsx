import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import plusIcon from "../../assets/icons/plus-2.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import "./EditRecipe.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState, useEffect } from "react";
import IngredientInput from "../../components/IngredientInput/IngredientInput";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function EditRecipe() {
    const {recipeID} = useParams()

    useEffect(()=>{
        getRecipeDetails(recipeID)
    }, [])
    const inputRef = useRef(null)
    
  const [newRecipeInfo, setNewRecipeInfo] = useState({
    newRecipeName: "",
    newRecipeImage: "",
    newPreparationProcess: "",
    newRecipeTime: 0,
    newRecipeCalories: 0
  })
  const [noOfIngredientsInput, setNoOfIngredientsInput] = useState([1])

  const mappedIngredientsInputs = noOfIngredientsInput.map((i,num)=>{
    return (
      <IngredientInput
        num={num}
        key={num}
        recipeInfo={newRecipeInfo}
        i={i}
        setRecipeInfo={setNewRecipeInfo}
        isNew={true}
      />
    );
  })

  const [displayImageUrl, setDisplayImageUrl] = useState("")
  

  const [addingRecipe, setAddingRecipe] = useState(false)

  const [gettingRecipeInfo, setGettingRecipeInfo] = useState(true)

  const navigate = useNavigate()

  
  function handleInput(e) {
    setNewRecipeInfo((prevData) => {
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

  async function handleSubmit(e, data, id) {
    e.preventDefault()
    if (displayImageUrl == "") {
      return alert("please add a profile picture")
    }

    if (newRecipeInfo.newRecipePreparationProcess == "" ) {
      return alert("please add a recipe description")
    }
    try {
      setAddingRecipe(true)
      const updatingRecipeResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/recipe/edit/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const jsonResponse = await updatingRecipeResponse.json()
      if (!updatingRecipeResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setAddingRecipe(false)
      navigate("/")
    }
    catch (err) {
      setAddingRecipe(false)
      const reasonForError = err.cause.reason
      if (reasonForError == "image upload") {
        alert(reasonForError)
      }else{
        alert("an error ocurred, please try again")
      }
    }
  }

  async function getRecipeDetails(id){
    try{
        const getRecipeResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/recipe/edit/${id}`, {
                credentials : "include"
            })
            const getRecipeResponseJson = await getRecipeResponse.json()
            if(!getRecipeResponse.ok){
                throw Error("err", {cause : getRecipeResponseJson})
            }
            setNewRecipeInfo({
                newRecipeName: getRecipeResponseJson.recipeName,
                newRecipeImage: getRecipeResponseJson.recipeImage,
                newRecipePreparationProcess: getRecipeResponseJson.recipePreparationProcess,
                newRecipeIngredients: getRecipeResponseJson.recipeIngredients,
                newRecipeTime: getRecipeResponseJson.recipeTime,
                newRecipeCalories: getRecipeResponseJson.recipeCalories
            })
            setDisplayImageUrl(getRecipeResponseJson.recipeImage)
            setNoOfIngredientsInput([...Array(getRecipeResponseJson.recipeIngredients.length)].map((_, i) => 1));
            setGettingRecipeInfo(false)
    }
    catch(err){
        setGettingRecipeInfo(false)
        console.log(err)
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

      <h1>Edit Recipe</h1>
    </header>

    <main className="add-recipe-main edit">
    {
      addingRecipe && <Loader messageToDisplay={"Adding Recipe"} />
    }
    {
        gettingRecipeInfo?
        <div className="loader-message">
        <div className="loader-circle"></div>
        <p>Loading Recipe Info</p>
        </div> 
    :
        <>
        <p>Fill in the details for your recipe</p>

        <form 
        onSubmit={(e)=>{
        handleSubmit(e, newRecipeInfo, recipeID)
        }}
        className="add-recipe-form">
        <div className="recipe-name-container">
            <label htmlFor="recipe-name">Recipe Name</label>
            <input 
            required
            value={newRecipeInfo.newRecipeName}
            onChange={handleInput}
            type="text" 
            name="newRecipeName" 
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
                newRecipeInfo.newRecipeImage == "" && 
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
            value={newRecipeInfo.newRecipePreparationProcess}
            onChange={(e)=> {
            setNewRecipeInfo((prevData) => {
                return {
                ...prevData,
                newRecipePreparationProcess: e
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
            name="newRecipeTime" 
            value={newRecipeInfo.newRecipeTime}
            onChange={handleInput}
            id="recipe-time" 
            />
            </div>

            <div className="calories-container">
            <label htmlFor="recipe-calories">Calories</label>
            <input
                required
                value={newRecipeInfo.newRecipeCalories}
                onChange={handleInput}
                type="number"
                name="newRecipeCalories"
                id="recipe-calories"
            />
            </div>
        </div>

        <button className="primary-button">Update Recipe</button>
        </form>

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
            setNewRecipeInfo((prevData) => {
                return {
                ...prevData,
                newRecipeImage: base64Image
                }
            })
            };

            reader.readAsDataURL(file);
        }
        }}
        accept="image/*"
        />
        </>
    }
    </main>
      
  </>
    
  )
}

export default EditRecipe