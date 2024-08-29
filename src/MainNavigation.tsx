import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Share2Icon } from 'lucide-react-native';
import { Item } from 'react-navigation-header-buttons';
import MainTabs from './MainTabs';
import BlogDetailScreen from './blog/BlogDetailScreen';
import { useAppearance } from './components/appearance';
import { CustomStatusBar } from './components/ui/CustomStatusBar';

export type RootStackParamList = {
  MainTabs: undefined;
  BlogDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  const navigationRef = useNavigationContainerRef();
  const { theme } = useAppearance();

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <CustomStatusBar />
      <Stack.Navigator
        screenOptions={{
          // header: ({ options, route }) => (
          //   <Header
          //     title={getHeaderTitle(options, route.name)}
          //     headerStyle={{
          //       elevation: 0,
          //       borderBottomWidth: 0.7,
          //     }}
          //   />
          // ),
          headerShadowVisible: false,
          headerStyle: !theme.dark
            ? {
                backgroundColor: theme.colors.primary,
              }
            : undefined,
          headerTintColor: theme.dark
            ? theme.colors.text
            : theme.colors.primaryForeground,
          headerTitleStyle: {
            color: theme.dark
              ? theme.colors.text
              : theme.colors.primaryForeground,
          },
        }}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetailScreen}
          options={({ route }) => ({
            headerBackTitle: 'Back',
            title: '',
            animation: 'slide_from_right',
            headerRight: props => {
              return (
                <Item
                  title="Share"
                  iconName="share"
                  IconComponent={Share2Icon as any}
                  color={theme.dark ? 'gray' : theme.colors.primaryForeground}
                />
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
