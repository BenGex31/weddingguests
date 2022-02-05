import React from "react";
import { AuthContext } from "./Auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { Button, Grid, TextField } from "@mui/material";
import theme from "../core/theme/MuiTheme";

const FormProfil = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [guest, setGuest] = React.useState(null);
  const [user, setUser] = React.useState({
    phoneNumber: guest !== null && guest.phoneNumber,
  });

  React.useEffect(() => {
    getDocUser();
    // eslint-disable-next-line
  }, [user.phoneNumber]);

  const getDocUser = async () => {
    const docRef = doc(getFirestore(firebaseConfig), "guests", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setGuest(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setGuest(null);
    }
  };

  const setUserDatas = async () => {
    try {
      const guestRef = doc(
        getFirestore(firebaseConfig),
        "guests",
        currentUser.uid
      );
      await updateDoc(guestRef, {
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {}
  };

  return (
    <Grid container>
      <Grid
        container
        sx={{ height: 140 }}
        direction='column'
        justifyContent='space-around'
      >
        <TextField
          type='text'
          value={guest !== null && guest.name.split(" ")[0]}
          label='Prénom'
          variant='standard'
          fullWidth
          disabled
        />
        <TextField
          type='text'
          value={guest !== null && guest.name.split(" ")[1]}
          label='Nom'
          variant='standard'
          fullWidth
          disabled
        />
      </Grid>
      <Grid
        container
        sx={{ height: 140 }}
        direction='column'
        justifyContent='space-around'
      >
        <TextField
          type='tel'
          value={guest !== null && guest.phoneNumber}
          label='Téléphone mobile'
          variant='standard'
          fullWidth
          disabled
        />
        <TextField
          value={guest !== null && guest.email}
          label='Email'
          variant='standard'
          fullWidth
          disabled
        />
      </Grid>
      <Grid container justifyContent='flex-end'>
        <Button
          variant='contained'
          sx={{
            backgroundColor: theme.palette.primary.main,
            textTransform: "none",
            marginTop: 5,
          }}
        >
          Mettre à jour
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormProfil;
