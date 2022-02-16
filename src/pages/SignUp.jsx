import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import InputAdornments from "../components/InputAdornmets";
import WeddingTitle from "../components/WeddingTitle";
import PersonIcon from "@material-ui/icons/Person";
import weddingHall1 from "../assets/beyssac1.jpeg";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Container from "@material-ui/core/Container";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
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
  const auth = getAuth();

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

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "") {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        setCurrentUser(true);
        await updateProfile(auth.currentUser, {
          displayName: firstname + " " + lastname,
        });
        await sendEmailVerification(user);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <Container
      style={{ marginTop: 20, marginBottom: 20, height: 550 }}
      maxWidth='lg'
    >
      <CssBaseline />
      <Stack
        sx={{ height: "100%" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent='space-around'
        alignItems='center'
      >
        <Stack alignItems='center'>
          <WeddingTitle />
          <img
            width={320}
            height={213.333333333333333}
            style={{ borderRadius: 20 }}
            src={weddingHall1}
            alt='beyssac'
          />
        </Stack>
        <Stack>
          <Stack alignItems='center' mt={2}>
            <Stack>
              <PersonIcon
                style={{
                  fontSize: 60,
                  padding: 15,
                  borderRadius: 50,
                  color: "white",
                  backgroundColor: "black",
                }}
              />
            </Stack>
            <h2>Créer un compte</h2>
          </Stack>
          <Stack spacing={1} width={{ xs: 310, sm: 420 }}>
            <Stack
              spacing={1}
              direction={{ xs: "column", sm: "row" }}
              justifyContent='space-between'
            >
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
            </Stack>
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
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignUp;
