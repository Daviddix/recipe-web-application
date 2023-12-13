import React from 'react'

function IngredientInput({recipeInfo, setRecipeInfo, num}) {
  return (
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
  )
}

export default IngredientInput