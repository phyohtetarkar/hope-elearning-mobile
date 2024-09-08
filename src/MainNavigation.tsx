import { getDefaultHeaderHeight } from '@react-navigation/elements';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookmarkIcon, Share2Icon } from 'lucide-react-native';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainTabs from './MainTabs';
import { DefaultStyles } from './components/styles';
import { CustomStatusBar } from './components/ui/CustomStatusBar';
import { ToastErrorLayout, ToastInfoLayout } from './components/ui/ToastLayout';
import PostDetailScreen from './features/blog/PostDetailScreen';
import CourseDetailScreen from './features/course/CourseDetailScreen';
import CourseListScreen from './features/course/CourseListScreen';
import { selectTheme } from './features/themeSlice';
import { useAppSelector } from './lib/hooks';
import { RootStackParamList } from './navigations';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screen = Dimensions.get('window');

const MainNavigation = () => {
  const navigationRef = useNavigationContainerRef();
  const theme = useAppSelector(selectTheme);

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
            // header: ({ options, route, navigation }) => {
            //   return (
            //     <Header
            //       {...(options as any)}
            //       title={getHeaderTitle(options, route.name)}
            //       headerTitleContainerStyle={{
            //         flex: 1,
            //       }}
            //       headerLeftLabelVisible={false}
            //       headerShadowVisible={false}
            //       headerTintColor={theme.colors.text}
            //       headerStatusBarHeight={insets.top}
            //       headerLeft={props => (
            //         <HeaderBackButton
            //           {...props}
            //           onPress={() => navigation.pop()}
            //         />
            //       )}
            //     />
            //   );
            // },
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            navigationBarColor: theme.colors.card,
            animation: 'slide_from_right',
            headerTitleStyle: {
              fontSize: 18,
              ...DefaultStyles.fonts.medium,
            },
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
            component={PostDetailScreen}
            options={({ route }) => ({
              headerBackTitleVisible: false,
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
              headerBackTitleVisible: false,
              title: 'Courses',
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={({ route }) => ({
              headerBackTitleVisible: false,
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
