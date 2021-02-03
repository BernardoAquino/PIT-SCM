import React, { useState, useEffect } from 'react';
import PageFrameSindico from '../components/PageFrameSindico';
import PageFrame from '../components/PageFrame';
import Aviso from '../components/Avisos/Aviso';
import NovoAviso from '../components/Avisos/NovoAviso';
import useStyles from '../styles/Avisos';
import { Typography, Grid } from '@material-ui/core';
import { Notifications, AddCircle } from '@material-ui/icons';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// componente pai da pagina de avisos
export default function Avisos() {
  const classes = useStyles();
  const { usuario } = useAuth();
  const [avisos, setAvisos] = useState([]);

  // pegar informações de usuario
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/avisos/${usuario.condominioId}`);

      setAvisos(response.data);

    }
    fetchData();
  },[usuario.condominioId, avisos]);

  return usuario.tipoUsuario === 1 ? (
    <PageFrameSindico>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={2} />

        {/* Novo aviso */}

        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Typography variant="h5" className={classes.title}>
            <AddCircle color="secondary" fontSize="large" />
            Criar novo aviso
          </Typography>

          <NovoAviso avisos={avisos} setAvisos={setAvisos} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={2} />
        <Grid item xs={12} sm={12} md={12} lg={2} />

        {/* Listando Avisos */}

        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Typography variant="h5" className={classes.title}>
            <Notifications color="secondary" fontSize="large" />
            Avisos:
          </Typography>

          {avisos.map((aviso) => (
            <Aviso key={aviso.id} aviso={aviso} />
          ))}

        </Grid>
      </Grid>
      <Footer />
    </PageFrameSindico>
  ) : (
    <PageFrame>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={2} />

        {/* Avisos */}

        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Typography variant="h5" className={classes.title}>
            <Notifications color="secondary" fontSize="large" />
            Avisos recentes
          </Typography>
          {avisos.map((aviso) => (
            <Aviso key={aviso.id} aviso={aviso} />
          ))}
        </Grid>
      </Grid>
      <Footer />
    </PageFrame>
  );
}
