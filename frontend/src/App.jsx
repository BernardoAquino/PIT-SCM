import React from 'react';
import Routes from './routes/Routes';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core';
import { AuthProvider } from './context/AuthContext';
// definindo padrao de cor a ser usado na aplicacao
const theme = createMuiTheme({
  // pode ser acessado pelo theme.palette.primary.light por exemplo
  // no Hook useStyles()
  palette: {
    primary: {
      light: '#4e38ff',
      main: '#0f4b9b',
      dark: '#0e3c7b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f5b802 ',
      main: '#ffad0d ',
      dark: '#cf8a04',
      contrastText: '#fff',
    },
    background: {
      default: '#f2f2f2',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className={classes.root}>
          <Routes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
