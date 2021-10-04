import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Input from "../components/Input";
import InputAdornments from "../components/InputAdornmets";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import "./Login.css";
import WeddingTitle from "../components/WeddingTitle";
import firebaseConfig from "../config/firebase";
import firebase from "firebase";

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

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await firebaseConfig.auth().signInWithPopup(googleProvider);
      const user = res.user;
      const query = await firebaseConfig
        .firestore()
        .collection("guests")
        .where("uid", "==", user.uid)
        .get();
      if (query.docs.length === 0) {
        await firebaseConfig.firestore().collection("guests").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
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
            onChange={handleChangePassWord("password")}
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
          <Button
            onClick={signInWithGoogle}
            text='Connexion avec Google'
            variant='contained'
            color='primary'
            startIcon={<GoogleIcon />}
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
