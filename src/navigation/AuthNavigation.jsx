import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { AuthProvider } from "../components/Auth";

const AuthNavigation = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/forgotpassword'>
            <ForgotPassword />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AuthNavigation;
