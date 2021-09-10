import React from "react";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../components/Input";
import Button from "../components/Button";

import "./Login.css";

const login = () => {
  return (
    <div className='container'>
      <div className='containerIcon'>
        <LockOutlinedIcon style={{ fontSize: 40, color: "white" }} />
      </div>
      <div className='containerForm'>
        <Input id='email' label='Email' variant='outlined' />
        <Input id='password' label='Mot de passe' variant='outlined' />
        <Button text='Connexion' variant='contained' color='primary' />
        <div className='containerLink'>
          <Link href='/forgotpassword'>Mot de passe oublié</Link>
          <Link href='/signup'>Pas de compte? S'incrire</Link>
        </div>
      </div>
    </div>
  );
};

export default login;
