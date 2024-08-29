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
    muted: string;
    highlight: string;
  };
};

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5048e5',
    primaryForeground: '#ffffff',
    muted: '#eeeeee',
    background: '#ffffff',
    highlight: '#777777',
  },
};

export const DarkTheme: Theme = {
  ...NativeDarkTheme,
  colors: {
    ...NativeDarkTheme.colors,
    primary: '#6467f2',
    primaryForeground: '#f2f2f2',
    muted: '#191919',
    background: '#000000',
    highlight: '#777777',
  },
};
