import { AppBar, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { Apps, MonetizationOn } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import Chart from '../components/Chart';
import { DocumentoCardMin } from '../components/Documentos/DocumentoCard';
import Footer from '../components/Footer';
import Gasto from '../components/Gastos/Gasto';
import PageFrame from '../components/PageFrame';
import PageFrameSindico from '../components/PageFrameSindico';
import { ReservaPessoalMin } from '../components/Reservas/ReservaPessoal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/Home';

// pagina home do site
export default function Home(props) {
  const classes = useStyles();

  const { usuario } = useAuth();

  const [documentos, setDocumentos] = useState([]);
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/documentos/${usuario.condominioId}`)
      const response2 = await api.get(`/avisos/${usuario.condominioId}`)

      const documentos = response.data
      const avisos = response2.data

      setDocumentos(documentos)
      setAvisos(avisos)
      console.log(avisos);
    }
    fetchData();
  }, [usuario.condominioId]);

  return usuario.tipoUsuario === 1 ? (
    <PageFrameSindico>
      <Grid container spacing={3} style={props}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            <Apps color="secondary" fontSize="large" />
            Geral:
          </Typography>
        </Grid>
        {/* Card de documentos */}
        <Grid item xs={12} sm={12} md={6}>
          <AppBar
            position="static"
            className={classes.cardHeader}
            style={{
              backgroundImage: 'linear-gradient(to right, #e87e20 , #deb10d)',
            }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Documentos:
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            {documentos.map((documento)=>(
              <Grid container spacing={3} style={props}>
              <Grid item xs={4}>
                <DocumentoCardMin text={documento.titulo} file={documento.caminho} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <p>{documento.descricao}</p>
              </Grid>
              </Grid>
            ))}
          </Paper>
        </Grid>
        {/* Card de reservas */}
        <Grid item xs={12} sm={12} md={6}>
          <AppBar
            className={classes.cardHeader}
            position="static"
            style={{
              backgroundImage: 'linear-gradient(to right, #7134eb , #5702c7)',
            }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Avisos Recentes:
              </Typography>
            </Toolbar>
          </AppBar>

          <Paper elevation={1} className={classes.paper}>
            {avisos.map((aviso)=>(
              <p style={{fontWeight: 'bold'}}>- {aviso.mensagem}</p>
            ))}
          </Paper>

        </Grid>
        {/* Grafico de gastos por mês */}
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            <MonetizationOn color="secondary" fontSize="large" />
            Gastos:
          </Typography>
          {/* <Gasto /> */}
          <Paper>
            <Chart />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </PageFrameSindico>
  ) : (
    <PageFrame>
      <Grid container spacing={3} style={props}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            <Apps color="secondary" fontSize="large" />
            Geral:
          </Typography>
        </Grid>
        {/* Card de documentos */}
        <Grid item xs={12} sm={12} md={6}>
          <AppBar
            position="static"
            className={classes.cardHeader}
            style={{
              backgroundImage: 'linear-gradient(to right, #e87e20 , #deb10d)',
            }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Documentos importantes:
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            {documentos.map((documento)=>(
              <Grid container spacing={3} style={props}>
              <Grid item xs={4}>
                <DocumentoCardMin text={documento.titulo} file={documento.caminho} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <p>{documento.descricao}</p>
              </Grid>
              </Grid>
            ))}
          </Paper>
        </Grid>
        {/* Card de avisos */}
        <Grid item xs={12} sm={12} md={6}>
          <AppBar
            className={classes.cardHeader}
            position="static"
            style={{
              backgroundImage: 'linear-gradient(to right, #7134eb , #5702c7)',
            }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Avisos Recentes:
              </Typography>
            </Toolbar>
          </AppBar>

          <Paper elevation={1} className={classes.paper}>
            {avisos.map((aviso)=>(
              <p style={{fontWeight: 'bold'}}>- {aviso.mensagem}</p>
            ))}
          </Paper>
        </Grid>
        {/* Grafico de gastos por mês */}
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            <MonetizationOn color="secondary" fontSize="large" />
            Gastos:
          </Typography>
          <Paper>
            <Chart></Chart>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </PageFrame>
  );
}
