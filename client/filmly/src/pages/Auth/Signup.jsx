import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { validateEmail } from "../../helper/helper";
import { signupAction } from "../../store";

import AuthBackdrop from "../../components/AuthBackdrop/AuthBackdrop";
import { RESET_SIGNUP } from "../../store/actionTypes";

import "../../components/AuthBackdrop/AuthBackdrop.css";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

  const [userData, setUserData] = useState({
    mail: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isMailError, setIsMailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);

  useEffect(() => {
    if (state.auth.isSignedUp) {
      history.push("/signin");
      dispatch({ type: RESET_SIGNUP });
    }
  }, [state.auth]);

  const onChangeHandler = (name, e) => {
    if (name === "mail" && isMailError) setIsMailError(false);
    if (name === "password" && isPasswordError) setIsPasswordError(false);
    if (name === "name" && isNameError) setIsNameError(false);

    setUserData({
      ...userData,
      [name]: e.target.value,
    });
  };

  const visibilityHandler = () => {
    setShowPassword(!showPassword);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const { mail, password, name } = userData;

    if (mail === "" || validateEmail(mail) === false) {
      setIsMailError(true);
    }
    if (password === "" || password.length < 8) {
      setIsPasswordError(true);
    }
    if (name === "") {
      setIsNameError(true);
    }

    if (
      !isMailError &&
      !isPasswordError &&
      !isMailError &&
      mail !== "" &&
      password !== "" &&
      name !== ""
    ) {
      dispatch(signupAction(userData));
    }
  };

  return (
    <AuthBackdrop>
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form>
          <div className="auth-input">
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.name}
              onChange={(e) => onChangeHandler("name", e)}
            />
            {isNameError ? (
              <span className="error-text">Please enter a valid name.</span>
            ) : null}
          </div>
          <div className="auth-input">
            <input
              type="mail"
              placeholder="Email ID"
              id="mail"
              name="mail"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.mail}
              onChange={(e) => onChangeHandler("mail", e)}
            />
            {isMailError ? (
              <span className="error-text">
                Please enter a valid email address.
              </span>
            ) : null}
          </div>
          <div className="auth-input">
            <div className="wrapped-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="off"
                value={userData.password}
                onChange={(e) => onChangeHandler("password", e)}
              />
              {userData.password.length > 0 && (
                <span
                  className="auth-input-password-visibility"
                  onClick={visibilityHandler}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              )}
            </div>
            {isPasswordError ? (
              <span className="error-text">
                Your password must contain between 8 and 60 characters.
              </span>
            ) : null}
          </div>
          <div className="auth-action">
            <button className="btn btn-auth" onClick={(e) => signupHandler(e)}>
              Sign Up
            </button>
          </div>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => history.push("/signin")}>Sign In.</span>
          </p>
        </div>
      </div>
    </AuthBackdrop>
  );
}

export default Signup;
