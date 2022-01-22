import React from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import firebaseConfig from "../config/firebase";
import { getAuth } from "firebase/auth";

const IconLogout = () => {
  return (
    <div style={{ cursor: "pointer" }} onClick={() => getAuth().signOut()}>
      <ExitToAppOutlinedIcon fontSize='medium' />
    </div>
  );
};

export default IconLogout;
