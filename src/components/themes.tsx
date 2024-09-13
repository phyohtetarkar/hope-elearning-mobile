import {
  DefaultTheme,
  DarkTheme as NativeDarkTheme,
} from '@react-navigation/native';

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    primaryForeground: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    default: string;
    highlight: string;
    error: string;
    errorForeground: string;
    success: string;
    muted: string;
  };
};

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5048e5',
    primaryForeground: '#ffffff',
    error: '#d50002',
    errorForeground: '#ffffff',
    success: '#00a524',
    background: '#ffffff',
    default: '#e5e5e5',
    highlight: '#777777',
    muted: '#555555',
  },
};

export const DarkTheme: Theme = {
  ...NativeDarkTheme,
  colors: {
    ...NativeDarkTheme.colors,
    primary: '#6467f2',
    primaryForeground: '#f2f2f2',
    error: '#FF4245',
    errorForeground: '#0F172A',
    success: '#00a524',
    background: '#000000',
    default: '#212121',
    highlight: '#777777',
    muted: '#aaaaaa',
  },
};
