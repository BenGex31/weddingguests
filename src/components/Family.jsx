import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import { AuthContext } from "../components/Auth";
import firebaseConfig from "../config/firebase";
import { Stack, Tooltip, Typography, Chip } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { oswaldLight } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";

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
        <Tooltip
          arrow
          key={index}
          title={
            <Stack>
              <Typography
                sx={{
                  fontSize: 12,
                  fontFamily: oswaldLight.fontFamily,
                  fontWeight: oswaldLight.fontWeight,
                  fontStyle: oswaldLight.fontStyle,
                  color: theme.palette.primary.light,
                }}
                component='p'
              >
                {child.isAllergy === "Oui"
                  ? `Allergies: ${child.allergies}`
                  : "Aucune allergie"}
              </Typography>
            </Stack>
          }
        >
          <Chip
            icon={<FaceIcon />}
            label={`${child.firstName} ${child.lastName}`}
            variant='outlined'
          />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default Family;
