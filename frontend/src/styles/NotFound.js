import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    backgroundImage: 'url("/notfound.jpg")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    color: "#fff",
  },
  centerBox: {
    textAlign: "center",
    backgroundColor: theme.palette.secondary.main,
    minWidth: "40vw",
    padding: theme.spacing(4),
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "20px",
    boxShadow: `8px 8px ${theme.palette.secondary.dark}`,
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90vw",
    },
  },
  backButton:{
      margin: theme.spacing(4),
      height: "50px"
  }
}));

export default useStyles;
