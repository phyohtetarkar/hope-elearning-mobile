import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookmarkIcon, Share2Icon } from 'lucide-react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainTabs from './MainTabs';
import { useAppearance } from './components/appearance';
import { CustomStatusBar } from './components/ui/CustomStatusBar';
import { RootStackParamList } from './navigations';
import BlogDetailScreen from './screens/blog/BlogDetailScreen';
import CourseDetailScreen from './screens/course/CourseDetailScreen';

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
          navigationBarColor: theme.colors.card,
        }}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            title: 'Back',
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
                  color={props.tintColor}
                />
              );
            },
          })}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={({ route }) => ({
            headerBackTitleVisible: false,
            title: '',
            animation: 'slide_from_right',
            headerRight: props => {
              return (
                <HeaderButtons left>
                  <Item
                    title="Bookmark"
                    iconName="bookmark"
                    IconComponent={BookmarkIcon as any}
                    color={props.tintColor}
                  />
                  <Item
                    title="Share"
                    iconName="share"
                    IconComponent={Share2Icon as any}
                    color={props.tintColor}
                  />
                </HeaderButtons>
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
