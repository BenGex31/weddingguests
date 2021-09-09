import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";

const AuthNavigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'></Route>
        <Route path='/forgotpassword'></Route>
      </Switch>
    </Router>
  );
};

export default AuthNavigation;
