import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Box } from '@material-ui/core';
import useStyles from '../styles/NotFound';

export default function NotFound() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.centerBox}>
        <Typography variant="h1" style={{ fontWeight: '800' }}>
          404
        </Typography>
        <Typography variant="h5" style={{ fontWeight: '600' }}>
          Ops! Parece que a página que você acessou não existe.
        </Typography>
        <Button
          className={classes.backButton}
          variant="contained"
          color="primary"
          onClick={() => history.push('/home')}
        >
          Voltar ao Início
        </Button>
      </Box>
    </div>
  );
}
