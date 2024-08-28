import { Header, getHeaderTitle } from '@react-navigation/elements';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainTabs from './MainTabs';
import { useAppearance } from './components/appearance';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const navigationRef = useNavigationContainerRef();
  const { theme } = useAppearance();

  const backgroundStyle = {
    backgroundColor: theme.dark ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        translucent={theme.dark}
      />
      <Stack.Navigator
        screenOptions={{
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

export default MainNavigation;
