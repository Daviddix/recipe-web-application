import AuthModal from "../../components/AuthModal/AuthModal";
import { authAtom } from "../../components/UserButton/UserButton";
import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import editIcon from "../../assets/icons/edit.svg";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import "./EditProfile.css"


function EditProfile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const inputRef = useRef(null);
    const [userDetails, setUserDetails] = useState({})
    const [updatingProfilePicture, setUpdatingProfilePicture] = useState(false)
    const [showUpdateUsername, setShowUpdateUsername] = useState(false)
    const [newUsernameToUpdate, setNewUsernameToUpdate] = useState("")
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
      const profileResponse = await fetch(`https://recipe-web-app-server-352s.onrender.com/user/edit/profile/`, {
        credentials: "include"
      })
      const jsonResponse = await profileResponse.json()
      if (!profileResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setUserDetails(jsonResponse)
      setNewUsernameToUpdate(jsonResponse.username)
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

  function triggerFileInput() {
    inputRef.current.click()
  }

  async function updateProfilePicture(e){
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async function (e) {
       const base64Url = e.target.result.split(",")[1]
       const data = {newProfilePicture : base64Url }
       try{
          setUpdatingProfilePicture(true)
          const profilePictureResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/user/edit/profile/", {
          method : "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          credentials : "include"
      })
      const profilePictureResponseJson = await profilePictureResponse.json()
      if(!profilePictureResponse.ok){
          throw Error("err", {cause : profilePictureResponseJson})
      }
      setUpdatingProfilePicture(false)
      alert("your profile picture has been updated")
      getProfileDetails()
      }
      catch(err){
          setUpdatingProfilePicture(false)
          alert("an error ocurred")
          console.log(err.cause, err)
      }
      }

      reader.readAsDataURL(file);
    }
    
    
  }

  async function updateUsername(e, newUsername){
    e.preventDefault()
    const data = {newUsername}
    try{
      const usernameResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/user/edit/profile/", {
      method : "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials : "include"
  })
  const usernameResponseJson = await usernameResponse.json()
  if(!usernameResponse.ok){
      throw Error("err", {cause : usernameResponseJson})
  }
  alert("your username has been updated")
  getProfileDetails()
  setShowUpdateUsername(false)
  }
  catch(err){
    if(err.cause.reason == "duplicate username"){
      alert(err.cause.message)
    }else{
      alert("an unknown ocurred, please try again")
    }
  }
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
            <div className={
              updatingProfilePicture?
              "profile-picture-and-icon loading"
              :
              "profile-picture-and-icon"
            }>
                <img 
            src={userDetails?.profilePicture }
            alt="your profile picture" 
            className="profile-picture" 
            />

            <button
            onClick={triggerFileInput}
             className="edit-icon">
                <img src={editIcon} alt="edit profile icon" />
            </button>
            </div>
            

            {
            !showUpdateUsername?
            <div className="username-and-icon">
                <h1>{userDetails?.username}</h1>
            <button className="edit-icon">
                <img 
                onClick={()=>{
                  setShowUpdateUsername((prev)=> !prev)
                }}
                src={editIcon} alt="edit profile icon" />
            </button>
            </div>
              :
             <form 
            onSubmit={(e)=>{
              updateUsername(e, newUsernameToUpdate)
            }}
            className="input-and-icon">
              <input 
              value={newUsernameToUpdate}
              onChange={(e)=>{
                setNewUsernameToUpdate(e.target.value)
              }}
              minLength={3}
              required
              maxLength={15}
              type="text" />
              <button className="primary-button">Update</button>
            </form>
            }
            
            <p>{userDetails?.recipesPosted?.length} Recipes Published</p>
            
        </div>

        <div className="created-recipes-container">
            {mappedRecipes}
        </div>
    </main>

    <input
        ref={inputRef}
        name="profilePicture"
        id="profilePicture"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => updateProfilePicture(e)}
        accept="image/*"
      />
    </>
    :
    <AuthModal />
  )
}

export default EditProfile