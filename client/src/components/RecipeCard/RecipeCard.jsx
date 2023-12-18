import rightIcon from "../../assets/icons/arrow-right.svg"
import timeIcon from "../../assets/icons/time.svg"
import fireIcon from "../../assets/icons/fire.svg"
import foodBasket from "../../assets/icons/vegetable-basket.svg"
import "./RecipeCard.css"
import {Link} from "react-router-dom"
import { useState } from "react"
import { useAtom } from "jotai"
import { idOfUser } from "../UserButton/UserButton"

function RecipeCard({recipeName, recipeImage, recipeTime, recipeCalories, recipeIngredients, recipeAuthor, _id, madeByUser, recipeRefresher, page, profileID}) {
   const [recipeIngredient, setRecipeIngredient] = useState([...recipeIngredients])
   const [userId, setUserId] = useAtom(idOfUser)
   if(userId == recipeAuthor._id){
    madeByUser = true
   }
   else{
   madeByUser = false
   }

   async function handleRecipeDelete(id, name){
    try{
        const deleteResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/recipe/${id}`, {
        credentials : "include",
        method : "DELETE"
    })  
    const deleteResponseJson = await deleteResponse.json()
    if(!deleteResponse.ok){
        throw Error({cause : deleteResponseJson})
    }
    refreshRecipes(recipeRefresher, page, profileID)
    alert(`the recipe you created for ${name} has successfully been deleted`)
    }
    catch (err){
        console.log(err)
        alert("could not delete that recipe")
        
    }
    
   }

   async function refreshRecipes(setterFunction, currentPage, profile){
    if(currentPage == "profile"){
        try {
            const profileResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/user/profile/${profile}`, {
              credentials: "include"
            })
            const jsonResponse = await profileResponse.json()
            if (!profileResponse.ok) {
              throw Error("err", { cause: jsonResponse })
            }
            setterFunction(jsonResponse)
            return
          }
          catch (err) {
            alert(err)
            return
          }
    }
    try{
        const recipeResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/recipe/", {
            credentials : "include"
        })

                const recipeResponseInJson = await recipeResponse.json()

                if(!recipeResponse.ok){
                    throw Error("Err", {cause : recipeResponseInJson})
                }
                setterFunction(recipeResponseInJson)
        }
        catch(err){
            console.log(err)
            alert("an error ocurred")
        }
   }

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
            {recipeIngredients.length > 4 ? (
              <>
                <span>{recipeIngredient[0]}</span>
                <span> ,{recipeIngredient[1]}</span>
                <span> ,{recipeIngredient[2]}</span>
                <span> ,{recipeIngredient[3]}</span>
                <span> and {recipeIngredient.length - 4} more</span>
              </>
            ) : (
              <>
                <span>{recipeIngredient[0]}</span>
                {recipeIngredient[1] &&  <span> ,{recipeIngredient[1]}</span>}
                {recipeIngredient[2] &&  <span> ,{recipeIngredient[2]}</span>}
                {recipeIngredient[3] &&  <span> ,{recipeIngredient[3]}</span>}
              </>
            )}
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

        {madeByUser && (
          <div className="update-and-delete">
            <Link to={`/edit-recipe/${_id}`}>
              <button className="primary-button">Update</button>
            </Link>

            
              <button
              onClick={()=>{
                handleRecipeDelete(_id, recipeName)
              }}
              >Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard