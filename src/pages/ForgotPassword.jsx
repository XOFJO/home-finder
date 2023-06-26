import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent!");
    } catch (error) {
      toast.error("Email could not be sent!");
    }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/SignIn">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
