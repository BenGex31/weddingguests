import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../components/Input";
import InputAdornments from "../components/InputAdornmets";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import "./Login.css";
import WeddingTitle from "../components/WeddingTitle";
import firebaseConfig from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
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

  const handleChange = () => (event) => {
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
          <InputAdornments
            id='password'
            type={passwordVisibility ? "text" : "password"}
            value={password}
            onChange={handleChange("password")}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            visibility={passwordVisibility}
          />
          {loginError ? (
            <ErrorMessage error={loginError} visible={true} />
          ) : null}
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
