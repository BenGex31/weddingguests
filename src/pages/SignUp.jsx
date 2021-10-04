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
  const [isValidEmail, setIsvalidEmail] = useState(false);
  const [messageEmailError, setMessageEmailError] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const emailRegex = /\S+@\S+\.\S+/;

  const handleChangeEmail = (event) => {
    if (emailRegex.test(event.target.value)) {
      setIsvalidEmail(true);
      setMessageEmailError("Votre adresse mail est correcte !");
    } else {
      setIsvalidEmail(false);
      setMessageEmailError("Entrez une adresse mail valide !");
    }
    setEmail(event.target.value);
  };

  const handleChangePassWord = () => (event) => {
    if (event.target.value.length >= 8) {
      setIsValidPassword(true);
      setErrorMessagePassword(
        "Votre mot de passe contient au moins 8 caractères"
      );
    } else {
      setIsValidPassword(false);
      setErrorMessagePassword(
        "Votre mot de passe doit contenir 8 caractères minimum"
      );
    }
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
          onChange={handleChangeEmail}
        />
        {isValidEmail ? (
          <span style={{ color: "green", fontSize: 12 }}>
            {messageEmailError}
          </span>
        ) : (
          <span style={{ color: "red", fontSize: 12 }}>
            {messageEmailError}
          </span>
        )}
        <InputAdornments
          id='password'
          type={passwordVisibility ? "text" : "password"}
          value={password}
          onChange={handleChangePassWord("password")}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          visibility
        />
        {isValidPassword ? (
          <span style={{ color: "green", fontSize: 12 }}>
            {" "}
            {errorMessagePassword}
          </span>
        ) : (
          <span style={{ color: "red", fontSize: 12 }}>
            {" "}
            {errorMessagePassword}
          </span>
        )}
        {/*<Input
          id='photo'
          variant='standard'
          type='file'
          value={selectedFile}
          onChange={(file) => setSelectedFile(file.target.value)}
        />*/}
        {signupError ? (
          <ErrorMessage error={signupError} visible={true} />
        ) : null}
        <Button
          text="S'incrire"
          variant='contained'
          color='primary'
          onClick={onHandleSignup}
          disabled={
            isValidEmail &&
            isValidPassword &&
            firstname !== "" &&
            lastname !== ""
              ? false
              : true
          }
        />
        <Link style={{ textAlign: "right", fontSize: 15 }} href='/'>
          Page connexion
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
