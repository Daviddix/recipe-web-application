import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import plusIcon from "../../assets/icons/plus-2.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import "./AddRecipe.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddRecipe() {
  return (
    <>
      <header className="add-recipe-header">
        <button className="back-button">
          <img src={leftArrowIcon} alt="go back to previous page" />
        </button>

        <h1>Add a Recipe</h1>
      </header>

      <main className="add-recipe-main">
        <p>Fill in the details for your recipe</p>

        <form className="add-recipe-form">
          <div className="recipe-name-container">
            <label htmlFor="recipe-name">Recipe Name</label>
            <input type="text" name="recipe-name" id="recipe-name" />
          </div>

          <div className="display-image-container">
            <label htmlFor="recipe-image">Display Image</label>
            <div className="image-container">
              <img src={pictureIcon} alt="picture icon" />
              <p>Tap to add image</p>
            </div>
          </div>

          <div className="recipe-ingredients-container">
            <label htmlFor="recipe-ingredients">Ingredients</label>
            <input type="text" name="recipe-name" id="recipe-name" />
            <button>
              <img src={plusIcon} alt="add recipe" />
              Add Ingredient
            </button>
          </div>

          <div className="recipe-process-container">
            <label>Preparation Process</label>
            <ReactQuill theme="snow" />
          </div>

          <div className="calories-and-time-container">
            <div className="time-container">
              <label htmlFor="recipe-time">Time(in minutes)</label>
              <input type="number" name="recipe-time" id="recipe-time" />
            </div>

            <div className="calories-container">
              <label htmlFor="recipe-calories">Calories</label>
              <input
                type="number"
                name="recipe-calories"
                id="recipe-calories"
              />
            </div>
          </div>

          <button className="primary-button">Add Recipe</button>
        </form>
      </main>
    </>
  );
}

export default AddRecipe;
