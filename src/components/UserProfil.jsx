import React from "react";
import weddingLogo from "../assets/weddingLogo.png";
import { Grid, Stack, Avatar, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import theme from "../core/theme/MuiTheme";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { AuthContext } from "./Auth";
import { oswaldRegular } from "../core/theme/CustomTheme";
import { oswaldLight } from "../core/theme/CustomTheme";

const UserProfil = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getDocUser();
    // eslint-disable-next-line
  }, [user]);

  const getDocUser = async () => {
    const docRef = doc(getFirestore(firebaseConfig), "guests", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setUser(null);
    }
  };
  return (
    <Grid
      sx={{
        boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
        borderRadius: 5,
        marginTop: 1,
        marginBottom: 5,
      }}
      item
      xs={12}
      md={3}
      lg={4}
    >
      <Stack
        sx={{ padding: 4.5 }}
        alignItems={"center"}
        direction={"column"}
        spacing={2}
      >
        {currentUser.photoURL !== null ? (
          <Avatar
            src={currentUser.photoURL}
            alt={
              currentUser.displayName !== null
                ? currentUser.displayName
                : "User image"
            }
            sx={{
              width: 120,
              height: 120,
              boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: 120,
              height: 120,
              boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            }}
          >
            <Person sx={{ fontSize: 80 }} />
          </Avatar>
        )}
        {
          <Typography
            sx={{
              fontFamily: oswaldRegular.fontFamily,
              fontStyle: oswaldRegular.fontStyle,
              fontWeight: oswaldRegular.fontWeight,
              fontSize: 25,
              color: theme.palette.secondary.main,
            }}
          >
            {user !== null && user.firstName} {user !== null && user.lastName}
          </Typography>
        }
        {
          <Typography
            sx={{
              fontFamily: oswaldLight.fontFamily,
              fontStyle: oswaldLight.fontStyle,
              fontWeight: oswaldLight.fontWeight,
              fontSize: 18,
              color: theme.palette.secondary.main,
            }}
          >
            {user !== null ? user.age + " ans" : ""}
          </Typography>
        }
        {
          <Typography
            sx={{
              fontFamily: oswaldLight.fontFamily,
              fontStyle: oswaldLight.fontStyle,
              fontWeight: oswaldLight.fontWeight,
              fontSize: 18,
              color: theme.palette.secondary.main,
            }}
          >
            {user !== null && user.userLink}
          </Typography>
        }
        <img alt='wedding logo' src={weddingLogo} width={110} height={110} />
      </Stack>
    </Grid>
  );
};

export default UserProfil;
