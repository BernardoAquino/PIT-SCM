import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// arquivo de estilo da sidenav
import useStyles from '../styles/SideNav';
//
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Toolbar,
  Typography,
} from '@material-ui/core';
// icones
import {
  Home,
  Notifications,
  Info,
  Description,
  Add,
  MonetizationOn
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import Topnav from './Topnav';
import { useAuth } from '../context/AuthContext';
function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { usuario } = useAuth();
  //funcao que abre o drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar className={classes.toolbar}>
        <Avatar className={classes.large} src="/pf.png"></Avatar>
        <Typography variant="h6" className={classes.userName}>
          {/* somente o primeiro nome */}
          {usuario.nome.split(' ')[0]}
        </Typography>
      </Toolbar>
      <Divider />
      <List className={classes.drawerList}>
        {/* passar icone como child, texto e caminho da rota para a function Item */}
        <Item text="Início" pathname="/home">
          <Home />
        </Item>

          <Item text="Gastos" pathname="/gastos">
          <MonetizationOn />
        </Item>

        <Item text="Avisos" pathname="/avisos">
          <Notifications />
        </Item>

        <Item text="Documentos" pathname="/documentos">
          <Description />
        </Item>

        <Item text="Cadastrar Condômino" pathname="/cadastroCondominos">
          <Add />
        </Item>

        <Item text="Sobre nós" pathname="/sobre">
          <Info />
        </Item>
      </List>
      <Divider />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {/* passando a funcao de abrir como prop para o componente topnav */}
      <Topnav handleDrawerToggle={handleDrawerToggle} />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
              root: classes.color,
            }}
            ModalProps={{
              keepMounted: true, // Melhora performance no mobile
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

// links da sidenav
function Item(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    // arrow function que redireciona o usuario para outra rota
    // sem uso do Link ou NavLink somente com o useHistory
    // do react-router-dom 5^
    <ListItem
      button
      key={props.text}
      onClick={() => history.push(`${props.pathname}`)}
    >
      <ListItemIcon>
        <Avatar className={classes.itemIcon}>{props.children}</Avatar>
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
}

export default ResponsiveDrawer;
