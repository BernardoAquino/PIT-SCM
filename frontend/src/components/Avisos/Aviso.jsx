import React, { useState, useEffect,   useCallback } from 'react';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Collapse,
} from '@material-ui/core';
import { ExpandMore, Delete } from '@material-ui/icons';
import useStyles from '../../styles/Avisos';
import Comment from './Comment';
import CommentBox from './CommentBox';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Aviso(props) {
  // state dos comentarios
  const [comentarios, setComentarios] = useState([]);

  const [usuario, setUsuario] = useState([]);
  const user = useAuth().usuario;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = useCallback(async () => {
    await api.delete(`/avisos/${props.aviso.id}`);
    // window.location.reload();
  }, [props.aviso.id]);

  const classes = useStyles();
  // listar nome do sindico que postou
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/usuarios/getOne/${props.aviso.usuarioId}`,
      );
      setUsuario(response.data);
    }
    fetchData();
  }, [props.aviso.usuarioId]);
  // parse data da publicacao
  const date = new Date(props.aviso.createdAt);
  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return user.tipoUsuario === 1 ? (
    <div className={classes.post}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          title={usuario.nome}
          subheader={dateString}
        />
        {/* Imagem */}
        <CardMedia
          className={classes.media}
          image={`http://localhost:8081/files/${props.aviso.img}`}
          title="titulo"
        />
        {/* mensagem */}
        <CardContent>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.aviso.mensagem}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>

          <Button
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="mais"
            color="primary"
          >
            <ExpandMore
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            />
            Comentários
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comentar:</Typography>

            {/* Caixa para enviar comentario */}
            <CommentBox
              avisoId={props.aviso.id}
              comentarios={comentarios}
              setComentarios={setComentarios}
            />

            {/* comentários */}
            <Comment
              avisoId={props.aviso.id}
              comentarios={comentarios}
              setComentarios={setComentarios}
            />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  ):(
    <div className={classes.post}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          title={usuario.nome}
          subheader={dateString}
        />
        {/* Imagem */}
        <CardMedia
          className={classes.media}
          image={`http://localhost:8081/files/${props.aviso.img}`}
          title="titulo"
        />
        {/* mensagem */}
        <CardContent>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.aviso.mensagem}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="mais"
            color="primary"
          >
            <ExpandMore
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            />
            Comentários
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comentar:</Typography>

            {/* Caixa para enviar comentario */}
            <CommentBox
              avisoId={props.aviso.id}
              comentarios={comentarios}
              setComentarios={setComentarios}
            />

            {/* comentários */}
            <Comment
              avisoId={props.aviso.id}
              comentarios={comentarios}
              setComentarios={setComentarios}
            />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
