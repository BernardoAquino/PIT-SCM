import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { AddCircle, EventAvailable } from '@material-ui/icons';
import useStyles from '../styles/Reservas';
import NovaReservaSindico from '../components/Reservas/NovaReservaSindico';
import NovaArea from '../components/Reservas/NovaArea';
import PageFrameSindico from '../components/PageFrameSindico';
import PageFrame from '../components/PageFrame';
import Reserva from '../components/Reservas/ReservaPessoal';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Reservas() {
  const classes = useStyles();
  const { usuario } = useAuth();

  return usuario.tipoUsuario === 1 ? (
    <div className={classes.root}>
      <PageFrameSindico>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              <AddCircle color="secondary" fontSize="large" />
              Nova Área:
            </Typography>
            <NovaArea />
          </Grid>
          {/* Formulario nova reserva */}
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              <AddCircle color="secondary" fontSize="large" />
              Nova reserva:
            </Typography>
            <NovaReservaSindico />
          </Grid>

          {/* reservas pessoais */}
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              <EventAvailable color="secondary" fontSize="large" />
              Suas reservas:
            </Typography>
            <Reserva
              descricao="Descricao detalhada"
              text="Piscina"
              data="8 de setembro"
              inicio="9:00"
              termino="10:00"
            />
          </Grid>
        </Grid>
        <Footer />
      </PageFrameSindico>
    </div>
  ) : (
    <div className={classes.root}>
      <PageFrame>
        <Grid container spacing={4}>
          {/* Formulario nova reserva */}
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              <AddCircle color="secondary" fontSize="large" />
              Nova reserva:
            </Typography>
            <NovaReservaSindico />
          </Grid>
          {/* reservas pessoais */}
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              <EventAvailable color="secondary" fontSize="large" />
              Suas reservas:
            </Typography>
            <Reserva
              descricao="Descricao detalhada"
              text="Piscina"
              data="8 de setembro"
              inicio="9:00"
              termino="10:00"
            />
          </Grid>
        </Grid>
        <Footer />
      </PageFrame>
    </div>
  );
}
