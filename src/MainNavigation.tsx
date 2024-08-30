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
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTintColor: theme.colors.text,
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
            headerBackTitleVisible: false,
            title: '',
            animation: 'slide_from_right',
            headerRight: props => {
              return (
                <Item
                  title="Share"
                  iconName="share"
                  IconComponent={Share2Icon as any}
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
