import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import dp from "../../assets/images/user.jpg"
import "./Profile.css"

function Profile() {
  return (
    <>
    <header className="profile-header">
    <button className="back-button">
          <img src={leftArrowIcon} alt="go back to previous page" />
        </button>
    </header>

    <main className="profile-main">
        <div className="profile-info">
            <img src={dp} alt="your profile picture" className="profile-picture" />

            <h1>Nsikan-David</h1>
            <p>10 Recipes Published</p>
        </div>

        <div className="created-recipes-container">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
        </div>
    </main>
    </>
  )
}

export default Profile