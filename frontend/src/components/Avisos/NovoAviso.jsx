import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import useStyles from '../../styles/Avisos';
import { Form, Formik } from 'formik';
import { avisoSchema } from '../../utils/schemas';
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext';

export default function NovoAviso(props) {
  const [open, setOpen] = React.useState(false);
  const {usuario} = useAuth();

  const onSubmit = async (values) => {
    const formData = new FormData();
    // documento
    formData.append('img', values.img);
    formData.append('mensagem', values.mensagem);
    try {
      await api.post(`/avisos/${usuario.id}`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });

      const response = await api.get(`/avisos/${usuario.condominioId}`);

      props.setAvisos(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        className={classes.formSubmit}
        onClick={handleClickOpen}
        fullWidth
      >
        Novo Aviso
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Novo Aviso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crie um novo aviso para os condôminos.
          </DialogContentText>
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              mensagem: '',
              img: null,
            }}
            validationSchema={avisoSchema}
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
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  error={errors.mensagem && touched.mensagem}
                  label="Mensagem"
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
                {/* IMAGENS */}
                <input
                  id="img"
                  name="img"
                  type="file"
                  formEncType="multipart/form-data"
                  onChange={(event) => {
                    setFieldValue('img', event.currentTarget.files[0]);
                  }}
                />

                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button type="submit" onClick={handleClose} color="primary">
                    Confirmar
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
