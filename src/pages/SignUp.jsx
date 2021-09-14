import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import InputAdornments from "../components/InputAdornmets";
import "./SignUp.css";
import WeddingTitle from "../components/WeddingTitle";
import PersonIcon from "@material-ui/icons/Person";
import weddingHall1 from "../assets/beyssac1.jpeg";

import firebaseConfig from "../config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = () => (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const auth = firebaseConfig.auth();

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.createUserWithEmailAndPassword(email, password);
        setCurrentUser(true);
        const userProfile = auth.currentUser;
        await userProfile.updateProfile({
          displayName: firstname + " " + lastname,
        });
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='signUpContainerMain'>
      <div className='signUpTitleImg'>
        <img className='imgTitle' src={weddingHall1} alt='beyssac' />
        <WeddingTitle />
      </div>
      <div className='containerIcon'>
        <PersonIcon style={{ fontSize: 40, color: "white" }} />
      </div>
      <h2>Créer un compte</h2>
      <div className='signUpForm'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            id='firstname'
            label='Prénom'
            variant='outlined'
            onChange={(text) => setFirstName(text.target.value)}
          />
          <Input
            id='lastname'
            label='Nom de famille'
            variant='outlined'
            onChange={(text) => setLastName(text.target.value)}
          />
        </div>
        <Input
          id='email'
          label='Email'
          variant='outlined'
          onChange={(text) => setEmail(text.target.value)}
        />
        <InputAdornments
          id='password'
          type={passwordVisibility ? "text" : "password"}
          value={password}
          onChange={handleChange("password")}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          visibility
        />
        {signupError ? (
          <ErrorMessage error={signupError} visible={true} />
        ) : null}
        <Button
          text="S'incrire"
          variant='contained'
          color='primary'
          onClick={onHandleSignup}
        />
        <Link style={{ textAlign: "right", fontSize: 15 }} href='/'>
          Page connexion
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
