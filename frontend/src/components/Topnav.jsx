import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu, ExitToApp, AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import useStyles from '../styles/Topnav';
import { useStyles as menuStyles } from '../styles/SettingsMenu';
// menu de configuracoes
import SettingsMenu from './SettingsMenu';
import {useAuth} from '../context/AuthContext'
// navbar escura no topo da pagina
export default function Topnav(props) {
  const classes = useStyles();
  const classesMenu = menuStyles();
  const history = useHistory();
  const {signOut} = useAuth();

  return (
    <AppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <IconButton
          color="secondary"
          aria-label="abrir lateral"
          edge="start"
          onClick={props.handleDrawerToggle}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <div className={classes.grow} />
        {/* logout */}
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="secondary"
          onClick={signOut}
          className={classesMenu.icon}
        >
          <ExitToApp />
        </IconButton>
        {/* perfil */}
        <SettingsMenu />
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="secondary"
          onClick={() => history.push('/perfil')}
          className={classesMenu.icon}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
