import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../components/Input";

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
      </div>
    </div>
  );
};

export default login;
