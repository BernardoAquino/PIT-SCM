import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  grow: {
    flexGrow: 1,
  },
  novaReservaCard: {
    padding: theme.spacing(10),
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  reservaPessoalCard: {
    width: "100%",
    marginTop: "10px",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: "100%",
  },
  formSubmit: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
    minWidth: "100%",
  },
  form: {
    width: "100%",
  },
  left: {
    float: "left",
  },
  right: {
    float: "right",
  },
  reservaMin: {
    clear: "both",
  },
}));
export default useStyles;
