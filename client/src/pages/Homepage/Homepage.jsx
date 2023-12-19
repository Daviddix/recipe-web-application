import logo from "../../assets/icons/chef-hat.svg"
import searchIcon from "../../assets/icons/search.svg"
import "./Homepage.css"
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import plusIcon from "../../assets/icons/plus.svg"
import { Link, useNavigate } from 'react-router-dom'
import UserButton, { authAtom, idOfUser } from "../../components/UserButton/UserButton"
import { useAtom } from "jotai"
import { useState, useEffect } from "react"
import AuthModal from "../../components/AuthModal/AuthModal"

function Homepage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(authAtom)
    const [recipes, setRecipes] = useState([])
    const [userId, setUserId] = useState("")
    const [idOfUserState, setIdOfUserState] = useAtom(idOfUser)
    const [searchedRecipes, setSearchedRecipes] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [gettingRecipes, setGettingRecipes] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [searchState, setSearchState] = useState("")
    const navigate = useNavigate()
    const mappedRecipes = recipes.map((recipe)=>{
        return <RecipeCard userId={userId} recipeRefresher={setRecipes} key={recipe._id} {...recipe}/>
    })
     const mappedSearchedRecipes = searchedRecipes.map((recipe)=>{
        return <RecipeCard userId={userId} recipeRefresher={setRecipes} key={recipe._id} {...recipe}/>
    })

    useEffect(()=>{
        getAllRecipes()
    }, [idOfUserState])

    function handleNewRecipeButton(){
        if(isAuthenticated){
            navigate("/add-recipe")
        }else{
         setShowModal(true)
        }
    }
    
    async function getAllRecipes(){
        try{
        const recipeResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/recipe/", {
            credentials : "include"
        })
                const recipeResponseInJson = await recipeResponse.json()

                if(!recipeResponse.ok){
                    throw Error("Err", {cause : recipeResponseInJson})
                }
                setRecipes(recipeResponseInJson)
                setGettingRecipes(false)
        }
        catch(err){
            setGettingRecipes(false)
            console.log(err)
            alert("an error ocurred")
        }
        
    }

    function handleSearch(searchTerm){
        searchTerm.trim()
        if(searchTerm){
            setIsSearching(true)
            const sc = recipes.filter((recipe)=> recipe.recipeName.toLowerCase().includes(searchTerm))
            setSearchedRecipes(sc)
        }else{
            setIsSearching(false)
        }
        
    }
    
  return (
    showModal?
    <AuthModal type={"close"} setShowModal={setShowModal} />
    :
    <>
    <header className="homepage-header">
        <div className="icon-and-profile-image">
            <button className='profile-button'>
            <img src={logo} alt="icon" />
            </button>

            <UserButton 
            setRecipes={setRecipes}
            setUserId={setUserId} />
        </div>

        <h1>Delicious Recipes, Just a Tap Away</h1>

        <form
        onSubmit={(e)=>{
            e.preventDefault()
            handleSearch(searchState)
        }}
        >
            <label htmlFor="search">
                <img src={searchIcon} alt="" />
            </label>
            <input 
            value={searchState}
            onChange={(e)=>{
                setSearchState(e.target.value)
                if(e.target.value.trim() == ""){
                    setIsSearching(false)
                }
            }}
            placeholder="Search for a recipe" 
            type="text"
            name="search" 
            id="search" 
            />
        </form>
    </header>

    <main className="homepage-main">
        {
            gettingRecipes?  
            <div className="loader-message">
            <div className="loader-circle"></div>
            <p>Loading Recipes</p>
        </div> 
        : 
        isSearching?
        mappedSearchedRecipes 
        :
        mappedRecipes
        }
    </main>

    <button 
    onClick={handleNewRecipeButton}
    className="add-new-recipe primary-button">
        <img src={plusIcon} alt="add recipe" />    
    </button>
    </>
  )
}

export default Homepage