import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
