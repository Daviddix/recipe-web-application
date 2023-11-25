import { Link } from "react-router-dom"
import leftArrowIcon from "../../assets/icons/arrow-left.svg"
import "./Login.css"

function Login() {
  return (
    <main className="login-main">

        <button className="back-button">
            <img src={leftArrowIcon} alt="go back" />
        </button>

        <div className="form-container">
            <h1>Welcome Back</h1>

            <form className="login-form">
                <div className="email-container">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder="test@gmail.com" />
                </div>

                <div className="password-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                </div>

                <button className="primary-button">Login</button>
                <p className="switch">Don't have an account? <Link to="/signup">Signup</Link> </p>
            </form>
        </div>
    </main>
  )
}

export default Login