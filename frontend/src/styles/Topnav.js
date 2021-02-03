import { makeStyles } from "@material-ui/core";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow: "none",
    backgroundColor: "#1f1f1f",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    height: "42px",
    width: "42px",
    margin: theme.spacing(0.5),
  },
}));
export default useStyles;