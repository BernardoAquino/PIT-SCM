import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: theme.spacing(32),
    borderRadius: `0px 0px 6px 6px`,
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  cardHeader: {
    borderRadius: `6px 6px 0px 0px`,
  },
}));
export default useStyles;
