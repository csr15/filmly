import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import CustomAvatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import NavItem from "../../components/NavItem/NavItem";
import { getAllGenres } from "../../store";
import { LOGOUT } from "../../store/actionTypes";

import "./Navigation.css";

const Navigation = React.memo(() => {
  const [allGenres, setAllGenres] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);

  const state = useSelector((state) => {
    return {
      auth: state.auth,
      genre: state.genre,
    };
  });

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (state.genre.allGenres && state.genre.allGenres.length === 0) {
      dispatch(getAllGenres());
    } else {
      setAllGenres(state.genre.allGenres);
    }
  }, [state.genre]);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    history.push("/signin");
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (document.querySelector(".container_routes").contains(e.target)) {
        if (openProfile) setOpenProfile(false);
      }
    });
  }, []);

  window.addEventListener("click", (e) => {
    if (document.querySelector(".container_routes").contains(e.target)) {
      if (openProfile) {
        setOpenProfile(false);
      }
    }
  });

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
              <NavItem name="Home" route="home" />
              <NavItem name="Search" route="search" />
              <NavItem name="All Genres" isDropDown genresList={allGenres} />
            </ul>
          ) : null}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item f_avatar">
              {state.auth.isAuthenticated ? (
                <span>
                  <div onClick={() => setOpenProfile(true)}>
                    <CustomAvatar width={50} height={50} />
                  </div>
                  {openProfile && (
                    <div className="f_profile">
                      <div className="f_profile_section">
                        <h6>Mail</h6>
                        <p>
                          {state.auth.userDetails &&
                            state.auth.userDetails.mail}
                        </p>
                      </div>
                      <div className="f_profile_section">
                        <h6>Name</h6>
                        <p>
                          {state.auth.userDetails &&
                            state.auth.userDetails.name}
                        </p>
                      </div>
                      <div className="f_profile_section">
                        <Button
                          type={"f_btn_pri"}
                          title="Logout"
                          styles={{
                            background: "#e50815",
                            color: "#fff",
                            width: "100%",
                          }}
                          onClickHandler={logoutHandler}
                        />
                      </div>
                    </div>
                  )}
                </span>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn_solid"
                    onClick={() => history.push("/signin")}
                  >
                    Sign In
                  </button>
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
