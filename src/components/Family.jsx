import React from "react";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import { AuthContext } from "../components/Auth";
import firebaseConfig from "../config/firebase";
import { Stack } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Family = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [childrenList, setChildrenList] = React.useState([]);

  React.useEffect(() => {
    getChilren();
    // eslint-disable-next-line
  }, []);

  const getChilren = async () => {
    const childrenRef = doc(
      getFirestore(firebaseConfig),
      "childrenGuests",
      currentUser.uid
    );
    const childrenSnap = await getDoc(childrenRef);
    if (childrenSnap.exists()) {
      console.log("Document data:", childrenSnap.data());
      setChildrenList(childrenSnap.data().childrenList);
    } else {
      setChildrenList([]);
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <Stack direction='row' justifyContent='space-evenly'>
      {childrenList.map((child, index) => (
        <Chip
          key={index}
          icon={<FaceIcon />}
          label={`${child.firstName} ${child.lastName}`}
          variant='outlined'
        />
      ))}
    </Stack>
  );
};

export default Family;
