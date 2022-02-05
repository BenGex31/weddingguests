import React from "react";
import { AuthContext } from "./Auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { Button, Grid, TextField } from "@mui/material";
import theme from "../core/theme/MuiTheme";

const FormProfil = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [guest, setGuest] = React.useState(null);

  React.useEffect(() => {
    getDocUser();
    // eslint-disable-next-line
  }, []);

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

  return (
    <Grid container>
      <Grid
        container
        sx={{ height: 150 }}
        direction='column'
        justifyContent='space-around'
      >
        <TextField
          type='text'
          value={guest !== null && guest.name.split(" ")[0]}
          label='Prénom'
          variant='standard'
          fullWidth
        />
        <TextField
          type='text'
          value={guest !== null && guest.name.split(" ")[1]}
          label='Nom'
          variant='standard'
          fullWidth
        />
      </Grid>
      <Grid
        container
        sx={{ height: 150 }}
        direction='column'
        justifyContent='space-around'
      >
        <TextField
          type='tel'
          label='Téléphone mobile'
          variant='standard'
          fullWidth
        />
        <TextField
          value={guest !== null && guest.email}
          label='Email'
          variant='standard'
          fullWidth
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
