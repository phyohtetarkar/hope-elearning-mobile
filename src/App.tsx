import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './MainNavigation';
import { AppearanceContextProvider } from './components/appearance';

const App = () => {
  return (
    <AppearanceContextProvider>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </AppearanceContextProvider>
  );
};

export default App;
