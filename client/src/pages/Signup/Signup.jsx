import leftArrowIcon from "../../assets/icons/arrow-left.svg";
import userIcon from "../../assets/icons/user.svg";
import plusIcon from "../../assets/icons/plus-2.svg";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <main className="signup-main">
      <button className="back-button">
        <img src={leftArrowIcon} alt="go back" />
      </button>

      <div className="form-container">
        <h1>Create a new account to get started </h1>

        <form className="signup-form">
          <div className="profile-picture-container">
            <label htmlFor="email">Profile Picture</label>

            <div className="profile-placeholder">
              <div tabIndex={0} className="main-circle">
                <img src={userIcon} alt="" />
              </div>
              <div tabIndex={0} className="small-circle">
                <img src={plusIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="username-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="David"
              minLength={3}
              maxLength={15}
            />
          </div>

          <div className="email-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="test@gmail.com"
            />
          </div>

          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button className="primary-button">Login</button>
          <p className="switch">
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Signup;
