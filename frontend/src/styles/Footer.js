import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  // footer no fundo centralizado
  footer: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-40%)',
  },
  footerUnfixed: {
    marginTop: theme.spacing(10),
  },
}));
