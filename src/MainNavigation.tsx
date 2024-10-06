/* eslint-disable react/no-unstable-nested-components */
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookmarkIcon, Share2Icon } from 'lucide-react-native';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainTabs from './MainTabs';
import { typography } from './components/styles';
import { CustomStatusBar } from './components/ui/CustomStatusBar';
import { ToastErrorLayout, ToastInfoLayout } from './components/ui/ToastLayout';
import SignInScreen from './features/auth/SignInScreen';
import SignUpScreen from './features/auth/SignUpScreen';
import PostDetailScreen from './features/blog/PostDetailScreen';
import CourseDetailScreen from './features/course/CourseDetailScreen';
import CourseListHeaderRight from './features/course/CourseListHeaderRight';
import CourseListHeaderTitle from './features/course/CourseListHeaderTitle';
import CourseListScreen from './features/course/CourseListScreen';
import { selectTheme } from './features/themeSlice';
import { useAppSelector } from './lib/hooks';
import { RootStackParamList } from './navigations';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screen = Dimensions.get('window');

const MainNavigation = () => {
  const navigationRef = useNavigationContainerRef();
  const theme = useAppSelector(selectTheme);

  const { colors } = theme;

  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(screen, false, insets.top);

  const toastTopOffset = headerHeight + 10;

  const toastConfig: ToastConfig = {
    error: ToastErrorLayout,
    info: ToastInfoLayout,
  };

  return (
    <>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <CustomStatusBar />
        <Stack.Navigator
          screenOptions={{
            headerBackground: () => {
              return (
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 0.7,
                    borderBottomColor: colors.border,
                    backgroundColor: colors.card,
                  }}
                />
              );
            },
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: colors.text,
            navigationBarColor: colors.card,
            animation: 'slide_from_right',
            headerTitleStyle: typography.headerTitle,
          }}>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              title: 'Back',
              headerShown: false,
              headerBackground: undefined,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="BlogDetail"
            component={PostDetailScreen}
            options={({ route }) => ({
              title: '',
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
            name="CourseList"
            component={CourseListScreen}
            options={({ route }) => ({
              title: 'Courses',
              headerTitleAlign: 'left',
              headerTitle: CourseListHeaderTitle,
              headerRight: CourseListHeaderRight,
            })}
          />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={({ route }) => ({
              title: '',
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

          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={({ route }) => ({
              title: 'Sign In',
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={({ route }) => ({
              title: 'Sign Up',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={toastConfig}
        topOffset={toastTopOffset}
        visibilityTime={5000}
      />
    </>
  );
};

export default MainNavigation;
