import {
  DefaultTheme,
  DarkTheme as NativeDarkTheme,
} from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5048e5',
  },
};

export const DarkTheme = {
  dark: true,
  ...NativeDarkTheme.colors,
  colors: {
    ...NativeDarkTheme.colors,
    primary: '#6467f2',
  },
};
