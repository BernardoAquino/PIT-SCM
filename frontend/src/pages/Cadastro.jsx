import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import {
  Avatar,
  Button,
  Grid,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import useStyles from '../styles/Cadastro';
import { Apartment } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import MaskedInput from 'react-text-mask';
import { FooterUnfixed } from '../components/Footer';
import {
  cadastroSchema,
  telefoneMask,
  cepMask,
  cpfMask,
} from '../utils/schemas';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Cadastro() {
  const classes = useStyles();
  const [status, setStatusBase] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { signIn } = useAuth();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const onSubmit = async (values) => {
    try {
      await api.post('condominios', {
        cidade: values.cidade,
        bairro: values.bairro,
        numero: values.numero,
        cpf: values.cpf,
        cep: values.cep,
        nome: values.nome,
        telefone: values.telefone,
        email: values.email,
        senha: values.senha,
        dtNasc: selectedDate,
        uf: values.uf,
      })
      setStatusBase({
        msg: 'Cadastrado com sucesso.',
        key: Math.random(),
        severity: 'success',
      })
      try {
        await signIn({
          email: values.email,
          senha: values.senha,
        });
        console.log('logado')
      }catch (error) {
        setStatusBase({
          msg: 'Não foi possível realizar login.',
          key: Math.random(),
          severity: 'error',
        });
        console.log(error)
      }
    } catch (error) {
      setStatusBase({
        msg: 'Não foi possível realizar cadastro.',
        key: Math.random(),
        severity: 'error',
      });
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

      <Container component="main" maxWidth="md" className={classes.box}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Apartment />
          </Avatar>
          <Typography component="h1" variant="h5">
            Realizar cadastro
          </Typography>

          <Formik
            onSubmit={onSubmit}
            initialValues={{
              cidade: '',
              bairro: '',
              numero: '',
              cep: '',
              nome: '',
              telefone: '',
              email: '',
              senha: '',
              uf: '',
            }}
            validationSchema={cadastroSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    {/* cidade */}
                    <TextField
                      required
                      variant="outlined"
                      type="text"
                      error={errors.cidade && touched.cidade}
                      label="Cidade"
                      name="cidade"
                      className={classes.form}
                      value={values.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.cidade && touched.cidade && errors.cidade
                      }
                      margin="normal"
                    />
                  </Grid>

                  {/* bairro */}

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      variant="outlined"
                      type="text"
                      error={errors.bairro && touched.bairro}
                      label="Bairro"
                      name="bairro"
                      className={classes.form}
                      value={values.bairro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.bairro && touched.bairro && errors.bairro
                      }
                      margin="normal"
                    />
                  </Grid>
                  {/* numero */}

                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      variant="outlined"
                      type="number"
                      error={errors.numero && touched.numero}
                      label="Número"
                      name="numero"
                      className={classes.form}
                      value={values.numero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.numero && touched.numero && errors.numero
                      }
                      margin="normal"
                    />
                  </Grid>
                  {/* unidade federativa */}
                  <Grid item xs={12} md={2}>
                    <FormControl variant="outlined" className={classes.select}>
                      <InputLabel htmlFor="outlined-age-native-simple">
                        UF
                      </InputLabel>
                      <Select
                        required
                        native
                        value={values.uf}
                        onChange={handleChange}
                        label="Age"
                        margin="none"
                        name="uf"
                        inputProps={{
                          name: 'uf',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={'AC'}>AC</option>
                        <option value={'AL'}>AL</option>
                        <option value={'AP'}>AP</option>
                        <option value={'AM'}>AM</option>
                        <option value={'BA'}>BA</option>
                        <option value={'CE'}>CE</option>
                        <option value={'DF'}>DF</option>
                        <option value={'ES'}>ES</option>
                        <option value={'GO'}>GO</option>
                        <option value={'MA'}>MA</option>
                        <option value={'MT'}>MT</option>
                        <option value={'MS'}>MS</option>
                        <option value={'MG'}>MG</option>
                        <option value={'PA'}>PA</option>
                        <option value={'PB'}>PB</option>
                        <option value={'PR'}>PR</option>
                        <option value={'PE'}>PE</option>
                        <option value={'PI'}>PI</option>
                        <option value={'RJ'}>RJ</option>
                        <option value={'RN'}>RN</option>
                        <option value={'RS'}>RS</option>
                        <option value={'RO'}>RO</option>
                        <option value={'RR'}>RR</option>
                        <option value={'SC'}>SC</option>
                        <option value={'SP'}>SP</option>
                        <option value={'SE'}>SE</option>
                        <option value={'TO'}>TO</option>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* cep */}

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cep"
                      label="CEP"
                      name="cep"
                      className={classes.form}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        inputProps: { mask: cepMask },
                        value: values.cep,
                      }}
                      error={errors.cep && touched.cep}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.cep && touched.cep && errors.cep}
                    />
                  </Grid>

                  {/* nome */}

                  <Grid item xs={12} md={4}>
                    <TextField
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
                      variant="outlined"
                      type="email"
                      error={errors.email && touched.email}
                      label="E-mail"
                      name="email"
                      className={classes.form}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}
                      margin="normal"
                    />
                  </Grid>

                  {/* telefone */}

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
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

                  <Grid item md={4}></Grid>

                  <Grid item md={4}>
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Entrar
                    </Button>
                  </Grid>

                  <Grid item md={4}></Grid>
                </Grid>
              </Form>
            )}
          </Formik>

          <Link to="/">já cadastrado? realizar login.</Link>
        </div>
        <FooterUnfixed />
      </Container>
    </div>
  );
}

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
