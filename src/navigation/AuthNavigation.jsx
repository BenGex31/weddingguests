import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { AuthProvider } from "../components/Auth";
import Gallery from "../pages/Gallery";
import Informations from "../pages/Informations";
import Formulaire from "../pages/Formulaire";

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
          <Route path='/galerie'>
            <Gallery />
          </Route>
          <Route path='/informations'>
            <Informations />
          </Route>
          <Route path='/formulaire'>
            <Formulaire />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AuthNavigation;
