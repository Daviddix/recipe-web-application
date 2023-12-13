import rightIcon from "../../assets/icons/arrow-right.svg"
import timeIcon from "../../assets/icons/time.svg"
import fireIcon from "../../assets/icons/fire.svg"
import foodBasket from "../../assets/icons/vegetable-basket.svg"
import "./RecipeCard.css"
import {Link} from "react-router-dom"
import { useState } from "react"

function RecipeCard({recipeName, recipeImage, recipeTime, recipeCalories, recipeIngredients, recipeAuthor, _id}) {
   const [recipeIngredient, setRecipeIngredient] = useState([...recipeIngredients])

  return (
    <div className="recipe-card">
            <img src={recipeImage} alt="" />

            <div className="card-info">
                <h1>{recipeName}</h1>

                <div className="time">
                    <img src={timeIcon} alt="time icon" />
                    <p>{recipeTime} mins</p>
                </div>

                <div className="calories">
                <img src={fireIcon} alt="fire icon" />
                    <p>{recipeCalories} Calories</p>
                </div>

                <div className="ingredients">
                <img src={foodBasket} alt="food basket icon" />
                    <p>
                        {   
                        recipeIngredients.length > 4?
                        <>
                            <span>{recipeIngredient[0]}</span>
                            <span> ,{recipeIngredient[1]}</span>
                            <span> ,{recipeIngredient[2]}</span>
                            <span> ,{recipeIngredient[3]}</span>
                            <span> and {recipeIngredient.length - 4} more</span>
                            </>
                            :
                            <>
                             <span>{recipeIngredient[0]}</span>
                            <span> ,{recipeIngredient[1]}</span>
                            <span> ,{recipeIngredient[2]}</span>
                            </>
                        }
                    </p>
                </div>

                <div className="author-and-link">
                    <Link to={`/profile/${recipeAuthor._id}`}>
                    <button className="author">
                        <img src={recipeAuthor.profilePicture} alt="user image" />
                        <p>by {recipeAuthor.username}</p>
                    </button>
                        </Link>

                    <Link to={`/recipe/${_id}`}>
                    <button className="link">
                        <p>Read More</p>
                        <img src={rightIcon} alt="" />
                    </button>
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default RecipeCard