import React from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import firebaseConfig from "../config/firebase";

const IconLogout = () => {
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => firebaseConfig.auth().signOut()}
    >
      <ExitToAppOutlinedIcon />
    </div>
  );
};

export default IconLogout;
