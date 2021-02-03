import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "46.25%", // 56.25% 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
  commentAvatar: {
    alignSelf: "center",
  },
  // marginTop elevado somente do segundo post pra frente
  post: {
    "&:nth-child(n+3)": {
      marginTop: theme.spacing(8),
    },
    "&:nth-child(2)": {
      marginTop: theme.spacing(1),
    },
  },
  commentButton: {
    marginLeft: theme.spacing(6),
  },
  commentBox: {
    gap: "10px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));
export default useStyles;
