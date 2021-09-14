import React, { useState } from "react";
import WeddingTitle from "../components/WeddingTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "@material-ui/core/Link";
import ReplayIcon from "@material-ui/icons/Replay";
import firebaseConfig from "../config/firebase";

const auth = firebaseConfig.auth();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendPasswordReset = () => {
    const emailResetPassword = email;
    auth
      .sendPasswordResetEmail(emailResetPassword)
      .then(() => {
        console.log("Password reset email sent!");
        setEmail("");
      })
      .catch((error) => {
        var errorCode = error.code;
        var messageError = error.message;
        console.log("error reset password" + errorCode, messageError);
      });
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
          onChange={(text) => setEmail(text.target.value)}
          id='email'
          label='Email'
          variant='outlined'
        />
        <Button
          onClick={sendPasswordReset}
          text='Envoyer'
          variant='contained'
          color='primary'
        />
        <Link style={{ textAlign: "right" }} underline='none' href='/'>
          Page connexion
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
