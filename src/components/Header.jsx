import React from "react";
import { Link } from "react-router-dom";
import IconLogout from "./IconLogout";
import IconUser from "./IconUser";
import weddingLogo from "../assets/weddingLogo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className='headerContainer'>
      <img
        style={{ width: 100, height: 100 }}
        src={weddingLogo}
        alt='logo mariage'
      />
      <nav className='headerNav'>
        <Link to='/home'>Acceuil</Link>
        <Link to='/galerie'>Galerie Photos</Link>
        <Link to='/informations'>Informations</Link>
        <Link to='/formulaire'>Formulaire</Link>
      </nav>
      <div className='headerIcons'>
        <IconUser />
        <IconLogout />
      </div>
    </div>
  );
};

export default Header;
