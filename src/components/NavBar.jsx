import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Stack, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../core/theme/MuiTheme";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";

const useStyles = makeStyles({
  link: {
    color: theme.palette.secondary.main,
    fontFamily: oswaldR.fontFamily,
    textDecoration: "none",
  },
  linkClicked: {
    color: theme.palette.primary.main,
    fontFamily: oswaldR.fontFamily,
    textDecoration: "none",
  },
});

const NavBar = () => {
  const classes = useStyles();
  const location = useLocation();
  console.log("pathname", location.pathname);
  const [links, setLinks] = useState([
    {
      id: 1,
      label: "Accueil",
      clicked: false,
      link: "/home",
      divider: true,
    },
    {
      id: 2,
      label: "Informations",
      clicked: false,
      link: "/informations",
      divider: true,
    },
    {
      id: 3,
      label: "Liste invités",
      clicked: false,
      link: "/guests",
      divider: true,
    },
    {
      id: 4,
      label: "Galerie photos",
      clicked: false,
      link: "/galerie",
      divider: true,
    },
    {
      id: 5,
      label: "Profil",
      clicked: false,
      link: "/profil",
      divider: false,
    },
  ]);

  const displayLinkClicked = (link) => {
    if (link === "/home") {
      let homeLink = [...links];
      homeLink[0].clicked = true;
      homeLink[1].clicked = false;
      homeLink[2].clicked = false;
      homeLink[3].clicked = false;
      homeLink[4].clicked = false;
      setLinks(homeLink);
    }
    if (link === "/informations") {
      let infoLink = [...links];
      infoLink[0].clicked = false;
      infoLink[1].clicked = true;
      infoLink[2].clicked = false;
      infoLink[3].clicked = false;
      infoLink[4].clicked = false;
      setLinks(infoLink);
    }
    if (link === "/guests") {
      let guestsLink = [...links];
      guestsLink[0].clicked = false;
      guestsLink[1].clicked = false;
      guestsLink[2].clicked = true;
      guestsLink[3].clicked = false;
      guestsLink[4].clicked = false;
      setLinks(guestsLink);
    }
    if (link === "/galerie") {
      let galerieLink = [...links];
      galerieLink[0].clicked = false;
      galerieLink[1].clicked = false;
      galerieLink[2].clicked = false;
      galerieLink[3].clicked = true;
      galerieLink[4].clicked = false;
      setLinks(galerieLink);
    }
    if (link === "/profil") {
      let profilLink = [...links];
      profilLink[0].clicked = false;
      profilLink[1].clicked = false;
      profilLink[2].clicked = false;
      profilLink[3].clicked = false;
      profilLink[4].clicked = true;
      setLinks(profilLink);
    }
  };

  return (
    <Stack justifyContent='center' direction='row' spacing={4}>
      {links.map((item, index) => (
        <>
          <Link
            key={item.id}
            className={item.clicked ? classes.linkClicked : classes.link}
            to={item.link}
            onClick={() => displayLinkClicked(item.link)}
          >
            {item.label}
          </Link>
          {item.divider && (
            <Divider key={index} orientation='vertical' flexItem />
          )}
        </>
      ))}
    </Stack>
  );
};

export default NavBar;
