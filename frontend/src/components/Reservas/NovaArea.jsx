import React, { useState } from 'react';
import useStyles from '../../styles/Reservas';
import { Paper, Button,  TextField,  } from '@material-ui/core';
import {Formik, Form} from 'formik';
import {areasSchema} from '../../utils/schemas'

import ErrorMessage from '../../components/ErrorMessage';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function NovaReserva() {
  const classes = useStyles();

  const { usuario } = useAuth();
  const [status, setStatusBase] = useState('');

  const onSubmit = async (values) => {
    console.log(values)
    try {
      console.log(values);
      await api.post(`areas/${usuario.id}`,{
        nome: values.nome
    })
    setStatusBase({
      msg: 'Cadastrado com sucesso.',
      key: Math.random(),
      severity: 'success',
    })
    } catch (error) {
    setStatusBase({
      msg: 'Não foi possível realizar o cadastro.',
      key: Math.random(),
      severity: 'error',
    });
    console.log(error)
    }
  };

  return (
    <Paper className={classes.novaReservaCard}>
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
          nome: ''
        }}
        validationSchema={areasSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form className={classes.form}>
            <TextField
              variant="outlined"
              type="text"
              error={errors.nome && touched.nome}
              label="Nome da área"
              name="nome"
              className={classes.form}
              value={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.nome && touched.nome && errors.nome}
              margin="normal"
            />

            <br />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              cadastrar
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
