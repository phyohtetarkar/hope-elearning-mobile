import { Header, getHeaderTitle } from '@react-navigation/elements';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainTabs from './MainTabs';
import { DarkTheme, LightTheme } from './components/themes';

const Stack = createNativeStackNavigator();

const ElearningApp = () => {
  const navigationRef = useNavigationContainerRef();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={isDarkMode ? DarkTheme : LightTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        translucent={isDarkMode}
      />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          header: ({ options, route }) => (
            <Header
              title={getHeaderTitle(options, route.name)}
              headerStyle={{
                elevation: 0,
                borderBottomWidth: 0.7,
              }}
            />
          ),
        }}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ElearningApp;
