import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";

const BasicMenu = ({ link, styleLinks }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenedMenu, setIsopenedMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsopenedMenu(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsopenedMenu(false);
  };
  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {isOpenedMenu ? <Close /> : <MenuIcon />}
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {link.map((item) => (
          <MenuItem onClick={handleClose} key={item.id}>
            <Link className={styleLinks} to={item.link}>
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BasicMenu;
