import React from "react";
import { AuthContext } from "./Auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { IconButton } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import { Close } from "@mui/icons-material";

const FormProfil = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [guest, setGuest] = React.useState(null);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    fullName: "",
  });
  const [openDialog, setopenDialog] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({
    firstName: "",
    lastName: "",
    fullName: "",
    validFirstName: true,
    validLastName: true,
  });
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState("");
  const [severitySnackBar, setSeveritySnackBar] = React.useState("success");

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

  const setUserDatas = async () => {
    try {
      const guestRef = doc(
        getFirestore(firebaseConfig),
        "guests",
        currentUser.uid
      );
      await updateDoc(guestRef, {
        firstName: user.firstName !== "" ? user.firstName : guest.firstName,
        lastName: user.lastName !== "" ? user.lastName : guest.lastName,
      });
      getDocUser();
      if (user.firstName !== "" && user.lastName !== "") {
        setErrorMessage({
          ...errorMessage,
          fullName: "",
          validFirstName: true,
          validLastName: true,
        });
        setOpenSnackBar(true);
        setMessageSnackBar("Informations mises à jours");
        setSeveritySnackBar("success");
      } else {
        setErrorMessage({
          ...errorMessage,
          firstName: "Renseignez un prénom",
          lastName: "Renseignez un nom",
          validFirstName: false,
          validLastName: false,
        });
      }
      if (user.firstName !== "" && user.lastName !== "") {
        setErrorMessage({
          ...errorMessage,
          validFirstName: true,
          validLastName: true,
        });
        setOpenSnackBar(true);
        setMessageSnackBar("Informations mises à jours");
        setSeveritySnackBar("success");
      }
      if (user.firstName === "" && user.lastName === "") {
        setErrorMessage({
          ...errorMessage,
          fullName: "Renseignez un prénom et un nom",
          validFirstName: false,
          validLastName: false,
        });
        setOpenSnackBar(true);
        setMessageSnackBar("Informations mises à jours");
        setSeveritySnackBar("success");
      }
    } catch (error) {
      console.log(error);
      setMessageSnackBar("Erreur mise à jour");
      setSeveritySnackBar("success");
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const actionSnackBar = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleSnackBarClose}>
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleSnackBarClose}
      >
        <Close fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid container>
      <Grid
        container
        sx={{ height: 280 }}
        direction='column'
        justifyContent='space-around'
      >
        <TextField
          type='text'
          value={guest !== null && guest.firstName}
          label='Prénom'
          variant='standard'
          fullWidth
          disabled
        />
        <TextField
          type='text'
          value={guest !== null && guest.lastName}
          label='Nom'
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
          onClick={() => setopenDialog(true)}
        >
          Mettre à jour
        </Button>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => setopenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Mettre à jour votre profil</DialogTitle>
        <DialogContent>
          <Stack direction='row' justifyContent='space-around'>
            <TextField
              label='Prénom'
              value={user.firstName}
              variant='standard'
              onChange={(event) =>
                setUser({ ...user, firstName: event.target.value })
              }
              helperText={
                errorMessage.validFirstName === false
                  ? errorMessage.firstName
                  : ""
              }
              error={!errorMessage.validFirstName}
            />
            <TextField
              label='Nom'
              value={user.lastName}
              variant='standard'
              onChange={(event) =>
                setUser({ ...user, lastName: event.target.value })
              }
              helperText={
                errorMessage.validLastName === false
                  ? errorMessage.lastName
                  : ""
              }
              error={!errorMessage.validLastName}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            sx={{
              backgroundColor: theme.palette.primary.main,
              textTransform: "none",
              marginTop: 5,
            }}
            onClick={() => {
              setopenDialog(false);
              setUser({
                ...user,
                firstName: "",
                lastName: "",
              });
              setErrorMessage({
                ...errorMessage,
                firstName: "",
                lastName: "",
                validFirstName: true,
                validLastName: true,
              });
            }}
          >
            Fermer
          </Button>
          <Button
            variant='contained'
            sx={{
              backgroundColor: theme.palette.primary.main,
              textTransform: "none",
              marginTop: 5,
            }}
            onClick={setUserDatas}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        action={actionSnackBar}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={severitySnackBar}
          sx={{ width: "100%" }}
        >
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FormProfil;
