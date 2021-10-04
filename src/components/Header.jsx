import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IconLogout from "./IconLogout";
import IconUser from "./IconUser";
import Avatar from "@mui/material/Avatar";
import weddingLogo from "../assets/weddingLogo.png";
import "./Header.css";
import { AuthContext } from "./Auth";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
        }}
      >
        <div className='headerIcons'>
          {currentUser.photoURL !== null ? (
            <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
          ) : (
            <IconUser />
          )}
          <IconLogout />
        </div>
        <div>
          <span style={{ fontSize: 12, fontWeight: "bold" }}>
            {currentUser.displayName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
