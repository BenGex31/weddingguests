import React, { useEffect, useState } from "react";
import firebaseConfig from "../config/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "./SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      setOpenSnackBar(true);
    });
  }, []);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress color='primary' size={100} />
      </div>
    );
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  if (openSnackBar) {
    return (
      <CustomizedSnackbars
        open={openSnackBar}
        handleClose={handleClose}
        severity={currentUser ? "success" : "info"}
        text={currentUser ? "Connexion réussie !" : "Vous êtes déconnecté !"}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
