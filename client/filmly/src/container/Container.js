import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useDispatch } from "react-redux";

import Help from "../pages/Help/Help";
import Home from "../pages/Home/Home";
import Navigation from "../pages/Navigation/Navigation";
import Search from "../pages/Search/Search";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import Genre from "../pages/Genre/Genre";
import { LOGOUT } from "../store/actionTypes";
import { getUserDetails } from "../store/actions/auth";
import VideoPlayer from "../pages/VideoPlayer/VideoPlayer";

function Container(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      history.push("/signin");
      dispatch({ type: LOGOUT });
    } else {
      dispatch(getUserDetails(localStorage.getItem("userId")));
    }
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <Navigation />
      </div>
      <div className="container_routes">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/help" exact component={Help} />
          <Route path="/genre/:genreTitle" exact component={Genre} />
          <Route path="/video" exact component={VideoPlayer} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    </div>
  );
}

export default Container;
