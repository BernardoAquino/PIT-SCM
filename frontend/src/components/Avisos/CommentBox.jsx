import { Avatar, Box, Button, Divider, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import ErrorMessage from '../ErrorMessage';
import api from '../../services/api';
import { comentarioSchema } from '../../utils/schemas';
import { useAuth } from '../../context/AuthContext';
import useStyles from '../../styles/Avisos';

// formulario para comentar
export default function CommentBox(props) {
  const classes = useStyles();

  const [status, setStatusBase] = useState('');

  const { usuario } = useAuth();
  // create comentario
  const onSubmit = async (values) => {
    try {
      await api.post(
        `/comentarios/${props.avisoId}/${usuario.id}`,
        {
          mensagem: values.mensagem,
        },
      );

      const response = await api.get(`/comentarios/${props.avisoId}`);

      props.setComentarios(response.data);
    } catch (error) {
      setStatusBase({
        msg: 'Não foi possível comentar.',
        key: Math.random(),
        severity: 'Error',
      });
    }
  };

  return (
    <>
      {status ? (
        <ErrorMessage
          key={status.key}
          message={status.msg}
          severity={status.severity}
        />
      ) : null}
      <Box display="flex" className={classes.commentBox}>
        <Avatar className={classes.commentAvatar}></Avatar>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            mensagem: '',
          }}
          validationSchema={comentarioSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form className={classes.form}>
              <TextField
                fullWidth
                required
                variant="outlined"
                type="text"
                error={errors.mensagem && touched.mensagem}
                label="Comentário"
                name="mensagem"
                className={classes.form}
                value={values.mensagem}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.mensagem && touched.mensagem && errors.mensagem
                }
                margin="normal"
              />
              <Button
                type="submit"
                variant="outlined"
                className={classes.commentButton}
              >
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Divider />
    </>
  );
}
