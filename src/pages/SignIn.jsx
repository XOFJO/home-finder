import React from "react";
import OAuth from "../components/OAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad credential");
    }
  }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            className="emailInput"
            placeholder="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              id="password"
              placeholder="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </div>
          <Link to="/ForgotPassword" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/SignUp" className="registerLink">
          Sign Up instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
