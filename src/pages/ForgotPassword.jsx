import React, { useState } from "react";
import WeddingTitle from "../components/WeddingTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "@material-ui/core/Link";
import ReplayIcon from "@material-ui/icons/Replay";
import Container from "@material-ui/core/Container";
import Stack from "@mui/material/Stack";
import firebaseConfig from "../config/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

const auth = getAuth();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsvalidEmail] = useState(false);
  const [messageEmailError, setMessageEmailError] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

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

  const sendPasswordReset = async () => {
    const emailResetPassword = email;
    try {
      await sendPasswordResetEmail(auth, emailResetPassword);
      console.log("Password reset email sent!");
      setEmail("");
      setOpenSnackBar(true);
      setIsvalidEmail(false);
      setMessageEmailError("");
    } catch (error) {
      const errorCode = error.code;
      const messageError = error.message;
      console.log("error reset password" + errorCode, messageError);
    }

    /*sendPasswordResetEmail(auth, emailResetPassword)
      .then(() => {
        console.log("Password reset email sent!");
        setEmail("");
      })
      .then(() => {
        setOpenSnackBar(true);
      })
      .then(() => {
        setIsvalidEmail(false);
      })
      .then(() => {
        setMessageEmailError("");
      })
      .catch((error) => {
        var errorCode = error.code;
        var messageError = error.message;
        console.log("error reset password" + errorCode, messageError);
      });*/
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <Container style={{ height: 550 }}>
      <Stack height='100%' alignItems='center' justifyContent='space-around'>
        <WeddingTitle />
        <Stack>
          <ReplayIcon
            style={{
              fontSize: 60,
              padding: 15,
              borderRadius: 50,
              color: "white",
              backgroundColor: "black",
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <h2>Réinitialiser mot de passe</h2>
          <Input
            onChange={handleChangeEmail}
            id='email'
            label='Email'
            variant='outlined'
            value={email}
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
          <Button
            onClick={sendPasswordReset}
            text='Envoyer'
            variant='contained'
            color='primary'
            disabled={isValidEmail ? false : true}
          />
          <Link style={{ textAlign: "right" }} underline='none' href='/'>
            Page connexion
          </Link>
        </Stack>
        <CustomizedSnackbars
          open={openSnackBar}
          handleClose={handleCloseSnackBar}
          text='Un mail vous a été envoyé'
          severity='success'
        />
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
