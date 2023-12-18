import leftArrowIcon from "../../assets/icons/arrow-left.svg"
import timeIcon from "../../assets/icons/time.svg"
import fireIcon from "../../assets/icons/fire.svg"
import foodBasket from "../../assets/icons/vegetable-basket.svg"
import "./SingleRecipe.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"

function SingleRecipe() {
    const {recipeID} = useParams()
    const [gettingRecipe, setGettingRecipe] = useState(true)
    const [recipeInfo, setRecipeInfo] = useState({})
    const mappedIngredients = recipeInfo?.recipeIngredients?.map((ingredient)=> {
        return <li>{ingredient}</li>
    })
    const navigate = useNavigate()

    useEffect(()=>{
        getSingleRecipe()
    }, [])

    async function getSingleRecipe(){
        try{
            const recipeResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/recipe/${recipeID}`)
    
            const recipeResponseInJson = await recipeResponse.json()
    
            if(!recipeResponse.ok){
                throw Error("Err", {cause : recipeResponseInJson})
                    }
                    setRecipeInfo(recipeResponseInJson)
                    setGettingRecipe(false) 
            }
            catch(err){
                setGettingRecipe(false)
                console.log(err)
                alert("an error ocurred")
            }
    }

    function goBack() {
        navigate(-1)
      }
  return (
    gettingRecipe ? 
    <Loader messageToDisplay={"Loading Recipe Details"} />
    :
    <>
    <header
    style={{ backgroundImage: `url(${recipeInfo.recipeImage})` }}
     className="recipe-header">
        <button 
        onClick={goBack}
        className="back-button">
            <img src={leftArrowIcon} alt="go back" />
        </button>
    </header>

    <main className="recipe-info-main">
        <h1>{recipeInfo.recipeName}</h1>
        <p>By {recipeInfo.recipeAuthor.username}</p>

        <div className="recipe-info-container">
        <div className="time">
                    <img src={timeIcon} alt="time icon" />
                    <p>{recipeInfo.recipeTime} mins</p>
                </div>

                <div className="calories">
                <img src={fireIcon} alt="fire icon" />
                    <p>{recipeInfo.recipeCalories} Calories</p>
                </div>

                <div className="ingredients">
                <img src={foodBasket} alt="food basket icon" />
                    <p>{recipeInfo.recipeIngredients.length} Ingredients</p>
                </div>
        </div>

        <div className="ingredients-container">
            <h2>Ingredients</h2>
            <ul>
                {mappedIngredients}
            </ul>
        </div>

        <div className="process">
        <h2>Process</h2>

        <div
      dangerouslySetInnerHTML={{__html: recipeInfo.recipePreparationProcess}}
    />
        </div>
    </main>
    </>
  )
}

export default SingleRecipe