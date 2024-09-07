import {Theme} from '@react-navigation/native';
type ThemeAction =
  | {type: 'set_light_theme'}
  | {type: 'set_dark_theme'}
  | {type: 'set_lemon_theme'}
  | {type: 'set_coffe_theme'};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark' | 'lemon' | 'coffe';
  divideColor: string;
}
////LIGHT THEME
export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  divideColor: 'rgba(0,0,0,0.7)',
  colors: {
    primary: '#00266E',
    border: '#444655',
    card: '#c8cfeb',
    text: 'black',
    notification: 'teal',
    background: '#a39afd',
  },
};

/////DARK THEME
export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: false,
  divideColor: 'rgba(0,0,0,0.7)',
  colors: {
    primary: '#b8c1ec',
    border: '#eebbc3',
    card: 'rgba(168, 219, 168, 0.22)',
    text: '#ffffff',
    notification: 'teal',
    background: '#232946',
  },
};

/////lemon theme
export const lemonTheme: ThemeState = {
  currentTheme: 'lemon',
  dark: false,
  divideColor: '#e16162',
  colors: {
    primary: '#2F4858',
    border: '#6A5584',
    card: '#70989B',
    text: 'black',
    notification: '#e16162',
    background: '#abd1c6',
  },
};

/////coffe theme
export const coffeTheme: ThemeState = {
  currentTheme: 'coffe',
  dark: false,
  divideColor: '#e16162',
  colors: {
    primary: '#2F4858',
    border: '#402E32',
    card: '#EAD8C0',
    notification: '#5F6F52',
    text: 'black',
    background: '#B99470',
  },
};

export const ThemeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return {...lightTheme};
    case 'set_dark_theme':
      return {...darkTheme};
    case 'set_lemon_theme':
      return {...lemonTheme};
    case 'set_coffe_theme':
      return {...coffeTheme};

    default:
      state;
  }
};
