import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { validateEmail } from "../../helper/helper";
import { loginAction } from "../../store";

import AuthBackdrop from "../../components/AuthBackdrop/AuthBackdrop";

import "../../components/AuthBackdrop/AuthBackdrop.css";

function Signin() {
  const [userData, setUserData] = useState({
    mail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isMailError, setIsMailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const dispatch = useDispatch();

  const onChangeHandler = (name, e) => {
    if (name === "mail" && isMailError) setIsMailError(false);
    if (name === "password" && isPasswordError) setIsPasswordError(false);
    if(isInvalidCredentials) setIsInvalidCredentials(false)

    setUserData({
      ...userData,
      [name]: e.target.value,
    });
  };

  const visibilityHandler = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const { mail, password } = userData;

    if (mail === "" || validateEmail(mail) === false) {
      setIsMailError(true);
    }
    if (password === "" || password.length < 8) {
      setIsPasswordError(true);
    }

    if (!isMailError && !isPasswordError && mail !== "" && password !== "") {
      dispatch(loginAction(userData));
    }
  };

  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

  const history = useHistory();
  useEffect(() => {
    if (state.auth.isAuthenticated && localStorage.getItem("token") !== null) {
      history.push("/");
    }

    if (state.auth.isInvalidCredentials) {
      setIsInvalidCredentials(true);
    }
  }, [state.auth]);

  return (
    <AuthBackdrop>
      <div className="auth-card">
        <h2>Sign In</h2>
        <form>
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
                Please enter a valid email address
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
            <button
              className="btn btn-auth"
              onClick={(e) => loginHandler(e)}
              disabled={isPasswordError || isMailError || isInvalidCredentials}
            >
              Sign In
            </button>
          </div>

          {isInvalidCredentials ? (
            <div
              className="error-text text-center"
              style={{ marginTop: "15px" }}
            >
              Invalid email ID or password.
            </div>
          ) : null}
        </form>
        <div className="auth-footer">
          <p>
            New to Filmly?{" "}
            <span onClick={() => history.push("/signup")}>Sign up now.</span>
          </p>
        </div>
      </div>
    </AuthBackdrop>
  );
}

export default Signin;
