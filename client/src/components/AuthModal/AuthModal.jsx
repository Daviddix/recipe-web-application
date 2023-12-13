import "./AuthModal.css"
import fruitsIcon from "../../assets/icons/Group-32.svg"
import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import { Link,useNavigate } from "react-router-dom";

function AuthModal({type, setShowModal}) {
  const navigate = useNavigate()
  function goBack(){
    if(type == "close"){
      setShowModal(false)
    }else{
      navigate(-1)
    }
  }
  return (
    <div className="auth-modal-overlay">
        <button 
        onClick={goBack}
        className="back-button">
          <img src={leftArrowIcon} alt="go back to previous page" />
        </button>
        <div className="auth-modal">
            <img src={fruitsIcon} alt="icon" />

            <p>Hey there, you'll need to be have an account before you can perform that action</p>

            <div className="auth-button-container">
            <button className="primary-button">
                <Link to="/signup">Create an Account</Link>                
            </button>

            <button>
                <Link to="/login">Login</Link>
            </button>
            </div>


            
        </div>
    </div>
  )
}

export default AuthModal