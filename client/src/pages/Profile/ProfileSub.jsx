import { useNavigate, useParams } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./Profile.css"
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

function ProfileSub() {
  const {profileID} = useParams()
    const [userDetails, setUserDetails] = useState({})
    const[loadingProfile, setLoadingProfile] = useState(true)
    const navigate = useNavigate()
    const mappedRecipes = userDetails?.recipesPosted?.map((recipe)=>{
      return <RecipeCard key={recipe._id} {...recipe}/>
  })
    useEffect(()=>{
        getProfileDetails()
      }, [])

  async function getProfileDetails() {
    try {
      const profileResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/user/profile/${profileID}`, {
        credentials: "include"
      })
      const jsonResponse = await profileResponse.json()
      if (!profileResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setUserDetails(jsonResponse)
      setLoadingProfile(false)
    }
    catch (err) {
      setLoadingProfile(false)
      const reasonForError = err.cause.reason
      if (reasonForError == "missing token") {
        alert("login modal")
      } else if (reasonForError == "token error") {
        alert("error with token")
      }else{
        alert("an unknown error ocurred, please try again")
      }
    }
  }

  function goBack(){
    navigate(-1)
  }
  return (
    loadingProfile? 
    <Loader messageToDisplay={"Loading Profile Details"} />
    :
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
  )
}

export default ProfileSub