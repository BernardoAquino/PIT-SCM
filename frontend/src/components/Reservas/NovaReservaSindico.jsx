import 'date-fns';
import React, { useState } from 'react';
import useStyles from '../../styles/Reservas';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
// relogios
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptLocale from 'date-fns/locale/pt-BR';
import horariosDisponiveis from '../../utils/horarios';
import { areasSchema } from '../../utils/schemas';

export default function NovaReservaSindico() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [area, setArea] = useState();
  const [inicio, setInicio] = useState();
  const [termino, setTermino] = useState();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitArea = async () => {};

  const onSubmitReserva = async () => {};

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <Paper className={classes.novaReservaCard}>
        <br />
        <Formik
          onSubmit={onSubmitArea}
          initialValues={{
            area: '',
            data: '',
            dtInicio: '',
            dtTermino: '',
          }}
          validationSchema={areasSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form className={classes.form}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={3} ls={2}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="area-select">Área:</InputLabel>
                    <Select
                      labelId="area-select"
                      id="demo-simple-select"
                      value={area}
                      onChange={(area) => setArea(area.target.value)}
                    >
                      <MenuItem value={1}>Piscina</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <DatePicker
                    inputVariant="outlined"
                    className={classes.formControl}
                    id="time-picker"
                    autoOk
                    label="Escolha o dia:"
                    clearable
                    disablePast
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'horarioinicio',
                    }}
                  />
                </Grid>
                {/* horario */}
                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="inicioLabel">Início:</InputLabel>
                    <Select
                      labelId="inicioLabel"
                      id="inicio"
                      value={inicio}
                      onChange={(inicio) => setInicio(inicio.target.value)}
                    >
                      {horariosDisponiveis('8:00', '17:00', 30).map(
                        (horario) => (
                          <MenuItem value={horario}>{horario}</MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="terminoLabel">Término:</InputLabel>
                    <Select
                      labelId="terminoLabel"
                      id="termino"
                      value={termino}
                      onChange={(termino) => setTermino(termino.target.value)}
                    >
                      {horariosDisponiveis('8:00', '17:00', 30).map(
                        (horario) => (
                          <MenuItem value={horario}>{horario}</MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3} />

                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.formSubmit}
                    onClick={onSubmitReserva}
                  >
                    Agendar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.formSubmit}
                    onClick={handleClickOpen}
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        {/* Cadastro de horarios */}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cadastrar Horários</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cadastre o intervalo de horário disponível para as reservas.
            </DialogContentText>
            <Formik
              onSubmit={onSubmitArea}
              initialValues={{
                dtInicio: '09:00',
                dtTermino: '23:00',
              }}
              validationSchema={areasSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form className={classes.form}>
                  <TextField
                    variant="outlined"
                    type="time"
                    error={errors.dtInicio && touched.dtInicio}
                    label="Horário Início"
                    name="dtInicio"
                    className={classes.form}
                    value={values.dtInicio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.dtInicio && touched.dtInicio && errors.dtInicio
                    }
                    margin="normal"
                  />
                  <br />
                  <TextField
                    variant="outlined"
                    type="time"
                    error={errors.dtTermino && touched.dtTermino}
                    label="Horário Final"
                    name="dtTermino"
                    className={classes.form}
                    value={values.dtTermino}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.dtTermino && touched.dtTermino && errors.dtTermino
                    }
                    margin="normal"
                  />
                  <br />
                </Form>
              )}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" onClick={onSubmitArea} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
