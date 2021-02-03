/* componente responsavel por juntar navbar
sidenav e conteudo para todas as paginas */
import React from 'react';
import { Box, Toolbar, makeStyles } from '@material-ui/core';
import Sidenav from './SidenavSindico';
import Topnav from './Topnav';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function PageFrame(props) {
  const classes = useStyles();
  return (
    <>
      <Topnav />
      {/* display flex para o conteudo ficar alinhado corretamente na horizontal */}
      <Box display="flex">
        <Sidenav />
        <main className={classes.content}>
          {/* toolbar alinha corretamente o conteudo na vertical */}
          <Toolbar />
          {props.children}
        </main>
      </Box>
    </>
  );
}
