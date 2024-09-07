import {User} from '../Interfaces/AuthInterface';

/* interface REDUCER */
export interface AuthStateType {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'unauthenticated';
}

//acciones
type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: User}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

/* REDUCER */
export const authReducer = (
  state: AuthStateType,
  action: AuthAction,
): AuthStateType => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'unauthenticated',
        token: null,
        errorMessage: action.payload,
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'unauthenticated',
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
