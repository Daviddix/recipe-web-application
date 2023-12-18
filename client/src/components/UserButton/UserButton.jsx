import { useAtom, atom } from 'jotai'
import { Link } from 'react-router-dom'
import userIcon from "../../assets/icons/user.svg"
import { useState, useLayoutEffect } from 'react'

export const authAtom = atom(false)
export const idOfUser = atom("e-val")

function UserButton({setRecipes}) {
    const [idOfUserState, setIdOfUserState] = useAtom(idOfUser)
    const [openMenuTab, setOpenMenuTab] = useState(false)
    const [profileImageUrl, setProfileImageUrl] = useState("")
    const [gettingProfileImage, setGettingProfileImage] = useState(true)
    
    const [isAuthenticated, setIsAuthenticated] = useAtom(authAtom)

    useLayoutEffect(()=>{
        getProfileInfo()
    }, [])

    function toggleMenuTab(){
        setOpenMenuTab((prev)=> !prev)
    }

    async function getProfileInfo(){
        try {
            const profileResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/user/profile/",{
            credentials: "include"
        })
        const jsonResponse = await profileResponse.json()
        if(!profileResponse.ok){
            throw Error("err", {cause : jsonResponse})
        }
        setProfileImageUrl(jsonResponse.profilePicture)
        setIdOfUserState(jsonResponse._id)
        setIsAuthenticated(true)
        setGettingProfileImage(false)
    }
        catch(err){
            setIsAuthenticated(false)
            setIdOfUserState("fetch-error")
            setGettingProfileImage(false)
        }   
    }

    async function handleLogout(){
        try {
            const logoutResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/user/logout",{
            credentials: "include"
        })
        const jsonResponse = await logoutResponse.json()
        if(!logoutResponse.ok){
            throw Error("err", {cause : jsonResponse})
        }
        setIsAuthenticated(false)
        setIdOfUserState("")
        setOpenMenuTab(false)
    }
        catch(err){
            alert("logout error")
            setIsAuthenticated(true)
        } 
    }
  return (
    <button className = {
    "user-button small" 
    }>
                {
                gettingProfileImage? 
                <div className="loader-circle"></div>
                :
                <img 
                onClick={toggleMenuTab}
                src={
                    isAuthenticated ? 
                    profileImageUrl : userIcon
                } 
                 alt="your profile picture" />}

                {openMenuTab == true && !isAuthenticated &&
                <div className="not-logged-in">
                    <button>
                        <Link to="/login">
                        Login
                        </Link>
                        </button>


                    <button>
                    <Link to="/signup">
                        Sign Up
                        </Link>
                    </button>
                </div>}

                {
                    openMenuTab == true && isAuthenticated &&
                    <div className="logged-in">
                    <button>
                        <Link to="/edit-profile">
                        View Profile
                        </Link>
                        </button>


                    <button
                    onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>   
                }

                  
                 
                
            </button>
  )
}

export default UserButton