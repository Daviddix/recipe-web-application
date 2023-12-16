import "./Profile.css"
import AuthModal from "../../components/AuthModal/AuthModal";
import { authAtom } from "../../components/UserButton/UserButton";
import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./Profile.css"
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";


function Profile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const {profileID} = useParams()
    const [userDetails, setUserDetails] = useState({})
    const[loadingProfile, setLoadingProfile] = useState(true)
    const navigate = useNavigate()
    const mappedRecipes = userDetails?.recipesPosted?.map((recipe)=>{
      return (
        <RecipeCard
          recipeRefresher={setUserDetails}
          page={"profile"}
          profileID={profileID}
          key={recipe._id}
          {...recipe}
        />
      );
  })
    useEffect(()=>{
        getProfileDetails()
      }, [])

  async function getProfileDetails() {
    try {
      const profileResponse = await fetch(`http://localhost:3000/user/profile/${profileID}`, {
        credentials: "include"
      })
      const jsonResponse = await profileResponse.json()
      if (!profileResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setUserDetails(jsonResponse)
      setIsAuthenticated(true)
      setLoadingProfile(false)
    }
    catch (err) {
      setLoadingProfile(false)
      setIsAuthenticated(false)
    }
  }

  function goBack(){
    navigate(-1)
  }
  return (
    loadingProfile? 
    <Loader messageToDisplay={"Loading Profile Details"} />
    :
    isAuthenticated?
    <>
    <header className="profile-header">
    <button 
    onClick={goBack}
    className="back-button">
          <img src={leftArrowIcon} alt="go back to previous page" />
        </button>
    </header>

    <main className="profile-main">
        <div className="profile-info">
            <img 
            src={userDetails?.profilePicture}
            alt="your profile picture" className="profile-picture" />

            <h1>{userDetails?.username}</h1>
            <p>{userDetails?.recipesPosted?.length} Recipes Published</p>
        </div>

        <div className="created-recipes-container">
            {mappedRecipes}
        </div>
    </main>
    </>
    :
    <AuthModal />
  )
}

export default Profile