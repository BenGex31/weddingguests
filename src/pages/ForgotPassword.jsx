import React, { useState } from "react";
import WeddingTitle from "../components/WeddingTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "@material-ui/core/Link";
import ReplayIcon from "@material-ui/icons/Replay";
import firebaseConfig from "../config/firebase";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

const auth = firebaseConfig.auth();

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

  const sendPasswordReset = () => {
    const emailResetPassword = email;
    auth
      .sendPasswordResetEmail(emailResetPassword)
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
      });
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: 700,
        marginBottom: 50,
      }}
    >
      <WeddingTitle />
      <div className='containerIcon'>
        <ReplayIcon style={{ fontSize: 40, color: "white" }} />
      </div>
      <h2>Réinitialiser mot de passe</h2>
      <div className='containerForm'>
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
      </div>
      <CustomizedSnackbars
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        text='Un mail vous a été envoyé'
        severity='success'
      />
    </div>
  );
};

export default ForgotPassword;
