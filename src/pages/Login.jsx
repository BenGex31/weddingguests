import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../components/Input";
import InputAdornments from "../components/InputAdornmets";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import "./Login.css";
import WeddingTitle from "../components/WeddingTitle";
import firebaseConfig from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsvalidEmail] = useState(false);
  const [messageEmailError, setMessageEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await firebaseConfig.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
      console.log(error);
    }
  };

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

  const handleChange = () => (event) => {
    if (event.target.value.length >= 6) {
      setIsValidPassword(true);
      setErrorMessagePassword(
        "Votre mot de passe contient au moins 6 caractères"
      );
    } else {
      setIsValidPassword(false);
      setErrorMessagePassword(
        "Votre mot de passe doit contenir 6 caractères minimum"
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

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='containerMain'>
      <div className='containerLeft'></div>
      <div className='containerRight'>
        <WeddingTitle size={45} />
        <div className='containerIcon'>
          <LockOutlinedIcon style={{ fontSize: 40, color: "white" }} />
        </div>
        <h2 style={{ fontSize: 21 }}>Se connecter</h2>
        <div className='containerForm'>
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
            onChange={handleChange("password")}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            visibility={passwordVisibility}
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
          {loginError ? (
            <ErrorMessage error={loginError} visible={true} />
          ) : null}
          <Button
            onClick={onLogin}
            text='Connexion'
            variant='contained'
            color='primary'
            disabled={isValidEmail && isValidPassword ? false : true}
          />
          <div className='containerLink'>
            <Link underline='none' href='/forgotpassword'>
              Mot de passe oublié
            </Link>
            <Link underline='none' href='/signup'>
              Pas de compte? S'incrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
