import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const AuthNavigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/forgotpassword'></Route>
      </Switch>
    </Router>
  );
};

export default AuthNavigation;
