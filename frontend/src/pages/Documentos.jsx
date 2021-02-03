import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Description, AddCircle } from '@material-ui/icons';
import Footer from '../components/Footer';
import PageFrameSindico from '../components/PageFrameSindico';
import PageFrame from '../components/PageFrame';
import DocumentoCard from '../components/Documentos/DocumentoCard';
import useStyles from '../styles/Documentos';
import DocumentosSindico from '../components/Documentos/DocumentoSindico';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Documentos() {
  const classes = useStyles();

  const { usuario } = useAuth();

  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/documentos/${usuario.condominioId}`);
      setDocumentos(response.data);
    }
    fetchData()
    }, [usuario.condominioId, documentos]);

  return usuario.tipoUsuario === 1 ? (
    <PageFrameSindico>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          <AddCircle color="secondary" fontSize="large" />
          Novos Documentos:
        </Typography>
        <DocumentosSindico setDocumentos={setDocumentos} />
      </Grid>

      <Typography variant="h5" className={classes.title}>
        <Description color="secondary" fontSize="large" />
        Documentos
      </Typography>
      {documentos.map((documento) => (
        <DocumentoCard
          key={documento.id}
          id={documento.id}
          documentos={documentos}
          setDocumentos={setDocumentos}
          text={documento.titulo}
          descricao={documento.descricao}
          file={documento.caminho}
        />
      ))}
      <Footer />
    </PageFrameSindico>
  ) : (
    <PageFrame>
      <Typography variant="h5" className={classes.title}>
        <Description color="secondary" fontSize="large" />
        Documentos
      </Typography>
      {documentos.map((documento) => (
        <DocumentoCard
          key={documento.id}
          text={documento.titulo}
          descricao={documento.descricao}
          file={documento.caminho}
        />
      ))}
      <Footer />
    </PageFrame>
  );
}
