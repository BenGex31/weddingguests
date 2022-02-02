import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Stack, Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../core/theme/MuiTheme";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";
import AccountMenu from "./AccountMenu";
import BasicMenu from "./BasicMenu";

const useStyles = makeStyles({
  link: {
    color: theme.palette.secondary.main,
    fontFamily: oswaldR.fontFamily,
    textDecoration: "none",
    fontWeight: oswaldR.fontWeight,
    fontStyle: oswaldR.fontStyle,
  },
  linkClicked: {
    color: theme.palette.primary.main,
    fontFamily: oswaldR.fontFamily,
    textDecoration: "none",
  },
});

const NavBar = () => {
  const classes = useStyles();
  let location = useLocation();
  const [mobileView, setMobileView] = useState(false);
  const [links] = useState([
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
      label: "Formulaire",
      clicked: false,
      link: "/formulaire",
      divider: true,
    },
    {
      id: 4,
      label: "Liste invités",
      clicked: false,
      link: "/guests",
      divider: true,
    },
    {
      id: 5,
      label: "Galerie photos",
      clicked: false,
      link: "/galerie",
      divider: true,
    },
  ]);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Stack
        mt={1}
        mb={3.75}
        alignItems={"center"}
        direction='row'
        spacing={4}
        divider={<Divider orientation='vertical' flexItem />}
      >
        {!mobileView ? (
          links.map((item) => (
            <Link
              key={item.id}
              className={
                location.pathname === item.link
                  ? classes.linkClicked
                  : classes.link
              }
              to={item.link}
            >
              {item.label}
            </Link>
          ))
        ) : (
          <BasicMenu link={links} styleLinks={classes.link} />
        )}
        <AccountMenu styleLink={classes.link} />
      </Stack>
    </Grid>
  );
};

export default NavBar;
