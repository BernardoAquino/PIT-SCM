import React from "react";
import PageFrame from "../components/PageFrame";
import PageFrameSindico from '../components/PageFrameSindico'
import { Avatar, Paper, Typography } from "@material-ui/core";
import useStyles from "../styles/Perfil";
import Footer from "../components/Footer";
import {useAuth} from '../context/AuthContext'

export default function Perfil() {
  const classes = useStyles();
  const { usuario } = useAuth();
  function dataAtualFormatada(date){
    var data = new Date(date),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }
  return usuario.tipoUsuario === 1 ? (
      <PageFrameSindico>
        <Paper className={classes.paper}>
          <Avatar src="/pf.png" className={classes.profilePic} />
          <Typography variant="h4" className={classes.profileName}>
            {usuario.nome}
          </Typography>
          <hr />
          <div>
            <Typography variant="h5" className={classes.info}>
              Email:{' '}
              <Typography variant="h6" color="textSecondary">
                {usuario.email}
              </Typography>
            </Typography>
            <Typography variant="h5" className={classes.info}>
              CPF:{' '}
              <Typography variant="h6" color="textSecondary">
                {usuario.cpf}
              </Typography>
            </Typography>
            <Typography variant="h5" className={classes.info}>
              Data de Nascimento:{' '}
              <Typography variant="h6" color="textSecondary">
                {dataAtualFormatada(usuario.dtNasc)}
              </Typography>
            </Typography>
          </div>
        </Paper>
        <Footer />
      </PageFrameSindico>
  ) : (
      <PageFrame>
        <Paper className={classes.paper}>
          <Avatar src="/pf.png" className={classes.profilePic} />
          <Typography variant="h4" className={classes.profileName}>
            {usuario.nome}
          </Typography>
          <hr />
          <div>
          <Typography variant="h5" className={classes.info}>
              Email:{' '}
              <Typography variant="h6" color="textSecondary">
                {usuario.email}
              </Typography>
            </Typography>
            <Typography variant="h5" className={classes.info}>
              CPF:{' '}
              <Typography variant="h6" color="textSecondary">
                {usuario.cpf}
              </Typography>
            </Typography>
            <Typography variant="h5" className={classes.info}>
              Data de Nascimento:{' '}
              <Typography variant="h6" color="textSecondary">
                {dataAtualFormatada(usuario.dtNasc)}
              </Typography>
            </Typography>
          </div>
        </Paper>
        <Footer />
      </PageFrame>
  );
}
