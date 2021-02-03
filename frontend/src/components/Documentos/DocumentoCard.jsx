import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete, Edit, ExpandMore } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';

import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import useStyles from '../../styles/Documentos';

export default function DocumentoCard(props) {
  const classes = useStyles();

  const handleDelete = useCallback(async () => {
    await api.delete(`/documentos/${props.id}`);
  }, [props.id]);

  const {usuario} = useAuth()

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="document-content"
          id="document-header"
        >
          <Typography className={classes.heading}>{props.text}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Typography color="textSecondary">{props.descricao}</Typography>
        </AccordionDetails>
        <AccordionDetails>
          <a
            href={'http://localhost:8081/files/' + props.file}
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.file}
          </a>
        </AccordionDetails>
        <AccordionActions>
          {usuario.tipoUsuario === 1 ? (
            <>
              {/* <IconButton onClick={handleDelete}>
                <Edit />
              </IconButton> */}
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
export function DocumentoCardMin(props) {
  const classes = useStyles();

  return (
      <p>        
        <a
          href={'http://localhost:8081/files/' + props.file}
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.a}
        >
        {props.text}
      </a>
    </p>
  );
}
