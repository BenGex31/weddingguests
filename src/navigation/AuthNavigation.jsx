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
import Guests from "../pages/Guests";
import Profil from "../pages/Profil";

const AuthNavigation = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='/forgotpassword'>
            <ForgotPassword />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/galerie'>
            <Gallery />
          </Route>
          <Route exact path='/guests'>
            <Guests />
          </Route>
          <Route exact path='/informations'>
            <Informations />
          </Route>
          <Route exact path='/formulaire'>
            <Formulaire />
          </Route>
          <Route exact path='/profil'>
            <Profil />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default AuthNavigation;
