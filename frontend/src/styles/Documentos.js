import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "10px",
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  link: {
    display: "block",
  },
  left: {
    float: "left",
  },
  right: {
    float: "right",
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
  novoDocumentoCard: {
    padding: theme.spacing(10),
  },
  form: {

  },
  file: {
    marginTop: theme.spacing(2)
  },
  a: {
    color: '#f00',
    fontWeight: 'bold',
    fontFamily: 'helvetica',
    textDecoration: 'none',
    textTransform: 'uppercase',
    '&:hover': {
      textDecoration: 'underline',
    },
    // '&:active': {
    //   color: '#000',
    // },
    '&:visited': {
      color: 'purple',
    },
  },
}));

export default useStyles;
