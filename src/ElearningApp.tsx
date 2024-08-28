import MainNavigation from './MainNavigation';
import { AppearanceContextProvider } from './components/appearance';

const ElearningApp = () => {
  return (
    <AppearanceContextProvider>
      <MainNavigation />
    </AppearanceContextProvider>
  );
};

export default ElearningApp;
