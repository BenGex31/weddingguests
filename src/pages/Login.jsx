import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Input from "../components/Input";
import InputAdornments from "../components/InputAdornmets";
import Button from "../components/Button";
import Grid from "@mui/material/Grid";
import ErrorMessage from "../components/ErrorMessage";
import weddingCamBen from "../assets/weddingCamBen.jpeg";
import WeddingTitle from "../components/WeddingTitle";
import firebaseConfig from "../config/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsvalidEmail] = useState(false);
  const [messageEmailError, setMessageEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const auth = getAuth();

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setLoginError(error.message);
      console.log(error);
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      await updateDoc(doc(getFirestore(firebaseConfig), "guests", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
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
    <Grid container component='main' sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${weddingCamBen})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            //my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <WeddingTitle size={45} />
          <Stack>
            <LockOutlinedIcon
              style={{
                fontSize: 60,
                color: "white",
                backgroundColor: "#1976d2",
                padding: 15,
                borderRadius: 50,
              }}
            />
          </Stack>
          <h2 style={{ fontSize: 21 }}>Se connecter</h2>
          <Stack spacing={2} width={300}>
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
              text='Se connecter'
              variant='contained'
              color='primary'
              disabled={isValidEmail && isValidPassword ? false : true}
              style={{ textTransform: "none" }}
              type='submit'
            />
            <Button
              onClick={signInWithGoogle}
              text='Google'
              variant='contained'
              color='secondary'
              startIcon={<GoogleIcon />}
            />
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ fontSize: 12 }}
            >
              <Link underline='none' href='/forgotpassword'>
                Mot de passe oublié
              </Link>
              <Link underline='none' href='/signup'>
                Pas de compte? S'incrire
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
