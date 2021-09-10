import React from "react";
import Link from "@material-ui/core/Link";
import Input from "../components/Input";
import Button from "../components/Button";
import "./SignUp.css";
import WeddingTitle from "../components/WeddingTitle";
import PersonIcon from "@material-ui/icons/Person";
import weddingHall1 from "../assets/beyssac1.jpeg";

const SignUp = () => {
  return (
    <div className='signUpContainerMain'>
      <img
        src={weddingHall1}
        alt='beyssac'
        style={{ height: 320, width: 480 }}
      />
      <WeddingTitle />
      <div className='containerIcon'>
        <PersonIcon style={{ fontSize: 40, color: "white" }} />
      </div>
      <div className='signUpForm'>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input id='firstname' label='Prénom' variant='outlined' />
          <Input id='lastname' label='Nom de famille' variant='outlined' />
        </div>
        <Input id='email' label='Email' variant='outlined' />
        <Input id='password' label='Mot de passe' variant='outlined' />
        <Button text="S'incrire" variant='contained' color='primary' />
      </div>
      <Link href='/'>Page connexion</Link>
    </div>
  );
};

export default SignUp;
