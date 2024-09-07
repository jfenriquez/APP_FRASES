import React, {createContext, useEffect, useReducer} from 'react';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../Interfaces/AuthInterface';
import {authReducer, AuthStateType} from './AuthReducer';
import {apiAuth, apiNoAuth} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////types
type AuthContextType = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'notAuthenticated';
  signUp: (RegisterRequest: RegisterRequest) => void;
  signIn: (LoginRequest: LoginRequest) => void;
  signOut: () => void;
  removeErrorMessage: () => void;
};

///estado inicial reducer
const authInitialState: AuthStateType = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextType);

///////provider
export const AuthProvider = ({children}: any) => {
  ///reducer authReducer
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  /////check token
  useEffect(() => {
    checkToken();
  }, []);

  //////check token
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return dispatch({
          type: 'notAuthenticated',
        });
      }
      console.log(await AsyncStorage.getItem('token'));

      /////existe token
      const resp = await apiAuth.post('/auth/find');
      console.log(resp.data, '________');
      if (resp.status === 201) {
        dispatch({
          type: 'signUp',
          payload: {
            token: token, ////
            user: resp.data,
          },
        });
      } else {
        dispatch({
          type: 'notAuthenticated',
        });
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch({
        type: 'notAuthenticated',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        ///sign up
        signUp: async ({name, email, password}: RegisterRequest) => {
          try {
            const {data} = await apiNoAuth.post<LoginResponse>(
              '/auth/register',
              {name, email, password},
            );

            dispatch({
              type: 'signUp',
              payload: {
                token: data.access_token,
                user: data.user,
              },
            });
            await AsyncStorage.setItem('token', data.access_token);
          } catch (error) {
            dispatch({
              type: 'addError',
              payload: 'registro incorrecto ,error email ya registrado',
            });
          }
        },
        /////login
        signIn: async ({email, password}: LoginRequest) => {
          try {
            const {data} = await apiNoAuth.post<LoginResponse>('/auth/login', {
              email,
              password,
            });

            dispatch({
              type: 'signUp',
              payload: {
                token: data.access_token,
                user: data.user,
              },
            });
            await AsyncStorage.setItem('token', data.access_token);
          } catch (error) {
            dispatch({
              type: 'addError',
              payload: 'error ',
            });
          }
        },
        ///sign out
        signOut: async () => {
          await AsyncStorage.removeItem('token');
          dispatch({
            type: 'logout',
          });
        },
        /////remove error message
        removeErrorMessage: () => {
          dispatch({
            type: 'removeError',
          });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
