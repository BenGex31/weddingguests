import React from "react";
import { AuthContext } from "./Auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { Stack, TextField } from "@mui/material";

const FormProfil = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [guest, setGuest] = React.useState(null);

  React.useEffect(() => {
    getDocUser();
    // eslint-disable-next-line
  }, []);

  const getDocUser = async () => {
    const guestRef = doc(
      getFirestore(firebaseConfig),
      "guests",
      currentUser.uid
    );
    const guestSnap = await getDoc(guestRef);

    if (guestSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setGuest(guestSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setGuest(null);
    }
  };

  return (
    <Stack spacing={5}>
      <TextField
        type='text'
        value={guest !== null ? guest.firstName : ""}
        label='Prénom'
        variant='standard'
        fullWidth
        disabled
      />
      <TextField
        type='text'
        value={guest !== null ? guest.lastName : ""}
        label='Nom'
        variant='standard'
        fullWidth
        disabled
      />
      <TextField
        value={currentUser.email}
        label='Email'
        variant='standard'
        fullWidth
        disabled
      />
    </Stack>
  );
};

export default FormProfil;
