import React from 'react';
import PageFrame from '../components/PageFrame';
import PageFrameSindico from '../components/PageFrameSindico';
import { Typography } from '@material-ui/core';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Sobre() {
  const { usuario } = useAuth();

  return usuario.tipoUsuario === 1 ? (
    <PageFrameSindico>
      <Typography style={{ textAlign: 'justify' }}>
        Somos uma startup especializada em gestão de condomínios, daí o nome
        SCM, que é uma abreviação de "Smart Condominium Management". Surgimos em
        2020 com o intuito de inovar na área e crescer para tornar a vida dos
        nossos clientes mais fácil.
      </Typography>
      <Typography style={{ textAlign: 'center' }}>
        Queremos Agradecer a todos por depositarem sua confiança em nós.
      </Typography>
      <Typography style={{ textAlign: 'center' }}>
        Atenciosamente equipe SCM.
      </Typography>
      <Footer />
    </PageFrameSindico>
  ) : (
    <PageFrame>
      <Typography style={{ textAlign: 'justify' }}>
        Somos uma startup especializada em gestão de condomínios, daí o nome
        SCM, que é uma abreviação de "Smart Condominium Management". Surgimos em
        2020 com o intuito de inovar na área e crescer para tornar a vida dos
        nossos clientes mais fácil.
      </Typography>
      <Typography style={{ textAlign: 'center' }}>
        Queremos Agradecer a todos por depositarem sua confiança em nós.
      </Typography>
      <Typography style={{ textAlign: 'center' }}>
        Atenciosamente equipe SCM.
      </Typography>
      <Footer />
    </PageFrame>
  );
}
