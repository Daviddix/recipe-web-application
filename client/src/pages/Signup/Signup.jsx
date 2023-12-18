import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import userIcon from "../../assets/icons/user.svg";
import plusIcon from "../../assets/icons/plus-2.svg";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";

function Signup() {
  const inputRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [userInfo, setUserInfo] = useState({
    profilePicture: "",
    username: "",
    email: "",
    password: "",
  })
  const [creatingUser, setCreatingUser] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [usernameError, setUsernameError] = useState(null)
  const [imageError, setImageError] = useState(null)
  const navigate = useNavigate()

  function triggerFileInput() {
    inputRef.current.click();
  }

  function handleInput(e) {
    setUserInfo((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  function addProfileImage(e) {
    setImageError(null)
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target.result
        const base64Image = e.target.result.split(",")[1]
        setProfileUrl(imageUrl)
        setUserInfo((prevData) => {
          return {
            ...prevData,
            profilePicture: base64Image
          }
        })
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e, data) {
    e.preventDefault()
    if (profileUrl == "") {
      return alert("please add a profile picture")
    }
    try {
      setCreatingUser(true)
      const signUpResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const jsonResponse = await signUpResponse.json()
      if (!signUpResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setCreatingUser(false)
      navigate("/")
    }
    catch (err) {
      setCreatingUser(false)
      const reasonForError = err.cause.reason
      if (reasonForError == "duplicate email") {
        setEmailError(err.cause.message)
      } else if (reasonForError == "duplicate username") {
        setUsernameError(err.cause.message)
      }else if (reasonForError == "image upload") {
      setImageError(err.cause.message)
    } else{
        alert("an error ocurred, please try again")
      }
    }
  }

  function goBack() {
    navigate(-1)
  }
  return (
    <main className="signup-main">
      {
        creatingUser && <Loader messageToDisplay={"Creating Profile"} />
      }
      <button
        onClick={goBack}
        className="back-button">
        <img src={leftArrowIcon} alt="go back" />
      </button>

      <div className="form-container">
        <h1>Create a new account to get started </h1>

        <form className="signup-form">
          <div className="profile-picture-container">
            <label htmlFor="profilePicture">Profile Picture</label>

            <div className="profile-placeholder">
              <div
                style={{ backgroundImage: `url(${profileUrl})` }}
                tabIndex={0}
                className="main-circle"
              >
                {profileUrl == "" && (
                  <img src={userIcon} alt="your profile picture" />
                )}
              </div>
              <div
                onClick={triggerFileInput}
                tabIndex={0}
                className="small-circle"
              >
                <img src={plusIcon} alt="" />
              </div>
            </div>
            {imageError && <p className="image-error">{imageError}</p>}
          </div>

          <div className="username-container">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              name="username"
              id="username"
              placeholder="David"
              onChange={(e) => {
                setUsernameError(null)
                handleInput(e)
              }}
              minLength={3}
              maxLength={15}
            />
            <p className="normal-username-error">Please enter a username with more than 3 letters</p>
            {usernameError && <p className="username-error">{usernameError}</p>}
          </div>

          <div className="email-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmailError(null)
                handleInput(e)
              }}
              id="email"
              placeholder="test@gmail.com"
            />
            <p className="normal-email-error">Please enter a valid email address</p>
            {emailError && <p className="email-error">
              {emailError}
            </p>}
          </div>

          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleInput}
              type="password"
              name="password"
              minLength={4}
              maxLength={15}
              id="password" />
          </div>

          <button
            onClick={(e) => {
              handleSubmit(e, userInfo)
            }}
            className="primary-button">Signup</button>
          <p className="switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      <input
        ref={inputRef}
        name="profilePicture"
        id="profilePicture"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => addProfileImage(e)}
        accept="image/*"
      />
    </main>
  );
}

export default Signup;
