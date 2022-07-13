import React from "react";
import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";

import AllGenres from "../pages/AllGenres/AllGenres";
import Help from "../pages/Help/Help";
import Home from "../pages/Home/Home";
import Navigation from "../pages/Navigation/Navigation";
import Search from "../pages/Search/Search";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";

function Container(props) {
  const state = useSelector((state) => {
    return {
      auth: state.auth.isAuthenticated,
    };
  });

  return (
    <div>
      <div className="container-fluid">
        <Navigation />
      </div>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/allGenres" exact component={AllGenres} />
          <Route path="/help" exact component={Help} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    </div>
  );
}

export default Container;
