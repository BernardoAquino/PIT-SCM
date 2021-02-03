import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { useStyles } from '../styles/Footer';

// footer
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://scm.com.br/">
          SCM.com.br
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </footer>
  );
}

// footer para a tela de login
export function FooterUnfixed() {
  const classes = useStyles();
  return (
    <footer className={classes.footerUnfixed}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://scm.com.br/">
          SCM.com.br
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </footer>
  );
}
