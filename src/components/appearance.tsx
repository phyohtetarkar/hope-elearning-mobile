// import { ReactNode, createContext, useContext, useState } from 'react';
// import { DarkTheme, LightTheme, Theme } from './themes';

// type Mode = 'light' | 'dark';

// interface Appearance {
//   theme: Theme;
//   update?: (mode: Mode) => void;
// }

// export const AppearanceContext = createContext<Appearance>({
//   theme: LightTheme,
// });

// export const AppearanceContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const updateAppearance = (mode: Mode) => {
//     const theme = mode === 'dark' ? DarkTheme : LightTheme;
//     setAppearance(old => ({ ...old, mode: mode, theme: theme }));
//   };

//   const [appearance, setAppearance] = useState<Appearance>({
//     theme: LightTheme,
//     update: updateAppearance,
//   });

//   return (
//     <AppearanceContext.Provider value={appearance}>
//       {children}
//     </AppearanceContext.Provider>
//   );
// };

// export const useAppearance = () => {
//   const appearance = useContext(AppearanceContext);

//   return appearance;
// };
