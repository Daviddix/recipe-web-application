import { useState } from 'react'
import logo from "../../assets/icons/chef-hat.svg"
import userIcon from "../../assets/icons/user.svg"
import searchIcon from "../../assets/icons/search.svg"
import "./Homepage.css"
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import plusIcon from "../../assets/icons/plus.svg"
import { Link } from 'react-router-dom'

function Homepage() {
    const [openMenuTab, setOpenMenuTab] = useState(false)

    function toggleMenuTab(){
        setOpenMenuTab((prev)=> !prev)
    }
  return (
    <>
    <header className="homepage-header">
        <div className="icon-and-profile-image">
            <button className='profile-button'>
            <img src={logo} alt="icon" />
            </button>

            <button className="user-button">
                <img 
                onClick={toggleMenuTab}
                src={userIcon} alt="" />

                {openMenuTab &&
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
                </div>

                 /* <div className="logged-in">
                    <button>
                        <Link to="/profile">
                        View Profile
                        </Link>
                        </button>


                    <button>
                    <Link to="/signup">
                        Logout
                        </Link>
                    </button>
                </div>  */
                 
                }
            </button>
        </div>

        <h1>Delicious Recipes, Just a Tap Away</h1>

        <form>
            <label htmlFor="search">
                <img src={searchIcon} alt="" />
            </label>
            <input placeholder="Search for a recipe" type="text" name="search" id="search" />
        </form>
    </header>

    <main className="homepage-main">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
    </main>

    <button className="add-new-recipe">
        <img src={plusIcon} alt="" />
    </button>
    </>
  )
}

export default Homepage