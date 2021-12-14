import React from "react";
import { Link } from "react-router-dom";
import { Stack, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../core/theme/MuiTheme";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";

const useStyles = makeStyles({
  link: {
    color: theme.palette.secondary.main,
    fontFamily: oswaldR.fontFamily,
  },
});

const NavBar = () => {
  const classes = useStyles();
  return (
    <Stack justifyContent='center' direction='row' spacing={4}>
      <Link className={classes.link} to='/home'>
        Accueil
      </Link>
      <Divider orientation='vertical' flexItem />
      <Link className={classes.link} to='/informations'>
        Informations
      </Link>
      <Divider orientation='vertical' flexItem />
      <Link className={classes.link} to='/guests'>
        liste invités
      </Link>
      <Divider orientation='vertical' flexItem />
      <Link className={classes.link} to='/galerie'>
        Galerie photos
      </Link>
      <Divider orientation='vertical' flexItem />
      <Link className={classes.link} to='/profil'>
        Profil
      </Link>
    </Stack>
  );
};

export default NavBar;
