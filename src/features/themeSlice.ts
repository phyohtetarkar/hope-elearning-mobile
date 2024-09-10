import { DarkTheme, LightTheme, Theme } from '@/components/themes';
import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: Theme;
  mode: 'light' | 'dark' | 'system';
}

const initialState: ThemeState = {
  theme: LightTheme,
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: () => initialState,
  reducers: {
    setLightMode: state => {
      state.theme = LightTheme;
      state.mode = 'light';
    },
    setDarkMode: state => {
      state.theme = DarkTheme;
      state.mode = 'dark';
    },
    setSystemMode: state => {
      state.mode = 'system';
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setLightMode, setDarkMode, setSystemMode, setTheme } =
  themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;

export const selectThemeMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
