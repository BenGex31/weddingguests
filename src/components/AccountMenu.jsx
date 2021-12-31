import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Box,
  Tooltip,
} from "@mui/material";
import IconLogout from "./IconLogout";
import { AuthContext } from "../components/Auth";
import theme from "../core/theme/MuiTheme";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";

const AccountMenu = ({ styleLink }) => {
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title='Account settings'>
          <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
              }}
            >
              {currentUser.displayName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link className={styleLink} to='/profil'>
          <MenuItem>
            <Avatar src={currentUser.photoURL} /> Profil
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem
          sx={{
            color: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            fontFamily: oswaldR.fontFamily,
            fontStyle: oswaldR.fontStyle,
            fontWeight: oswaldR.fontWeight,
          }}
        >
          <ListItemIcon>
            <IconLogout />
          </ListItemIcon>
          Se déconnecter
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
