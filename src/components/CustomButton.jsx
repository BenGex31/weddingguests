import { Button, styled } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";

const MuiButton = styled(Button)({
  width: 262,
  height: 56,
  fontSize: 15,
  fontFamily: oswaldR.fontFamily,
  fontStyle: oswaldR.fontStyle,
  fontWeight: oswaldR.fontWeight,
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
  color: theme.palette.primary.light,
  textTransform: "none",
  "&:hover": { backgroundColor: theme.palette.secondary.main },
});

const CustomButton = ({ text }) => {
  const history = useHistory();
  const handleClick = () => history.push("/formulaire");
  return <MuiButton onClick={handleClick}>{text}</MuiButton>;
};

export default CustomButton;
