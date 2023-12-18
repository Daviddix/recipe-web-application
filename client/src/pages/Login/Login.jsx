import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loggingUserIn, setLoggingUserIn] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate()

  function handleInput(e) {
    setUserInfo((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function goBack() {
    navigate(-1);
  }

  async function handleSubmit(e, data) {
    e.preventDefault()
    try {
      setLoggingUserIn(true)
      const loginResponse = await fetch("https://recipe-web-app-server-352s.onrender.com/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const jsonResponse = await loginResponse.json()
      if (!loginResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setLoggingUserIn(false)
      navigate("/")
    }
    catch (err) {
      console.log(err)
      setLoggingUserIn(false)
      const reasonForError = err.cause.reason
      if (reasonForError == "user not found") {
        setEmailError(err.cause.message)
      } else if (reasonForError == "wrong password") {
        setPasswordError(err.cause.message)
      }else{
        alert("an error ocurred, please try again")
      }
    }
  }

  return (
    <main className="login-main">
       {
        loggingUserIn && <Loader messageToDisplay={"Logging you in"} />
      }
      <button onClick={goBack} className="back-button">
        <img src={leftArrowIcon} alt="go back" />
      </button>

      <div className="form-container">
        <h1>Welcome Back</h1>

        <form className="login-form">
          <div className="email-container">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => {
                setEmailError(null)
                handleInput(e)
              }}
              id="email"
              required
              placeholder="test@gmail.com"
            />
            {emailError && <p className="email-error">
              {emailError}
            </p>}
          </div>

          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input 
            type="password"
            onChange={(e) => {
              setPasswordError(null)
              handleInput(e)
            }} 
            name="password" 
            required
            id="password" />
            {passwordError && <p className="password-error">
              {passwordError}
            </p>}
          </div>

          <button 
          onClick={(e)=>{
            handleSubmit(e, userInfo)
          }}
          className="primary-button">Login</button>
          <p className="switch">
            Don't have an account? <Link to="/signup">Signup</Link>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
