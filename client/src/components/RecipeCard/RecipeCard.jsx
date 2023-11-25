import testImage from "../../assets/images/test.jpg"
import rightIcon from "../../assets/icons/arrow-right.svg"
import userImage from "../../assets/images/user.jpg"
import timeIcon from "../../assets/icons/time.svg"
import fireIcon from "../../assets/icons/fire.svg"
import foodBasket from "../../assets/icons/vegetable-basket.svg"
import "./RecipeCard.css"
import {Link} from "react-router-dom"

function RecipeCard() {
  return (
    <div className="recipe-card">
            <img src={testImage} alt="" />

            <div className="card-info">
                <h1>Spiced Chicken Pricata</h1>

                <div className="time">
                    <img src={timeIcon} alt="time icon" />
                    <p>40mins</p>
                </div>

                <div className="calories">
                <img src={fireIcon} alt="fire icon" />
                    <p>40 Calories</p>
                </div>

                <div className="ingredients">
                <img src={foodBasket} alt="food basket icon" />
                    <p>Chicken, onions, pepper, carrots and 9 other ingredients</p>
                </div>

                <div className="author-and-link">
                    <button className="author">
                        <img src={userImage} alt="user image" />
                        <p>by James DE</p>
                    </button>

                    <Link to={"/recipe/4"}>
                    <button className="link">
                        <p>Read More</p>
                        <img src={rightIcon} alt="" />
                    </button>
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default RecipeCard