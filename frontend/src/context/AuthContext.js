import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@scm:token');
    const usuario = localStorage.getItem('@scm:usuario');

    if (token && usuario) {
      return { token, usuario: JSON.parse(usuario) };
    }

    return {};
  });

  // metodo de login
  const signIn = useCallback(async ({ email, senha }) => {
    // chamada para a api
    const response = await api.post('auth', {
      email,
      senha,
    });

    const { usuario, token } = response.data;
    // armazenando credenciais do usuario no local storage
    localStorage.setItem('@scm:token', token);
    localStorage.setItem('@scm:usuario', JSON.stringify(usuario));

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@scm:token');
    localStorage.removeItem('@scm:usuario');

    setData({});
  }, []);

  return (
    // passando o contexto para toda a aplicação
    <AuthContext.Provider value={{ usuario: data.usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('UseAuth deve ser usado dentro de um AuthProvider.');
  }
  return context;
}
