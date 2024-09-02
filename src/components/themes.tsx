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
  };
};

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5048e5',
    primaryForeground: '#ffffff',
    background: '#ffffff',
    default: '#e5e5e5',
    highlight: '#777777',
  },
};

export const DarkTheme: Theme = {
  ...NativeDarkTheme,
  colors: {
    ...NativeDarkTheme.colors,
    primary: '#6467f2',
    primaryForeground: '#f2f2f2',
    background: '#000000',
    default: '#212121',
    highlight: '#777777',
  },
};
