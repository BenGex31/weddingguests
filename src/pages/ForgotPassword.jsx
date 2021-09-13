import React from "react";
import WeddingTitle from "../components/WeddingTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "@material-ui/core/Link";
import ReplayIcon from "@material-ui/icons/Replay";

const ForgotPassword = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: 700,
      }}
    >
      <WeddingTitle />
      <div className='containerIcon'>
        <ReplayIcon style={{ fontSize: 40, color: "white" }} />
      </div>
      <h2>Réinitialiser mot de passe</h2>
      <div className='containerForm'>
        <Input id='email' label='Email' variant='outlined' />
        <Button text='Envoyer' variant='contained' color='primary' />
        <Link style={{ textAlign: "right" }} underline='none' href='/'>
          Page connexion
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
