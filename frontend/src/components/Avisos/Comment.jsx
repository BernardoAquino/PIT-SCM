import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';

import api from '../../services/api';
import useStyles from '../../styles/Avisos';

export default function Comment({avisoId, setComentarios, comentarios, ...rest}) {
  const classes = useStyles();
  // listar comentarios
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/comentarios/${avisoId}`)

      setComentarios(response.data);
      console.log(response.data)
    }
    fetchData();
  }, [avisoId, setComentarios]);

  return (
    <List className={classes.root}>
      {comentarios.map((comentario) => (
        <CommentList key={comentario.id} comentario={comentario} />
      ))}
    </List>
  );
}
// parar listar todos os comentarios
function CommentList(props) {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="nome" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.comentario.Usuario.nome}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.comentario.mensagem}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
