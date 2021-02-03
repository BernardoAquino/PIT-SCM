import { makeStyles } from "@material-ui/core";
// estilo global
const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(4),
  },
  profilePic: {
    margin: "10px auto",
    height: "200px",
    width: "200px",
    [theme.breakpoints.down("sm")]: {
      height: "80px",
      width: "80px",
    },
  },
  info: {
    margin: "15px",
  },
  profileName: {
    textAlign: "center",
  },
}));
export default useStyles;
