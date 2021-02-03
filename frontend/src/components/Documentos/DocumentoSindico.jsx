import { Button, FormControl, Grid, Paper, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import ErrorMessage from '../../components/ErrorMessage';
import React, { useState } from 'react';
import api from '../../services/api';
import { documentoSchema } from '../../utils/schemas';
import { useAuth } from '../../context/AuthContext';
import useStyles from '../../styles/Documentos';

export default function DocumentoSindico(props) {
  const classes = useStyles();

  const { usuario } = useAuth();
  const [status, setStatusBase] = useState('');
  // onSubmit form
  const onSubmit = async (values, {resetForm}) => {
    const formData = new FormData();
    // dados do documento
    formData.append('doc', values.documento);
    formData.append('titulo', values.titulo);
    formData.append('descricao', values.descricao);
    try {
      await api.post(`/documentos/${usuario.condominioId}`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });

      const response = await api.get(`/documentos/${usuario.condominioId}`);

      props.setDocumentos(response.data);

      setStatusBase({
        msg: 'Cadastrado com sucesso.',
        key: Math.random(),
        severity: 'success',
      });

      document.getElementById("documento").value = "";
      resetForm({});

    } catch (error) {

      console.log(error);
      setStatusBase({
        msg: 'Não foi possível cadastrar o gasto.',
        key: Math.random(),
        severity: 'error',
      });
      document.getElementById("documento").value = "";
      resetForm({});
    }
  };

  return (
    <Paper className={classes.novoDocumentoCard}>
              {status ? (
          <ErrorMessage
            key={status.key}
            message={status.msg}
            severity={status.severity}
          />
        ) : null}
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          titulo: '',
          descricao: '',
          documento: null,
        }}
        validationSchema={documentoSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <Form className={classes.form}>
            <Grid container spacing={4}>
              {/* TITULO */}
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <FormControl className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    type="text"
                    error={errors.descricao && touched.descricao}
                    label="Descrição"
                    name="descricao"
                    className={classes.form}
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.descricao && touched.descricao && errors.descricao
                    }
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              {/* CONTEUDO */}
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <FormControl className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    type="text"
                    error={errors.titulo && touched.titulo}
                    label="Título"
                    name="titulo"
                    className={classes.form}
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.titulo && touched.titulo && errors.titulo
                    }
                    margin="normal"
                  />
                </FormControl>
              </Grid>
              {/* Documento */}
              <Grid item xs={12} sm={12} md={3} lg={4}>
                <FormControl className={classes.formControl}>
                  <input
                    autoFocus
                    id="documento"
                    type="file"
                    formEncType="multipart/form-data"
                    className={classes.file}
                    name="documento"
                    onChange={(event) => {
                      setFieldValue('documento', event.currentTarget.files[0]);
                    }}
                  />
                </FormControl>
              </Grid>
              {/* Cadastrar */}
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.formSubmit}
                  onSubmit={onSubmit}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
