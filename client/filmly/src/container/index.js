import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { LOGOUT } from "../store/actionTypes";
import { getUserDetails } from "../store/actions/auth";
import asyncComponent from "../HOC/AsyncComponent";

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

  const HomeComponent = asyncComponent(() => {
    return import("../pages/Home/Home.jsx");
  });
  const NavigationComponent = asyncComponent(() => {
    return import("../pages/Navigation/Navigation.jsx");
  });
  const SearchComponent = asyncComponent(() => {
    return import("../pages/Search/Search.jsx");
  });
  const HelpComponent = asyncComponent(() => {
    return import("../pages/Help/Help.jsx");
  });
  const GenreComponent = asyncComponent(() => {
    return import("../pages/Genre/Genre.jsx");
  });
  const VideoComponent = asyncComponent(() => {
    return import("../pages/VideoPlayer/VideoPlayer.jsx");
  });
  const SigninComponent = asyncComponent(() => {
    return import("../pages/Auth/Signin.jsx");
  });
  const SignupComponent = asyncComponent(() => {
    return import("../pages/Auth/Signup.jsx");
  });
  const ListComponent = asyncComponent(() => {
    return import("../pages/List/List.jsx");
  });

  return (
    <div>
      <div className="container-fluid">
        <NavigationComponent />
      </div>
      <div className="container_routes">
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/search" exact component={SearchComponent} />
          <Route path="/help" exact component={HelpComponent} />
          <Route path="/genre/:genreTitle" exact component={GenreComponent} />
          <Route path="/video" exact component={VideoComponent} />
          <Route path="/list/:occupation/:id" exact component={ListComponent} />
          <Route path="/signin" exact component={SigninComponent} />
          <Route path="/signup" exact component={SignupComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default Container;
