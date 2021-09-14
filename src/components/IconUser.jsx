import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const IconUser = () => {
  return (
    <div>
      <Link to='/profile'>
        <AccountCircleIcon style={{ color: "black" }} />
      </Link>
    </div>
  );
};

export default IconUser;
