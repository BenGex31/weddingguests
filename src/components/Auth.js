import React, { useEffect, useState } from "react";
import firebaseConfig from "../config/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const classes = useStyles();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, [auth]);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress color='primary' size={100} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
