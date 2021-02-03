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
import { PersonAddRounded, MonetizationOn, Delete } from '@material-ui/icons';
import PageFrame from '../components/PageFrame';
import PageFrameSindico from '../components/PageFrameSindico';
import Footer from '../components/Footer';
import { Form, Formik } from 'formik';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MaskedInput from 'react-text-mask';
import {
  gastosSchema,
  telefoneMask,
  cpfMask,
} from '../utils/schemas';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/CadastroCondomino';

export default function Gastos(props) {
  const classes = useStyles();

  const { usuario } = useAuth();

  const [gastos, setGastos] = useState([]);

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [status, setStatusBase] = useState('');

  function getMes(mes) {
    switch (mes) {
      case 1:
          return "Janeiro";
          break;
      case 2:
          return "Fevereiro";
          break;
      case 3:
          return "Março";
          break;
      case 4:
          return "Abril";
          break;
      case 5:
          return "Maio";
          break;
      case 6:
          return "Junho";
          break;
      case 7:
          return "Julho";
          break;
      case 8:
          return "Agosto";
          break;
      case 9:
          return "Setembro";
          break;
      case 10:
          return "Outubro";
          break;
      case 11:
          return "Novembro";
          break;
      case 12:
          return "Dezembro";
          break;
      default:
          return "Mês inexistente";
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function handleDelete(gastoId) {
    await api.delete(`/gastos/${gastoId}`);
  }

  // listar gastos
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/gastos/${usuario.condominioId}`);

      setGastos(response.data);
    }
    fetchData();
  }, [usuario.condominioId, gastos]);
  // criar gastos
  const onSubmit = async (values, {resetForm}) => {
    try {
      console.log(values);
      const formData = new FormData();

      formData.append('comprovante', values.comprovante);
      formData.append('valorTotal', values.valorTotal);
      formData.append('categoriaGasto', values.categoriaGasto);
      formData.append('mes', values.mes);

      const response = await api
        .post(`/gastos/${usuario.condominioId}`, formData, {
          headers: { 'Content-type': 'multipart/form-data' },
        })
        .then((response) => {
          setStatusBase({
            msg: 'Cadastrado com sucesso.',
            key: Math.random(),
            severity: 'success',
          });
          setGastos([...gastos, response.data]);
        });
        document.getElementById("comprovante").value = "";
        resetForm({});
    } catch (error) {
      setStatusBase({
        msg: 'Não foi possível cadastrar o gasto.',
        key: Math.random(),
        severity: 'error',
      });
      document.getElementById("comprovante").value = "";
      resetForm({});
    }
  };

  return usuario.tipoUsuario === 1 ? (
    <div className={classes.root}>
      <PageFrameSindico>
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
            Adicionar Gasto
          </Typography>
          <Formik
            onSubmit={onSubmit}
            initialValues={{
              comprovante: null,
              valorTotal: '',
              categoriaGasto: '',
              mes: ''
            }}
            // validationSchema={gastosSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
              <Form className={classes.form}>
                {/* valorTotal */}
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      type="number"
                      error={errors.valorTotal && touched.valorTotal}
                      label="Valor Total"
                      name="valorTotal"
                      className={classes.form}
                      value={values.valorTotal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.valorTotal && touched.valorTotal && errors.valorTotal}
                      margin="normal"
                    />
                  </Grid>

                {/* categoriaGasto */}
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      type="text"
                      error={errors.categoriaGasto && touched.categoriaGasto}
                      label="Categoria / Tipo"
                      name="categoriaGasto"
                      className={classes.categoriaGasto}
                      value={values.categoriaGasto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.categoriaGasto && touched.categoriaGasto && errors.categoriaGasto}
                      margin="normal"
                    />
                  </Grid>

                  {/* mes */}
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      type="number"
                      error={errors.mes && touched.mes}
                      label="Mês"
                      name="mes"
                      className={classes.form}
                      value={values.mes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.mes && touched.mes && errors.mes}
                      margin="normal"
                      InputProps={{ inputProps: { min: 1, max: 12 } }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}></Grid>
                  {/* IMAGENS */}
                  <Grid item xs={12} md={4}>
                  <input
                    id="comprovante"
                    name="comprovante"
                    type="file"
                    formEncType="multipart/form-data"
                    onChange={(event) => {
                      setFieldValue('comprovante', event.currentTarget.files[0]);
                    }}
                  />
                  </Grid>

                  <Grid item md={6}></Grid>

                  <Grid item md={2}></Grid>

                  <Grid item md={12}>
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      fullWidth
                    >
                      Cadastrar
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
              <MonetizationOn color="secondary" fontSize="large" />
              Gastos:
            </Typography>
            {gastos.map((gasto) => (
              <Paper key={gasto.id}>
                <h2 style={{marginLeft:'2%'}}>Valor Total: {gasto.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                <h2 style={{marginLeft:'2%'}}>
                  <a
                    href={'http://localhost:8081/files/' + gasto.comprovante}
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  Comprovante
                  </a>
                </h2>
                <h2 style={{marginLeft:'2%'}}>Categoria/Tipo: {gasto.categoriaGasto}</h2>
                <h2 style={{marginLeft:'2%'}}>Mês: {getMes(gasto.mes)}</h2>
                <IconButton onClick={() => handleDelete(gasto.id)}>
                  <Delete />
                </IconButton>
              </Paper>
            ))}
          </Paper>
        </div>
        <Footer />
      </PageFrameSindico>
    </div>
  ) : (    <div className={classes.root}>
    <PageFrame>
      {/* listagem de usuarios */}
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            <MonetizationOn color="secondary" fontSize="large" />
            Gastos:
          </Typography>
          {gastos.map((gasto) => (
            <Paper key={gasto.id}>
              <h2 style={{marginLeft:'2%'}}>Valor Total: {gasto.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
              <h2 style={{marginLeft:'2%'}}>
                <a
                  href={'http://localhost:8081/files/' + gasto.comprovante}
                  className={classes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                Comprovante
                </a>
              </h2>
              <h2 style={{marginLeft:'2%'}}>Categoria/Tipo: {gasto.categoriaGasto}</h2>
              <h2 style={{marginLeft:'2%'}}>Mês: {getMes(gasto.mes)}</h2>
            </Paper>
          ))}
        </Paper>
      </div>
      <Footer />
    </PageFrame>
  </div>);
}

Gastos.propTypes = {
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
