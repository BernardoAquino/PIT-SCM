import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Formik } from 'formik';
import { FooterUnfixed } from '../components/Footer';
import useStyles from '../styles/Login';
import { loginSchema } from '../utils/schemas';
import ErrorMessage from '../components/ErrorMessage';

export default function Login() {
  const classes = useStyles();
  const [status, setStatusBase] = useState('');
  const { signIn } = useAuth();

  const onSubmit = async (values) => {
    console.log(values)
    try {
      await signIn({
        email: values.email,
        senha: values.senha,
      });
      console.log('logado')
    } catch (error) {
    setStatusBase({
      msg: 'Não foi possível realizar login.',
      key: Math.random(),
      severity: 'error',
    });
    console.log(error)
    }
  };

  return (
    <div className={classes.root}>
      {/* mensagem de erro */}
      {status ? (
        <ErrorMessage
          key={status.key}
          message={status.msg}
          severity={status.severity}
        />
      ) : null}

      <Container component="main" maxWidth="xs" className={classes.box}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Realizar login
          </Typography>

          <Formik
            onSubmit={onSubmit}
            initialValues={{
              email: '',
              senha: '',
            }}
            validationSchema={loginSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form className={classes.form}>
                <TextField
                  variant="outlined"
                  type="email"
                  error={errors.email && touched.email}
                  label="E-mail"
                  name="email"
                  className={classes.form}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  margin="normal"
                />
                <br />
                <TextField
                  variant="outlined"
                  type="password"
                  error={errors.senha && touched.senha}
                  label="Senha"
                  name="senha"
                  className={classes.form}
                  value={values.senha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.senha && touched.senha && errors.senha}
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
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>

          <Link to="/cadastro">Não está cadastrado? Realizar cadastro.</Link>
        </div>
        <FooterUnfixed />
      </Container>
    </div>
  );
}
