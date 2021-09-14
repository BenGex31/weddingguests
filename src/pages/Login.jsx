import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Login.css";
import WeddingTitle from "../components/WeddingTitle";
import firebaseConfig from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='containerMain'>
      <div className='containerLeft'></div>
      <div className='containerRight'>
        <WeddingTitle />
        <div className='containerIcon'>
          <LockOutlinedIcon style={{ fontSize: 40, color: "white" }} />
        </div>
        <h2>Se connecter</h2>
        <div className='containerForm'>
          <Input
            id='email'
            label='Email'
            variant='outlined'
            onChange={handleChangeEmail}
          />
          <Input
            id='password'
            label='Mot de passe'
            variant='outlined'
            onChange={(text) => setPassword(text.target.value)}
          />
          {loginError ? <div>Erreur identification</div> : null}
          <Button
            onClick={onLogin}
            text='Connexion'
            variant='contained'
            color='primary'
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
