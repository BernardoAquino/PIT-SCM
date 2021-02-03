import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './PrivateRoutes';
import Home from '../pages/Home';
import Avisos from '../pages/Avisos';
import Sobre from '../pages/Sobre';
import Documentos from '../pages/Documentos';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import CadastroCondominos from '../pages/CadastroCondominos';
import Perfil from '../pages/Perfil';
import Gastos from '../pages/Gastos'
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/cadastroCondominos" component={CadastroCondominos} isPrivate />
      <Route exact path="/home" component={Home} isPrivate />
      <Route exact path="/avisos" component={Avisos} isPrivate />
      <Route exact path="/documentos" component={Documentos} isPrivate />
      <Route exact path="/gastos" component={Gastos} isPrivate />
      <Route exact path="/perfil" component={Perfil} isPrivate />
      <Route exact path="/sobre" component={Sobre} isPrivate />
      <Route component={NotFound} />
    </Switch>
  );
}
