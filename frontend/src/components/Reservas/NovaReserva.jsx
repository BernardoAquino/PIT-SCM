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
} from '@material-ui/core';
// relogios
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptLocale from 'date-fns/locale/pt-BR';
import horariosDisponiveis from '../../utils/horarios';

export default function NovaReserva() {
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
      <Paper className={classes.novaReservaCard}>
        <form className={classes.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={3} ls={2}>
              <FormControl className={classes.formControl} variant="outlined">
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

            <Grid item xs={12} sm={12} md={3} lg={2}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="inicioLabel">Início:</InputLabel>
                <Select
                  labelId="inicioLabel"
                  id="inicio"
                  value={inicio}
                  onChange={(inicio) => setInicio(inicio.target.value)}
                >
                  {horariosDisponiveis('8:00', '17:00', 30).map((horario) => (
                    <MenuItem value={horario}>{horario}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={2}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="terminoLabel">Término:</InputLabel>
                <Select
                  labelId="terminoLabel"
                  id="termino"
                  value={termino}
                  onChange={(termino) => setTermino(termino.target.value)}
                >
                  {horariosDisponiveis('8:00', '17:00', 30).map((horario) => (
                    <MenuItem value={horario}>{horario}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={2}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.formSubmit}
              >
                Agendar
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
