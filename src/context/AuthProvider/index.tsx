import { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IDecodedToken, IUser } from './types';
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from './util';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(matricula: string, senha: string) {
    const response = await LoginRequest(matricula, senha);
    const payload = {
      //userId: response.user.id_usuario,
      matricula: response.user.matricula,
      senha: response.user.senha,
      token: response.token,
    };
    setUser(payload);
    setUserLocalStorage(payload);
  }

  api.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      console.trace(error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message !== 'Assinatura incorreta'
      ) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    localStorage.removeItem('userSession');
  }

  function isTokenValid() {
    const userAuth = getUserLocalStorage();
    if (!userAuth || !userAuth.token) {
      return false;
    }

    try {
      const decodedToken: IDecodedToken = jwtDecode(userAuth.token);
      if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
        logout();
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        authenticate,
        isTokenValid,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
