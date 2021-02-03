import { withStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
// estilo global
export const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: "#2b2b2b",
    height: "42px",
    width: "42px",
    margin: theme.spacing(0.5),
    "&:hover": {
      background: "#4f4f4f",
    },
  },
}));
// styled components
export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
