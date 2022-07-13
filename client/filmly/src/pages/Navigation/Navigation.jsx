import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import CustomAvatar from "../../components/Avatar/Avatar";

import "./Navigation.css";

const Navigation = React.memo(() => {
  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

  const history = useHistory();

  return (
    <div className="f_nav_container">
      <nav className="navbar navbar-expand-lg">
        <a href="/">
          <div className="navbar-brand">
            <span className="my-auto">Filmly</span>
          </div>
        </a>
        <div className="collapse navbar-collapse">
          {state.auth.isAuthenticated ? (
            <ul className="navbar-nav">
              <li className="nav-item active">
                <p>
                  Home <span className="sr-only">(current)</span>
                </p>
              </li>
              <li className="nav-item">
                <p>Search</p>
              </li>
              <li className="nav-item">
                <p>All Genres</p>
              </li>
              <li className="nav-item">
                <p>Help</p>
              </li>
            </ul>
          ) : null}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item f_avatar">
              {state.auth.isAuthenticated ? (
                <span>
                  <CustomAvatar width={50} height={50} />
                </span>
              ) : (
                <li className="nav-item">
                  <button className="btn_solid" onClick={() => history.push("/signin")}>Sign In</button>
                </li>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
});

export default Navigation;
