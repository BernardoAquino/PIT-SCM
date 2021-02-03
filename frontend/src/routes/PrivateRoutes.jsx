import React from 'react';
import { Route as ReactRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { usuario } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!usuario ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
