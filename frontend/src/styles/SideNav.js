import { makeStyles } from "@material-ui/core/styles";
// tamanho da sidenav
const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  // onde se troca a cor de fundo, border, etc
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(to top left,  ${theme.palette.primary.light} , ${theme.palette.primary.main});`,
    borderRadius: "0 0 6px 0",
  },
  // cor do texto
  drawerList: {
    color: theme.palette.primary.contrastText,
  },
  //cor dos icones
  itemIcon: {
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  userName: {
    margin: theme.spacing(1),
    color: "#ffffff",
  },
}));
export default useStyles;
