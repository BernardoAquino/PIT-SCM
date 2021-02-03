import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { Schedule, Event, Subject, ExpandMore } from '@material-ui/icons';
import useStyles from '../../styles/Reservas';

// card de reserva avancao para a pagina de reservas
export default function ReservaPessoal(props) {
  const classes = useStyles();

  return (
    <div className={classes.reservaPessoalCard}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="reserva-content"
          id="reserva-header"
        >
          <Typography className={classes.heading}>{props.text}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Subject />
                </ListItemIcon>
                <ListItemText primary={`Descrição: ${props.descricao}`} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary={`Data: ${props.data}`} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText
                  primary={`Horário: de ${props.inicio} até ${props.termino}`}
                />
              </ListItem>
            </List>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// card minificado/simples para a home
export function ReservaPessoalMin(props) {
  const classes = useStyles();
  return (
    <div className={classes.reservaMin}>
      <p className={classes.left}>{`${props.text}`}</p>

      <p className={classes.right}>
        {`${props.data} - Horário: de ${props.inicio} até ${props.termino}`}
      </p>
    </div>
  );
}
