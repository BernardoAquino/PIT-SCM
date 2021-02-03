import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core';
import { PersonAddRounded, Apartment, Delete } from '@material-ui/icons';
import PageFrame from '../components/PageFrameSindico';
import Footer from '../components/Footer';
import { Form, Formik } from 'formik';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MaskedInput from 'react-text-mask';
import {
  cadastroCondominoSchema,
  telefoneMask,
  cpfMask,
} from '../utils/schemas';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/CadastroCondomino';

export default function Content(props) {
  const classes = useStyles();

  const { usuario } = useAuth();

  const [usuarios, setUsuarios] = useState([]);

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [status, setStatusBase] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function handleDelete(usuarioId) {
    await api.delete(`/usuarios/${usuarioId}`);
  }

  // listar condominos
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/usuarios/${usuario.condominioId}/${usuario.id}`);

      setUsuarios(response.data);
    }
    fetchData();
  }, [usuario.condominioId, usuarios]);
  // criar condomino
  const onSubmit = async (values, {resetForm}) => {
    try {
      const response = await api
        .post(`/usuarios/${usuario.condominioId}`, {
          cpf: values.cpf,
          nome: values.nome,
          telefone: values.telefone,
          email: values.email,
          senha: values.senha,
          dtNasc: selectedDate,
          uf: values.uf,
        })
        .then((response) => {
          setStatusBase({
            msg: 'Cadastrado com sucesso.',
            key: Math.random(),
            severity: 'success',
          });
          setUsuarios([...usuarios, response.data]);
        });
        resetForm({});
    } catch (error) {
      setStatusBase({
        msg: 'Não foi possível cadastrar o condômino.',
        key: Math.random(),
        severity: 'error',
      });
      resetForm({});
    }
  };

  return (
    <div className={classes.root}>
      <PageFrame>
        {status ? (
          <ErrorMessage
            key={status.key}
            message={status.msg}
            severity={status.severity}
          />
        ) : null}
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            <PersonAddRounded color="secondary" fontSize="large" />
            Adicionar Condômino
          </Typography>
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              numero: '',
              nome: '',
              telefone: '',
              email: '',
              cpf: '',
              senha: '',
              dtNasc: '',
            }}
            validationSchema={cadastroCondominoSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form className={classes.form}>
                {/* nome */}
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      type="text"
                      error={errors.nome && touched.nome}
                      label="Nome"
                      name="nome"
                      className={classes.form}
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.nome && touched.nome && errors.nome}
                      margin="normal"
                    />
                  </Grid>

                  {/* cpf */}

                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      fullWidth
                      id="cpf"
                      label="CPF"
                      name="cpf"
                      className={classes.form}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        inputProps: { mask: cpfMask },
                        value: values.cpf,
                      }}
                      error={errors.cpf && touched.cpf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.cpf && touched.cpf && errors.cpf}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      fullWidth
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
                  </Grid>

                  {/* telefone */}

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      mask="mask bruh"
                      id="telefone"
                      label="Telefone"
                      name="telefone"
                      className={classes.form}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        inputProps: { mask: telefoneMask },
                        value: values.telefone,
                        mask: telefoneMask,
                      }}
                      error={errors.telefone && touched.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.telefone && touched.telefone && errors.telefone
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
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
                  </Grid>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={ptLocale}
                  >
                    <Grid item xs={12} md={6}>
                      <KeyboardDatePicker
                        className={classes.form}
                        inputVariant="outlined"
                        name="dtNasc"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Data de nascimento"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                        helperText={
                          errors.dtNasc && touched.dtNasc && errors.dtNasc
                        }
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  <Grid item md={6}></Grid>

                  <Grid item md={2}></Grid>

                  <Grid item md={8}>
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      fullWidth
                    >
                      Adicionar
                    </Button>
                  </Grid>

                  <Grid item md={2}></Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
        {/* listagem de usuarios */}
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              <Apartment color="secondary" fontSize="large" />
              Condôminos:
            </Typography>
            {usuarios.map((usuario) => (
              <Paper key={usuario.id}>
                <h2 style={{marginLeft:'2%'}}>Nome: {usuario.nome}</h2>
                <h2 style={{marginLeft:'2%'}}>Email: {usuario.email}</h2>
                <h2 style={{marginLeft:'2%'}}>Telefone: {usuario.telefone}</h2>
                <h2 style={{marginLeft:'2%'}}>CPF: {usuario.cpf}</h2>
                <IconButton onClick={() => handleDelete(usuario.id)}>
                  <Delete />
                </IconButton>
              </Paper>
            ))}
          </Paper>
        </div>
        <Footer />
      </PageFrame>
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};
// input mascara
function TextMaskCustom(props) {
  const { inputRef, ...rest } = props;

  return (
    <MaskedInput
      {...rest}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={rest.mask}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
