import React from "react";
import OAuth from "../components/OAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // It was auth.currentUser on the next line

      updateProfile(user, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
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
            type="text"
            id="name"
            className="nameInput"
            placeholder="name"
            value={name}
            onChange={onChange}
          />
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/SignIn" className="registerLink">
          Sign In instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
