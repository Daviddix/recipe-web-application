import React from 'react'

function IngredientInput({recipeInfo, setRecipeInfo, num, isNew}) {
  
  return (
    !isNew?
    <input 
    required
    onInput={(e)=>{
      let fakeRecipeInfo = {...recipeInfo}
      fakeRecipeInfo.recipeIngredients[num] = e.target.value
      setRecipeInfo(fakeRecipeInfo)
    }}
    type="text" 
    name="recipeIngredients" 
    id="recipe-ingredients" 
    value={recipeInfo.recipeIngredients[num]}
    />
    :
    <input 
    required
    onInput={(e)=>{
      let fakeRecipeInfo = {...recipeInfo}
        fakeRecipeInfo.newRecipeIngredients[num] = e.target.value
        setRecipeInfo(fakeRecipeInfo)
    }}
    type="text" 
    name="recipeIngredients" 
    id="recipe-ingredients" 
    value={recipeInfo.newRecipeIngredients[num]}
    />
  )
}

export default IngredientInput